'use client';

import React, { useRef, useState, useCallback } from 'react';
import MobileSideNav from './MobileSideNav';
import DesktopSideNav from './DesktopSideNav';
import { Category, CATEGORIES } from '../constants';

// Assume you have a custom hook for detecting mobile viewport
import useMediaQuery from '../../hooks/useMediaQuery';

interface SideNavProps {
    currentCategory: string;
    setCurrentCategory: (category: string) => void;
    expandedSections: { [key: string]: boolean };
    toggleSection: (section: string, scrollRef: HTMLDivElement | null) => void;
    setExpandedSections: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}

export default function SideNav({
    currentCategory,
    setCurrentCategory,
    expandedSections,
    toggleSection,
    setExpandedSections,
}: SideNavProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    // Create a collapse helper if needed
    const collapseAllSections = useCallback(() => {
        setExpandedSections((prev) =>
            Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
        );
    }, [setExpandedSections]);

    // Use a media query hook to determine if this is a mobile viewport (e.g., width < 1024px)
    const isMobile = useMediaQuery('(max-width: 1024px)');

    return (
        <>
            {isMobile ? (
                <>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
                        className={`
                            lg:hidden fixed z-50 p-2.5 rounded-full 
                            bg-black/70 shadow-lg hover:bg-black/90
                            backdrop-blur-sm transition-all duration-200
                            ${isOpen ? 'top-4 right-4' : 'top-4 left-4'}
                        `}
                        data-oid="t9pqtzk"
                    >
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            data-oid="v7pj9l."
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                    data-oid="0f6jdfg"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                    data-oid="ng2pplm"
                                />
                            )}
                        </svg>
                    </button>
                    {/* Mobile SideNav */}
                    <MobileSideNav
                        currentCategory={currentCategory}
                        setCurrentCategory={setCurrentCategory}
                        expandedSections={expandedSections}
                        toggleSection={toggleSection}
                        setExpandedSections={setExpandedSections}
                        collapseAllSections={collapseAllSections}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        data-oid="73y.8z3"
                    />
                </>
            ) : (
                <DesktopSideNav
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                    data-oid="l2ywv8j"
                />
            )}
        </>
    );
}
