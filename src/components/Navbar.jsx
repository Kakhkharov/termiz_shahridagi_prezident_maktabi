import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRadio } from '../context/RadioContext';

export default function Navbar() {
    const { isPlaying: isRadioPlaying, toggleRadio } = useRadio();

    const [weather, setWeather] = useState({ temp: '28', code: 0, isDay: 1 });
    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
        return '';
    };

    const currentLangCookie = getCookie('googtrans');
    const initialLang = currentLangCookie.includes('/uz/en') ? 'en' : 'uz';
    const [lang, setLang] = useState(initialLang);

    const handleLanguageChange = (newLang) => {
        if (newLang === 'en') {
            document.cookie = "googtrans=/uz/en; path=/";
            if (window.location.hostname && window.location.hostname !== 'localhost') {
                document.cookie = "googtrans=/uz/en; path=/; domain=" + window.location.hostname;
            }
        } else {
            // Remove the googtrans cookies to return to the original language (uz) without errors
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            if (window.location.hostname && window.location.hostname !== 'localhost') {
                document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
            }
        }
        window.location.reload();
    };
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isTopHome = isHome && !isScrolled;

    const [showRadioGuide, setShowRadioGuide] = useState(false);

    useEffect(() => {
        if (isHome) {
            setShowRadioGuide(true);
            const timer = setTimeout(() => {
                setShowRadioGuide(false);
            }, 10000);
            return () => clearTimeout(timer);
        } else {
            setShowRadioGuide(false);
        }
    }, [location.pathname]);

    const navBgClass = isTopHome 
        ? 'bg-transparent border-b border-transparent shadow-none' 
        : 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-200';
        
    const navTextClass = isTopHome 
        ? 'text-white hover:text-sky-300' 
        : 'text-slate-800 hover:text-[#0088cc]';
        
    const mobileTextClass = isTopHome ? 'text-white' : 'text-slate-800';
    const mobileMenuIconClass = isTopHome ? 'text-white hover:text-sky-300' : 'text-slate-800 hover:text-[#0088cc]';

    const handleScroll = () => {
        if (window.scrollY > 20) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Fetch real-time weather for Termiz (Lat: 37.2242, Lon: 67.2783)
        fetch('https://api.open-meteo.com/v1/forecast?latitude=37.2242&longitude=67.2783&current_weather=true')
            .then(response => response.json())
            .then(data => {
                if (data && data.current_weather) {
                    setWeather({
                        temp: Math.round(data.current_weather.temperature),
                        code: data.current_weather.weathercode,
                        isDay: data.current_weather.is_day
                    });
                }
            })
            .catch(error => {
                console.error("Error fetching weather:", error);
            });
    }, []);

    const renderWeatherIcon = () => {
        const { code, isDay } = weather;
        if (code <= 1) { // Clear
            return isDay ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm scale-95">
                    <path d="M12 2V4M12 20V22M4 12H2M22 12H20M4.92893 4.92893L6.34315 6.34315M17.6569 17.6569L19.0711 19.0711M4.92893 19.0711L6.34315 17.6569M17.6569 4.92893L19.0711 6.34315" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="5" fill="#FFD000" stroke="#1E293B" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="5" fill="#FFC107" />
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm scale-95">
                    <path d="M20.9 14.5A7.001 7.001 0 0113.5 6a7 7 0 00-6 10.5 7.001 7.001 0 0013.4-2z" fill="#94A3B8" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            );
        } else if (code <= 48) { // Cloudy or Fog
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm scale-95 -ml-1">
                    {isDay && <circle cx="9" cy="9" r="4" fill="#FFC107" stroke="#1E293B" strokeWidth="1.5" />}
                    <path d="M17.5 19H8.5A5.5 5.5 0 0 1 7 8.2a6 6 0 0 1 11.2-2.3 4.5 4.5 0 0 1-.7 9.1z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            );
        } else if (code >= 51 && code <= 67) { // Rain
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm scale-95 -ml-1">
                    <path d="M17.5 16H8.5A5.5 5.5 0 0 1 7 5.2a6 6 0 0 1 11.2-2.3 4.5 4.5 0 0 1-.7 9.1z" fill="#94A3B8" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M11 17L9 21M15 17L13 21" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        } else { // Snow
            return (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm scale-95 -ml-1">
                    <path d="M17.5 16H8.5A5.5 5.5 0 0 1 7 5.2a6 6 0 0 1 11.2-2.3 4.5 4.5 0 0 1-.7 9.1z" fill="#CBD5E1" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M11 19h.01M15 19h.01M13 21h.01M9 21h.01" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        }
    };

    return (
        <>
            <header className="fixed top-0 w-full z-50 transition-all duration-300">
                {/* Neon Progress Bar */}
                <div
                    className="absolute top-0 left-0 h-[3px] z-[60] transition-all duration-300 ease-out"
                    style={{
                        width: `${scrollProgress}%`,
                    }}
                />

                {/* Top Dark Blue Bar */}
                <div className="w-full bg-[#0a1b3f]/85 backdrop-blur-md h-[48px] lg:h-[56px] flex justify-between items-center px-4 md:px-8 relative z-20 shadow-md border-b border-white/5">
                    {/* Left Contacts */}
                    <div className="hidden lg:flex gap-4">
                        <a href="https://maps.google.com/?q=Termiz+Prezident+Maktabi" target="_blank" rel="noreferrer" className="bg-white/10 rounded-md px-3 py-1 flex items-center gap-2 text-white text-[11px] font-semibold hover:bg-white/20 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[14px]">location_on</span> Termiz shahri
                        </a>
                        <a href="tel:+998554520922" className="bg-white/10 rounded-md px-3 py-1 flex items-center gap-2 text-white text-[11px] font-semibold hover:bg-white/20 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[14px]">call</span> +998 55 452 09 22
                        </a>
                        <a href="mailto:info@pstmz.uz" className="bg-white/10 rounded-md px-3 py-1 flex items-center gap-2 text-white text-[11px] font-semibold hover:bg-white/20 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[14px]">mail</span> info@pstmz.uz
                        </a>
                    </div>
                    
                    {/* Right Social & Lang */}
                    <div className="flex gap-4 items-center ml-auto">
                        <div className="flex gap-2">
                            {/* Maktab Radiosi FM button (Mobile & Desktop) */}
                            <div className="relative group">
                                {showRadioGuide && !isRadioPlaying && (
                                    <span className="absolute -inset-1 rounded-lg bg-cyan-400/50 animate-ping pointer-events-none z-10" />
                                )}

                                <button 
                                    onClick={() => {
                                        toggleRadio();
                                        setShowRadioGuide(false);
                                    }} 
                                    className={`relative z-20 w-7 h-7 rounded flex items-center justify-center transition-all cursor-pointer overflow-hidden ${
                                        isRadioPlaying 
                                            ? 'bg-white ring-2 ring-cyan-400 shadow-[0_0_16px_rgba(0,240,255,0.9)]' 
                                            : showRadioGuide 
                                                ? 'bg-cyan-500/30 ring-2 ring-cyan-400 animate-pulse' 
                                                : 'bg-white/10 hover:bg-white/20'
                                    }`}
                                >
                                    <img 
                                        src="/images/fm2.png" 
                                        alt="Maktab radiosi" 
                                        className={`w-4 h-4 object-contain transition-all ${
                                            isRadioPlaying 
                                                ? '[filter:invert(40%)_sepia(90%)_saturate(3000%)_hue-rotate(170deg)_brightness(110%)] scale-110' 
                                                : 'brightness-0 invert opacity-90 group-hover:opacity-100 group-hover:scale-110'
                                        }`}
                                    />
                                </button>
                                
                                {/* Single Custom Tooltip */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 bg-slate-900/95 text-cyan-300 text-[10px] font-bold rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none border border-cyan-500/30">
                                    Maktab radiosi {isRadioPlaying ? '(Yoniq 📻)' : ''}
                                </div>

                                {/* Bosh Sahifa Radio Instruksiya Popup */}
                                {showRadioGuide && !isRadioPlaying && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 z-50 animate-fade-in">
                                        <div className="w-3 h-3 bg-slate-900 border-t border-l border-cyan-400/50 rotate-45 mx-auto -mb-1.5 shadow-sm"></div>
                                        <div className="bg-slate-900/95 backdrop-blur-md border border-cyan-400/50 text-white rounded-xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-w-[220px] text-center relative flex flex-col items-center gap-1.5">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setShowRadioGuide(false); }}
                                                className="absolute top-1.5 right-1.5 text-slate-400 hover:text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                                            >
                                                ✕
                                            </button>
                                            <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-[12px] pt-0.5">
                                                <span className="text-sm">📻</span> Maktab FM Radiosi
                                            </div>
                                            <p className="text-[11px] text-cyan-200/90 font-semibold leading-tight px-1 max-w-[200px]">
                                                Maktab to'lqini: dayjest, tabriklar va qaynoq efirlar! 🎙️
                                            </p>
                                            <button 
                                                onClick={() => { toggleRadio(); setShowRadioGuide(false); }}
                                                className="mt-1 px-3.5 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-[10px] rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                                            >
                                                <span>Tinglash</span>
                                                <span className="material-symbols-outlined text-[13px]">play_arrow</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <a href="https://instagram.com/pmtermiz" target="_blank" rel="noreferrer" className="bg-white/10 w-7 h-7 rounded flex items-center justify-center text-white hover:bg-white/20 transition-all">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                            <a href="https://t.me/pmtermiz" target="_blank" rel="noreferrer" className="bg-white/10 w-7 h-7 rounded flex items-center justify-center text-white hover:bg-white/20 transition-all">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .33z" />
                                </svg>
                            </a>
                            <a href="#" className="bg-white/10 w-7 h-7 rounded flex items-center justify-center text-white hover:bg-white/20 transition-all">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"/>
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/@termizshahridagiprezidentm4414" target="_blank" rel="noreferrer" className="bg-white/10 w-7 h-7 rounded flex items-center justify-center text-white hover:bg-white/20 transition-all" title="YouTube">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        </div>

                        {/* Lang */}
                        <div className="relative group z-50">
                            <div className="bg-white/10 rounded-md px-3 py-1 flex items-center gap-2 text-white text-[11px] font-semibold cursor-pointer hover:bg-white/20 transition-colors">
                                <img src="https://flagcdn.com/w20/uz.png" alt="uz" className="w-4 h-auto rounded-[2px]" />
                                <span>{lang === 'uz' ? "O'zbek" : "English"}</span>
                                <span className="material-symbols-outlined text-[14px]">expand_more</span>
                            </div>
                            <div className="absolute top-full right-0 w-28 bg-white rounded shadow-lg py-1 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                <button className="w-full text-left px-3 py-2 hover:bg-slate-100 text-[12px] font-bold text-slate-800 flex items-center gap-2" onClick={() => handleLanguageChange('uz')}>
                                    <img src="https://flagcdn.com/w20/uz.png" alt="uz" className="w-4 h-auto rounded-[2px]" /> O'zbek
                                </button>
                                <button className="w-full text-left px-3 py-2 hover:bg-slate-100 text-[12px] font-bold text-slate-800 flex items-center gap-2" onClick={() => handleLanguageChange('en')}>
                                    <img src="https://flagcdn.com/w20/gb.png" alt="en" className="w-4 h-auto rounded-[2px]" /> English
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Nav Bar */}
                <div className={`w-full h-[64px] lg:h-[76px] flex items-center px-4 md:px-8 relative z-10 transition-colors duration-300 ${navBgClass}`}>
                    
                    {/* Desktop Menu - Split into Left and Right */}
                    <div className="hidden lg:flex w-full max-w-[1400px] mx-auto items-center justify-between relative h-full">
                        {/* Left Menu Items (4 items) */}
                        <div className="flex-1 flex justify-end gap-3 lg:gap-5 xl:gap-8 pr-[60px] xl:pr-[90px] h-full">
                            <Link to="/" className={`${navTextClass} text-[13px] xl:text-[14px] font-bold tracking-wide transition-colors whitespace-nowrap flex items-center h-full`}>{lang === 'uz' ? 'Bosh sahifa' : 'Home'}</Link>
                            <Link to="/news" className={`${navTextClass} text-[13px] xl:text-[14px] font-bold tracking-wide transition-colors whitespace-nowrap flex items-center h-full`}>{lang === 'uz' ? 'Yangiliklar' : 'News'}</Link>
                            
                            {/* Maktab qabuli Dropdown */}
                            <div className="relative group h-full flex items-center">
                                <Link to="/qabul-nizomi" className={`${navTextClass} text-[13px] xl:text-[14px] font-bold tracking-wide cursor-pointer transition-colors flex items-center gap-1 whitespace-nowrap h-full`}>
                                    {lang === 'uz' ? 'Maktab qabuli' : 'Admission'} <span className="material-symbols-outlined text-[16px] xl:text-[18px]">expand_more</span>
                                </Link>
                                <div className="absolute top-full left-0 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <div className="bg-white rounded-lg shadow-xl py-2 border-t-4 border-[#0a1b3f]">
                                        <Link to="/qabul-nizomi" className="block px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0088cc]">{lang === 'uz' ? 'Qabul nizomi' : 'Rules'}</Link>
                                        <Link to="/qabul-2026" className="block px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0088cc]">{lang === 'uz' ? 'Qabul - 2026' : 'Admission 2026'}</Link>
                                    </div>
                                </div>
                            </div>

                            {/* Biz haqimizda Dropdown */}
                            <div className="relative group h-full flex items-center">
                                <span className={`${navTextClass} text-[13px] xl:text-[14px] font-bold tracking-wide cursor-pointer transition-colors flex items-center gap-1 whitespace-nowrap h-full`}>
                                    {lang === 'uz' ? 'Biz haqimizda' : 'About Us'} <span className="material-symbols-outlined text-[16px] xl:text-[18px]">expand_more</span>
                                </span>
                                <div className="absolute top-full left-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <div className="bg-white rounded-lg shadow-xl py-2 border-t-4 border-[#0a1b3f]">
                                        <Link to="/maktab-haqida" className="block px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0088cc]">{lang === 'uz' ? 'Maktab haqida' : 'About'}</Link>
                                        <Link to="/maktab-konstitutsiyasi" className="block px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0088cc]">{lang === 'uz' ? 'Maktab konstitutsiyasi' : 'Constitution'}</Link>
                                        <Link to="/rahbariyat" className="block px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0088cc]">{lang === 'uz' ? 'Rahbariyat' : 'Management'}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Menu Items */}
                        <div className="flex-1 flex justify-start gap-3 lg:gap-5 xl:gap-8 pl-[60px] xl:pl-[90px] h-full">
                            {/* O'qituvchilar (Moved before Natijalar) */}
                            <Link to="/oqituvchilar" className={`${navTextClass} text-[13px] xl:text-[14px] font-bold tracking-wide transition-colors whitespace-nowrap flex items-center h-full`}>
                                {lang === 'uz' ? 'O\'qituvchilar' : 'Teachers'}
                            </Link>

                            {/* Natijalar Dropdown */}
                            <div className="relative group h-full flex items-center">
                                <span className={`${navTextClass} text-[13px] xl:text-[14px] font-bold tracking-wide cursor-pointer transition-colors flex items-center gap-1 whitespace-nowrap h-full`}>
                                    {lang === 'uz' ? 'Natijalar' : 'Results'} <span className="material-symbols-outlined text-[16px] xl:text-[18px]">expand_more</span>
                                </span>
                                <div className="absolute top-full left-0 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <div className="bg-white rounded-lg shadow-xl py-2 border-t-4 border-[#0a1b3f]">
                                        <Link to="/natijalar/olimpiadalar" className="block px-4 py-2.5 text-[13px] font-bold text-cyan-600 hover:bg-cyan-50 flex items-center gap-1.5 font-black">
                                            <span className="material-symbols-outlined text-[16px]">emoji_events</span>
                                            {lang === 'uz' ? 'Olimpiadalar' : 'Olympiads'}
                                        </Link>
                                        <Link to="/natijalar/ielts" className="block px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0088cc]">IELTS</Link>
                                        <Link to="/natijalar/sat" className="block px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0088cc]">SAT</Link>
                                        <Link to="/natijalar/a-level" className="block px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0088cc]">A-Level natijalar</Link>
                                        <Link to="/natijalar/as-level" className="block px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0088cc]">AS-Level natijalar</Link>
                                    </div>
                                </div>
                            </div>

                            {/* Statistikalar Dropdown */}
                            <div className="relative group h-full flex items-center">
                                <span className={`${navTextClass} text-[13px] xl:text-[14px] font-bold tracking-wide cursor-pointer transition-colors flex items-center gap-1 whitespace-nowrap h-full`}>
                                    {lang === 'uz' ? 'Statistikalar' : 'Statistics'} <span className="material-symbols-outlined text-[16px] xl:text-[18px]">expand_more</span>
                                </span>
                                <div className="absolute top-full left-0 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <div className="bg-white rounded-lg shadow-xl py-2 border-t-4 border-[#0a1b3f]">
                                        <Link to="/statistika" className="block px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0088cc]">{lang === 'uz' ? 'Statistika' : 'Statistics'}</Link>
                                        <Link to="/oqituvchi-portfoliosi" className="block px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0088cc]">{lang === 'uz' ? 'O\'qituvchi portfoliosi' : 'Teacher Portfolio'}</Link>
                                        <Link to="/oquvchi-portfoliosi" className="block px-4 py-2.5 text-[13px] font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0088cc]">{lang === 'uz' ? 'O\'quvchi portfoliosi' : 'Student Portfolio'}</Link>
                                        <Link to="/fm-radio" className="block px-4 py-2.5 text-[13px] font-bold text-cyan-600 hover:bg-cyan-50 flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">radio</span>{lang === 'uz' ? 'FM radio' : 'FM Radio'}</Link>
                                    </div>
                                </div>
                            </div>

                            <Link to="/videos" className={`${navTextClass} text-[13px] xl:text-[14px] font-bold tracking-wide transition-colors flex items-center h-full whitespace-nowrap`}>{lang === 'uz' ? 'Videolar' : 'Videos'}</Link>
                            <Link to="/aloqa" className={`${navTextClass} text-[13px] xl:text-[14px] font-bold tracking-wide transition-colors flex items-center h-full whitespace-nowrap`}>{lang === 'uz' ? 'Aloqa' : 'Contact'}</Link>
                        </div>
                    </div>

                    {/* Mobile Header elements (Logo + Menu Button) */}
                    <div className="flex lg:hidden w-full items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 z-30">
                            <img src="/images/aa1_logo.png" className="w-10 h-10 object-contain bg-[#0a1b3f] rounded-full p-1 border border-white/20" alt="Logo" />
                            <div className="flex flex-col">
                                <span className={`font-['Cinzel',serif] font-bold ${mobileTextClass} tracking-wider text-[10px] leading-tight uppercase transition-colors`}>Termiz shahridagi</span>
                                <span className={`font-['Cinzel',serif] font-bold ${mobileTextClass} tracking-wider text-[10px] leading-tight uppercase transition-colors`}>Prezident Maktabi</span>
                            </div>
                        </Link>
                        <button onClick={() => setIsMenuOpen(true)} className={`${mobileMenuIconClass} p-1 transition-colors`}>
                            <span className="material-symbols-outlined text-[26px]">menu</span>
                        </button>
                    </div>
                </div>
                {/* Floating Center Logo (Desktop Only) - Fully decoupled from NavBars */}
                <div className="hidden lg:block absolute left-1/2 top-[48px] lg:top-[56px] -translate-x-1/2 -translate-y-[45%] z-[60]">
                    <Link to="/" className="block" title="Bosh sahifa">
                        <div className="bg-white rounded-full w-[100px] h-[100px] lg:w-[115px] lg:h-[115px] border-[2px] lg:border-[4px] border-white p-[2px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center animate-logo-blik">
                            <img src="/images/aa1_logo.png" className="w-full h-full object-contain relative z-20" alt="Logo" />
                        </div>
                    </Link>
                </div>
            </header>

            {/* Mobile Menu Drawer (Side) - Ultra-Creative Glassmorphism Design */}
            {isMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[100] flex justify-end animate-fade-in" 
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div 
                        className="bg-gradient-to-b from-[#0a1b3f] via-[#0d224d] to-[#061026] text-white w-[88%] max-w-[340px] h-full shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col relative border-l border-white/10 overflow-hidden" 
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Background Ambient Glows */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-10 left-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                        {/* Top Drawer Header */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between relative z-10 bg-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <img src="/images/aa1_logo.png" className="w-9 h-9 object-contain bg-[#0a1b3f] rounded-full p-1 border border-cyan-400/30 shadow-md" alt="Logo" />
                                <div className="flex flex-col">
                                    <span className="font-['Cinzel',serif] font-bold text-white text-[11px] uppercase tracking-wider leading-tight">Prezident Maktabi</span>
                                    <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest">Termiz shahri</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => setIsMenuOpen(false)} 
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>

                        {/* Quick Interactive Radio Banner Widget inside Drawer */}
                        <button 
                            onClick={() => {
                                toggleRadio();
                                setIsMenuOpen(false);
                            }}
                            className="mx-4 mt-3 p-3 rounded-xl bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/30 shadow-lg flex items-center justify-between relative z-10 hover:border-cyan-400 transition-all cursor-pointer w-[calc(100%-2rem)] text-left"
                        >
                            <div className="flex items-center gap-2.5">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isRadioPlaying ? 'bg-white shadow-[0_0_12px_rgba(0,240,255,0.8)]' : 'bg-white/10'}`}>
                                    <img 
                                        src="/images/fm2.png" 
                                        alt="Radio" 
                                        className={`w-4 h-4 object-contain ${isRadioPlaying ? '[filter:invert(40%)_sepia(90%)_saturate(3000%)_hue-rotate(170deg)] scale-110' : 'brightness-0 invert'}`} 
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-white leading-tight flex items-center gap-1">
                                        Maktab FM Radiosi {isRadioPlaying && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />}
                                    </span>
                                    <span className="text-[9px] text-cyan-300/80 font-medium">
                                        {isRadioPlaying ? 'Jonli efir ijro etilmoqda...' : 'Eshittirishni boshlash 📻'}
                                    </span>
                                </div>
                            </div>
                            <span 
                                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-cyan-400 text-slate-950 shadow-md flex items-center gap-1"
                            >
                                <span>{isRadioPlaying ? "To'xtatish" : "Ijro etish"}</span>
                                <span className="material-symbols-outlined text-xs">{isRadioPlaying ? 'pause' : 'play_arrow'}</span>
                            </span>
                        </button>

                        {/* Scrollable Navigation Menu */}
                        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 custom-scrollbar relative z-10">
                            
                            {/* Main Quick Links */}
                            <div className="grid grid-cols-2 gap-2">
                                <Link 
                                    to="/" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-white font-bold text-xs group"
                                >
                                    <span className="material-symbols-outlined text-cyan-400 group-hover:scale-110 transition-transform">home</span>
                                    <span>{lang === 'uz' ? 'Bosh sahifa' : 'Home'}</span>
                                </Link>

                                <Link 
                                    to="/news" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-white font-bold text-xs group relative overflow-hidden"
                                >
                                    <span className="material-symbols-outlined text-cyan-400 group-hover:scale-110 transition-transform">newspaper</span>
                                    <span>{lang === 'uz' ? 'Yangiliklar' : 'News'}</span>
                                    <span className="absolute top-1 right-1 text-[7px] font-extrabold bg-cyan-500 text-slate-950 px-1 rounded-full uppercase">NEW</span>
                                </Link>
                            </div>

                            {/* Section 1: Maktab Qabuli */}
                            <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 space-y-1.5">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 uppercase tracking-wider pb-1 border-b border-white/5">
                                    <span className="material-symbols-outlined text-xs">school</span>
                                    <span>{lang === 'uz' ? 'Maktab qabuli' : 'Admission'}</span>
                                </div>
                                <div className="space-y-0.5">
                                    <Link to="/qabul-nizomi" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors">
                                        <span>{lang === 'uz' ? 'Qabul nizomi' : 'Admission Rules'}</span>
                                        <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
                                    </Link>
                                    <Link to="/qabul-2026" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors">
                                        <span>{lang === 'uz' ? 'Qabul - 2026' : 'Admission 2026'}</span>
                                        <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Section 2: Biz Haqimizda */}
                            <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 space-y-1.5">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 uppercase tracking-wider pb-1 border-b border-white/5">
                                    <span className="material-symbols-outlined text-xs">info</span>
                                    <span>{lang === 'uz' ? 'Biz haqimizda' : 'About Us'}</span>
                                </div>
                                <div className="space-y-0.5">
                                    <Link to="/maktab-haqida" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors">
                                        <span>{lang === 'uz' ? 'Maktab haqida' : 'About School'}</span>
                                        <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
                                    </Link>
                                    <Link to="/maktab-konstitutsiyasi" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors">
                                        <span>{lang === 'uz' ? 'Maktab konstitutsiyasi' : 'School Constitution'}</span>
                                        <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
                                    </Link>
                                    <Link to="/rahbariyat" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors">
                                        <span>{lang === 'uz' ? 'Rahbariyat' : 'Management'}</span>
                                        <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
                                    </Link>
                                </div>
                            </div>

                            {/* O'qituvchilar standalone link */}
                            <Link to="/oqituvchilar" onClick={() => setIsMenuOpen(false)} className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center justify-between text-xs text-white font-bold hover:bg-white/10 transition-colors">
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-cyan-400 text-sm">school</span>
                                    {lang === 'uz' ? 'O\'qituvchilar' : 'Teachers'}
                                </span>
                                <span className="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
                            </Link>

                            {/* Section 3: Natijalar & Statistikalar */}
                            <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 space-y-1.5">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 uppercase tracking-wider pb-1 border-b border-white/5">
                                    <span className="material-symbols-outlined text-xs">emoji_events</span>
                                    <span>{lang === 'uz' ? 'Natijalar & Statistika' : 'Results & Stats'}</span>
                                </div>
                                <div className="space-y-0.5">
                                    <Link to="/natijalar/olimpiadalar" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-cyan-500/10 text-xs text-cyan-300 font-bold transition-colors">
                                        <span className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-xs text-cyan-400">emoji_events</span>
                                            {lang === 'uz' ? 'Olimpiadalar' : 'Olympiads'}
                                        </span>
                                        <span className="material-symbols-outlined text-xs text-cyan-500">chevron_right</span>
                                    </Link>
                                    <Link to="/natijalar/ielts" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors">
                                        <span>IELTS natijalar</span>
                                        <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
                                    </Link>
                                    <Link to="/natijalar/sat" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors">
                                        <span>SAT natijalar</span>
                                        <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
                                    </Link>
                                    <Link to="/natijalar/a-level" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors">
                                        <span>A-Level natijalar</span>
                                        <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
                                    </Link>
                                    <Link to="/natijalar/as-level" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors">
                                        <span>AS-Level natijalar</span>
                                        <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
                                    </Link>
                                    <Link to="/statistika" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors">
                                        <span>{lang === 'uz' ? 'Umumiy statistika' : 'General Statistics'}</span>
                                        <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
                                    </Link>
                                    <Link to="/oqituvchi-portfoliosi" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors">
                                        <span>{lang === 'uz' ? 'O\'qituvchi portfoliosi' : 'Teacher Portfolio'}</span>
                                        <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
                                    </Link>
                                    <Link to="/oquvchi-portfoliosi" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 text-xs text-slate-200 hover:text-white transition-colors">
                                        <span>{lang === 'uz' ? 'O\'quvchi portfoliosi' : 'Student Portfolio'}</span>
                                        <span className="material-symbols-outlined text-xs text-slate-500">chevron_right</span>
                                    </Link>
                                    <Link to="/fm-radio" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-cyan-500/10 text-xs text-cyan-400 font-bold transition-colors">
                                        <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-xs">radio</span>FM radio</span>
                                        <span className="material-symbols-outlined text-xs text-cyan-500">chevron_right</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Section 4: Videolar & Aloqa */}
                            <div className="grid grid-cols-2 gap-2">
                                <Link 
                                    to="/videos" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white font-bold text-xs"
                                >
                                    <span className="material-symbols-outlined text-cyan-400 text-sm">play_circle</span>
                                    <span>{lang === 'uz' ? 'Videolar' : 'Videos'}</span>
                                </Link>

                                <Link 
                                    to="/aloqa" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white font-bold text-xs"
                                >
                                    <span className="material-symbols-outlined text-cyan-400 text-sm">call</span>
                                    <span>{lang === 'uz' ? 'Aloqa' : 'Contact'}</span>
                                </Link>
                            </div>

                        </div>

                        {/* Drawer Footer Widgets */}
                        <div className="p-3 border-t border-white/10 bg-slate-950/90 space-y-2.5 relative z-10">
                            
                            {/* Weather & Language Bar */}
                            <div className="flex items-center justify-between bg-white/5 rounded-xl p-2 border border-white/5">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                                    {renderWeatherIcon()}
                                    <span>{weather.temp}°C Termiz</span>
                                </div>

                                <div className="flex gap-1 bg-white/10 rounded-lg p-0.5 border border-white/10">
                                    <button 
                                        onClick={() => handleLanguageChange('uz')}
                                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${lang === 'uz' ? 'bg-cyan-400 text-slate-950' : 'text-slate-300 hover:text-white'}`}
                                    >
                                        UZ
                                    </button>
                                    <button 
                                        onClick={() => handleLanguageChange('en')}
                                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-cyan-400 text-slate-950' : 'text-slate-300 hover:text-white'}`}
                                    >
                                        EN
                                    </button>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="flex items-center justify-around pt-0.5">
                                <a href="https://instagram.com/pmtermiz" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all">
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                </a>
                                <a href="https://t.me/pmtermiz" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all">
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .33z" /></svg>
                                </a>
                                <a href="https://www.youtube.com/@termizshahridagiprezidentm4414" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all">
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                </a>
                                <a href="tel:+998554520922" className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all">
                                    <span className="material-symbols-outlined text-[15px]">call</span>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Mobile Navigation Bar - Fixed to Viewport Bottom */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 h-[64px] z-[90] flex items-center justify-around px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                
                {/* 1. Yangiliklar */}
                <Link to="/news" className="flex flex-col items-center justify-center p-2 group" onClick={() => setIsMenuOpen(false)}>
                    <span className="material-symbols-outlined text-[24px] text-slate-400 group-hover:text-[#0088cc]">newspaper</span>
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#0088cc]">{lang === 'uz' ? 'Yangiliklar' : 'News'}</span>
                </Link>

                {/* 2. FM radio */}
                <button 
                    onClick={() => {
                        toggleRadio();
                        setIsMenuOpen(false);
                    }} 
                    className="flex flex-col items-center justify-center p-2 group relative cursor-pointer"
                    title="Maktab radiosi ijro etish"
                >
                    <span className={`material-symbols-outlined text-[24px] transition-all ${
                        isRadioPlaying 
                            ? 'text-cyan-500 scale-110 animate-pulse' 
                            : 'text-slate-400 group-hover:text-[#0088cc]'
                    }`}>
                        radio
                    </span>
                    <span className={`text-[10px] font-bold transition-colors ${isRadioPlaying ? 'text-cyan-600 font-extrabold' : 'text-slate-500 group-hover:text-[#0088cc]'}`}>
                        FM radio {isRadioPlaying ? '▶' : ''}
                    </span>
                </button>

                {/* 3. Bosh sahifa */}
                <Link to="/" className="flex flex-col items-center justify-center p-2 group" onClick={() => setIsMenuOpen(false)}>
                    <span className="material-symbols-outlined text-[24px] text-slate-400 group-hover:text-[#0088cc]">home</span>
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#0088cc]">{lang === 'uz' ? 'Bosh sahifa' : 'Home'}</span>
                </Link>

                {/* 4. Videolar */}
                <Link to="/videos" className="flex flex-col items-center justify-center p-2 group" onClick={() => setIsMenuOpen(false)}>
                    <span className="material-symbols-outlined text-[24px] text-slate-400 group-hover:text-[#0088cc]">movie</span>
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#0088cc]">{lang === 'uz' ? 'Videolar' : 'Videos'}</span>
                </Link>

                {/* 5. Team */}
                <Link to="/rahbariyat" className="flex flex-col items-center justify-center p-2 group" onClick={() => setIsMenuOpen(false)}>
                    <span className="material-symbols-outlined text-[24px] text-slate-400 group-hover:text-[#0088cc]">group</span>
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#0088cc]">Team</span>
                </Link>
            </div>
        </>
    );
}
