import React from 'react';
import PageHeroBanner from '../components/PageHeroBanner';
import { getAssetPath } from '../utils/assets';

export default function Qabul2026() {
    const pdfPath = getAssetPath('/images/results.pdf');

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-[112px] lg:pt-[132px] pb-16 relative overflow-x-hidden">
            <PageHeroBanner category="Maktab qabuli" title="Qabul - 2026" />
            <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0a1b3f] mb-8 text-center">
                    Termiz shahridagi Prezident maktabi 1-bosqich imtihon natijalari
                </h2>
                
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="w-full h-[600px] md:h-[800px] rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative group">
                        <iframe 
                            src={`${pdfPath}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                            className="w-full h-full"
                            title="Imtihon natijalari"
                        />
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <a 
                            href={pdfPath} 
                            download="Termiz_Prezident_Maktabi_1_bosqich_natijalari.pdf"
                            className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <span className="material-symbols-outlined text-lg">download</span>
                            Yuklab olish
                        </a>
                        <a 
                            href={pdfPath} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white border border-[#0088cc] text-[#0088cc] hover:bg-sky-50 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <span className="material-symbols-outlined text-lg">open_in_new</span>
                            Yangi oynada ochish
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
