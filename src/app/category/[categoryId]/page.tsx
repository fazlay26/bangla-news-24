import { Article } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CategoryPageProps {
    params: Promise<{ categoryId: string }>;
}

const CategoryPage = async ({ params }:CategoryPageProps) => {
    const { categoryId } = await params;
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`);
    const data = await res.json();
    const categoryData = data.data;

    // পেজের টাইটেল তৈরি করা (categoryId থেকে)
    const pageTitle = categoryId 
        ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) 
        : "ক্যাটাগরি";

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            
            {/* ১. পেজ হেডলাইন (যেমন: রাজনীতি) */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    {categoryData[0]?.category || pageTitle}
                </h1>
                {/* হেডলাইনের নিচে লাল দাগ */}
                <div className="w-full h-[3px] bg-red-600 rounded"></div>
            </div>

            {/* ২. নিউজ কার্ডের গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData.map((cd:Article) => {
                    // ডেট ফরম্যাট করা
                    const formattedDate = cd.firstPublished
                        ? new Date(cd.firstPublished).toLocaleDateString('bn-BD', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })
                        : '';

                    return (
                     <Link key={cd.id} href={`/news/${cd.id}`}>
                          <div 
                             
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        >
                            {/* ইমেজ */}
                            <div className="relative w-full h-56 bg-gray-100">
                                <Image
                                    src={cd.imageUrl}
                                    alt={cd.imageAlt || cd.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            {/* টেক্সট সেকশন */}
                            <div className="p-4 flex flex-col flex-1">
                                
                                {/* ক্যাটাগরি ট্যাগ */}
                                <span className="text-red-700 text-xs font-bold mb-2">
                                    {cd.category}
                                </span>

                                {/* হেডলাইন */}
                                <h3 className="text-[17px] font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
                                    {cd.title}
                                </h3>

                                {/* ডেসক্রিপশন */}
                                <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-1">
                                    {cd.description}
                                </p>

                                {/* ডেট (তারিখ) */}
                                <div className="mt-auto">
                                    <span className="text-[11px] text-gray-400">
                                        {formattedDate}
                                    </span>
                                </div>
                            </div>
                        </div>

                     </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryPage;