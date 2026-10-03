import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full border-t border-slate-800/80 bg-gradient-to-b from-[#0a1b3f] via-[#0d2144] to-[#061024] text-white relative overflow-hidden">
            
            {/* Ambient Background Glowing Blobs */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none animate-pulse z-0"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-0"></div>

            {/* Multi-Layered Premium Fluid Waves Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <svg 
                    className="absolute top-0 left-0 w-[200%] h-full opacity-20 animate-wave-layer1"
                    viewBox="0 0 1440 320" 
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0088cc" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#0d2557" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#waveGrad1)" d="M0,160C320,300,480,0,800,180C1120,360,1280,40,1440,160V320H0Z"></path>
                </svg>

                <svg 
                    className="absolute top-0 left-0 w-[200%] h-full opacity-25 animate-wave-layer2"
                    viewBox="0 0 1440 320" 
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#0a1b3f" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#waveGrad2)" d="M0,192C240,80,480,280,720,160C960,40,1200,240,1440,128V320H0Z"></path>
                </svg>

                <svg 
                    className="absolute bottom-0 left-0 w-[200%] h-full opacity-30 animate-wave-layer3"
                    viewBox="0 0 1440 320" 
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#005599" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#071329" stopOpacity="0.4" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#waveGrad3)" d="M0,96C320,240,640,0,960,160C1280,320,1400,100,1440,128V320H0Z"></path>
                </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-12 max-w-7xl mx-auto relative z-10">
                
                {/* Column 1: Brand & Logo */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <img 
                            src="/images/aa1_logo.png" 
                            alt="Prezident Maktabi Logo" 
                            className="w-10 h-10 object-contain drop-shadow-md"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <span className="text-xl font-extrabold text-white tracking-tight">pstermez.uz</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        Termiz shahridagi Prezident maktabi rasmiy veb-portali. Barcha yangiliklar, e'lonlar va maktab hayotiga oid ma'lumotlar.
                    </p>
                </div>

                {/* Column 2: Bo'limlar */}
                <div className="space-y-4">
                    <h4 className="font-extrabold text-sky-400 uppercase tracking-wider text-xs">Bo'limlar</h4>
                    <div className="flex flex-col space-y-2.5">
                        <Link className="text-slate-300 hover:text-white transition-colors text-sm font-medium" to="/">Bosh sahifa</Link>
                        <Link className="text-slate-300 hover:text-white transition-colors text-sm font-medium" to="/news">Yangiliklar</Link>
                        <Link className="text-slate-300 hover:text-white transition-colors text-sm font-medium" to="/qabul-2026">Maktab qabuli</Link>
                        <Link className="text-slate-300 hover:text-white transition-colors text-sm font-medium" to="/school-team">Biz haqimizda</Link>
                        <Link className="text-slate-300 hover:text-white transition-colors text-sm font-medium" to="/videos">Videolar</Link>
                    </div>
                </div>

                {/* Column 3: Foydali Havolalar */}
                <div className="space-y-4">
                    <h4 className="font-extrabold text-sky-400 uppercase tracking-wider text-xs">Foydali</h4>
                    <div className="flex flex-col space-y-2.5">
                        <a href="https://ariza.piima.uz/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                            Ariza topshirish (PIIMA)
                        </a>
                        <Link className="text-slate-300 hover:text-white transition-colors text-sm font-medium" to="/natijalar">Natijalar</Link>
                        <Link className="text-slate-300 hover:text-white transition-colors text-sm font-medium" to="/statistika">Statistikalar</Link>
                        <Link className="text-slate-300 hover:text-white transition-colors text-sm font-medium" to="/aloqa">Aloqa</Link>
                    </div>
                </div>

                {/* Column 4: Manzil va Aloqa Ma'lumotlari */}
                <div className="space-y-4">
                    <h4 className="font-extrabold text-sky-400 uppercase tracking-wider text-xs">Aloqa ma'lumotlari</h4>
                    <ul className="space-y-3.5 text-sm text-slate-200">
                        <li className="flex items-start gap-3">
                            <span className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-400/20 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                            </span>
                            <span className="leading-snug text-slate-300 text-xs sm:text-sm">
                                Surxondaryo viloyati, Termiz shahar, Hakim at-Termiziy shoh ko‘chasi 34b-uy
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-400/20 flex items-center justify-center shrink-0 shadow-xs">
                                <span className="material-symbols-outlined text-[18px]">call</span>
                            </span>
                            <a href="tel:+998554520922" className="text-white hover:text-sky-300 font-extrabold tracking-wide transition-colors text-sm">
                                +998 55 452-09-22
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-400/20 flex items-center justify-center shrink-0 shadow-xs">
                                <span className="material-symbols-outlined text-[18px]">mail</span>
                            </span>
                            <a href="mailto:info@pstmz.uz" className="text-slate-200 hover:text-sky-300 font-medium transition-colors text-sm">
                                info@pstmz.uz
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Bottom Copyright */}
            <div className="border-t border-white/10 bg-[#040b19]/90 py-5 px-6 relative z-10 backdrop-blur-xs">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <p className="text-slate-400 text-xs sm:text-sm">
                        © 2026 Termiz shahridagi Prezident maktabi. Barcha huquqlar himoyalangan.
                    </p>
                    <div className="flex items-center gap-4 text-slate-400 text-xs">
                        <a href="https://t.me/Termiz_PM" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors font-medium">Telegram</a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors font-medium">Facebook</a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors font-medium">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
