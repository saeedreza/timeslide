import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { DEFAULT_IMAGE, RSS_FEEDS } from "../../constants";

// Extend the Parser.Item type to include our custom fields
interface CustomItem extends Parser.Item {
    creator?: string;
    'dc:creator'?: string;
    'media:content'?: { $: { url: string } };
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category')?.toLowerCase() || 'homepage';

        const feedUrl = RSS_FEEDS[category as keyof typeof RSS_FEEDS];
        if (!feedUrl) {
            return NextResponse.json(
                { error: 'Invalid category' },
                { status: 400 }
            );
        }

        const parser = new Parser({
            customFields: {
                item: ['dc:creator', 'media:content']
            },
        });

        const feed = await parser.parseURL(feedUrl);

        // Ensure feed.items is an array
        const items = Array.isArray(feed.items) ? feed.items : [];

        const stories = items.map((item: CustomItem) => ({
            title: item.title,
            description: item.contentSnippet,
            pubDate: item.pubDate,
            link: item.link,
            creator: item['dc:creator'] || item.creator,
            image: item['media:content']?.['$']?.url || DEFAULT_IMAGE,
            category,
        }));

        return NextResponse.json(stories);
    } catch (error) {
        const err = error as Error; // Type assertion
        console.error('Error fetching RSS feed:', err.message);
        return NextResponse.json({ error: 'Failed to fetch stories', details: err.message }, { status: 500 });
    }
}
