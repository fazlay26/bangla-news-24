import React from 'react';
import Marquee from "./components/Marquee"; // আপনার পাথ অনুযায়ী ইমপোর্ট করুন
import LeftMainNews from './components/LeftMainNews';
import Image from 'next/image';
import { Article, CurationData } from '@/types';

export default async function Home() {
  const res = await fetch('https://news-api-v2.vercel.app/api/news/sections');
  const data = await res.json();
  const mainNews = data.data
  const prodhanKhobor = mainNews[0];
  const otherNews = mainNews.slice(1)

    //console.log(otherNews);
  return (
    <div className="min-h-screen bg-white">
      
      {/* ১. টপ সেকশন: Marquee (আপনার আগের কোড) */}
      <Marquee />

      {/* ২. মেইন কন্টেইনার (Max Width এবং Center) */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        
        {/* গ্রিড লেআউট: মোবাইলে ১ কলাম, ডেস্কটপে (lg) ৩ কলাম 
            এখানে 12-কলামের গ্রিড ব্যবহার করা হয়েছে:
            বাম অংশ = ৯ কলাম (বড়)
            ডান অংশ = ৩ কলাম (ছোট)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ==========================================
              বাম দিকের অংশ (Main Content - 9 Columns)
          ========================================== */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            
            {/* উপরের সেকশন: একটি বড় ইমেজ/নিউজ এবং পাশে ছোট ছোট ৪টি নিউজ */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* বড় নিউজ কার্ড (বাম দিকের বড় অংশ) */}
             <LeftMainNews prodhanKhobor={prodhanKhobor}></LeftMainNews>

              {/* ছোট ৪টি নিউজ কার্ড (ডান দিকের অংশ) */}
             <div className="md:col-span-5 flex flex-col gap-3">
    {prodhanKhobor.articles.slice(1, 5).map((fourNews:Article) => {
      
        return (
            <div 
                key={fourNews.id} 
                className="bg-white border border-gray-200 rounded-lg p-3 flex-1 flex flex-col justify-center hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
                {/* ক্যাটাগরি ট্যাগ */}
                <span className="text-red-700 text-[11px] font-bold mb-1">
                    {fourNews.category || "প্রধান খবর"}
                </span>

                {/* হেডলাইন */}
                <h4 className="text-[15px] font-bold text-gray-800 leading-snug line-clamp-3">
                    {fourNews.title}
                </h4>·
            </div>
        );
    })}
</div>
            </div>

            {/* নিচের সেকশন: "নির্বাচিত খবর" (Selected News) */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
    {otherNews.map((on:CurationData) => {
      console.log(on)
        return (
            <React.Fragment key={on.curationId}>
                {/* সেকশন হেডলাইন */}
                <h3 className="text-xl font-bold text-gray-800 mb-5 border-b-2 border-red-600 pb-2 inline-block">
                    {on.title}
                </h3>
                
                {/* নিউজ কার্ডের গ্রিড */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                    {on.articles.map((ona) => {
                        // ডেট ফরম্যাট করা
                        const formattedDate = ona.firstPublished 
                            ? new Date(ona.firstPublished).toLocaleDateString('bn-BD', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })
                            : '';

                        return (
                            <div 
                                key={ona.id} 
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200 cursor-pointer"
                            >
                                {/* ১. ইমেজ */}
                                <div className="relative w-full h-48 bg-gray-100">
                                    <Image
                                        src={ona.imageUrl}
                                        alt={ona.imageAlt || ona.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* ২. টেক্সট */}
                                <div className="p-4 flex flex-col flex-1">
                                    <span className="text-red-700 text-xs font-bold mb-2">
                                        {ona.category}
                                    </span>
                                    <h4 className="text-[16px] font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
                                        {ona.title}
                                    </h4>
                                    <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-1">
                                        {ona.description}
                                    </p>
                                    <div className="mt-auto">
                                        <span className="text-[11px] text-gray-400">
                                            {formattedDate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </React.Fragment>
        );
    })}
</div>

          </div>

          {/* ==========================================
              ডান দিকের অংশ (Sidebar - 3 Columns)
          ========================================== */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-full">
              <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
                সর্বাধিক পঠিত
              </h3>
              {/* এখানে আপনার সাইডবারের লিস্ট বা টপ নিউজ কম্পোনেন্ট বসবে */}
              <ul className="flex flex-col gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="text-red-700 font-bold text-lg">{item}</span>
                    <div className="h-4 bg-gray-200 rounded w-full mt-1"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}