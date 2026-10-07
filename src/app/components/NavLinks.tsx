
import Link from 'next/link';

import React from 'react';
import NavItem from './NavItem';

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
                     <Link href={'/'}>হোম</Link>
                    {filterNavData.map((nav:NavItem,index:number)=>{
                        return (
                            
                           
                            <NavItem key={index} nav={nav}></NavItem>
                           
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default NavLinks;