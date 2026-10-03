import React from 'react';
import PageHeroBanner from '../components/PageHeroBanner';

export default function Contact() {
    return (
        <div className="bg-slate-50 min-h-screen pt-[112px] lg:pt-[132px] pb-16">
            <PageHeroBanner category="Aloqa" title="Biz bilan aloqa" />
            
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 md:mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    
                    {/* Contact Details Card */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl -z-10 group-hover:bg-sky-100 transition-colors duration-500"></div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-6 font-['Cinzel',serif]">Biz bilan bog'lanish</h2>
                        <p className="text-slate-500 mb-8 leading-relaxed">
                            Termiz shahridagi Prezident maktabiga qabul, o'quv jarayonlari, bo'sh ish o'rinlari va boshqa masalalar bo'yicha savollaringiz bo'lsa quyidagi raqamlarga yoki manzilga murojaat qilishingiz mumkin.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 shadow-sm border border-sky-100">
                                    <span className="material-symbols-outlined text-[24px]">location_on</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-1">Manzil</h4>
                                    <p className="text-slate-600 text-sm">Surxondaryo viloyati, Termiz shahar,<br/> Hakim at-Termiziy shoh ko‘chasi 34b-uy</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 shadow-sm border border-sky-100">
                                    <span className="material-symbols-outlined text-[24px]">call</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-1">Telefon raqam</h4>
                                    <a href="tel:+998554520922" className="text-sky-600 hover:text-sky-700 font-bold transition-colors text-sm">+998 55 452 09 22</a>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 shadow-sm border border-sky-100">
                                    <span className="material-symbols-outlined text-[24px]">mail</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-1">Elektron pochta</h4>
                                    <a href="mailto:info@pstmz.uz" className="text-sky-600 hover:text-sky-700 font-bold transition-colors text-sm">info@pstmz.uz</a>
                                </div>
                            </div>
                        </div>
                        
                        {/* Social Media Links */}
                        <div className="mt-10 pt-8 border-t border-slate-100 flex items-center gap-4">
                            <span className="text-sm font-bold text-slate-500">Ijtimoiy tarmoqlar:</span>
                            <div className="flex gap-3">
                                <a href="https://t.me/pmtermiz" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#0088cc] hover:text-white transition-all shadow-sm group/social">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .33z" />
                                    </svg>
                                </a>
                                <a href="https://instagram.com/pmtermiz" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#E1306C] hover:text-white transition-all shadow-sm group/social">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                </a>
                                <a href="https://www.youtube.com/@termizshahridagiprezidentm4414" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#FF0000] hover:text-white transition-all shadow-sm group/social">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Google Maps Embed */}
                    <div className="h-[450px] lg:h-auto min-h-[450px] w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 relative group p-2 hover:shadow-2xl transition-shadow duration-500">
                        <div className="absolute top-5 right-5 z-20">
                            <a 
                                href="https://maps.google.com/?q=Termiz+shahridagi+Prezident+maktabi" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-white/95 backdrop-blur-md hover:bg-white text-slate-800 text-xs font-extrabold px-3.5 py-2 rounded-xl border border-slate-200 shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
                                title="Google Xaritada ochish"
                            >
                                <span className="material-symbols-outlined text-[#0088cc] text-base">map</span>
                                <span>Google Xaritada ochish</span>
                            </a>
                        </div>
                        <iframe 
                            src="https://maps.google.com/maps?q=Termiz%20shahridagi%20Prezident%20maktabi&t=&z=16&ie=UTF8&iwloc=&output=embed"
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, borderRadius: '1.25rem', position: 'relative', zIndex: 10, filter: 'contrast(1.05) saturate(1.1)' }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            title="Prezident Maktabi Xaritasi"
                        ></iframe>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
