import Image from 'next/image';
import React from 'react';

// ১. ডেটার টাইপ ডিফাইন করা
interface BodyBlock {
    type: 'text' | 'image' | 'subheading';
    text?: string;
    url?: string;
    caption?: string;
    altText?: string;
    copyrightHolder?: string;
    width?: number;
    height?: number;
}

interface NewsData {
    id: string;
    title: string;
    description: string;
    link: string;
    firstPublished: string | null;
    lastPublished: string | null;
    byline: { name: string; role: string }[];
    topics: { id: string; name: string }[];
    imageUrl: string;
    body: BodyBlock[];
    source: string;
}

interface NewsPageProps {
    params: Promise<{ newsId: string }>;
}

const NewsPage = async ({ params }: NewsPageProps) => {
    const { newsId } = await params;
    const res = await fetch(`https://news-api-v2.vercel.app/api/article/${newsId}`);
    const data = await res.json();
    const newsData: NewsData = data.data;

    // ডেট ফরম্যাট করা
    const formattedDate = newsData?.firstPublished
        ? new Date(newsData?.firstPublished).toLocaleDateString('bn-BD', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
          })
        : '';

    return (
        <div className="bg-white min-h-screen">
            <article className="max-w-4xl mx-auto px-4 py-8">
                
                {/* ১. হেডলাইন সেকশন */}
                <header className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                        {newsData?.title}
                    </h1>

                    {/* বাইলাইন এবং ডেট */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 border-b border-gray-200 pb-4 mb-6">
                        {newsData?.byline?.map((author, index) => (
                            <span key={index} className="font-medium text-gray-800">
                                {author.name}
                                <span className="text-gray-500 font-normal">, {author.role}</span>
                            </span>
                        ))}
                        <span className="text-gray-400">|</span>
                        <span>{formattedDate}</span>
                    </div>
                </header>

              

                {/* ৩. বডি কন্টেন্ট (Text, Image, Subheading রেন্ডার করা) */}
                <div className="prose prose-lg max-w-none">
                    {newsData?.body?.map((block, index) => {
                        // টেক্সট ব্লক
                        if (block.type === 'text') {
                            return (
                                <p 
                                    key={index} 
                                    className="text-[17px] text-gray-800 leading-relaxed mb-5 whitespace-pre-line"
                                >
                                    {block.text}
                                </p>
                            );
                        }

                        // সাব-হেডিং ব্লক
                        if (block.type === 'subheading') {
                            return (
                                <h2 
                                    key={index} 
                                    className="text-2xl font-bold text-gray-900 mt-8 mb-4"
                                >
                                    {block.text}
                                </h2>
                            );
                        }

                        // ইমেজ ব্লক
                        if (block.type === 'image' && block.url) {
                            return (
                                <figure key={index} className="my-8">
                                    <div className="relative w-full h-[300px] md:h-[450px] rounded-lg overflow-hidden bg-gray-100">
                                        <Image
                                            src={block.url}
                                            alt={block.altText || 'News Image'}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {block.caption && (
                                        <figcaption className="mt-2 text-sm text-gray-600 border-l-4 border-red-600 pl-3">
                                            {block.caption}
                                            {block.copyrightHolder && (
                                                <span className="block text-xs text-gray-400 mt-1">
                                                    ছবি: {block.copyrightHolder}
                                                </span>
                                            )}
                                        </figcaption>
                                    )}
                                </figure>
                            );
                        }

                        return null;
                    })}
                </div>

            </article>
        </div>
    );
};

export default NewsPage;