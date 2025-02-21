'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { DEFAULT_IMAGE, CATEGORIES } from '../constants';
import { Story } from '../types';

interface FeedProps {
    stories: Story[];
    loading: boolean;
    error: string | null;
}

// Add debounce utility
const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

export default function Feed({ stories, loading, error }: FeedProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    // Use refs to hold state values; one for the index and one for scroll blocking
    const currentIndexRef = useRef(currentIndex);
    const isScrollingRef = useRef(false);

    // Keep the ref in sync with the state
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    // In the Feed component, update the viewport height handler
    useEffect(() => {
        const updateViewportHeight = debounce(() => {
            document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        }, 100);

        updateViewportHeight();
        window.addEventListener('resize', updateViewportHeight);
        window.addEventListener('orientationchange', updateViewportHeight);

        return () => {
            window.removeEventListener('resize', updateViewportHeight);
            window.removeEventListener('orientationchange', updateViewportHeight);
        };
    }, []);

    // Register the key event listener only once
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent default space bar scrolling
            if (e.code === 'Space') {
                e.preventDefault();
            }
            // Ignore key events if a scroll is in progress
            if (isScrollingRef.current) return;

            switch (e.key) {
                case 'ArrowUp': {
                    if (currentIndexRef.current > 0) {
                        const newIndex = currentIndexRef.current - 1;
                        setCurrentIndex(newIndex);
                        currentIndexRef.current = newIndex;
                        document.getElementById(`story-${newIndex}`)?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                        // Block further scroll events until the smooth scroll finishes
                        isScrollingRef.current = true;
                        setTimeout(() => {
                            isScrollingRef.current = false;
                        }, 500);
                    }
                    break;
                }

                case 'ArrowDown':
                case ' ': {
                    if (currentIndexRef.current < stories.length - 1) {
                        const newIndex = currentIndexRef.current + 1;
                        setCurrentIndex(newIndex);
                        currentIndexRef.current = newIndex;
                        document.getElementById(`story-${newIndex}`)?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                        // Block further scroll events until the smooth scroll finishes
                        isScrollingRef.current = true;
                        setTimeout(() => {
                            isScrollingRef.current = false;
                        }, 500);
                    }
                    break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [stories.length]);

    // Helper function to get the display name for a category key
    const getCategoryName = (key: string): string => {
        // Handle special cases first
        switch (key.toLowerCase()) {
            case 'homepage':
                return 'Home';
            case 'mostviewed':
                return 'Most Viewed';
        }

        // For other categories, use the mapping from CATEGORIES
        const allCategories = Object.values(CATEGORIES).flat();
        const category = allCategories.find((cat) => cat.key === key.toLowerCase());
        return category ? category.name : key;
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (!loading && !error && stories.length === 0) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-gray-500">No stories found</div>
            </div>
        );
    }

    return (
        <div className="snap-y snap-mandatory overflow-y-scroll overflow-x-hidden h-[calc(var(--vh,1vh)*100)] scroll-smooth touch-pan-y w-full">
            {stories.map((story, index) => (
                <article
                    key={index}
                    id={`story-${index}`}
                    className={`relative h-[calc(var(--vh,1vh)*100)] w-full snap-start snap-always group ${
                        currentIndex === index ? 'ring-2 ring-white ring-opacity-20' : ''
                    }`}
                >
                    <a
                        href={story.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                    >
                        {/* Full height image with overlay */}
                        <div className="absolute inset-0">
                            <Image
                                src={story.image}
                                alt={story.title}
                                layout="fill"
                                objectFit="cover"
                                className="transform group-hover:scale-105 transition-transform duration-700"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = DEFAULT_IMAGE;
                                }}
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            {/* Content overlay */}
                            <div className="absolute bottom-10 left-0 right-0 p-8 text-white">
                                {story.category && (
                                    <div className="text-sm text-gray-300 tracking-wider mb-2">
                                        {getCategoryName(story.category)}
                                    </div>
                                )}
                                <h2 className="font-serif text-4xl font-bold mb-4 group-hover:underline">
                                    {story.title}
                                </h2>
                                <p className="text-gray-200 text-lg mb-4 line-clamp-3">
                                    {story.description}
                                </p>
                                <div className="flex items-center text-gray-300 text-sm">
                                    <time>
                                        {new Date(story.pubDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </time>
                                    {story.creator && (
                                        <>
                                            <span className="mx-2">·</span>
                                            <span className="truncate max-w-[200px]">
                                                {story.creator.split(',').slice(0, 2).join(',')}
                                                {story.creator.split(',').length > 2
                                                    ? ' et al.'
                                                    : ''}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </a>
                </article>
            ))}
        </div>
    );
}
