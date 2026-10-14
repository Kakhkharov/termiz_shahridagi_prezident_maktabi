import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { newsData, formatNewsDate } from '../data/newsData';
import { getAssetPath } from '../utils/assets';

export default function News() {
    const heroData = newsData.slice(0, 5);
    const [activeTag, setActiveTag] = useState('Hammasi');
    const tags = ['Hammasi', 'Ma\'naviyat', 'E\'lonlar', 'Tashrif', 'Sport', 'Ilm-fan', 'Olimpiada', 'Pedagoglar', 'Texnologiya'];

    const [heroIdx, setHeroIdx] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setHeroIdx((prev) => (prev + 1) % heroData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroData.length]);

    const filteredSectionNews = activeTag === 'Hammasi'
        ? newsData.slice(0, 5)
        : newsData.filter(item => item.category === activeTag).slice(0, 5);

    return (
        <main className="pt-[140px] md:pt-[160px] pb-12 max-w-[1300px] mx-auto px-3 md:px-6">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                {/* Left side */}
                <div className="flex-1 space-y-8 md:space-y-12">

                    {/* Top Hero Section */}
                    <section className="space-y-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row h-auto md:h-[390px] lg:h-[400px]">
                            <div className="w-full md:w-[50%] lg:w-[52%] h-56 sm:h-64 md:h-full relative overflow-hidden shrink-0">
                                <img
                                    key={heroData[heroIdx].image}
                                    src={getAssetPath(heroData[heroIdx].image)}
                                    alt="Hero"
                                    className="w-full h-full object-cover animate-fade-in"
                                />
                            </div>
                            <div className="w-full md:w-[50%] lg:w-[48%] p-5 md:p-6 lg:p-7 flex flex-col justify-between h-full relative group hover:bg-slate-50/60 transition-colors">
                                <Link to={`/article/${heroData[heroIdx].id}`} className="block flex-1 min-h-0">
                                    <h1 key={`t-${heroIdx}`} className="text-base sm:text-lg md:text-[19px] lg:text-[21px] font-bold text-slate-900 leading-[1.38] hover:text-[#0088cc] transition-colors animate-slide-up">
                                        {heroData[heroIdx].title}
                                    </h1>
                                    <p key={`d-${heroIdx}`} className="text-xs md:text-sm text-slate-500 mt-2.5 line-clamp-2 leading-relaxed animate-fade-in">
                                        {heroData[heroIdx].desc}
                                    </p>
                                </Link>
                                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] md:text-xs text-slate-400 font-medium shrink-0">
                                    <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                                        <span className="material-symbols-outlined text-[17px] text-[#0088cc]">calendar_today</span> 
                                        <span>{formatNewsDate(heroData[heroIdx])}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setHeroIdx((prev) => (prev - 1 + heroData.length) % heroData.length);
                                            }}
                                            className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-[#0088cc] hover:text-white transition-colors cursor-pointer"
                                            title="Oldingisi"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                                        </button>
                                        <div className="flex gap-1 items-center px-1">
                                            {heroData.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setHeroIdx(idx);
                                                    }}
                                                    className={`transition-all duration-300 rounded-full cursor-pointer ${idx === heroIdx ? 'w-4 h-1.5 bg-[#0088cc]' : 'w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400'}`}
                                                    title={`${idx + 1}-yangilik`}
                                                ></button>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setHeroIdx((prev) => (prev + 1) % heroData.length);
                                            }}
                                            className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-[#0088cc] hover:text-white transition-colors cursor-pointer"
                                            title="Keyingisi"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent News Quick Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            {newsData.slice(3, 7).map((news) => (
                                <Link key={news.id} to={`/article/${news.id}`} className="bg-white rounded-xl shadow-sm border border-slate-100 p-2 group hover:shadow-md transition-shadow">
                                    <div className="aspect-[4/3] rounded-lg overflow-hidden mb-2 md:mb-3 relative">
                                        <img src={getAssetPath(news.image)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="news" />
                                    </div>
                                    <h3 className="font-bold text-[11px] md:text-[13px] leading-snug text-slate-800 group-hover:text-[#0088cc] line-clamp-3">
                                        {news.title}
                                    </h3>
                                    <div className="mt-2 md:mt-3 flex items-center gap-1 text-[10px] md:text-[11px] text-slate-400">
                                        <span className="material-symbols-outlined text-[12px] md:text-[14px]">calendar_today</span> {formatNewsDate(news)}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Filtered News Section - Daryo Style */}
                    <section className="space-y-6">
                        <div className="flex flex-col gap-4 md:gap-6">
                            <div className="flex items-center gap-2 text-lg md:text-2xl font-bold text-slate-900 border-l-4 border-[#0088cc] pl-4">
                                {activeTag}
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                                {tags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setActiveTag(tag)}
                                        className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all ${activeTag === tag
                                            ? 'bg-[#0088cc] text-white shadow-md'
                                            : 'bg-white shadow-sm border border-slate-100 text-slate-500 hover:text-slate-800 hover:border-slate-300'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
                                {filteredSectionNews.length > 0 ? (
                                    <>
                                        {/* Left large content */}
                                        <div className="lg:col-span-7">
                                            <Link to={`/article/${filteredSectionNews[0].id}`} className="group block">
                                                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 md:mb-5 shadow-sm">
                                                    <img src={getAssetPath(filteredSectionNews[0].image)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="news" />
                                                </div>
                                                <h2 className="text-lg md:text-2xl font-bold text-slate-900 leading-tight group-hover:text-[#0088cc] transition-colors mb-2 md:mb-4">
                                                    {filteredSectionNews[0].title}
                                                </h2>
                                                <p className="text-xs md:text-sm text-slate-500 line-clamp-3 mb-3 md:mb-4 leading-relaxed">
                                                    {filteredSectionNews[0].desc}
                                                </p>
                                                <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-slate-400 font-medium">
                                                    <span className="material-symbols-outlined text-[14px] md:text-[16px]">calendar_today</span> {formatNewsDate(filteredSectionNews[0])}
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Right side - Vertical list (4 items) */}
                                        <div className="lg:col-span-5 space-y-4 md:space-y-6">
                                            {filteredSectionNews.slice(1, 5).map((news) => (
                                                <Link key={news.id} to={`/article/${news.id}`} className="flex gap-3 md:gap-4 group pb-4 md:pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                                                    <div className="w-24 md:w-32 h-16 md:h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                                        <img src={getAssetPath(news.image)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="news" />
                                                    </div>
                                                    <div className="flex flex-col justify-center">
                                                        <h3 className="font-bold text-[12px] md:text-[15px] leading-snug text-slate-900 group-hover:text-[#0088cc] transition-colors line-clamp-2 md:line-clamp-3 mb-1 md:mb-2">
                                                            {news.title}
                                                        </h3>
                                                        <div className="mt-auto flex items-center gap-1.5 text-[9px] md:text-[11px] text-slate-400 font-medium">
                                                            <span className="material-symbols-outlined text-[12px] md:text-[14px]">calendar_today</span> {formatNewsDate(news)}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="col-span-full flex flex-col items-center justify-center py-12 md:py-20 text-slate-400">
                                        <span className="material-symbols-outlined text-4xl md:text-5xl mb-2">news_off</span>
                                        <p className="text-sm">Ushbu ruknda hozircha yangiliklar yo'q</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="hidden lg:block w-[320px] shrink-0">
                    <Sidebar />
                </div>
            </div>
        </main>
    );
}
