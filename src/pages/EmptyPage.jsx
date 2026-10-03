import React from 'react';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import PageHeroBanner from '../components/PageHeroBanner';

export default function EmptyPage({ 
    category = "Bo'lim", 
    title = "Sahifa topilmadi",
    lottieSrc = "https://lottie.host/3d4acf03-1a27-434e-9b26-73c9b77fc9ff/imPRksRWbw.json"
}) {
    return (
        <div className="w-full bg-[#f8fafc] text-slate-800 min-h-screen pt-[112px] lg:pt-[132px] pb-16">
            <PageHeroBanner category={category} title={title} />

            <main className="py-6 md:py-10 max-w-5xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-400/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Content Wrapper (Container removed as requested) */}
                <div className="relative z-10 w-full flex flex-col items-center">
                    
                    {/* Enlarged DotLottie Animation */}
                    <div className="w-full max-w-[520px] md:max-w-[640px] mx-auto -my-4 md:-my-6">
                        <DotLottieReact
                            src={lottieSrc}
                            loop
                            autoplay
                        />
                    </div>
                    
                    {/* Requested Heading */}
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a1b3f] mb-3 tracking-tight">
                        Mushuk ham ushbu sahifani topa olmadi!
                    </h2>

                    {/* Sub-description */}
                    <p className="text-slate-600 text-sm md:text-base max-w-[520px] leading-relaxed font-medium mb-8">
                        Ushbu bo'lim ma'lumotlari va sahifa tarkibi hozirda tayyorlanmoqda. Tez orada rasmiy veb-portalda e'lon qilinadi.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <Link 
                            to="/" 
                            className="px-6 py-3 bg-[#0a1b3f] hover:bg-[#0088cc] text-white text-xs md:text-sm font-bold rounded-xl shadow-md transition-all duration-300 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[18px]">home</span>
                            <span>Bosh sahifaga qaytish</span>
                        </Link>

                        <Link 
                            to="/aloqa" 
                            className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 text-xs md:text-sm font-bold rounded-xl border border-slate-200 shadow-sm transition-all duration-300 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[18px]">mail</span>
                            <span>Bog'lanish</span>
                        </Link>
                    </div>

                </div>

            </main>
        </div>
    );
}
