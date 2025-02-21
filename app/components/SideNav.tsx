'use client';

import React, { useRef, useState, useCallback, memo } from 'react';
import Image from 'next/image';
import { Category, CATEGORIES } from '../constants';
import useMediaQuery from '../../hooks/useMediaQuery';

interface SideNavProps {
    currentCategory: string;
    setCurrentCategory: (category: string) => void;
    expandedSections: { [key: string]: boolean };
    toggleSection: (section: string, scrollRef: HTMLDivElement | null) => void;
    setExpandedSections: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}

// Extract Footer component
const Footer = memo(() => (
    <div className="p-5 mb-10">
        <div className="h-[1px] bg-gray-100 mb-5"></div>
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
        <div className="mt-7 text-[13px] text-gray-500 space-y-3.5">
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
));

Footer.displayName = 'Footer';

// Extract MenuButton component
const MenuButton = memo(({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
    <button
        onClick={onClick}
        aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        className={`
            lg:hidden fixed z-50 p-2.5 rounded-full 
            bg-black/70 shadow-lg hover:bg-black/90
            backdrop-blur-sm transition-all duration-200
            ${isOpen ? 'top-4 right-4' : 'top-4 left-4'}
        `}
    >
        <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            {isOpen ? (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
            ) : (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                />
            )}
        </svg>
    </button>
));

MenuButton.displayName = 'MenuButton';

// Memoize NavContent component
const NavContent = memo(({ 
    currentCategory,
    handleCategoryClick,
    expandedSections,
    toggleSection,
    scrollRef
}: {
    currentCategory: string;
    handleCategoryClick: (category: string) => void;
    expandedSections: { [key: string]: boolean };
    toggleSection: (section: string, scrollRef: HTMLDivElement | null) => void;
    scrollRef: React.RefObject<HTMLDivElement>;
}) => (
    <nav className="h-screen bg-white border-r border-gray-100 z-40 max-w-[280px]">
        <div className="flex flex-col h-full">
            {/* Fixed Header */}
            <div className="p-5">
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
                        onClick={() => handleCategoryClick('homepage')}
                        className={`flex items-center w-full p-3 hover:bg-gray-50 rounded-md font-bold text-gray-900 uppercase text-[13px] transition-colors ${
                            currentCategory === 'homepage' ? 'bg-gray-100 text-black' : 'text-gray-600'
                        }`}
                    >
                        HOME
                    </button>
                </div>

                {/* Most Viewed Section */}
                <div className="mb-1">
                    <button
                        onClick={() => handleCategoryClick('mostviewed')}
                        className={`flex items-center w-full p-3 hover:bg-gray-50 font-bold text-gray-900 uppercase rounded-md text-[13px] transition-colors ${
                            currentCategory === 'mostviewed' ? 'bg-gray-100 text-black' : 'text-gray-600'
                        }`}
                    >
                        POPULAR
                    </button>
                </div>

                <div className="h-[1px] bg-gray-100 mb-4"></div>
            </div>

            {/* Scrollable Categories */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5">
                <div className="space-y-4">
                    {Object.entries(CATEGORIES).map(([section, categories]) => (
                        <div key={section} className="border-b border-gray-100 pb-2">
                            <button
                                onClick={() => toggleSection(section, scrollRef.current)}
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

            {/* Footer */}
            <Footer />
        </div>
    </nav>
));

NavContent.displayName = 'NavContent';

// Main component with performance improvements
export default function SideNav({
    currentCategory,
    setCurrentCategory,
    expandedSections,
    toggleSection,
    setExpandedSections,
}: SideNavProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 1024px)');

    const handleCategoryClick = useCallback((category: string) => {
        setCurrentCategory(category);
        setIsOpen(false);
        const parentSection = Object.entries(CATEGORIES).find(([section, cats]) =>
            cats.some((cat) => cat.key === category),
        )?.[0];
        if (parentSection) {
            setExpandedSections((prev) => ({ ...prev, [parentSection]: true }));
        }
    }, [setCurrentCategory, setExpandedSections]);

    const handleMenuClick = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return (
        <>
            {isMobile ? (
                <>
                    <MenuButton isOpen={isOpen} onClick={handleMenuClick} />
                    {isOpen && (
                        <div className="fixed inset-0 bg-black/75 z-40">
                            <NavContent
                                currentCategory={currentCategory}
                                handleCategoryClick={handleCategoryClick}
                                expandedSections={expandedSections}
                                toggleSection={toggleSection}
                                scrollRef={scrollRef}
                            />
                        </div>
                    )}
                </>
            ) : (
                <NavContent
                    currentCategory={currentCategory}
                    handleCategoryClick={handleCategoryClick}
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                    scrollRef={scrollRef}
                />
            )}
        </>
    );
}
