import Image from 'next/image';
import React from 'react';

const Header = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('bn-BD', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return (
      
        <header className="w-full bg-white shadow-sm font-sans">
            
            
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-4 gap-4">
                
               
                <div className="flex items-center gap-3">
                    
     <Image src={'/logo.webp'} alt='logo' width={50} height={50}></Image>
                   
                    <div>
                       <h1 className="text-3xl font-bold text-red-700 tracking-tight">
                            Bangla News 24
                        </h1>
                        <p className="text-[11px] text-gray-600">
                            {formattedDate}
                        </p>
                    </div>
                </div>

                
                <div className="flex items-center gap-3">
                    <button className="btn btn-sm btn-ghost text-gray-700 font-normal">
                        সাইন ইন
                    </button>
                    <button className="btn btn-sm bg-red-700 hover:bg-red-800 text-white border-none font-normal px-6">
                        সাইন আপ
                    </button>
                </div>
            </div>

        </header>
    );
};

export default Header;