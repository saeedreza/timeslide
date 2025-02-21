'use client';

import { useState, useEffect } from 'react';
import SideNav from './components/SideNav';
import Feed from './components/Feed';
import { Story } from './types';

async function fetchStories(category: string) {
    try {
        const response = await fetch(`/api/stories?category=${category}`);
        if (!response.ok) {
            throw new Error(`Status code ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching stories:', error);
        throw error;
    }
}

export default function Page() {
    const [stories, setStories] = useState<Story[]>([]);
    const [currentCategory, setCurrentCategory] = useState('homepage');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        News: false,
        'Culture & Lifestyle': false,
        Marketplace: false,
        Other: false,
        Opinion: false,
    });
    const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        async function loadStories() {
            setLoadingStates(prev => ({ ...prev, [currentCategory]: true }));
            setError(null);
            
            try {
                const data = await fetchStories(currentCategory);
                setStories(data);
            } catch (error) {
                console.error('Error fetching stories:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch stories');
                setStories([]);
            } finally {
                setLoadingStates(prev => ({ ...prev, [currentCategory]: false }));
            }
        }

        loadStories();
    }, [currentCategory]);

    const toggleSection = (section: string, scrollRef: HTMLDivElement | null) => {
        setExpandedSections((prev) => {
            // Create an object with all sections set to false
            const allClosed = Object.keys(prev).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: false,
                }),
                {},
            );

            // Toggle only the clicked section
            const isOpening = !prev[section];
            if (isOpening && scrollRef) {
                scrollRef.scrollTo({ top: 0, behavior: 'smooth' });
            }

            return {
                ...allClosed,
                [section]: !prev[section],
            };
        });
    };

    return (
        <div className="relative flex w-full">
            {/* SideNav - fixed width on desktop, overlay on mobile */}
            <div>
                <SideNav
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                    setExpandedSections={setExpandedSections}
                />
            </div>

            {/* Main content - takes remaining width */}
            <main className="flex-1 w-full m-auto">
                <div className="max-w-[720px] mx-auto h-screen overflow-y-scroll snap-y snap-mandatory">
                    <Feed stories={stories} loading={loadingStates[currentCategory]} error={error} />
                </div>
            </main>
        </div>
    );
}
