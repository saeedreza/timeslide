import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { DEFAULT_IMAGE, RSS_FEEDS } from "../../constants";

// Types and interfaces
interface CustomItem extends Parser.Item {
    creator?: string;
    'dc:creator'?: string;
    'media:content'?: { $: { url: string } };
}

interface Story {
    title: string;
    description: string | null;
    pubDate: string | null;
    link: string | null;
    creator: string | null;
    image: string;
    category: string;
}

type CategoryKeys = keyof typeof RSS_FEEDS;

class RSSFeedError extends Error {
    constructor(message: string, public statusCode: number = 500) {
        super(message);
        this.name = 'RSSFeedError';
    }
}

// Validation
function validateCategory(category: string): asserts category is CategoryKeys {
    if (!(category in RSS_FEEDS)) {
        throw new RSSFeedError(`Invalid category: ${category}`, 400);
    }
}

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const category = searchParams.get('category')?.toLowerCase() || 'homepage';
        
        validateCategory(category);
        
        const feedUrl = RSS_FEEDS[category];
        
        const parser = new Parser({
            customFields: {
                item: ['dc:creator', 'media:content']
            },
        });

        const feed = await parser.parseURL(feedUrl);
        const items = Array.isArray(feed.items) ? feed.items : [];

        const stories: Story[] = items.map((item: CustomItem) => ({
            title: item.title || 'Untitled',
            description: item.contentSnippet || null,
            pubDate: item.pubDate || null,
            link: item.link || null,
            creator: item['dc:creator'] || item.creator || null,
            image: item['media:content']?.['$']?.url || DEFAULT_IMAGE,
            category,
        }));

        return NextResponse.json(stories, {
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
            },
        });
    } catch (error) {
        if (error instanceof RSSFeedError) {
            return NextResponse.json(
                { error: error.message }, 
                { status: error.statusCode }
            );
        }
        console.error('Error fetching RSS feed:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stories' }, 
            { status: 500 }
        );
    }
}
