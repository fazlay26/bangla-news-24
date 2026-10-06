import React from 'react';
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface MarqueeItem {
    title: string;
}

const Marquee = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/news?limit=10');
    const data = await res.json();
    const marqueeData = data.data;
    console.log(marqueeData);

    return (
        // মেইন কন্টেইনার: লাল ব্যাকগ্রাউন্ড এবং সাদা টেক্সট
        <div className='w-full bg-[#cc0000] text-white py-0.5'>
            <div className='max-w-7xl mx-auto px-4 flex items-center overflow-hidden'>
                
                {/* স্থির টেক্সট: "সর্বশেষ:" - বোল্ড এবং সাদা */}
                <span className=' bg-[#9E0712] font-bold p-1 text-[15px] '>
                    সর্বশেষ:
                </span>

                {/* স্ক্রলিং টেক্সট (Marquee) */}
                <div className='flex-1 overflow-hidden'>
                    <MarqueeText direction='right' duration={15}>
                        {
                            marqueeData.map((data: MarqueeItem, index: number) => {
                                return (
                                    <span key={index} className='inline-flex items-center'>
                                        <span className='text-[14px]'>{data.title}</span>
                                        {/* আইটেমগুলোর মাঝে গোল ডট (•) */}
                                        <span className='mx-5 text-white/80'>•</span>
                                    </span>
                                );
                            })
                        }
                    </MarqueeText>
                </div>

            </div>
        </div>
    );
};

export default Marquee;