'use client';

import React, { useRef, useState } from 'react';
import { Category, CATEGORIES } from '../constants';

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
    const [isFooterOpen, setIsFooterOpen] = useState(false);
    const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const handleCategoryClick = (category: string) => {
        setCurrentCategory(category);
        setIsOpen(false);
        
        // Find the parent section for this category
        const parentSection = Object.entries(CATEGORIES).find(([_, categories]) =>
            categories.some(cat => cat.key === category)
        )?.[0];
        
        if (parentSection) {
            // Expand the parent section
            setExpandedSections(prev => ({
                ...prev,
                [parentSection]: true
            }));
            
            // Wait for the section to expand before scrolling
            setTimeout(() => {
                if (scrollRef.current && categoryRefs.current[parentSection]) {
                    const sectionElement = categoryRefs.current[parentSection];
                    scrollRef.current.scrollTop = sectionElement.offsetTop;
                }
            }, 0);
        }
    };

    return (
        <>
            {/* Mobile Menu Button (Hamburger in top-left when closed) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
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

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <nav
                className={`
        fixed top-0 left-0 w-[280px] h-screen bg-white border-r border-gray-100 z-40
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
            >
                <div className="flex flex-col h-full p-5">
                    {/* Fixed Header */}

                    {/* Logo */}
                    <div className="mb-5">
                        <svg viewBox="0 0 184 25" fill="#000000" aria-hidden="true"><path d="M14.57,2.57C14.57,.55,12.65-.06,11.04,.01V.19c.96,.07,1.7,.46,1.7,1.11,0,.45-.32,1.01-1.28,1.01-.76,0-2.02-.45-3.2-.84-1.3-.45-2.54-.87-3.57-.87-2.02,0-3.55,1.5-3.55,3.36,0,1.5,1.16,2.02,1.63,2.21l.03-.07c-.3-.2-.49-.42-.49-1.06,0-.54,.39-1.26,1.43-1.26,.94,0,2.17,.42,3.8,.88,1.4,.39,2.91,.76,3.75,.87v3.28l-1.58,1.3,1.58,1.36v4.49c-.81,.46-1.75,.61-2.56,.61-1.5,0-2.88-.42-4.02-1.68l4.26-2.07V5.73l-5.2,2.32c.54-1.38,1.55-2.41,2.66-3.08l-.03-.08C3.31,5.73,.5,8.56,.5,12.06c0,4.19,3.35,7.3,7.22,7.3,4.19,0,6.65-3.28,6.61-6.75h-.08c-.61,1.33-1.63,2.59-2.78,3.25v-4.38l1.65-1.33-1.65-1.33v-3.28c1.53,0,3.11-1.01,3.11-2.96M5.8,14.13l-1.21,.61c-.74-.96-1.23-2.32-1.23-4.07,0-.72,.08-1.7,.32-2.39l2.14-.96-.03,6.8h0Zm19.47-5.76l-.81,.64-2.47-2.2-2.86,2.21V.48l-3.89,2.69c.45,.15,.99,.39,.99,1.43v11.81l-1.33,1.01,.12,.12,.67-.46,2.32,2.12,3.11-2.07-.1-.15-.79,.52-1.08-1.08v-7.12l.74-.54,1.7,1.48v6.19c0,3.92-.87,4.73-2.63,5.37v.1c2.93,.12,5.57-.87,5.57-5.89v-6.75l.88-.72-.12-.15h0Zm5.22,10.8l4.51-3.62-.12-.17-2.36,1.87-2.71-2.14v-1.33l4.68-3.3-2.36-3.67-5.2,2.86v6.8l-1.01,.79,.12,.15,.96-.76,3.5,2.54h-.01Zm-.69-5.67v-5.15l2.27,3.55-2.27,1.6ZM53.65,1.61c0-.32-.08-.59-.2-.96h-.07c-.32,.87-.67,1.33-1.68,1.33-.88,0-1.58-.54-1.95-.94,0,.03-2.96,3.42-2.96,3.42l.15,.12,.84-.96c.64,.49,1.21,1.06,2.63,1.08V13.34l-6.06-10.5c-.47-.79-1.28-1.97-2.66-1.97-1.63,0-2.86,1.4-2.66,3.77h.1c.12-.59,.47-1.33,1.18-1.33,.57,0,1.03,.54,1.3,1.03v3.38c-1.87,0-2.93,.87-2.93,2.34,0,.61,.45,1.94,1.72,2.17v-.07c-.17-.17-.34-.32-.34-.67,0-.57,.42-.88,1.18-.88,.12,0,.3,.03,.37,.05v4.38c-2.2,.03-3.89,1.23-3.89,3.31s1.7,2.88,3.47,2.78v-.07c-1.11-.12-1.68-.69-1.68-1.5,0-.88,.64-1.36,1.45-1.36s1.43,.52,1.95,1.11l2.96-3.33-.12-.12-.76,.87c-1.14-1.01-1.87-1.48-3.18-1.68V4.67l8.36,14.57h.45V4.72c1.6-.1,3.03-1.3,3.03-3.11m2.81,17.54l4.51-3.62-.12-.17-2.36,1.87-2.71-2.14v-1.33l4.68-3.3-2.36-3.67-5.2,2.86v6.8l-1.01,.79,.12,.15,.96-.76,3.5,2.54h0Zm-.69-5.67v-5.15l2.27,3.55-2.27,1.6Zm21.22-5.52l-.69,.52-1.97-1.68-2.29,2.07,.94,.88v7.72l-2.34-1.6v-6.26l.81-.57-2.41-2.24-2.24,2.07,.94,.88v7.46l-.15,.1-2.2-1.6v-6.13c0-1.43-.72-1.85-1.63-2.41-.76-.47-1.16-.91-1.16-1.63,0-.79,.69-1.11,.91-1.23-.79-.03-2.98,.76-3.03,2.76-.03,1.03,.47,1.48,.99,1.97,.52,.49,1.01,.96,1.01,1.83v6.01l-1.06,.84,.12,.12,1.01-.79,2.63,2.14,2.51-1.75,2.76,1.75,5.42-3.2v-6.95l1.21-.94-.1-.15h0Zm18.15-5.84l-1.03,.94-2.32-2.02-3.13,2.51V1.19h-.19V18.12c-.34-.05-1.06-.25-1.85-.37V3.58c0-1.03-.74-2.47-2.59-2.47s-3.01,1.56-3.01,2.91h.08c.1-.61,.52-1.16,1.13-1.16s1.18,.39,1.18,1.78v4.04c-1.75,.07-2.81,1.16-2.81,2.34,0,.67,.42,1.92,1.75,1.97v-.1c-.45-.19-.54-.42-.54-.67,0-.59,.57-.79,1.36-.79h.19v6.51c-1.5,.52-2.2,1.53-2.2,2.78,0,1.72,1.38,3.05,3.4,3.05,1.43,0,2.44-.25,3.75-.54,1.06-.22,2.21-.47,2.83-.47,.79,0,1.14,.35,1.14,.91,0,.72-.27,1.08-.69,1.21v.1c1.7-.32,2.69-1.3,2.69-2.83s-1.5-2.54-3.18-2.54c-.87,0-2.44,.27-3.72,.57-1.43,.32-2.66,.47-3.11,.47-.72,0-1.6-.32-1.6-1.28,0-.87,.72-1.56,2.49-1.56,.96,0,1.9,.15,3.08,.42,1.26,.27,2.12,.64,3.2,.64,1.5,0,2.71-.54,2.71-2.74V3.29l1.11-1.01-.12-.15h0Zm-4.24,6.78c-.27,.3-.59,.54-1.11,.54-.57,0-.87-.3-1.14-.54V3.81l.74-.59,1.5,1.28v4.41h0Zm0,2.41c-.25-.25-.57-.47-1.11-.47s-.91,.27-1.14,.47v-2.17c.22,.19,.59,.49,1.14,.49s.87-.25,1.11-.49v2.17Zm0,5.1c0,.84-.42,1.78-1.5,1.78-.17,0-.57-.03-.74-.05v-6.58c.25-.22,.57-.52,1.14-.52,.52,0,.81,.25,1.11,.52v4.86h0Zm8.78,2.74l5.03-3.13v-6.85l-3.25-2.39-5.03,2.88v6.78l-.99,.79,.1,.15,.81-.67,3.33,2.44h0Zm-.37-3.55v-7.3l2.51,1.87v7.3l-2.51-1.87Zm15.01-8.65c-.39,.27-.74,.42-1.11,.42-.39,0-.88-.25-1.14-.57,0,.03-1.87,2.02-1.87,2.02l-1.87-2.02-3.05,2.12,.1,.17,.81-.54,1.11,1.21v6.63l-1.33,1.01,.12,.12,.67-.46,2.49,2.12,3.15-2.09-.1-.15-.81,.49-1.28-1.16v-7.28c.52,.57,1.11,1.06,1.82,1.06,1.28,0,2.14-1.53,2.29-3.11m11.88,9.81l-.94,.59-5.2-7.76,.27-.37c.57,.34,1.08,.81,2.17,.81s2.47-1.14,2.59-3.23c-.27,.37-.81,.81-1.7,.81-.64,0-1.28-.42-1.67-.81l-3.55,5.22,4.71,7.17,3.42-2.27-.1-.17h0Zm-6.31,.19l-.79,.52-1.08-1.08V.48l-3.89,2.69c.45,.15,.99,.39,.99,1.43v11.81l-1.33,1.01,.12,.12,.67-.46,2.32,2.12,3.11-2.07-.1-.15h0Zm22.89-14.39c0-2.02-1.92-2.63-3.53-2.56V.19c.96,.07,1.7,.46,1.7,1.11,0,.45-.32,1.01-1.28,1.01-.76,0-2.02-.45-3.2-.84-1.3-.45-2.54-.87-3.57-.87-2.02,0-3.55,1.5-3.55,3.35,0,1.5,1.16,2.02,1.63,2.21l.03-.07c-.3-.2-.49-.42-.49-1.06,0-.54,.39-1.26,1.43-1.26,.94,0,2.17,.42,3.8,.88,1.4,.39,2.91,.76,3.75,.87v3.28l-1.58,1.3,1.58,1.36v4.49c-.81,.46-1.75,.61-2.56,.61-1.5,0-2.89-.42-4.02-1.68l4.26-2.07V5.73l-5.2,2.32c.54-1.38,1.55-2.41,2.66-3.08l-.03-.08c-3.08,.84-5.89,3.67-5.89,7.17,0,4.19,3.35,7.3,7.22,7.3,4.19,0,6.65-3.28,6.61-6.75h-.07c-.61,1.33-1.63,2.59-2.78,3.25v-4.38l1.65-1.33-1.65-1.33v-3.28c1.53,0,3.11-1.01,3.11-2.96m-8.78,11.56l-1.21,.61c-.74-.96-1.23-2.32-1.23-4.07,0-.72,.07-1.7,.32-2.39l2.14-.96-.03,6.8h0Zm11.93-12.31l-2.17,1.82,1.85,2.09,2.17-1.82-1.85-2.09Zm3.3,15.15l-.79,.52-1.08-1.08v-7.17l.91-.72-.12-.15-.76,.59-1.8-2.14-2.96,2.07,.1,.17,.74-.49,.99,1.23v6.61l-1.33,1.01,.12,.12,.67-.46,2.32,2.12,3.11-2.07-.1-.15h0Zm16.63-.1l-.74,.49-1.16-1.11v-7.03l.94-.72-.12-.15-.84,.64-2.47-2.2-2.78,2.17-2.44-2.17-2.74,2.14-1.85-2.14-2.96,2.07,.1,.17,.74-.49,1.06,1.21v6.61l-.81,.81,2.36,2,2.29-2.07-.94-.88v-7.04l.61-.45,1.7,1.48v6.16l-.79,.81,2.39,2,2.24-2.07-.94-.88v-7.04l.59-.47,1.72,1.5v6.06l-.69,.72,2.41,2.2,3.18-2.17-.1-.15h.02Zm8.6-1.5l-2.36,1.87-2.71-2.14v-1.33l4.68-3.3-2.36-3.67-5.2,2.86v6.93l3.57,2.59,4.51-3.62-.12-.17h0Zm-5.08-1.88v-5.15l2.27,3.55-2.27,1.6Zm14.12-.97l-2-1.53c1.33-1.16,1.8-2.63,1.8-3.69,0-.15-.03-.42-.05-.67h-.08c-.19,.54-.72,1.01-1.53,1.01s-1.26-.45-1.75-.99l-4.58,2.54v3.72l1.75,1.38c-1.75,1.55-2.09,2.51-2.09,3.4s.52,1.67,1.41,2.02l.07-.12c-.22-.19-.42-.32-.42-.79,0-.34,.35-.88,1.14-.88,1.01,0,1.63,.69,1.95,1.06,0-.03,4.38-2.69,4.38-2.69v-3.77h0Zm-1.03-3.05c-.69,1.23-2.21,2.44-3.11,3.13l-1.11-.94v-3.62c.45,.99,1.36,1.82,2.54,1.82,.69,0,1.14-.12,1.67-.39m-1.9,8.13c-.52-1.16-1.63-2-2.86-2-.3,0-1.21-.03-2,.46,.47-.79,1.87-2.21,3.65-3.28l1.21,1.01v3.8Z"></path></svg>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] bg-gray-100 mb-4"></div>

                    {/* Home Section */}
                    <div className="mb-1">
                        <button
                            onClick={() => {
                                setCurrentCategory('homepage');
                                setExpandedSections((prev) =>
                                    Object.keys(prev).reduce(
                                        (acc, key) => ({
                                            ...acc,
                                            [key]: false,
                                        }),
                                        {},
                                    ),
                                );
                                setIsOpen(false);
                            }}
                            className={`flex items-center w-full p-3 hover:bg-gray-50 rounded-md font-bold text-gray-900 uppercase text-[13px] transition-colors ${
                                currentCategory === 'homepage'
                                    ? 'bg-gray-100 text-black'
                                    : 'text-gray-600'
                            }`}
                        >
                            HOME
                        </button>
                    </div>

                    {/* Most Viewed Section */}
                    <div className="mb-1">
                        <button
                            onClick={() => {
                                setCurrentCategory('mostviewed');
                                setExpandedSections((prev) =>
                                    Object.keys(prev).reduce(
                                        (acc, key) => ({
                                            ...acc,
                                            [key]: false,
                                        }),
                                        {},
                                    ),
                                );
                                setIsOpen(false);
                            }}
                            className={`flex items-center w-full p-3 hover:bg-gray-50 font-bold text-gray-900 uppercase rounded-md text-[13px] transition-colors ${
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

                    {/* Scrollable Content */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto">
                        {/* Categories */}
                        <div className="space-y-4">
                            {Object.entries(CATEGORIES).map(([section, categories]) => (
                                <div 
                                    key={section} 
                                    className="border-b border-gray-100 pb-2"
                                    ref={(el) => {
                                        categoryRefs.current[section] = el;
                                    }}
                                >
                                    <button
                                        onClick={() => toggleSection(section, scrollRef.current)}
                                        className="w-full px-3 py-2 flex items-center justify-between text-[13px] font-bold text-gray-900 uppercase tracking-wider hover:bg-gray-50 transition-colors"
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
                        {/* Mobile Footer Toggle Button */}
                        <div className="lg:hidden">
                            {/* Always visible subscribe button */}
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

                            {/* Centered text link style toggle */}
                            <button
                                onClick={() => setIsFooterOpen(!isFooterOpen)}
                                className="w-full text-center text-[11px] text-gray-500 hover:text-gray-800 py-2 transition-colors flex items-center justify-center gap-1"
                            >
                                MORE
                                <svg
                                    className="w-3 h-3"
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

                            {/* Expandable footer content */}
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
                                    {/* Close button */}
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

                        {/* Desktop footer */}
                        <div className="hidden lg:block">
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
                                {/* Desktop footer links - same as mobile */}
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
            </nav>
        </>
    );
}
