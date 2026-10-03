import React from 'react';
import PageHeroBanner from '../components/PageHeroBanner';
import { getAssetPath } from '../utils/assets';

export default function SchoolConstitution() {
    const pdfPath = getAssetPath('/images/Constitution.pdf');

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-[112px] lg:pt-[132px] pb-16 relative overflow-x-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,#f1f5f9_100%)] opacity-80 pointer-events-none" />
            
            <div className="relative z-20">
                <PageHeroBanner category="Biz haqimizda" title="Maktab konstitutsiyasi" />
            </div>

            <main className="max-w-[1200px] mx-auto relative z-10 px-4 md:px-8 pt-10">
                <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-200 flex flex-col h-[75vh] md:h-[85vh] min-h-[500px]">
                    
                    {/* Yuqori qism (Sarlavha va Yuklash tugmasi) */}
                    <div className="flex justify-between items-center mb-5 px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[#0088cc]">gavel</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-[#0a1b3f]">O'quvchilar konstitutsiyasi</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <a 
                                href={pdfPath} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all border border-slate-200"
                                title="Yangi oynada ochish"
                            >
                                <span className="material-symbols-outlined text-[18px] text-[#0088cc]">open_in_new</span>
                                <span className="hidden sm:inline">Yangi oynada ochish</span>
                            </a>
                            <a 
                                href={pdfPath} 
                                download="Maktab_Konstitutsiyasi.pdf"
                                className="bg-[#0088cc] hover:bg-sky-600 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-transform hover:-translate-y-0.5 shadow-sm"
                                title="Konstitutsiyani yuklab olish"
                            >
                                <span className="material-symbols-outlined text-[20px]">download</span>
                                <span className="hidden sm:inline">Yuklab olish</span>
                            </a>
                        </div>
                    </div>

                    {/* PDF Embed qismi (Browser native viewer) */}
                    <div className="w-full flex-1 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100/50 shadow-inner relative" style={{ WebkitOverflowScrolling: 'touch' }}>
                        {/* Iframe tegi mobil va planshetlarda PDF ni yaxshiroq ochish va moslashtirish uchun qulay */}
                        <iframe 
                            src={`${pdfPath}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`} 
                            title="Maktab Konstitutsiyasi"
                            className="absolute inset-0 w-full h-full border-none"
                        >
                            {/* Agar brauzer PDF o'qiy olmasa zaxira variant: */}
                            <div className="flex flex-col items-center justify-center h-full text-slate-500 p-6 text-center mt-10">
                                <span className="material-symbols-outlined text-6xl mb-4 text-slate-300">picture_as_pdf</span>
                                <h3 className="text-lg font-bold text-slate-700 mb-2">Brauzeringizda PDF ko'rish imkoniyati yo'q</h3>
                                <p className="mb-6 max-w-sm">Hujjatni o'qish uchun uni bevosita qurilmangizga yuklab olishingiz mumkin.</p>
                                <a 
                                    href={pdfPath} 
                                    download="Maktab_Konstitutsiyasi.pdf"
                                    className="bg-[#0a1b3f] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#163065] transition-colors inline-block"
                                >
                                    Faylni yuklab olish
                                </a>
                            </div>
                        </iframe>
                    </div>

                </div>
            </main>
        </div>
    );
}
