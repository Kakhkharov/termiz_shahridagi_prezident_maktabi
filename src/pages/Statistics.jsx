import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeroBanner from '../components/PageHeroBanner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

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
            case "fade-left": return "opacity-0 -translate-x-12";
            case "fade-right": return "opacity-0 translate-x-12";
            case "zoom-in": return "opacity-0 scale-95";
            case "fade-up":
            default: return "opacity-0 translate-y-12";
        }
    };

    const getFinalClasses = () => {
        switch (type) {
            case "fade-left": 
            case "fade-right": return "opacity-100 translate-x-0";
            case "zoom-in": return "opacity-100 scale-100";
            case "fade-up":
            default: return "opacity-100 translate-y-0";
        }
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-[800ms] ease-out ${
                isVisible ? getFinalClasses() : getInitialClasses()
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// Animated Progress Bar Component for Grade Counts
const GradeProgressBar = ({ label, count, total, colorGradient, icon = null, delay = 0 }) => {
    const [width, setWidth] = useState(0);
    const ref = useRef(null);
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setWidth(percentage);
                    }, delay);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, [percentage, delay]);

    return (
        <div ref={ref} className="space-y-2">
            <div className="flex justify-between items-center text-sm font-bold">
                <div className="flex items-center gap-2 text-slate-800">
                    <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-xs">
                        {label === 'A*' ? 'A' : label}
                        {icon && <span className="material-symbols-outlined text-amber-300 text-xs ml-0.5 animate-pulse">star</span>}
                    </span>
                    <span className="font-extrabold text-slate-700 flex items-center gap-1">
                        {label === 'A*' ? (
                            <>A <span className="material-symbols-outlined text-amber-400 text-sm">star</span> daraja</>
                        ) : (
                            `${label} daraja`
                        )}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-black text-xs">
                        {count} ta o'quvchi
                    </span>
                    <span className="text-xs font-mono text-slate-400 w-12 text-right">
                        {percentage}%
                    </span>
                </div>
            </div>

            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/80 shadow-inner">
                <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${colorGradient}`}
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
};

export default function Statistics() {
    const [selectedLevelTab, setSelectedLevelTab] = useState("all");

    // Historical Data for SAT
    const satHistoricalData = [
        { year: '2023', '1400+': 2, '1300-1400': 5, '1200-1300': 4, '<1200': 1 },
        { year: '2024', '1400+': 4, '1300-1400': 6, '1200-1300': 7, '<1200': 2 },
        { year: '2025', '1400+': 5, '1300-1400': 8, '1200-1300': 8, '<1200': 1 },
    ];

    // Historical Data for IELTS
    const ieltsHistoricalData = [
        { year: '2023', '7.5+': 1, '7.0': 8, '6.5': 5, '<6.5': 2 },
        { year: '2024', '7.5+': 2, '7.0': 12, '6.5': 4, '<6.5': 1 },
        { year: '2025', '7.5+': 2, '7.0': 16, '6.5': 3, '<6.5': 1 },
    ];

    // Cambridge Grade Distribution Dataset
    const aLevelGrades = { 'A*': 1, 'A': 14, 'B': 20, 'C': 21, 'D': 6, 'E': 1, total: 63 };
    const asLevelGrades = { 'A*': 0, 'A': 32, 'B': 15, 'C': 17, 'D': 5, 'E': 0, total: 69 };
    const combinedGrades = { 
        'A*': 1, 
        'A': 46, 
        'B': 35, 
        'C': 38, 
        'D': 11, 
        'E': 1, 
        total: 132 
    };

    const grantWinners = [
        { id: 1, name: "Avazov Ismoil Akmal o'g'li", country: "Saudiya Arabistoni", uni: "King Abdulaziz University", amount: "120 000", year: "2025-2026 o'quv yili" },
        { id: 2, name: "Madiev Sardor Kenja o'g'li", country: "Amerika Qo'shma Shtatlari", uni: "Roanoke College", amount: "150 000", year: "2025-2026 o'quv yili" },
        { id: 3, name: "Xurramov Asliddin Sharofutdin o'g'li", country: "Saudiya Arabistoni", uni: "King Saud University", amount: "220 000", year: "2025-2026 o'quv yili" },
        { id: 4, name: "Xoliyarov Javoxir Erkinovich", country: "Amerika Qo'shma Shtatlari", uni: "Roanoke College", amount: "150 000", year: "2025-2026 o'quv yili" },
        { id: 5, name: "Norboev Nurbek Bo'ri o'g'li", country: "Malayziya", uni: "City University Malaysia", amount: "36 000", year: "2025-2026 o'quv yili" },
    ];

    const currentDisplayGrades = selectedLevelTab === 'aLevel' 
        ? aLevelGrades 
        : selectedLevelTab === 'asLevel' 
            ? asLevelGrades 
            : combinedGrades;

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-[112px] lg:pt-[132px] pb-24 relative overflow-x-hidden text-slate-800 font-sans">
            {/* Orqa fon dekorativ shakllari */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,#ffffff_0%,#f1f5f9_100%)] opacity-80 pointer-events-none" />
            <div className="absolute top-40 -left-64 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 -right-40 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-20">
                <PageHeroBanner category="Statistikalar" title="Maktab statistikasi" />
            </div>

            <main className="max-w-[1400px] mx-auto relative z-10 px-4 md:px-8 pt-8 md:pt-12 flex flex-col gap-12 md:gap-16">

                {/* ========================================================================= */}
                {/* SECTION 1: IELTS & SAT Natijalari (Diagrammalar) */}
                {/* ========================================================================= */}
                <section>
                    <Reveal type="fade-up">
                        <div className="flex flex-col items-center mb-12">
                            <span className="text-[#0088cc] font-bold tracking-wider uppercase text-sm mb-2">Yillar kesimida dinamika</span>
                            <h2 className="text-3xl md:text-4xl font-black text-[#0a1b3f] text-center">
                                Bitiruvchilarimizning Sertifikat Natijalari
                            </h2>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-sky-400 to-indigo-600 rounded-full mt-6"></div>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
                        {/* SAT Chart */}
                        <Reveal type="fade-right" delay={100} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl text-indigo-600">functions</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-[#0a1b3f]">SAT O'sish Dinamikasi</h3>
                                    <p className="text-slate-500 font-medium mt-0.5">Yillar bo'yicha natijalar taqqoslanishi</p>
                                </div>
                            </div>
                            
                            <div className="w-full h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={satHistoricalData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 600}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}
                                            cursor={{fill: '#f8fafc'}}
                                        />
                                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                        <Bar dataKey="1400+" name="1400+ ball" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                                        <Bar dataKey="1300-1400" name="1300-1400 ball" stackId="a" fill="#3b82f6" />
                                        <Bar dataKey="1200-1300" name="1200-1300 ball" stackId="a" fill="#6366f1" />
                                        <Bar dataKey="<1200" name="1200 gacha" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Reveal>

                        {/* IELTS Chart */}
                        <Reveal type="fade-left" delay={200} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-sky-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl text-sky-600">language</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-[#0a1b3f]">IELTS O'sish Dinamikasi</h3>
                                    <p className="text-slate-500 font-medium mt-0.5">Yillar bo'yicha natijalar taqqoslanishi</p>
                                </div>
                            </div>
                            
                            <div className="w-full h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={ieltsHistoricalData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 600}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}
                                            cursor={{fill: '#f8fafc'}}
                                        />
                                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                        <Bar dataKey="7.5+" name="7.5+ ball" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                                        <Bar dataKey="7.0" name="7.0 ball" stackId="a" fill="#3b82f6" />
                                        <Bar dataKey="6.5" name="6.5 ball" stackId="a" fill="#6366f1" />
                                        <Bar dataKey="<6.5" name="6.5 gacha" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ========================================================================= */}
                {/* SECTION 2: CAMBRIDGE A-LEVEL & AS-LEVEL ANIMATED PROGRESS DIAGRAM (NEW) */}
                {/* ========================================================================= */}
                <section className="scroll-mt-32">
                    <Reveal type="fade-up">
                        <div className="flex flex-col items-center mb-10 text-center">
                            <span className="text-emerald-500 font-extrabold tracking-widest uppercase text-xs mb-2 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                                CAMBRIDGE ASSESSMENT INTERNATIONAL EDUCATION
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-[#0a1b3f]">
                                A-Level & AS-Level Imtihon Natijalari Statistikasi
                            </h2>
                            <p className="text-slate-500 text-sm md:text-base mt-3 max-w-3xl leading-relaxed">
                                O'quvchilarimiz erishgan A*, A, B, C, D, E baholarining soni va foizlar shaklidagi taqsimoti
                            </p>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-indigo-600 rounded-full mt-5"></div>
                        </div>
                    </Reveal>

                    {/* Cambridge Level Standard Guide Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                        <Reveal type="fade-right" delay={100} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 font-black text-lg flex items-center justify-center shrink-0">
                                11
                            </div>
                            <div>
                                <h4 className="font-extrabold text-[#0a1b3f] text-base">A-Level Imtihoni</h4>
                                <p className="text-xs text-slate-500 font-medium">11-sinf o'quvchilari uchun mo'ljallangan chuqurlashtirilgan xalqaro imtihon.</p>
                            </div>
                        </Reveal>

                        <Reveal type="fade-up" delay={200} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 font-black text-lg flex items-center justify-center shrink-0">
                                10
                            </div>
                            <div>
                                <h4 className="font-extrabold text-[#0a1b3f] text-base">AS-Level Imtihoni</h4>
                                <p className="text-xs text-slate-500 font-medium">10-sinf o'quvchilari uchun mo'ljallangan dastlabki bosqich xalqaro imtihon.</p>
                            </div>
                        </Reveal>

                        <Reveal type="fade-left" delay={300} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 font-black text-lg flex items-center justify-center shrink-0">
                                9
                            </div>
                            <div>
                                <h4 className="font-extrabold text-[#0a1b3f] text-base">IGCSE Imtihoni</h4>
                                <p className="text-xs text-slate-500 font-medium">9-sinf o'quvchilari uchun mo'ljallangan bazaviy xalqaro sertifikatlash imtihonlari.</p>
                            </div>
                        </Reveal>
                    </div>

                    {/* Main Progress Diagram Container */}
                    <Reveal type="fade-up" delay={150} className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-[0_12px_40px_rgb(0,0,0,0.05)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-bl-full pointer-events-none -z-0"></div>

                        {/* Top Level Filter Tabs */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8 relative z-10">
                            <div>
                                <h3 className="text-xl md:text-2xl font-extrabold text-[#0a1b3f] flex items-center gap-2">
                                    <span className="material-symbols-outlined text-emerald-500 text-2xl">analytics</span>
                                    Baholar Taqsimoti Diagrammasi
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">Jami olingan natijalar soni: <strong className="text-slate-800">{currentDisplayGrades.total} ta imtihon fani</strong></p>
                            </div>

                            {/* Level Switcher Buttons */}
                            <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                                <button
                                    onClick={() => setSelectedLevelTab("all")}
                                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                                        selectedLevelTab === "all"
                                            ? "bg-white text-[#0a1b3f] shadow-md"
                                            : "text-slate-600 hover:text-slate-900"
                                    }`}
                                >
                                    Barchasi (A & AS Level)
                                </button>
                                <button
                                    onClick={() => setSelectedLevelTab("aLevel")}
                                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                                        selectedLevelTab === "aLevel"
                                            ? "bg-white text-emerald-600 shadow-md"
                                            : "text-slate-600 hover:text-slate-900"
                                    }`}
                                >
                                    A-Level (11-sinf)
                                </button>
                                <button
                                    onClick={() => setSelectedLevelTab("asLevel")}
                                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                                        selectedLevelTab === "asLevel"
                                            ? "bg-white text-blue-600 shadow-md"
                                            : "text-slate-600 hover:text-slate-900"
                                    }`}
                                >
                                    AS-Level (10-sinf)
                                </button>
                            </div>
                        </div>

                        {/* Grade Summary Key Metrics Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10 relative z-10">
                            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-4 rounded-2xl text-white shadow-md flex flex-col justify-between">
                                <div className="flex items-center justify-between text-xs font-bold text-emerald-100">
                                    <span className="flex items-center gap-1">A <span className="material-symbols-outlined text-amber-300 text-sm">star</span> DARAJA</span>
                                    <span className="material-symbols-outlined text-amber-300 text-base">star</span>
                                </div>
                                <div className="text-3xl font-black mt-2">{currentDisplayGrades['A*']} <span className="text-xs font-normal opacity-80">ta</span></div>
                            </div>

                            <div className="bg-emerald-500 p-4 rounded-2xl text-white shadow-md flex flex-col justify-between">
                                <span className="text-xs font-bold text-emerald-100">A DARAJA</span>
                                <div className="text-3xl font-black mt-2">{currentDisplayGrades['A']} <span className="text-xs font-normal opacity-80">ta</span></div>
                            </div>

                            <div className="bg-amber-500 p-4 rounded-2xl text-white shadow-md flex flex-col justify-between">
                                <span className="text-xs font-bold text-amber-100">B DARAJA</span>
                                <div className="text-3xl font-black mt-2">{currentDisplayGrades['B']} <span className="text-xs font-normal opacity-80">ta</span></div>
                            </div>

                            <div className="bg-yellow-400 p-4 rounded-2xl text-slate-950 shadow-md flex flex-col justify-between">
                                <span className="text-xs font-bold text-slate-700">C DARAJA</span>
                                <div className="text-3xl font-black mt-2">{currentDisplayGrades['C']} <span className="text-xs font-normal opacity-80">ta</span></div>
                            </div>

                            <div className="bg-sky-500 p-4 rounded-2xl text-white shadow-md flex flex-col justify-between">
                                <span className="text-xs font-bold text-sky-100">D DARAJA</span>
                                <div className="text-3xl font-black mt-2">{currentDisplayGrades['D']} <span className="text-xs font-normal opacity-80">ta</span></div>
                            </div>

                            <div className="bg-indigo-600 p-4 rounded-2xl text-white shadow-md flex flex-col justify-between">
                                <span className="text-xs font-bold text-indigo-100">E DARAJA</span>
                                <div className="text-3xl font-black mt-2">{currentDisplayGrades['E']} <span className="text-xs font-normal opacity-80">ta</span></div>
                            </div>
                        </div>

                        {/* Animated Ustunli Diagramma (Vertical Bar Chart) */}
                        <div className="relative z-10 bg-slate-50/70 p-6 md:p-8 rounded-2xl border border-slate-200">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-extrabold text-[#0a1b3f] text-sm md:text-base flex items-center gap-2">
                                    <span className="material-symbols-outlined text-emerald-500">bar_chart</span>
                                    Baholar Taqsimoti Ustunli Diagrammasi
                                </h4>
                                <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                                    Natijalar ulushi (%)
                                </span>
                            </div>

                            <div className="h-[360px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={[
                                            { name: "A* (A⭐)", count: currentDisplayGrades['A*'], percentage: Math.round((currentDisplayGrades['A*'] / currentDisplayGrades.total) * 100), fill: "#059669" },
                                            { name: "A daraja", count: currentDisplayGrades['A'], percentage: Math.round((currentDisplayGrades['A'] / currentDisplayGrades.total) * 100), fill: "#10b981" },
                                            { name: "B daraja", count: currentDisplayGrades['B'], percentage: Math.round((currentDisplayGrades['B'] / currentDisplayGrades.total) * 100), fill: "#f59e0b" },
                                            { name: "C daraja", count: currentDisplayGrades['C'], percentage: Math.round((currentDisplayGrades['C'] / currentDisplayGrades.total) * 100), fill: "#eab308" },
                                            { name: "D daraja", count: currentDisplayGrades['D'], percentage: Math.round((currentDisplayGrades['D'] / currentDisplayGrades.total) * 100), fill: "#3b82f6" },
                                            { name: "E daraja", count: currentDisplayGrades['E'], percentage: Math.round((currentDisplayGrades['E'] / currentDisplayGrades.total) * 100), fill: "#6366f1" },
                                        ]}
                                        margin={{ top: 25, right: 20, left: 0, bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis 
                                            dataKey="name" 
                                            tick={{ fill: '#334155', fontSize: 12, fontWeight: 700 }}
                                            axisLine={{ stroke: '#cbd5e1' }}
                                            tickLine={false}
                                        />
                                        <YAxis 
                                            tick={{ fill: '#64748b', fontSize: 11 }}
                                            axisLine={false}
                                            tickLine={false}
                                            unit=" ta"
                                        />
                                        <Tooltip 
                                            cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload;
                                                    return (
                                                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1">
                                                            <div className="font-extrabold text-cyan-300">{data.name}</div>
                                                            <div>O'quvchilar soni: <strong className="text-white">{data.count} ta</strong></div>
                                                            <div>Ulush: <strong className="text-emerald-400">{data.percentage}%</strong></div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Bar 
                                            dataKey="count" 
                                            radius={[10, 10, 0, 0]}
                                            animationDuration={1200}
                                        >
                                            {[
                                                { fill: "#059669" },
                                                { fill: "#10b981" },
                                                { fill: "#f59e0b" },
                                                { fill: "#eab308" },
                                                { fill: "#3b82f6" },
                                                { fill: "#6366f1" }
                                            ].map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Column Legend / Stats Badge Bar */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-6 pt-4 border-t border-slate-200/80">
                                {[
                                    { label: "A* (A⭐)", count: currentDisplayGrades['A*'], color: "bg-emerald-600", text: "text-emerald-700" },
                                    { label: "A daraja", count: currentDisplayGrades['A'], color: "bg-emerald-500", text: "text-emerald-600" },
                                    { label: "B daraja", count: currentDisplayGrades['B'], color: "bg-amber-500", text: "text-amber-600" },
                                    { label: "C daraja", count: currentDisplayGrades['C'], color: "bg-yellow-400", text: "text-yellow-700" },
                                    { label: "D daraja", count: currentDisplayGrades['D'], color: "bg-sky-500", text: "text-sky-600" },
                                    { label: "E daraja", count: currentDisplayGrades['E'], color: "bg-indigo-600", text: "text-indigo-600" }
                                ].map((item, i) => {
                                    const pct = Math.round((item.count / currentDisplayGrades.total) * 100) || 0;
                                    return (
                                        <div key={i} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                                                <span className="text-[11px] font-extrabold text-slate-700">{item.label}</span>
                                            </div>
                                            <span className={`text-xs font-black ${item.text}`}>{pct}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                            <span className="flex items-center gap-1 font-semibold text-slate-600">
                                <span className="material-symbols-outlined text-sm text-emerald-500">lock</span>
                                Barcha ma'lumotlar shaxsiy maxfiylikka rioya qilgan holda umumiylashtirilgan.
                            </span>
                            <Link to="/natijalar" className="text-[#0088cc] font-extrabold hover:underline flex items-center gap-1">
                                <span>Batafsil natijalar ro'yxatini ko'rish</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                        </div>
                    </Reveal>
                </section>

                {/* ========================================================================= */}
                {/* SECTION 3: 100% Grant Winners */}
                {/* ========================================================================= */}
                <section>
                    <Reveal type="fade-up">
                        <div className="flex flex-col items-center mb-12">
                            <span className="text-emerald-500 font-bold tracking-wider uppercase text-sm mb-2">Faxrimiz</span>
                            <h2 className="text-3xl md:text-4xl font-black text-[#0a1b3f] text-center max-w-2xl">
                                100 foiz Grant yutib olgan o'quvchilarimiz
                            </h2>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full mt-6"></div>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {grantWinners.map((winner, idx) => (
                            <Reveal key={winner.id} type="zoom-in" delay={idx * 100} className="relative bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-10 group-hover:scale-125 transition-transform duration-700"></div>
                                <div className="absolute bottom-[-20px] right-[-20px] opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-500">
                                    <span className="material-symbols-outlined text-[150px]">school</span>
                                </div>

                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                                        <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Grant qiymati</div>
                                        <div className="text-xl font-black text-emerald-500 flex items-center justify-end gap-1">
                                            <span>$</span>{winner.amount}
                                        </div>
                                    </div>
                                </div>
                                
                                <h3 className="text-lg md:text-xl font-bold text-[#0a1b3f] mb-5 leading-snug h-[56px] line-clamp-2">
                                    {winner.name}
                                </h3>
                                
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-3">
                                        <span className="material-symbols-outlined text-sky-500 shrink-0 mt-0.5 text-lg">public</span>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">Davlat</span>
                                            <span className="text-slate-700 font-bold text-[13px]">{winner.country}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-3">
                                        <span className="material-symbols-outlined text-indigo-500 shrink-0 mt-0.5 text-lg">account_balance</span>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">Universitet</span>
                                            <span className="text-slate-700 font-bold text-[13px] leading-tight">{winner.uni}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-3">
                                        <span className="material-symbols-outlined text-amber-500 shrink-0 mt-0.5 text-lg">calendar_month</span>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">Yutgan yili</span>
                                            <span className="text-slate-700 font-bold text-[11px] xl:text-[12px] whitespace-nowrap">{winner.year}</span>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* ========================================================================= */}
                {/* SECTION 4: FM Radio Bo'limi */}
                {/* ========================================================================= */}
                <section>
                    <Reveal type="fade-up">
                        <div className="bg-gradient-to-r from-slate-900 via-[#0a162b] to-slate-900 rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-4 max-w-2xl relative z-10 text-white">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-wider animate-pulse">
                                    <span className="w-2 h-2 rounded-full bg-red-500 inline-block shadow-[0_0_8px_#ef4444]" />
                                    EFIRDA — FM 101.5 MHz
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                                    Presidential School <span className="text-cyan-400">FM Radio</span>
                                </h2>
                                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                    Maktabimizning rasmiy raqamli radiosi — muhim yangiliklar, haftalik dayjest, xalqaro olimpiada g'oliblari bilan suhbatlar va sara musiqiy dasta.
                                </p>
                            </div>

                            <div className="shrink-0 relative z-10">
                                <Link 
                                    to="/fm-radio"
                                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-[#0088cc] text-white font-extrabold text-sm shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all flex items-center gap-3"
                                >
                                    <span className="material-symbols-outlined text-2xl">radio</span>
                                    FM RADIOGA O'TISH
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </section>

            </main>
        </div>
    );
}
