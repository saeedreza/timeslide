'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Category, CATEGORIES } from '../constants';

interface MobileSideNavProps {
    currentCategory: string;
    setCurrentCategory: (category: string) => void;
    expandedSections: { [key: string]: boolean };
    toggleSection: (section: string, scrollRef: HTMLDivElement | null) => void;
    setExpandedSections: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    collapseAllSections: () => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function MobileSideNav({
    currentCategory,
    setCurrentCategory,
    expandedSections,
    toggleSection,
    setExpandedSections,
    collapseAllSections,
    isOpen,
    setIsOpen,
}: MobileSideNavProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isFooterOpen, setIsFooterOpen] = useState(false);

    const handleCategoryClick = (category: string) => {
        setCurrentCategory(category);
        setIsOpen(false);
        const parentSection = Object.entries(CATEGORIES).find(([section, cats]) =>
            cats.some((cat) => cat.key === category),
        )?.[0];
        if (parentSection) {
            setExpandedSections((prev) => ({ ...prev, [parentSection]: true }));
        }
    };

    return (
        <nav
            className={`
        fixed top-0 left-0 w-[280px] h-screen bg-white border-r border-gray-100 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
        >
            <div className="flex flex-col h-full p-5">
                {/* Logo */}
                <div className="mb-5">
                    <a href="https://www.nytimes.com" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/images/NewYorkTimes-Logo.svg"
                            alt="New York Times Logo"
                            width={240}
                            height={40}
                            priority
                        />
                    </a>
                </div>
                <div className="h-[1px] bg-gray-100 mb-4"></div>
                {/* Home Section */}
                <div className="mb-1">
                    <button
                        onClick={() => {
                            setCurrentCategory('homepage');
                            collapseAllSections();
                            setIsOpen(false);
                        }}
                        className={`flex items-center w-full p-3 rounded-md font-bold text-gray-900 uppercase text-[13px] transition-colors ${
                            currentCategory === 'homepage'
                                ? 'bg-gray-100 text-black'
                                : 'text-gray-600'
                        }`}
                    >
                        HOME
                    </button>
                </div>
                <div className="h-[1px] bg-gray-100"></div>
                {/* Most Viewed Section */}
                <div className="mb-1">
                    <button
                        onClick={() => {
                            setCurrentCategory('mostviewed');
                            collapseAllSections();
                            setIsOpen(false);
                        }}
                        className={`flex items-center w-full p-3 font-bold text-gray-900 uppercase rounded-md text-[13px] transition-colors ${
                            currentCategory === 'mostviewed'
                                ? 'bg-gray-100 text-black'
                                : 'text-gray-600'
                        }`}
                    >
                        POPULAR
                    </button>
                </div>
                {/* Divider */}
                <div className="h-[1px] bg-gray-100 mb-4"></div>

                {/* Scrollable Content for Categories */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto">
                    <div className="space-y-4">
                        {Object.entries(CATEGORIES).map(([section, categories]) => (
                            <div key={section} className="border-b border-gray-100 pb-2">
                                <button
                                    onClick={() => toggleSection(section, scrollRef.current)}
                                    aria-expanded={expandedSections[section] ? 'true' : 'false'}
                                    className="w-full px-3 flex items-center justify-between text-[13px] font-bold text-gray-900 uppercase tracking-wider hover:bg-gray-50 transition-colors"
                                >
                                    {section}
                                    <svg
                                        className={`w-4 h-4 transform transition-transform duration-200 ${
                                            expandedSections[section] ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                <div
                                    className={`mt-1 space-y-1 overflow-hidden transition-all duration-200 ${
                                        expandedSections[section] ? 'max-h-[1200px]' : 'max-h-0'
                                    }`}
                                >
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.key}
                                            onClick={() => handleCategoryClick(cat.key)}
                                            className={`w-full text-left px-3 py-2 text-[14px] hover:bg-gray-50 transition-colors ${
                                                currentCategory === cat.key
                                                    ? 'bg-gray-100 text-black'
                                                    : 'text-gray-600'
                                            }`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Footer Section */}
                <div className="relative">
                    <div className="pt-5 px-5">
                        <button
                            className="w-full py-2.5 text-white rounded-md font-small bg-black text-[12px] hover:bg-gray-900 transition-colors"
                            onClick={() =>
                                window.open(
                                    'https://www.nytimes.com/subscription?source=TikTokNYTimes',
                                    '_blank',
                                )
                            }
                        >
                            SUBSCRIBE FOR $1
                        </button>
                    </div>

                    <button
                        onClick={() => setIsFooterOpen(!isFooterOpen)}
                        aria-expanded={isFooterOpen ? 'true' : 'false'}
                        className="w-full text-center text-[11px] text-gray-500 hover:text-gray-800 py-2 transition-colors flex items-center justify-center gap-1"
                    >
                        MORE
                        <svg
                            className={`w-3 h-3 transition-transform duration-200 ${isFooterOpen ? '' : 'rotate-180'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    <div
                        className={`
              fixed bottom-0 left-0 w-[280px]
              bg-white transition-all duration-300 ease-in-out
              border-t border-gray-100
              shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.05)]
              ${isFooterOpen ? 'translate-y-0' : 'translate-y-full'}
            `}
                    >
                        <div className="relative p-5">
                            <button
                                onClick={() => setIsFooterOpen(false)}
                                className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            <div className="mt-2 text-[13px] text-gray-500 space-y-3.5">
                                <a
                                    href="https://www.nytimes.com/account"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:text-gray-800 transition-colors"
                                >
                                    My Account
                                </a>
                                <a
                                    href="https://help.nytimes.com/hc/en-us"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:text-gray-800 transition-colors"
                                >
                                    Help
                                </a>
                                <a
                                    href="https://www.nytimes.com/privacy/privacy-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:text-gray-800 transition-colors"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href="https://help.nytimes.com/hc/en-us/articles/115014893428-Terms-of-service"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:text-gray-800 transition-colors"
                                >
                                    Terms of Service
                                </a>
                                <a
                                    href="https://help.nytimes.com/hc/en-us/articles/115014792127-Copyright-notice"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:text-gray-800 transition-colors"
                                >
                                    ©2025 New York Times
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
