import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { newsData, formatNewsDate } from '../data/newsData';
import { getAssetPath } from '../utils/assets';

const SquareAdWidget = ({ onClick }) => {
    const adImagePath = getAssetPath('/images/piima_uzbekistan_cover.jfif');

    return (
        <a 
            href="https://ariza.piima.uz/" 
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className="block aspect-square w-full rounded-2xl overflow-hidden shadow-md border border-slate-200 relative bg-white group cursor-pointer"
        >
            {/* Main Advertisement Image (Agentlik Logo) */}
            <img 
                src={adImagePath} 
                alt="Agentlik Reklamasi" 
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />

            {/* Reklama Badge (Top Left) */}
            <span className="absolute top-3 left-3 z-10 bg-slate-900/80 backdrop-blur-md text-[10px] font-extrabold text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-500/30 shadow-sm uppercase tracking-wider">
                Reklama
            </span>

            {/* Bottom CTA Bar (Ariza topshirish) */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-3 flex items-center justify-between text-white z-10 border-t border-white/5">
                <span className="text-[11px] font-extrabold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    Ariza topshirish
                </span>
                <span className="material-symbols-outlined text-sm text-cyan-400 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                </span>
            </div>
        </a>
    );
};

// Mobile 6-Second Countdown Ad Popup Overlay
export const MobileAdPopup = () => {
    const location = useLocation();
    const [secondsLeft, setSecondsLeft] = useState(6);
    const [isVisible, setIsVisible] = useState(false);

    // Reset timer and show popup only once per session, and ONLY on News/Article pages
    useEffect(() => {
        const isNewsSection = location.pathname.startsWith('/news') || location.pathname.startsWith('/article');
        const hasShownAd = sessionStorage.getItem('mobileAdShown');
        
        if (isNewsSection && !hasShownAd) {
            setIsVisible(true);
            setSecondsLeft(6);
            sessionStorage.setItem('mobileAdShown', 'true');
        }
    }, [location.pathname]);

    useEffect(() => {
        if (!isVisible) return;

        const timer = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsVisible(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="lg:hidden fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[200] flex items-center justify-center p-4 animate-fade-in">
            <div className="w-full max-w-[340px] bg-slate-900 rounded-2xl p-4 shadow-2xl border border-white/10 flex flex-col gap-3 relative">
                
                {/* Countdown Header */}
                <div className="flex items-center justify-between text-white border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2">
                        <span className="bg-cyan-500/20 text-cyan-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-cyan-500/30 uppercase tracking-wider">
                            Reklama
                        </span>
                        <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                            Yopilishiga: <strong className="text-cyan-400 text-xs font-mono">{secondsLeft} s</strong>
                        </span>
                    </div>

                    <button 
                        onClick={() => setIsVisible(false)}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer text-xs font-bold border border-white/10"
                        title="Yopish"
                    >
                        ✕
                    </button>
                </div>

                {/* Ad Content */}
                <SquareAdWidget onClick={() => setIsVisible(false)} />

            </div>
        </div>
    );
};

export default function Sidebar() {
    return (
        <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
            {/* Kvadrat shaklidagi Rasmli / Videoli Reklama bloki */}
            <SquareAdWidget />

            {/* So'nggi yangiliklar Widget (7 talik) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                <div className="flex items-center justify-between mb-4 border-l-4 border-[#0088cc] pl-3">
                    <h2 className="text-[16px] font-bold text-slate-900 leading-tight">So'nggi yangiliklar</h2>
                    <Link to="/news" className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-[#0088cc] hover:bg-[#0088cc] hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                    </Link>
                </div>

                <div className="divide-y divide-slate-100">
                    {newsData.slice(0, 7).map((news, idx) => (
                        <Link 
                            key={news.id} 
                            to={`/article/${news.id}`} 
                            className={`group block ${idx === 0 ? 'pb-3' : 'py-3'}`}
                        >
                            <p className="text-[13px] font-bold text-slate-800 group-hover:text-[#0088cc] leading-snug mb-1 transition-colors line-clamp-2">
                                {news.title}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                                <span className="material-symbols-outlined text-[13px] text-[#0088cc]">calendar_today</span> 
                                {formatNewsDate(news)}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mashhur teglar Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                <h2 className="text-[17px] font-bold text-slate-900 mb-4">Mashhur teglar</h2>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-md border border-slate-100 text-[#0088cc] text-[12px] font-medium hover:bg-slate-50 cursor-pointer">Dunyo</span>
                    <span className="px-3 py-1.5 rounded-md border border-slate-100 text-[#0088cc] text-[12px] font-medium hover:bg-slate-50 cursor-pointer">O'zbekiston</span>
                    <span className="px-3 py-1.5 rounded-md border border-slate-100 text-[#0088cc] text-[12px] font-medium hover:bg-slate-50 cursor-pointer">Texnologiya</span>
                    <span className="px-3 py-1.5 rounded-md border border-slate-100 text-[#0088cc] text-[12px] font-medium hover:bg-slate-50 cursor-pointer">Sport</span>
                    <span className="px-3 py-1.5 rounded-md border border-slate-100 text-[#0088cc] text-[12px] font-medium hover:bg-slate-50 cursor-pointer">Ma'naviyat</span>
                    <span className="px-3 py-1.5 rounded-md border border-slate-100 text-[#0088cc] text-[12px] font-medium hover:bg-slate-50 cursor-pointer">Ilm-fan</span>
                    <span className="px-3 py-1.5 rounded-md border border-slate-100 text-[#0088cc] text-[12px] font-medium hover:bg-slate-50 cursor-pointer">Olimpiada</span>
                    <span className="px-3 py-1.5 rounded-md border border-slate-100 text-[#0088cc] text-[12px] font-medium hover:bg-slate-50 cursor-pointer">Pedagoglar</span>
                    <span className="px-3 py-1.5 rounded-md border border-slate-100 text-[#0088cc] text-[12px] font-medium hover:bg-slate-50 cursor-pointer">E'lonlar</span>
                </div>
            </div>

            {/* Tavsiyalar Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                <h2 className="text-[17px] font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0088cc] text-xl">recommend</span>
                    Tavsiyalar
                </h2>
                <div className="space-y-3">
                    <a href="https://grantlar.uz/tom-howard-margaret-reid-poetry-contest-tanlovi/" target="_blank" rel="noopener noreferrer" className="block bg-[#f4f6fa] rounded-xl p-4 group hover:bg-[#eaf0f7] transition-colors">
                        <span className="inline-block px-2.5 py-0.5 bg-white text-[#0088cc] text-[10px] font-bold rounded-full mb-2">Grantlar.uz</span>
                        <h3 className="text-[13px] font-bold text-slate-800 leading-snug mb-2 group-hover:text-[#0088cc]">
                            Tom Howard Poetry Contest: mukofot – 3500 AQSh dollarigacha!
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                            <span className="material-symbols-outlined text-[13px]">schedule</span> 25 Aprel, 14:15
                        </div>
                    </a>

                    <a href="https://grantlar.uz/esd-okayama-award-tashkilotlar-uchun-talim-boyicha-mahalliy-loyihalar-tanlovi/" target="_blank" rel="noopener noreferrer" className="block bg-[#f4f6fa] rounded-xl p-4 group hover:bg-[#eaf0f7] transition-colors">
                        <span className="inline-block px-2.5 py-0.5 bg-white text-[#0088cc] text-[10px] font-bold rounded-full mb-2">Imkoniyat</span>
                        <h3 className="text-[13px] font-bold text-slate-800 leading-snug mb-2 group-hover:text-[#0088cc]">
                            ESD Okayama Award: Taʼlim boʻyicha mahalliy loyihalar tanlovi
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                            <span className="material-symbols-outlined text-[13px]">schedule</span> 25 Aprel, 12:40
                        </div>
                    </a>
                </div>
            </div>

        </aside>
    );
}
