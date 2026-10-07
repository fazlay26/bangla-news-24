'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavItem = ({ nav }) => {
    const pathname = usePathname();
    
    // চেক করা হচ্ছে ইউজার বর্তমানে এই লিংকে আছে কি না
    const isActive = pathname === `/category/${nav.slug}`;

    return (
        <Link 
            href={`/category/${nav.slug}`} 
            className={`text-[15px] font-medium transition-all duration-200 relative group py-1
                ${isActive 
                    ? 'text-red-700 font-bold'   // Active হলে লাল এবং বোল্ড
                    : 'text-gray-700 hover:text-red-700' // নাহলে গ্রে, হোভার করলে লাল
                }
            `}
        >
            {nav.title}
            
            {/* হোভার করলে অথবা Active থাকলে নিচে লাল দাগ দেখাবে */}
            <span 
                className={`absolute left-0 bottom-0 h-[2px] bg-red-700 transition-all duration-300
                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                `}
            ></span>
        </Link>
    );
};

export default NavItem;