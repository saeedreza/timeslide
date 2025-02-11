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
            data-oid="fq.yq2:"
        >
            <div className="flex flex-col h-full p-5" data-oid="ce4h364">
                {/* Logo */}
                <div className="mb-5" data-oid="5ccntej">
                    <a
                        href="https://www.nytimes.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-oid="h55fgou"
                    >
                        <picture data-oid="-ejs.7x">
                            <source
                                srcSet="/images/newyorktimes-logo.svg"
                                type="image/svg+xml"
                                data-oid=".vbkkfd"
                            />

                            <Image
                                src="/images/The_New_York_Times_logo.png"
                                alt="New York Times Logo"
                                width={240}
                                height={240}
                                data-oid="kklxc3r"
                            />
                        </picture>
                    </a>
                </div>
                <div className="h-[1px] bg-gray-100 mb-4" data-oid="sg.w90n"></div>
                {/* Home Section */}
                <div className="mb-1" data-oid="9ivijp.">
                    <button
                        onClick={() => {
                            setCurrentCategory('homepage');
                        }}
                        className={`flex items-center w-full p-3 hover:bg-gray-50 rounded-md font-bold text-gray-900 uppercase text-[13px] transition-colors ${
                            currentCategory === 'homepage'
                                ? 'bg-gray-100 text-black'
                                : 'text-gray-600'
                        }`}
                        data-oid="ks5:w6x"
                    >
                        HOME
                    </button>
                </div>
                <div className="h-[1px] bg-gray-100" data-oid="ebs30_s"></div>
                {/* Most Viewed Section */}
                <div className="mb-1" data-oid="xpy6fqs">
                    <button
                        onClick={() => {
                            setCurrentCategory('mostviewed');
                        }}
                        className={`flex items-center w-full p-3 hover:bg-gray-50 font-bold text-gray-900 uppercase rounded-md text-[13px] transition-colors ${
                            currentCategory === 'mostviewed'
                                ? 'bg-gray-100 text-black'
                                : 'text-gray-600'
                        }`}
                        data-oid=".x5bpw_"
                    >
                        POPULAR
                    </button>
                </div>
                {/* Divider */}
                <div className="h-[1px] bg-gray-100 mb-4" data-oid="e8zf9o5"></div>

                {/* Scrollable Content for Categories */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto" data-oid="w2e.yi4">
                    <div className="space-y-4" data-oid="vtopts3">
                        {Object.entries(CATEGORIES).map(([section, categories]) => (
                            <div
                                key={section}
                                className="border-b border-gray-100 pb-2"
                                data-oid="kmf8-m6"
                            >
                                <button
                                    onClick={() => toggleSection(section, scrollRef.current)}
                                    aria-expanded={expandedSections[section] ? 'true' : 'false'}
                                    className="w-full px-3 flex items-center justify-between text-[13px] font-bold text-gray-900 uppercase tracking-wider hover:bg-gray-50 transition-colors"
                                    data-oid="c.qqf5j"
                                >
                                    {section}
                                    <svg
                                        className={`w-4 h-4 transform transition-transform duration-200 ${expandedSections[section] ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid=":_6ffkc"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                            data-oid="wg:bhv-"
                                        />
                                    </svg>
                                </button>
                                <div
                                    className={`mt-1 space-y-1 overflow-hidden transition-all duration-200 ${expandedSections[section] ? 'max-h-[1200px]' : 'max-h-0'}`}
                                    data-oid="s-k_bn4"
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
                                            data-oid="lq1rvts"
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
                <div className="hidden lg:block" data-oid="bw3r41o">
                    <div className="h-[1px] bg-gray-100 mb-5" data-oid="tb-obxe"></div>
                    <button
                        className="w-full py-2.5 text-white rounded-md font-small bg-black text-[12px] hover:bg-gray-900 transition-colors"
                        onClick={() =>
                            window.open(
                                'https://www.nytimes.com/subscription?source=TikTokNYTimes',
                                '_blank',
                            )
                        }
                        data-oid="spd7g76"
                    >
                        SUBSCRIBE FOR $1
                    </button>
                    <div className="mt-7 text-[13px] text-gray-500 space-y-3.5" data-oid="6r1q2wx">
                        <a
                            href="https://www.nytimes.com/account"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-gray-800 transition-colors"
                            data-oid="qqqej:i"
                        >
                            My Account
                        </a>
                        <a
                            href="https://help.nytimes.com/hc/en-us"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-gray-800 transition-colors"
                            data-oid="adh7iy8"
                        >
                            Help
                        </a>
                        <a
                            href="https://www.nytimes.com/privacy/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-gray-800 transition-colors"
                            data-oid="mo.dhfk"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="https://help.nytimes.com/hc/en-us/articles/115014893428-Terms-of-service"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-gray-800 transition-colors"
                            data-oid=":37gepi"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="https://help.nytimes.com/hc/en-us/articles/115014792127-Copyright-notice"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-gray-800 transition-colors"
                            data-oid=":ze5f0n"
                        >
                            ©2025 New York Times
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
