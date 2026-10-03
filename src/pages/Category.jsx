import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PageHeroBanner from '../components/PageHeroBanner';

export default function Category({ category = "Natijalar", title = "Natijalar" }) {
    return (
        <div className="w-full bg-[#f4f7fb] text-slate-800 min-h-screen pt-[112px] lg:pt-[132px]">
            <PageHeroBanner category={category} title={title} />
            <main className="pb-16 max-w-7xl mx-auto px-4 md:px-8 pt-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-8">
                        <div className="border-b-2 border-slate-200 pb-4">
                            <h2 className="text-3xl font-black text-[#14233b]">{title}</h2>
                            <p className="text-slate-500 mt-2">Maktabimiz erishgan so'nggi rasmiy natijalar va ma'lumotlar.</p>
                        </div>

                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <Link to="/article/1" key={item} className="flex flex-col md:flex-row gap-6 group cursor-pointer border-b border-slate-200 pb-6 last:border-0 hover:bg-white p-4 rounded-xl transition-all shadow-xs">
                                    <div className="w-full md:w-64 aspect-video flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 relative">
                                        <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 absolute inset-0" alt="News" src="/images/maktab.jpg" />
                                    </div>
                                    <div className="flex flex-col justify-center space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-[#0088cc] font-bold uppercase tracking-wider">{title}</span>
                                            <span className="text-slate-400 text-xs">• 2026-yil</span>
                                        </div>
                                        <h3 className="text-xl font-bold group-hover:text-[#0088cc] transition-colors leading-snug text-[#0a1b3f]">{title} bo'yicha yuqori ko'rsatkichlar qayd etildi</h3>
                                        <p className="text-slate-600 text-sm line-clamp-2 md:line-clamp-3">O'quvchilarimiz va o'qituvchilarimiz xalqaro va respublika miqyosida yuqori natijalarni qo'lga kiritmoqdalar.</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="flex justify-center pt-8">
                            <button className="px-6 py-3 border-2 border-[#0088cc] text-[#0088cc] font-bold rounded-lg hover:bg-[#0088cc] hover:text-white transition-colors">
                                Yana yuklash
                            </button>
                        </div>
                    </div>

                    <Sidebar />
                </div>
            </main>
        </div>
    );
}
