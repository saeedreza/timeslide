'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { DEFAULT_IMAGE } from '../constants';

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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent default space bar scrolling
            if (e.code === 'Space') {
                e.preventDefault();
            }

            switch (e.key) {
                case 'ArrowUp':
                    if (currentIndex > 0) {
                        e.preventDefault();
                        setCurrentIndex(prev => prev - 1);
                        document.getElementById(`story-${currentIndex - 1}`)?.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                    break;
                
                case 'ArrowDown':
                case ' ': // Space bar
                    if (currentIndex < stories.length - 1) {
                        e.preventDefault();
                        setCurrentIndex(prev => prev + 1);
                        document.getElementById(`story-${currentIndex + 1}`)?.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, stories.length]);

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
        <div>
            {stories.map((story, index) => (
                <article 
                    key={index} 
                    id={`story-${index}`}
                    className={`relative h-screen snap-start snap-always group ${
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
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                {story.category && (
                                    <div className="text-sm text-gray-300 uppercase tracking-wider mb-2">
                                        {story.category}
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
