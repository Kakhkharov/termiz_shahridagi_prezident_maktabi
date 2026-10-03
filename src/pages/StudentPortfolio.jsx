import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PageHeroBanner from '../components/PageHeroBanner';

const Reveal = ({ children, delay = 0, className = "", type = "fade-up" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    const getInitialClasses = () => {
        switch (type) {
            case "fade-left": return "opacity-0 -translate-x-8";
            case "fade-right": return "opacity-0 translate-x-8";
            case "fade-up":
            default: return "opacity-0 translate-y-8";
        }
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0 translate-x-0" : getInitialClasses()} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// All achievement cards are for 2026-yil
const achievements = [
    // =========================================================================
    // YANGI O'ZBEKISTON UNIVERSITETI - 6 YILLIK TIBBIYOT DOKTORI (100% GRANT - 5 NAFAR O'QUVCHI)
    // =========================================================================
    {
      id: 10,
      year: "2026",
      tags: ["#2026", "#100_FOIZLIK_GRANT", "#YangiUzbekistonUniversiteti"],
      supertitle: "⚡ YANGI O'ZBEKISTON UNIVERSITETI — 100% GRANT",
      name: "Xudoyberdiyev Firdavs Suxrob o'g'li",
      description: "Termiz shahridagi Prezident maktabi bitiruvchisi Xudoyberdiyev Firdavs Suxrob o'g'li Yangi O'zbekiston universitetining 6 yillik “Tibbiyot Doktori” (Doctor of Medicine) dasturiga 100% GRANT asosida o'qishga qabul qilindi!",
      quote: "Ushbu ta'lim dasturi Germaniyaning eng nufuzli va peshqadam tibbiyot maskanlaridan biri — Stern reytingiga ko'ra 2-o'rindagi Freiburg universiteti klinikasi, TUM (Myunxen texnika universiteti) hamda Heidelberg universiteti kabi nufuzli universitetlar bilan yaqin hamkorlikda yo'lga qo'yilgan.",
      extra: "Talabalar Yevropa standartlariga to'liq javob beruvchi zamonaviy simulyatsion markazlar hamda so'nggi texnologiyalar bilan jihozlangan laboratoriyalarda chuqurlashtirilgan klinik tayyorgarlikdan o'tadilar.",
      icon: "🩺"
    },
    {
      id: 11,
      year: "2026",
      tags: ["#2026", "#100_FOIZLIK_GRANT", "#YangiUzbekistonUniversiteti"],
      supertitle: "⚡ YANGI O'ZBEKISTON UNIVERSITETI — 100% GRANT",
      name: "Choriyeva Hurzoda Sanjar qizi",
      description: "Termiz shahridagi Prezident maktabi bitiruvchisi Choriyeva Hurzoda Sanjar qizi Yangi O'zbekiston universitetining 6 yillik “Tibbiyot Doktori” (Doctor of Medicine) dasturiga 100% GRANT asosida o'qishga qabul qilindi!",
      quote: "Ushbu ta'lim dasturi Germaniyaning eng nufuzli va peshqadam tibbiyot maskanlaridan biri — Stern reytingiga ko'ra 2-o'rindagi Freiburg universiteti klinikasi, TUM (Myunxen texnika universiteti) hamda Heidelberg universiteti kabi nufuzli universitetlar bilan yaqin hamkorlikda yo'lga qo'yilgan.",
      extra: "Talabalar Yevropa standartlariga to'liq javob beruvchi zamonaviy simulyatsion markazlar hamda so'nggi texnologiyalar bilan jihozlangan laboratoriyalarda chuqurlashtirilgan klinik tayyorgarlikdan o'tadilar.",
      icon: "👩‍⚕️"
    },
    {
      id: 12,
      year: "2026",
      tags: ["#2026", "#100_FOIZLIK_GRANT", "#YangiUzbekistonUniversiteti"],
      supertitle: "⚡ YANGI O'ZBEKISTON UNIVERSITETI — 100% GRANT",
      name: "Eshkobilova Moxichexra Anvarovna",
      description: "Termiz shahridagi Prezident maktabi bitiruvchisi Eshkobilova Moxichexra Anvarovna Yangi O'zbekiston universitetining 6 yillik “Tibbiyot Doktori” (Doctor of Medicine) dasturiga 100% GRANT asosida o'qishga qabul qilindi!",
      quote: "Ushbu ta'lim dasturi Germaniyaning eng nufuzli va peshqadam tibbiyot maskanlaridan biri — Stern reytingiga ko'ra 2-o'rindagi Freiburg universiteti klinikasi, TUM (Myunxen texnika universiteti) hamda Heidelberg universiteti kabi nufuzli universitetlar bilan yaqin hamkorlikda yo'lga qo'yilgan.",
      extra: "Talabalar Yevropa standartlariga to'liq javob beruvchi zamonaviy simulyatsion markazlar hamda so'nggi texnologiyalar bilan jihozlangan laboratoriyalarda chuqurlashtirilgan klinik tayyorgarlikdan o'tadilar.",
      icon: "👩‍⚕️"
    },
    {
      id: 13,
      year: "2026",
      tags: ["#2026", "#100_FOIZLIK_GRANT", "#YangiUzbekistonUniversiteti"],
      supertitle: "⚡ YANGI O'ZBEKISTON UNIVERSITETI — 100% GRANT",
      name: "Tursunpo'latov Muzrob o'g'li",
      description: "Termiz shahridagi Prezident maktabi bitiruvchisi Tursunpo'latov Muzrob o'g'li Yangi O'zbekiston universitetining 6 yillik “Tibbiyot Doktori” (Doctor of Medicine) dasturiga 100% GRANT asosida o'qishga qabul qilindi!",
      quote: "Ushbu ta'lim dasturi Germaniyaning eng nufuzli va peshqadam tibbiyot maskanlaridan biri — Stern reytingiga ko'ra 2-o'rindagi Freiburg universiteti klinikasi, TUM (Myunxen texnika universiteti) hamda Heidelberg universiteti kabi nufuzli universitetlar bilan yaqin hamkorlikda yo'lga qo'yilgan.",
      extra: "Talabalar Yevropa standartlariga to'liq javob beruvchi zamonaviy simulyatsion markazlar hamda so'nggi texnologiyalar bilan jihozlangan laboratoriyalarda chuqurlashtirilgan klinik tayyorgarlikdan o'tadilar.",
      icon: "👨‍⚕️"
    },
    {
      id: 14,
      year: "2026",
      tags: ["#2026", "#100_FOIZLIK_GRANT", "#YangiUzbekistonUniversiteti"],
      supertitle: "⚡ YANGI O'ZBEKISTON UNIVERSITETI — 100% GRANT",
      name: "Xo'janov Shohjahon Muzaffarovich",
      description: "Termiz shahridagi Prezident maktabi bitiruvchisi Xo'janov Shohjahon Muzaffarovich Yangi O'zbekiston universitetining 6 yillik “Tibbiyot Doktori” (Doctor of Medicine) dasturiga 100% GRANT asosida o'qishga qabul qilindi!",
      quote: "Ushbu ta'lim dasturi Germaniyaning eng nufuzli va peshqadam tibbiyot maskanlaridan biri — Stern reytingiga ko'ra 2-o'rindagi Freiburg universiteti klinikasi, TUM (Myunxen texnika universiteti) hamda Heidelberg universiteti kabi nufuzli universitetlar bilan yaqin hamkorlikda yo'lga qo'yilgan.",
      extra: "Talabalar Yevropa standartlariga to'liq javob beruvchi zamonaviy simulyatsion markazlar hamda so'nggi texnologiyalar bilan jihozlangan laboratoriyalarda chuqurlashtirilgan klinik tayyorgarlikdan o'tadilar.",
      icon: "👨‍⚕️"
    },
    // =========================================================================
    // OTHER 2026 INTERNATIONAL ADMISSIONS & SCHOLARSHIPS
    // =========================================================================
    {
      id: 1,
      year: "2026",
      tags: ["#2026", "#EYUF"],
      supertitle: "⚡ El-yurt umidi stipendiyasi",
      name: "Choriyeva Hurzoda Sanjar qizi",
      description: "Termiz shahridagi Prezident maktabi bitiruvchisi Choriyeva Hurzoda Sanjar qizi “El-yurt umidi” jamg'armasining ta'lim dasturlari bo'yicha 2026-yilgi 1-ochiq stipendiyasini qo'lga kiritdi. Endilikda Hurzoda Buyuk Britaniyaning nufuzli universitetlaridan hisoblangan Lids universitetining biotibbiyot yo'nalishida o'qishni davom ettiradi.",
      quote: "Lids universiteti milliy va xalqaro miqyosda mustahkam o'rin egallagan bo'lib, jahon universitetlari reytingida (2026-yil holatiga ko'ra) Buyuk Britaniyada 12-o'rinda, dunyo bo'yicha esa 77-o'rinda turadi.",
      extra: "",
      icon: "🤩"
    },
    {
      id: 2,
      year: "2026",
      tags: ["#2026", "#EYUF"],
      supertitle: "⚡ El-yurt umidi stipendiyasi",
      name: "Xolmirzayev Sanjar Boburovich",
      description: "Termiz shahridagi Prezident maktabi bitiruvchisi Xolmirzayev Sanjar Boburovich “El-yurt umidi” jamg'armasining ta'lim dasturlari bo'yicha stipendiyasini qo'lga kiritgan. Endilikda Sanjar Buyuk Britaniyaning nufuzli universitetlaridan hisoblangan Kardiff universitetining kiberxavfsizlik yo'nalishida o'qishni davom ettiradi.",
      quote: "Kardiff universiteti milliy va xalqaro miqyosda mustahkam o'rin egallagan bo'lib, jahon universitetlari reytingida Buyuk Britaniyada 26-o'rinda, dunyo bo'yicha esa 179-o'rinda turadi.",
      extra: "",
      icon: "🤩"
    },
    {
      id: 3,
      year: "2026",
      tags: ["#2026", "#100_FOIZLIK_GRANT"],
      supertitle: "⚡ PREZIDENT MAKTABIDAN AQShning NUFUZLI OLIYGOHIGACHA",
      name: "Xoliyarov Javohir Erkinovich",
      description: "Termiz shahridagi Prezident maktabi bitiruvchisi Xoliyarov Javohir Erkinovich AQShning Top-126 Liberal Arts Colleges qatoriga kiruvchi Roanoke College universitetiga 150.000 AQSh dollari miqdoridagi 100 foizlik grant asosida o'qishga qabul qilindi.",
      quote: "Roanoke College — AQShning Virjiniya shtatida joylashgan yetakchi oliy ta'lim muassasalaridan biri bo'lib, 1842-yilda tashkil etilgan. Kollej zamonaviy akademik fanlar asosida puxta ta'lim tizimi bilan tanilgan.",
      extra: "",
      icon: "🤩"
    },
    {
      id: 4,
      year: "2026",
      tags: ["#2026", "#100_FOIZLIK_GRANT"],
      supertitle: "⚡ Prezident maktabidan nufuzli oliygohgacha",
      name: "Norboyev Nurbek Bo'ri O'g'li",
      description: "Termiz shahridagi Prezident maktabining 11-sinf o'quvchisi Norboyev Nurbek Bo'ri O'g'li City University Malaysia ga 100 foizlik to'liq grant asosida o'qishga qabul qilindi!",
      quote: "City University Malaysia — Malayziyada joylashgan nufuzli xususiy universitetlardan biri bo'lib, 1984-yilda tashkil etilgan. Universitet zamonaviy ta'lim dasturlari va xalqaro akademik muhit bilan ajralib turadi.",
      extra: "Norboyev Nurbek kelgusida Biznes boshqaruvi yo'nalishida yanada yuqori natijalarga erishib, mamlakatimiz taraqqiyotiga hissa qo'shadi.",
      icon: "🤩"
    },
    {
      id: 5,
      year: "2026",
      tags: ["#2026", "#100_FOIZLIK_GRANT"],
      supertitle: "⚡ Prezident maktabidan nufuzli oliygohgacha",
      name: "Xurramov Asliddin Sharofutdin o'g'li",
      description: "Termiz shahridagi Prezident maktabining bitiruvchisi Xurramov Asliddin Sharofutdin o'g'li dunyo reytingida 107-o'rinda turuvchi Qirol Saud Universiteti (King Saud University) ga 100 foizlik to'liq grant asosida o'qishga qabul qilindi!",
      quote: "King Saud University (KSU) — Saudiya Arabistonining poytaxti Ar-Riyod shahrida joylashgan bo'lib, mamlakatdagi eng nufuzli ilk universitet hisoblanadi.",
      extra: "",
      icon: "🤩"
    },
    {
      id: 6,
      year: "2026",
      tags: ["#2026", "#OLIYGOHGA_QABUL"],
      supertitle: "⚡ PREZIDENT MAKTABIDAN OSIYONING NUFUZLI OLIYGOHIGACHA",
      name: "Jumayev Zuxriddin Ikromjon o'g'li",
      description: "Termiz shahridagi Prezident maktabi bitiruvchisi Jumayev Zuxriddin Ikromjon o'g'li Malayziyaning eng nufuzli oliygohi – Utara universitetining xalqaro biznes boshqaruv yo'nalishiga o'qishga qabul qilindi.",
      quote: "Universiti Utara Malaysia (UUM) - Malayziyaning nufuzli oliygohlaridan biri bo'lib, 1984-yilda tashkil etilgan. U asosan menejment, biznes, iqtisodiyot, axborot texnologiyalari va aloqa kabi sohalarda kuchli ta'lim va ilmiy izlanishlar olib borishga yo'naltirilgan.",
      extra: "",
      icon: "🎓"
    },
    {
      id: 7,
      year: "2026",
      tags: ["#2026", "#100_FOIZLIK_GRANT"],
      supertitle: "⚡ Prezident maktabidan nufuzli oliygohgacha",
      name: "Avazov Ismoil Akmal o'g'li",
      description: "Termiz shahridagi Prezident maktabining 11-sinf o'quvchisi Avazov Ismoil Akmal o'g'li dunyo reytingida 163-o'rinda turuvchi King Abdulaziz universitetiga 100 foizlik to'liq grant asosida o'qishga qabul qilindi!",
      quote: "King Abdulaziz universiteti (KAU) — Yaqin Sharq va xalqaro miqyosdagi eng yetakchi oliy ta'lim muassasalaridan biridir.",
      extra: "",
      icon: "🤩"
    },
    {
      id: 8,
      year: "2026",
      tags: ["#2026", "#100_FOIZLIK_GRANT"],
      supertitle: "⚡ PREZIDENT MAKTABIDAN AQShning NUFUZLI OLIYGOHIGACHA",
      name: "Madiyev Sardor Kenja o'g'li",
      description: "Termiz shahridagi Prezident maktabining o'quvchisi Madiyev Sardor Kenja o'g'li AQShning Top-126 Liberal Arts Colleges qatoriga kiruvchi Roanoke College universitetiga 189.000 AQSh dollari miqdoridagi 100 foizlik grant asosida o'qishga qabul qilindi.",
      quote: "Roanoke College — AQShning Virjiniya shtatida joylashgan yetakchi oliy ta'lim muassasalaridan biridir.",
      extra: "",
      icon: "🤩"
    },
    {
      id: 9,
      year: "2026",
      tags: ["#2026", "#100_FOIZLIK_GRANT"],
      supertitle: "⚡ PREZIDENT MAKTABIDAN AQShning NUFUZLI OLIYGOHIGACHA",
      name: "Toshmuratov Alibek Sobir o'g'li",
      description: "Termiz shahridagi Prezident maktabi bitiruvchisi Toshmuratov Alibek Sobir o'g'li AQShning nufuzli Texas A&M universitetiga Kompyuter muhandisligi yo'nalishi bo'yicha grant asosida o'qishga qabul qilindi.",
      quote: "Texas A&M University — AQShning eng yirik va kuchli tadqiqot universitetlaridan biri hisoblanadi.",
      extra: "",
      icon: "🤩"
    }
];

const PortfolioCard = ({ item, index }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* The Uniform Card */}
            <Reveal type="fade-up" delay={index * 80} className="h-full">
                <div className="relative bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 p-5 md:p-6 rounded-[1.5rem] flex flex-col h-full group hover:-translate-y-1">
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.map(tag => {
                            const isYearTag = tag.startsWith('#20');
                            return (
                                <span 
                                    key={tag} 
                                    className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-md tracking-wider border ${
                                        isYearTag 
                                            ? 'bg-cyan-50 text-cyan-600 border-cyan-200 shadow-sm' 
                                            : 'bg-sky-50 text-sky-600 border-sky-100/50'
                                    }`}
                                >
                                    {tag}
                                </span>
                            );
                        })}
                    </div>

                    {/* Icon & Name */}
                    <div className="flex flex-col gap-2.5 mb-4">
                        <div className="w-12 h-12 rounded-full bg-slate-50 text-sky-600 flex items-center justify-center text-xl shrink-0 border border-slate-100 shadow-xs">
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="text-[16px] md:text-[18px] font-black text-slate-800 tracking-tight leading-tight">
                                {item.name}
                            </h3>
                            <div className="text-slate-400 font-bold text-[9px] md:text-[10px] uppercase tracking-wider mt-1">
                                {item.supertitle}
                            </div>
                        </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-[13px] md:text-[14px] text-slate-600 leading-[1.6] font-medium mb-6 line-clamp-4 flex-grow">
                        {item.description}
                    </p>

                    {/* Button */}
                    <div className="mt-auto pt-4 border-t border-slate-100">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-800 text-slate-700 hover:text-white font-bold text-[13px] transition-colors border border-slate-200 group/btn shadow-sm cursor-pointer"
                        >
                            <span>Batafsil O'qish</span>
                            <span className="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-1">
                                arrow_forward
                            </span>
                        </button>
                    </div>
                </div>
            </Reveal>

            {/* The Modal */}
            {isModalOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    
                    {/* Modal Content */}
                    <div className="relative bg-white w-full max-w-2xl rounded-[2rem] p-6 md:p-10 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto custom-scrollbar z-10 flex flex-col">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-5 right-5 md:top-8 md:right-8 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors shrink-0 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>

                        <div className="flex flex-col md:flex-row md:items-center gap-5 mb-8 mt-2 pr-12 md:pr-0">
                            <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center text-3xl shrink-0 border border-sky-100 hidden md:flex">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight mb-2.5">
                                    {item.name}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map(tag => {
                                        const isYearTag = tag.startsWith('#20');
                                        return (
                                            <span 
                                                key={tag} 
                                                className={`px-3 py-1 text-[11px] font-bold uppercase rounded-full tracking-wider border ${
                                                    isYearTag 
                                                        ? 'bg-cyan-50 text-cyan-600 border-cyan-200' 
                                                        : 'bg-sky-50 text-sky-600 border-sky-100'
                                                }`}
                                            >
                                                {tag}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <p className="text-[16px] md:text-[17px] text-slate-600 leading-[1.7] font-medium mb-8">
                            {item.description}
                        </p>

                        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border-l-[4px] border-slate-800 relative mb-6">
                            <span className="absolute -left-4 -top-6 text-6xl text-slate-200 font-serif">"</span>
                            <p className="italic text-slate-700 text-[15px] md:text-[16px] leading-[1.7] font-medium relative z-10">
                                {item.quote}
                            </p>
                        </div>
                        
                        {item.extra && (
                            <div className="flex gap-4 items-start bg-amber-50 p-5 rounded-2xl border border-amber-100/60 mb-2">
                                <span className="text-2xl animate-pulse mt-0.5">✨</span>
                                <p className="text-[14px] md:text-[15px] text-slate-700 font-semibold leading-relaxed">
                                    {item.extra}
                                </p>
                            </div>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default function StudentPortfolio() {
    const [activeYear, setActiveYear] = useState('all');

    const yearFilters = [
        { id: 'all', label: 'Barcha yillar' },
        { id: '2026', label: '2026-yil' },
        { id: '2025', label: '2025-yil' },
        { id: '2024', label: '2024-yil' }
    ];

    const filteredAchievements = activeYear === 'all'
        ? achievements
        : achievements.filter(item => item.year === activeYear);

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 pt-[112px] lg:pt-[132px] pb-32 relative overflow-hidden font-sans">
            
            {/* Minimalistic Light Background Effects */}
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-200/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-20 left-[-10%] w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-20">
                <PageHeroBanner category="O'quvchi portfoliosi" title="Bilim Bilan Dunyoni Zabt Etayotganlar" />
            </div>

            <main className="max-w-[1200px] mx-auto relative z-10 px-4 md:px-8 mt-8">
                
                {/* Interactive Year Filter Buttons Bar */}
                <div className="flex items-center justify-center flex-wrap gap-2 md:gap-3 mb-10 bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-slate-200/80 shadow-sm max-w-fit mx-auto">
                    {yearFilters.map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveYear(filter.id)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                                activeYear === filter.id
                                    ? 'bg-[#0088cc] text-white shadow-md shadow-sky-500/25 scale-105'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
                    {filteredAchievements.map((item, index) => (
                        <PortfolioCard key={item.id} item={item} index={index} />
                    ))}
                </div>

                {filteredAchievements.length === 0 && (
                    <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-sm my-6 max-w-xl mx-auto">
                        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-3xl">folder_off</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-1">Ma'lumot topilmadi</h3>
                        <p className="text-slate-500 font-bold text-sm">
                            {activeYear}-o'quv yili bo'yicha ma'lumotlar mavjud emas
                        </p>
                    </div>
                )}

            </main>
        </div>
    );
}
