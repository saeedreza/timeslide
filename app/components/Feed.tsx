'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { DEFAULT_IMAGE, CATEGORIES } from '../constants';

// Define the Story interface (can also be moved to a shared types file)
export interface Story {
    title: string;
    description: string;
    pubDate: string;
    link: string;
    image: string;
    category?: string;
    creator?: string;
}

interface FeedProps {
    stories: Story[];
    loading: boolean;
    error: string | null;
}

export default function Feed({ stories, loading, error }: FeedProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    // Use refs to hold state values; one for the index and one for scroll blocking
    const currentIndexRef = useRef(currentIndex);
    const isScrollingRef = useRef(false);

    // Keep the ref in sync with the state
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

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
            <div className="h-screen flex items-center justify-center" data-oid="n.s:.hz">
                <div className="text-gray-500" data-oid="n0ojw-_">
                    Loading...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center" data-oid="wqg57bh">
                <div className="text-red-500" data-oid="gje08pn">
                    {error}
                </div>
            </div>
        );
    }

    if (!loading && !error && stories.length === 0) {
        return (
            <div className="h-screen flex items-center justify-center" data-oid="s7z0-xs">
                <div className="text-gray-500" data-oid="2kr8h.q">
                    No stories found
                </div>
            </div>
        );
    }

    return (
        <div
            data-oid="dz225wg"
            className="snap-y snap-mandatory overflow-y-scroll overflow-x-hidden h-screen scroll-smooth touch-pan-y"
        >
            {stories.map((story, index) => (
                <article
                    key={index}
                    id={`story-${index}`}
                    className={`relative h-screen snap-start snap-always group ${
                        currentIndex === index ? 'ring-2 ring-white ring-opacity-20' : ''
                    }`}
                    data-oid="l1hfi11"
                >
                    <a
                        href={story.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                        data-oid="vda77vs"
                    >
                        {/* Full height image with overlay */}
                        <div className="absolute inset-0" data-oid="n.a0z_y">
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
                                data-oid="bmba9i_"
                            />

                            {/* Gradient overlay */}
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                                data-oid="k5avwt3"
                            />

                            {/* Content overlay */}
                            <div
                                className="absolute bottom-0 left-0 right-0 p-8 text-white"
                                data-oid="1-.3b6u"
                            >
                                {story.category && (
                                    <div
                                        className="text-sm text-gray-300 tracking-wider mb-2"
                                        data-oid="c29e0rp"
                                    >
                                        {getCategoryName(story.category)}
                                    </div>
                                )}
                                <h2
                                    className="font-serif text-4xl font-bold mb-4 group-hover:underline"
                                    data-oid="8bvu7c2"
                                >
                                    {story.title}
                                </h2>
                                <p
                                    className="text-gray-200 text-lg mb-4 line-clamp-3"
                                    data-oid="ch28z44"
                                >
                                    {story.description}
                                </p>
                                <div
                                    className="flex items-center text-gray-300 text-sm"
                                    data-oid="jmx_98v"
                                >
                                    <time data-oid="nvyh1f.">
                                        {new Date(story.pubDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </time>
                                    {story.creator && (
                                        <>
                                            <span className="mx-2" data-oid="lu83o-_">
                                                ·
                                            </span>
                                            <span
                                                className="truncate max-w-[200px]"
                                                data-oid="cnm8321"
                                            >
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
