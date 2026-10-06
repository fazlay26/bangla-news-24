import Link from 'next/link';
import React from 'react';

interface NavItem {
     slug: string;
    title: string;
    topicId: number | null;
    url: string;
    scrapable: boolean;
}

const NavLinks = async() => {
    const res = await fetch('https://news-api-v2.vercel.app/api/categories');
    const data = await res.json();
    const navData = data.data;
    const filterNavData = navData.filter((n:NavItem)=>{
        return n.scrapable === true
    })
    
    return (
        
        <div className='flex justify-center w-full bg-white'>
            <div className='max-w-7xl mx-auto px-4'>
                
                <div className='flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 py-4'>
                    {filterNavData.map((nav:NavItem,index:number)=>{
                        return (
                            <Link 
                                href={nav.slug} 
                                key={index}
                                
                                className='text-[15px] font-medium text-gray-700 hover:text-red-700 transition-all duration-200 relative group py-1'
                            >
                                {nav.title}
                               
                                <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-red-700 transition-all duration-300 group-hover:w-full'></span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default NavLinks;