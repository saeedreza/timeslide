'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Category, CATEGORIES } from '../constants';

interface DesktopSideNavProps {
    currentCategory: string;
    setCurrentCategory: (category: string) => void;
    expandedSections: { [key: string]: boolean };
    toggleSection: (section: string, scrollRef: HTMLDivElement | null) => void;
}

export default function DesktopSideNav({
    currentCategory,
    setCurrentCategory,
    expandedSections,
    toggleSection,
}: DesktopSideNavProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const handleCategoryClick = (category: string) => {
        setCurrentCategory(category);
        const parentSection = Object.entries(CATEGORIES).find(([section, cats]) =>
            cats.some((cat) => cat.key === category),
        )?.[0];
        // Optionally, auto-expand the parent section if needed.
    };

    return (
        <nav
            className="fixed top-0 left-0 w-[280px] h-screen bg-white border-r border-gray-100 z-40"
            data-oid="nog6-7h"
        >
            <div className="flex flex-col h-full p-5" data-oid="guqir0z">
                {/* Logo */}
                <div className="mb-5" data-oid="yknwddd">
                    <a
                        href="https://www.nytimes.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-oid="d9ynxwk"
                        key="olk-e_Nw"
                    >
                        <picture data-oid="myqt7nb">
                            <source
                                srcSet="/images/newyorktimes-logo.svg"
                                type="image/svg+xml"
                                data-oid="tpkffht"
                            />
                            <Image
                                src="/images/The_New_York_Times_logo.png"
                                alt="New York Times Logo"
                                width={240}
                                height={240}
                                data-oid="5tnbak5"
                            />
                        </picture>
                    </a>
                </div>
                <div className="h-[1px] bg-gray-100 mb-4" data-oid="7vy174s"></div>
                {/* Home Section */}
                <div className="mb-1" data-oid="77sh9p8">
                    <button
                        onClick={() => {
                            setCurrentCategory('homepage');
                        }}
                        className={`flex items-center w-full p-3 hover:bg-gray-50 rounded-md font-bold text-gray-900 uppercase text-[13px] transition-colors ${
                            currentCategory === 'homepage'
                                ? 'bg-gray-100 text-black'
                                : 'text-gray-600'
                        }`}
                        data-oid="xlsumfu"
                    >
                        HOME
                    </button>
                </div>
                <div className="h-[1px] bg-gray-100" data-oid="i:t9w2u"></div>
                {/* Most Viewed Section */}
                <div className="mb-1" data-oid="t2-i-5i">
                    <button
                        onClick={() => {
                            setCurrentCategory('mostviewed');
                        }}
                        className={`flex items-center w-full p-3 hover:bg-gray-50 font-bold text-gray-900 uppercase rounded-md text-[13px] transition-colors ${
                            currentCategory === 'mostviewed'
                                ? 'bg-gray-100 text-black'
                                : 'text-gray-600'
                        }`}
                        data-oid=".rts9:1"
                    >
                        POPULAR
                    </button>
                </div>
                {/* Divider */}
                <div className="h-[1px] bg-gray-100 mb-4" data-oid="fpf2szw"></div>

                {/* Scrollable Content for Categories */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto" data-oid="b_8nq55">
                    <div className="space-y-4" data-oid="akw47iu">
                        {Object.entries(CATEGORIES).map(([section, categories]) => (
                            <div
                                key={section}
                                className="border-b border-gray-100 pb-2"
                                data-oid="aprb3gf"
                            >
                                <button
                                    onClick={() => toggleSection(section, scrollRef.current)}
                                    aria-expanded={expandedSections[section] ? 'true' : 'false'}
                                    className="w-full px-3 flex items-center justify-between text-[13px] font-bold text-gray-900 uppercase tracking-wider hover:bg-gray-50 transition-colors"
                                    data-oid="51636sh"
                                >
                                    {section}
                                    <svg
                                        className={`w-4 h-4 transform transition-transform duration-200 ${expandedSections[section] ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="vl2vi-u"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                            data-oid="496x476"
                                        />
                                    </svg>
                                </button>
                                <div
                                    className={`mt-1 space-y-1 overflow-hidden transition-all duration-200 ${expandedSections[section] ? 'max-h-[1200px]' : 'max-h-0'}`}
                                    data-oid="gt_4aiw"
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
                                            data-oid="t2dhzxu"
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Desktop Footer */}
                <div className="hidden lg:block" data-oid="j1bpkbs">
                    <div className="h-[1px] bg-gray-100 mb-5" data-oid="by-hokn"></div>
                    <button
                        className="w-full py-2.5 text-white rounded-md font-small bg-black text-[12px] hover:bg-gray-900 transition-colors"
                        onClick={() =>
                            window.open(
                                'https://www.nytimes.com/subscription?source=TikTokNYTimes',
                                '_blank',
                            )
                        }
                        data-oid="bjpn8je"
                    >
                        SUBSCRIBE FOR $1
                    </button>
                    <div className="mt-7 text-[13px] text-gray-500 space-y-3.5" data-oid="7e_xo11">
                        <a
                            href="https://www.nytimes.com/account"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-gray-800 transition-colors"
                            data-oid=":._el5."
                        >
                            My Account
                        </a>
                        <a
                            href="https://help.nytimes.com/hc/en-us"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-gray-800 transition-colors"
                            data-oid="kx1pkgq"
                        >
                            Help
                        </a>
                        <a
                            href="https://www.nytimes.com/privacy/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-gray-800 transition-colors"
                            data-oid="c268gvw"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="https://help.nytimes.com/hc/en-us/articles/115014893428-Terms-of-service"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-gray-800 transition-colors"
                            data-oid="gl:gz6-"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="https://help.nytimes.com/hc/en-us/articles/115014792127-Copyright-notice"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-gray-800 transition-colors"
                            data-oid="oy4cz19"
                        >
                            ©2025 New York Times
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
