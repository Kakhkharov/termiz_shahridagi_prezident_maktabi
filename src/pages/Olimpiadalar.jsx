import React, { useState, useEffect } from 'react';
import PageHeroBanner from '../components/PageHeroBanner';
import { getAssetPath } from '../utils/assets';

// Reusable Automatic Right-to-Left Slide Carousel Component
const AutoSectionSlider = ({ children, itemCount = 1, autoPlayInterval = 3500 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered || itemCount <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % itemCount);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [isHovered, itemCount, autoPlayInterval]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % itemCount);
    };

    return (
        <div 
            className="relative overflow-hidden group/slider pt-1 pb-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Sliding Track with Smooth Right-to-Left CSS Animation */}
            <div 
                className="flex transition-transform duration-700 ease-in-out w-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {React.Children.map(children, (child, idx) => (
                    <div key={idx} className="w-full shrink-0">
                        {child}
                    </div>
                ))}
            </div>

            {/* Slider Navigation & Indicators */}
            {itemCount > 1 && (
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                        {Array.from({ length: itemCount }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    currentIndex === i 
                                        ? 'w-6 bg-sky-500' 
                                        : 'w-2 bg-slate-200 hover:bg-slate-300'
                                }`}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrev}
                            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Previous Slide"
                        >
                            <span className="material-symbols-outlined text-base">chevron_left</span>
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Next Slide"
                        >
                            <span className="material-symbols-outlined text-base">chevron_right</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Compact Teacher-Style Student Card for Fan & STEM Olympiads (5-6 per row)
function OlimpiadaStudentCard({ item }) {
    return (
        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xs border border-slate-200/90 group transition-all duration-300 hover:shadow-md hover:border-[#0088cc] hover:-translate-y-1 bg-slate-100 flex flex-col justify-end">
            {/* Student Photo */}
            <img 
                src={getAssetPath(item.image)} 
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                alt={item.name} 
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-65 transition-opacity"></div>

            {/* Top Right Badge: O'quv yili */}
            <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[9px] font-black text-[#004c91] shadow-xs border border-slate-100 z-10 tracking-tight">
                {item.year}
            </div>

            {/* Bottom White Info Box */}
            <div className="relative z-10 m-1.5 bg-white/95 backdrop-blur-md rounded-lg p-2 shadow-sm border border-slate-100 flex flex-col justify-center overflow-hidden space-y-0.5">
                {/* O'rin Badge */}
                <div className="flex items-center justify-between">
                    <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200/80 inline-flex items-center gap-0.5">
                        🏆 {item.award}
                    </span>
                </div>

                {/* Full Name */}
                <h4 className="font-extrabold text-[#0a1b3f] text-xs sm:text-sm leading-tight tracking-tight pt-0.5 truncate" title={item.name}>
                    {item.name}
                </h4>

                {/* Tur (Olimpiada turi) */}
                <p className="text-[#0088cc] font-bold text-[10px] sm:text-[11px] leading-tight line-clamp-2" title={item.categoryType}>
                    {item.categoryType}
                </p>
            </div>
        </div>
    );
}

export default function Olimpiadalar() {
    // Expanded Filter buttons list including Fan olimpiadasi & STEM olimpiadasi
    const filterButtons = [
        { id: 'barchasi', name: 'Barchasi', icon: 'apps' },
        { id: 'xalqaro', name: 'Xalqaro olimpiada', icon: 'public' },
        { id: 'saralash', name: 'Xalqaro olimpiadalarga saralash', icon: 'military_tech' },
        { id: 'fan', name: 'Fan olimpiadasi', icon: 'school' },
        { id: 'stem', name: 'STEM olimpiadasi', icon: 'science' }
    ];

    // State management
    const [activeFilter, setActiveFilter] = useState('barchasi');
    const [pdfModalOpen, setPdfModalOpen] = useState(false);
    const [imageModalOpen, setImageModalOpen] = useState(false);

    // ELO Olympiad Winner Students
    const eloWinners = [
        { id: 1, name: "Manuchehr Murotov", school: "Termiz shahridagi PM", award: "I darajali diplom", icon: "workspace_premium" },
        { id: 2, name: "Mohinur Salomova", school: "Termiz shahridagi PM", award: "I darajali diplom", icon: "workspace_premium" },
        { id: 3, name: "Jahongir Davlatov", school: "Termiz shahridagi PM", award: "I darajali diplom", icon: "workspace_premium" },
        { id: 4, name: "Jasmina Uralova", school: "Termiz shahridagi PM", award: "I darajali diplom", icon: "workspace_premium" },
        { id: 5, name: "Firdavs Xudoyberdiyev", school: "Termiz shahridagi PM", award: "I darajali diplom", icon: "workspace_premium" },
        { id: 6, name: "Madina Mansurova", school: "Termiz shahridagi PM", award: "I darajali diplom", icon: "workspace_premium" },
    ];

    // Fan Olimpiadasi Students Data (Empty state until data is uploaded)
    const fanOlimpiadasiData = [];

    // STEM Olimpiadasi Students Data (Empty state until data is uploaded)
    const stemOlimpiadasiData = [];

    // Color animation helper for filter buttons
    const getButtonStyle = (index, isSelected) => {
        const isDarkBlue = index % 2 === 0;

        if (isSelected) {
            return isDarkBlue
                ? 'bg-[#0a1b3f] text-white shadow-md shadow-blue-950/30 border-[#0a1b3f] scale-[1.01] ring-2 ring-sky-400/40'
                : 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30 border-emerald-500 scale-[1.01] ring-2 ring-emerald-300/40';
        }

        return 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/90 shadow-2xs hover:border-slate-300';
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-[112px] lg:pt-[132px] pb-20 relative overflow-x-hidden font-sans text-slate-800">
            {/* Background Decorative Accents */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,#f1f5f9_100%)] opacity-80 pointer-events-none" />
            <div className="absolute top-40 -left-48 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 -right-48 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-20">
                <PageHeroBanner category="Natijalar" title="Olimpiadalar G'oliblari va Natijalari" />
            </div>

            <main className="max-w-[1400px] mx-auto relative z-10 px-4 md:px-8 pt-6 md:pt-10">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                    
                    {/* ========================================================================= */}
                    {/* LEFT SIDEBAR: Compact & Refined Filter Sidebar */}
                    {/* ========================================================================= */}
                    <aside className="w-full lg:w-[280px] xl:w-[290px] shrink-0 bg-white p-4 rounded-2xl shadow-xs border border-slate-200/80 space-y-4 sticky top-[140px] z-30">
                        <div>
                            <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
                                <h3 className="font-black text-[#0a1b3f] text-base flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-sky-500 text-lg">tune</span>
                                    Filtr
                                </h3>
                                <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-200 uppercase">
                                    Kreativ
                                </span>
                            </div>

                            {/* Compact Creative Filter Buttons */}
                            <div className="space-y-2">
                                {filterButtons.map((btn, index) => {
                                    const isSelected = activeFilter === btn.id;

                                    return (
                                        <button
                                            key={btn.id}
                                            onClick={() => setActiveFilter(btn.id)}
                                            className={`w-full text-left px-2.5 py-2.5 rounded-xl font-bold text-xs border transition-all duration-500 ease-in-out cursor-pointer flex items-center justify-between group ${getButtonStyle(
                                                index,
                                                isSelected
                                            )}`}
                                        >
                                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                                <span className={`material-symbols-outlined text-base shrink-0 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}>
                                                    {btn.icon}
                                                </span>
                                                <span className="leading-tight font-bold break-words">{btn.name}</span>
                                            </div>

                                            {isSelected && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0 ml-1" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Yillar Kesimida Filter Section (2025-2026 o'quv yili) */}
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs text-slate-400">calendar_today</span>
                                Yillar kesimida:
                            </label>
                            
                            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 flex items-center justify-between">
                                <span className="text-xs font-bold text-[#0a1b3f] flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    2025-2026
                                </span>
                                <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                                    Joriy yil
                                </span>
                            </div>
                        </div>
                    </aside>

                    {/* ========================================================================= */}
                    {/* RIGHT MAIN CONTENT AREA */}
                    {/* ========================================================================= */}
                    <div className="flex-1 w-full space-y-8">

                        {/* --------------------------------------------------------------------- */}
                        {/* SECTION 1: XALQARO OLIMPIADA */}
                        {/* --------------------------------------------------------------------- */}
                        {(activeFilter === 'barchasi' || activeFilter === 'xalqaro') && (
                            <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgb(0,0,0,0.03)] space-y-6">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-white flex items-center justify-center shadow-md shrink-0">
                                            <span className="material-symbols-outlined text-2xl">emoji_events</span>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">ENGLISH LANGUAGE OLYMPIAD (ELO)</span>
                                            <h3 className="text-xl md:text-2xl font-black text-[#0a1b3f]">
                                                Xalqaro Ingliz Tili Olimpiadasi G'oliblari
                                            </h3>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setImageModalOpen(true)}
                                        className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-800 hover:bg-amber-500/20 font-extrabold text-xs border border-amber-300/60 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:scale-105"
                                        title="Full screen"
                                    >
                                        <span className="material-symbols-outlined text-lg">fullscreen</span>
                                        <span>Full screen</span>
                                    </button>
                                </div>

                                <div 
                                    onClick={() => setImageModalOpen(true)}
                                    className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group cursor-pointer"
                                >
                                    <img 
                                        src={getAssetPath('/images/olimpiada.jpg')} 
                                        alt="Xalqaro ELO Olimpiadasi G'oliblari" 
                                        className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                                        <div className="px-5 py-2.5 rounded-full bg-white text-slate-900 font-extrabold text-xs shadow-2xl flex items-center gap-2 transform scale-95 group-hover:scale-100 transition-transform">
                                            <span className="material-symbols-outlined text-lg">fullscreen</span>
                                            <span>Full screen ko'rish</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-extrabold text-[#0a1b3f] text-base flex items-center gap-2">
                                            <span className="material-symbols-outlined text-amber-500">stars</span>
                                            Respublika Bosqichi I Darajali Diplom Sohiblari (6 ta o'quvchi)
                                        </h4>
                                        <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">swipe_left</span>
                                            Avto-Slayder
                                        </span>
                                    </div>

                                    <AutoSectionSlider itemCount={2} autoPlayInterval={4000}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {eloWinners.slice(0, 3).map((winner) => (
                                                <div 
                                                    key={winner.id}
                                                    className="bg-gradient-to-br from-slate-900 to-[#0a1b3f] p-5 rounded-2xl border border-white/10 text-white shadow-md flex items-center gap-4 hover:border-amber-400/50 transition-all duration-300"
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-inner">
                                                        <span className="material-symbols-outlined text-2xl">military_tech</span>
                                                    </div>
                                                    <div>
                                                        <h5 className="font-extrabold text-white text-base leading-snug">{winner.name}</h5>
                                                        <p className="text-xs text-slate-300 font-medium">{winner.school}</p>
                                                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-extrabold border border-amber-400/30">
                                                            🏆 {winner.award}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {eloWinners.slice(3, 6).map((winner) => (
                                                <div 
                                                    key={winner.id}
                                                    className="bg-gradient-to-br from-slate-900 to-[#0a1b3f] p-5 rounded-2xl border border-white/10 text-white shadow-md flex items-center gap-4 hover:border-amber-400/50 transition-all duration-300"
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-inner">
                                                        <span className="material-symbols-outlined text-2xl">military_tech</span>
                                                    </div>
                                                    <div>
                                                        <h5 className="font-extrabold text-white text-base leading-snug">{winner.name}</h5>
                                                        <p className="text-xs text-slate-300 font-medium">{winner.school}</p>
                                                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-extrabold border border-amber-400/30">
                                                            🏆 {winner.award}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </AutoSectionSlider>
                                </div>
                            </section>
                        )}

                        {/* --------------------------------------------------------------------- */}
                        {/* SECTION 2: XALQARO OLIMPIADALARGA SARALASH */}
                        {/* --------------------------------------------------------------------- */}
                        {(activeFilter === 'barchasi' || activeFilter === 'saralash') && (
                            <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgb(0,0,0,0.03)] relative overflow-hidden group">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 relative z-10 pb-4 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-[#0a1b3f] text-white flex items-center justify-center shadow-md shrink-0">
                                            <span className="material-symbols-outlined text-2xl">military_tech</span>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">HUDUDIY VA RESPUBLIKA BOSQICHI</span>
                                            <h3 className="text-xl md:text-2xl font-black text-[#0a1b3f]">
                                                Xalqaro Olimpiadalarga Saralash Natijalari
                                            </h3>
                                        </div>
                                    </div>

                                    <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold border border-blue-200">
                                        📄 Rasmiy Bayonnoma PDF
                                    </span>
                                </div>

                                <AutoSectionSlider itemCount={2} autoPlayInterval={4500}>
                                    <div className="bg-gradient-to-br from-slate-900 via-[#0d2142] to-slate-950 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
                                        <div className="space-y-4 max-w-xl relative z-10">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-extrabold border border-sky-400/30">
                                                <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                                                01_olimpiada_hududiy.pdf
                                            </div>

                                            <h4 className="text-2xl font-extrabold text-white leading-tight">
                                                Olimpiada Hududiy va Saralash Bosqichi Yakuniy Hujjatlari
                                            </h4>

                                            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                                                Ushbu hujjatda Termiz shahridagi Prezident maktabi o'quvchilarining Xalqaro olimpiadalarga saralash hamda hududiy bosqichdagi rasmiy ko'rsatkichlari, ballari va bosqichma-bosqich natijalari jamlangan.
                                            </p>

                                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                                <button
                                                    onClick={() => setPdfModalOpen(true)}
                                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-white font-extrabold text-xs md:text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                                                >
                                                    <span className="material-symbols-outlined text-lg">visibility</span>
                                                    Hujjatni Interaktiv Ko'rish
                                                </button>

                                                <a
                                                    href={getAssetPath('/images/01_olimpiada_hududiy.pdf')}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs md:text-sm border border-white/15 transition-all flex items-center gap-2"
                                                >
                                                    <span className="material-symbols-outlined text-lg">download</span>
                                                    PDF Yuklab Olish
                                                </a>
                                            </div>
                                        </div>

                                        <div 
                                            onClick={() => setPdfModalOpen(true)}
                                            className="w-full md:w-56 aspect-[3/4] bg-white rounded-xl shadow-2xl p-4 flex flex-col items-center justify-between text-slate-800 cursor-pointer group/thumb hover:scale-105 transition-all border-4 border-white/20 relative shrink-0"
                                        >
                                            <div className="w-full text-center border-b border-slate-200 pb-2">
                                                <img src="/images/aa1_logo.png" alt="Logo" className="w-8 h-8 object-contain mx-auto mb-1" />
                                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block">TERMİZ PM</span>
                                            </div>

                                            <div className="my-auto text-center space-y-1">
                                                <span className="material-symbols-outlined text-4xl text-sky-600">assignment_turned_in</span>
                                                <div className="text-[10px] font-black text-slate-800 leading-tight">
                                                    HUDUDIY OLIMPIADA BAYONNOMASI
                                                </div>
                                                <span className="text-[8px] font-bold text-slate-400 block">2025-2026 o'quv yili</span>
                                            </div>

                                            <div className="w-full py-1.5 rounded-lg bg-slate-900 text-white text-[9px] font-bold text-center flex items-center justify-center gap-1 group-hover/thumb:bg-sky-500 transition-colors">
                                                <span>Kattalashtirish</span>
                                                <span className="material-symbols-outlined text-xs">zoom_in</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-1">
                                            <span className="text-3xl font-black text-blue-600">100%</span>
                                            <h5 className="font-extrabold text-slate-800 text-xs uppercase">Saralash Qamrovi</h5>
                                            <p className="text-[11px] text-slate-500">Imtiyozli o'quvchilar saralash bosqichidan muvaffaqiyatli o'tdi</p>
                                        </div>
                                        <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-1">
                                            <span className="text-3xl font-black text-emerald-600">12 ta</span>
                                            <h5 className="font-extrabold text-slate-800 text-xs uppercase">Respublika Yo'llanmasi</h5>
                                            <p className="text-[11px] text-slate-500">Iqtidorli o'quvchilarimiz respublika bosqichiga saralandi</p>
                                        </div>
                                        <div className="bg-white p-5 rounded-xl border border-slate-200 text-center space-y-1">
                                            <span className="text-3xl font-black text-amber-500">I daraja</span>
                                            <h5 className="font-extrabold text-slate-800 text-xs uppercase">Diplom Natijasi</h5>
                                            <p className="text-[11px] text-slate-500">Yuqori ball jamlagan o'quvchilar darajasi</p>
                                        </div>
                                    </div>
                                </AutoSectionSlider>
                            </section>
                        )}

                        {/* --------------------------------------------------------------------- */}
                        {/* SECTION 3: FAN OLIMPIADASI (Teacher-Style Student Cards - 5 to 6 per row) */}
                        {/* --------------------------------------------------------------------- */}
                        {((activeFilter === 'barchasi' && fanOlimpiadasiData.length > 0) || activeFilter === 'fan') && (
                            <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgb(0,0,0,0.03)] space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-800 text-white flex items-center justify-center shadow-md shrink-0">
                                        <span className="material-symbols-outlined text-2xl">school</span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">FAN OLIMPIADALARI</span>
                                        <h3 className="text-xl md:text-2xl font-black text-[#0a1b3f]">
                                            Fan Olimpiadalari G'oliblari va Natijalari
                                        </h3>
                                    </div>
                                </div>

                                {fanOlimpiadasiData.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
                                        {fanOlimpiadasiData.map((item) => (
                                            <OlimpiadaStudentCard key={item.id} item={item} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-slate-50/80 rounded-2xl p-10 text-center border border-dashed border-slate-200 space-y-3 my-2">
                                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto shadow-inner">
                                            <span className="material-symbols-outlined text-3xl">folder_off</span>
                                        </div>
                                        <div>
                                            <h4 className="text-base font-extrabold text-[#0a1b3f]">Ma'lumot mavjud emas</h4>
                                            <p className="text-xs text-slate-500 mt-1">Ushbu bo'lim bo'yicha o'quvchilar yutuqlari haqidagi ma'lumotlar hali yuklanmagan.</p>
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* --------------------------------------------------------------------- */}
                        {/* SECTION 4: STEM OLIMPIADASI (Teacher-Style Student Cards - 5 to 6 per row) */}
                        {/* --------------------------------------------------------------------- */}
                        {((activeFilter === 'barchasi' && stemOlimpiadasiData.length > 0) || activeFilter === 'stem') && (
                            <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-[0_10px_30px_rgb(0,0,0,0.03)] space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-md shrink-0">
                                        <span className="material-symbols-outlined text-2xl">science</span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">STEM VA MUHANDISLIK</span>
                                        <h3 className="text-xl md:text-2xl font-black text-[#0a1b3f]">
                                            STEM Olimpiadasi G'oliblari
                                        </h3>
                                    </div>
                                </div>

                                {stemOlimpiadasiData.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
                                        {stemOlimpiadasiData.map((item) => (
                                            <OlimpiadaStudentCard key={item.id} item={item} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-slate-50/80 rounded-2xl p-10 text-center border border-dashed border-slate-200 space-y-3 my-2">
                                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
                                            <span className="material-symbols-outlined text-3xl">folder_off</span>
                                        </div>
                                        <div>
                                            <h4 className="text-base font-extrabold text-[#0a1b3f]">Ma'lumot mavjud emas</h4>
                                            <p className="text-xs text-slate-500 mt-1">Ushbu bo'lim bo'yicha o'quvchilar yutuqlari haqidagi ma'lumotlar hali yuklanmagan.</p>
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}

                    </div>
                </div>
            </main>

            {/* ========================================================================= */}
            {/* FULL-SCREEN RESPONSIVE PDF MODAL PREVIEW */}
            {/* ========================================================================= */}
            {pdfModalOpen && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
                    onClick={() => setPdfModalOpen(false)}
                >
                    <div 
                        className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-700/80 w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden relative z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-5 py-3.5 bg-[#0a1b3f] text-white flex items-center justify-between border-b border-slate-800">
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-sky-400 text-xl">picture_as_pdf</span>
                                <h3 className="font-extrabold text-sm sm:text-base text-white truncate">
                                    Natijalar
                                </h3>
                            </div>

                            <div className="flex items-center gap-2">
                                <a 
                                    href={getAssetPath('/images/01_olimpiada_hududiy.pdf')} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/10 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                    <span className="hidden sm:inline">Yangi oynada ochish</span>
                                </a>
                                <button 
                                    onClick={() => setPdfModalOpen(false)}
                                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 bg-slate-950 p-2 sm:p-4 overflow-hidden relative flex flex-col">
                            <iframe 
                                src={`${getAssetPath('/images/01_olimpiada_hududiy.pdf')}#view=FitH&toolbar=0&navpanes=0`} 
                                className="w-full h-full rounded-2xl border-none shadow-2xl bg-white"
                                title="Olimpiada Hududiy PDF"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* IMAGE LIGHTBOX MODAL */}
            {/* ========================================================================= */}
            {imageModalOpen && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
                    onClick={() => setImageModalOpen(false)}
                >
                    <div 
                        className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setImageModalOpen(false)}
                            className="absolute -top-12 right-0 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center gap-1 cursor-pointer"
                        >
                            <span>Yopish</span> ✕
                        </button>
                        <img 
                            src={getAssetPath('/images/olimpiada.jpg')} 
                            alt="ELO Olimpiadasi Banneri" 
                            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
