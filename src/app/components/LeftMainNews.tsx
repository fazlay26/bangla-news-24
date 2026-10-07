import { CurationData } from '@/types';
import Image from 'next/image';
import React from 'react';

interface LeftMainNewsProps {
    prodhanKhobor: CurationData; // পুরো অবজেক্টটি পাস করবেন
}

const LeftMainNews = ({prodhanKhobor}:LeftMainNewsProps) => {
    return (
        <div className="md:col-span-7 bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
    {/* ১. ইমেজ সেকশন */}
    <div className="relative w-full h-[220px]">
    
        <Image
            src={prodhanKhobor.articles[0].imageUrl} // আপনার API এর ইমেজ ফিল্ডের নাম দিবেন
            alt={prodhanKhobor.articles[0].imageAlt}
            fill
            className="object-cover"
        />
    </div>

    {/* ২. টেক্সট সেকশন */}
    <div className="p-5 flex flex-col flex-1">
        {/* ক্যাটাগরি ট্যাগ */}
        <div className="mb-2">
            <span className="text-red-700 text-sm font-bold">
                প্রধান খবর
            </span>
        </div>

        {/* হেডলাইন */}
        <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
            {prodhanKhobor.articles[0].title}
        </h2>

        {/* ডেসক্রিপশন */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {prodhanKhobor.articles[0].description || "এখানে খবরের বিস্তারিত বিবরণ থাকবে। API থেকে ডেটা আসার পর এটি স্বয়ংক্রিয়ভাবে পরিবর্তিত হবে।"}
        </p>
    </div>
</div>
    );
};

export default LeftMainNews;