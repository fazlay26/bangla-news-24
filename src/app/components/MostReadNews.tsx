import { Article } from '@/types';
import React from 'react';

const MostReadNews = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read');
    const data = await res.json();
    const mostReads = data.data;
    
    return (
        <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4 h-full shadow-sm">
                {/* সেকশন হেডলাইন */}
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-3">
                    সর্বাধিক পঠিত
                </h3>

                {/* নিউজ লিস্ট */}
                <ul className="flex flex-col gap-4">
                    {mostReads.map((mr:Article, index:number) => {
                        console.log(mr)
                        return (
                            <li 
                                key={mr.id} 
                                className="flex gap-3 items-start group cursor-pointer"
                            >
                                {/* ১. নম্বর (Index + 1) */}
                                <span className="text-red-700 font-bold text-xl w-6 flex-shrink-0 text-center">
                                    {index + 1}
                                </span>

                                {/* ২. খবরের শিরোনাম */}
                                <h4 className="text-[15px] font-medium text-gray-800 leading-snug group-hover:text-red-700 transition-colors duration-200">
                                    {mr.title}
                                </h4>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default MostReadNews;