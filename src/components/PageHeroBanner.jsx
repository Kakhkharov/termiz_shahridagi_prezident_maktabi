import React from 'react';
import { Link } from 'react-router-dom';

export default function PageHeroBanner({ category = "Bo'lim", title = "Sahifa", breadcrumbTitle }) {
    const bTitle = breadcrumbTitle || title;
    return (
        <div className="relative w-full overflow-hidden bg-[#163065] py-3.5 md:py-4">
            {/* Background Image on Right */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
                style={{ backgroundImage: "url('/images/maktab.jpg')" }}
            ></div>

            {/* Dark Blue Overlay Gradient fading from Left to Right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#142d5e] via-[#142d5e]/95 to-transparent"></div>

            {/* Header Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 flex flex-col justify-center text-white space-y-1">
                {/* Breadcrumb Navigation Map */}
                <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[11px] md:text-xs text-slate-300 font-medium">
                    <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">home</span>
                        <span>Bosh sahifa</span>
                    </Link>
                    <span className="text-slate-400">&gt;</span>
                    <span className="text-slate-300 font-medium">{category}</span>
                    <span className="text-slate-400">&gt;</span>
                    <span className="text-white font-bold">{bTitle}</span>
                </nav>

                {/* Title - exactly 18px font size as requested */}
                <h1 className="text-[18px] md:text-[18px] font-bold tracking-tight text-white leading-tight">
                    {title}
                </h1>
            </div>
        </div>
    );
}
