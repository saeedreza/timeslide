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
            data-oid="cwkj2av"
        >
            <div className="flex flex-col h-full p-5" data-oid="2_6z07g">
                {/* Logo */}
                <div className="mb-5" data-oid="km3vq23">
                    <a
                        href="https://www.nytimes.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-oid="9a06c_x"
                    >
                        <picture data-oid="wg0bpcy">
                            <source
                                srcSet="/images/newyorktimes-logo.svg"
                                type="image/svg+xml"
                                data-oid="3iz5:7r"
                            />

                            <Image
                                src="/images/The_New_York_Times_logo.png"
                                alt="New York Times Logo"
                                width={240}
                                height={240}
                                data-oid=".m2hj8f"
                            />
                        </picture>
                    </a>
                </div>
                <div className="h-[1px] bg-gray-100 mb-4" data-oid="c43gwxg"></div>
                {/* Home Section */}
                <div className="mb-1" data-oid="tl4nhg8">
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
                        data-oid="u_onqau"
                    >
                        HOME
                    </button>
                </div>
                <div className="h-[1px] bg-gray-100" data-oid="1aioxtf"></div>
                {/* Most Viewed Section */}
                <div className="mb-1" data-oid="u2tuz3m">
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
                        data-oid=".a0ocsn"
                    >
                        POPULAR
                    </button>
                </div>
                {/* Divider */}
                <div className="h-[1px] bg-gray-100 mb-4" data-oid="ld72znk"></div>

                {/* Scrollable Content for Categories */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto" data-oid="ga89q7s">
                    <div className="space-y-4" data-oid="tqpw0s5">
                        {Object.entries(CATEGORIES).map(([section, categories]) => (
                            <div
                                key={section}
                                className="border-b border-gray-100 pb-2"
                                data-oid="nzzastq"
                            >
                                <button
                                    onClick={() => toggleSection(section, scrollRef.current)}
                                    aria-expanded={expandedSections[section] ? 'true' : 'false'}
                                    className="w-full px-3 flex items-center justify-between text-[13px] font-bold text-gray-900 uppercase tracking-wider hover:bg-gray-50 transition-colors"
                                    data-oid="m10mbon"
                                >
                                    {section}
                                    <svg
                                        className={`w-4 h-4 transform transition-transform duration-200 ${
                                            expandedSections[section] ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="mman5._"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                            data-oid="10go.1r"
                                        />
                                    </svg>
                                </button>
                                <div
                                    className={`mt-1 space-y-1 overflow-hidden transition-all duration-200 ${
                                        expandedSections[section] ? 'max-h-[1200px]' : 'max-h-0'
                                    }`}
                                    data-oid="6:dyaam"
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
                                            data-oid=":.czi2e"
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
                <div className="relative" data-oid="9id7jx6">
                    <div className="pt-5 px-5" data-oid="b4nu7hg">
                        <button
                            className="w-full py-2.5 text-white rounded-md font-small bg-black text-[12px] hover:bg-gray-900 transition-colors"
                            onClick={() =>
                                window.open(
                                    'https://www.nytimes.com/subscription?source=TikTokNYTimes',
                                    '_blank',
                                )
                            }
                            data-oid="ej97y25"
                        >
                            SUBSCRIBE FOR $1
                        </button>
                    </div>

                    <button
                        onClick={() => setIsFooterOpen(!isFooterOpen)}
                        aria-expanded={isFooterOpen ? 'true' : 'false'}
                        className="w-full text-center text-[11px] text-gray-500 hover:text-gray-800 py-2 transition-colors flex items-center justify-center gap-1"
                        data-oid="_fpmtel"
                    >
                        MORE
                        <svg
                            className={`w-3 h-3 transition-transform duration-200 ${isFooterOpen ? '' : 'rotate-180'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            data-oid="o241bsx"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                                data-oid="hku-j.2"
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
                        data-oid="c-.wax:"
                    >
                        <div className="relative p-5" data-oid="jqzdg7r">
                            <button
                                onClick={() => setIsFooterOpen(false)}
                                className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                data-oid="mz826w-"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="jz_hwoj"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                        data-oid="cqrsgdy"
                                    />
                                </svg>
                            </button>

                            <div
                                className="mt-2 text-[13px] text-gray-500 space-y-3.5"
                                data-oid="7j1zm2b"
                            >
                                <a
                                    href="https://www.nytimes.com/account"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:text-gray-800 transition-colors"
                                    data-oid="sb44p67"
                                >
                                    My Account
                                </a>
                                <a
                                    href="https://help.nytimes.com/hc/en-us"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:text-gray-800 transition-colors"
                                    data-oid="nh141sx"
                                >
                                    Help
                                </a>
                                <a
                                    href="https://www.nytimes.com/privacy/privacy-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:text-gray-800 transition-colors"
                                    data-oid="8kynqu0"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href="https://help.nytimes.com/hc/en-us/articles/115014893428-Terms-of-service"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:text-gray-800 transition-colors"
                                    data-oid="-yyw9m4"
                                >
                                    Terms of Service
                                </a>
                                <a
                                    href="https://help.nytimes.com/hc/en-us/articles/115014792127-Copyright-notice"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:text-gray-800 transition-colors"
                                    data-oid="m9v_2rj"
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
