import React, { useState, useEffect } from 'react';
import PageHeroBanner from '../components/PageHeroBanner';
import { getAssetPath } from '../utils/assets';
import { studentResults } from '../data/studentResultsData';

// Helper to normalize apostrophes and casing for flexible search
const normalizeText = (text) => {
    return (text || '')
        .toLowerCase()
        .replace(/['`‘’ʻ]/g, "'")
        .trim();
};

export default function Results({ category = "all" }) {
    const [filterType, setFilterType] = useState(category);
    const [filterScore, setFilterScore] = useState("all");
    const [filterSubject, setFilterSubject] = useState("all");
    const [filterYear, setFilterYear] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCert, setSelectedCert] = useState(null);

    // Map prop category to filterType cleanly
    useEffect(() => {
        if (category === "a-level" || category === "A-Level") setFilterType("A-Level");
        else if (category === "as-level" || category === "AS-Level") setFilterType("AS-Level");
        else if (category === "cefr" || category === "CEFR") setFilterType("CEFR");
        else if (category === "ielts" || category === "IELTS") setFilterType("IELTS");
        else if (category === "sat" || category === "SAT") setFilterType("SAT");
        else setFilterType(category);

        setFilterScore("all");
        setFilterSubject("all");
        setFilterYear("all");
    }, [category]);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedCert(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const filteredStudents = studentResults.filter(student => {
        // Search query filter (by first name, surname, or full patronymic)
        if (searchQuery.trim()) {
            const queryNorm = normalizeText(searchQuery);
            const nameNorm = normalizeText(student.name);
            const fullNameNorm = normalizeText(student.fullName);
            if (!nameNorm.includes(queryNorm) && !fullNameNorm.includes(queryNorm)) {
                return false;
            }
        }

        if (filterType !== "all" && student.type.toLowerCase() !== filterType.toLowerCase()) return false;
        if (filterYear !== "all" && student.year !== filterYear) return false;
        if (filterSubject !== "all" && (student.type === "A-Level" || student.type === "AS-Level")) {
            if (student.subject !== filterSubject) return false;
        }

        if (filterScore !== "all") {
            if (student.type === "CEFR") {
                if (student.score !== filterScore) return false;
            } else if (student.type === "IELTS") {
                const score = parseFloat(student.score);
                if (filterScore === "high" && score < 7.5) return false;
                if (filterScore === "medium" && (score >= 7.5 || score < 6.5)) return false;
                if (filterScore === "low" && score >= 6.5) return false;
            } else if (student.type === "SAT") {
                const score = parseInt(student.score, 10);
                if (filterScore === "high" && score < 1400) return false;
                if (filterScore === "medium" && (score >= 1400 || score < 1250)) return false;
                if (filterScore === "low" && score >= 1250) return false;
            } else if (student.type === "A-Level" || student.type === "AS-Level") {
                if (filterScore === "star" && student.score !== "A*") return false;
                if (filterScore === "A" && student.score !== "A") return false;
                if (filterScore === "B" && student.score !== "B") return false;
                if (filterScore === "C" && student.score !== "C") return false;
                if (filterScore === "D-E" && (student.score !== "D" && student.score !== "E")) return false;
            }
        }
        return true;
    });

    const uniqueYears = ["2026", "2025", "2024"];
    const subjectsList = ["Biology", "Chemistry", "Computer Science", "Math", "Physics"];

    // Helper for Cambridge grade color badges
    const getGradeBadgeStyle = (score) => {
        switch (score) {
            case 'A*':
                return 'bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-md border border-emerald-400';
            case 'A':
                return 'bg-emerald-500 text-white shadow-xs';
            case 'B':
                return 'bg-amber-500 text-white shadow-xs';
            case 'C':
                return 'bg-yellow-400 text-slate-900 shadow-xs';
            case 'D':
                return 'bg-sky-400 text-slate-950 shadow-xs';
            case 'E':
                return 'bg-blue-600 text-white shadow-xs';
            default:
                return 'bg-slate-700 text-white';
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-[112px] lg:pt-[132px] pb-16 relative overflow-x-hidden font-sans">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,#f1f5f9_100%)] opacity-80 pointer-events-none" />
            
            <div className="relative z-20">
                <PageHeroBanner category="Natijalar" title={`${filterType === 'all' ? 'Barcha' : filterType} Natijalari`} />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10 px-4 md:px-8 pt-8 flex flex-col md:flex-row gap-8">
                
                {/* Left Sidebar Filter */}
                <div className="w-full md:w-[280px] shrink-0 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 self-start">
                    <h3 className="font-bold text-[#0a1b3f] text-lg mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#0088cc]">filter_alt</span>
                            Filtrlar
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {filteredStudents.length} ta
                        </span>
                    </h3>

                    {/* 1. Ism-familiya bo'yicha qidiruv */}
                    <div className="mb-5">
                        <label htmlFor="studentSearch" className="block font-semibold text-slate-700 text-sm mb-2 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[#0088cc] text-base">person_search</span>
                                Ism-familiya qidiruvi
                            </span>
                        </label>
                        <div className="relative">
                            <input 
                                id="studentSearch"
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Ism yoki familiya kiriting..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0088cc]/20 focus:border-[#0088cc] transition-all pr-8"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                                    title="Tozalash"
                                >
                                    <span className="material-symbols-outlined text-xs">close</span>
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {/* 2. Sertifikat Turi */}
                    <div className="mb-5">
                        <h4 className="font-semibold text-slate-700 text-sm mb-3">Sertifikat turi</h4>
                        <div className="flex flex-col gap-2">
                            {['all', 'CEFR', 'IELTS', 'SAT', 'A-Level', 'AS-Level'].map(type => (
                                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="certType" 
                                        value={type}
                                        checked={filterType.toLowerCase() === type.toLowerCase()}
                                        onChange={() => { 
                                            setFilterType(type); 
                                            setFilterScore('all');
                                            setFilterSubject('all');
                                        }}
                                        className="accent-[#0088cc] w-4 h-4 cursor-pointer"
                                    />
                                    <span className={`text-sm ${filterType.toLowerCase() === type.toLowerCase() ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>
                                        {type === 'all' ? 'Barchasi' : type === 'A-Level' ? 'A-Level (11-sinf)' : type === 'AS-Level' ? 'AS-Level (10-sinf)' : type}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Cambridge Fanlar boyicha Filter (A-Level & AS-Level) */}
                    {(filterType === 'A-Level' || filterType === 'AS-Level' || filterType === 'all') && (
                        <div className="mb-5">
                            <h4 className="font-semibold text-slate-700 text-sm mb-3">Fan bo'yicha</h4>
                            <select 
                                value={filterSubject} 
                                onChange={(e) => setFilterSubject(e.target.value)}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#0088cc]"
                            >
                                <option value="all">Barcha fanlar</option>
                                {subjectsList.map(subj => (
                                    <option key={subj} value={subj}>{subj}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Ball / Natija bo'yicha Filter */}
                    <div className="mb-5">
                        <h4 className="font-semibold text-slate-700 text-sm mb-3">Natija bo'yicha</h4>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="radio" name="scoreFilter" value="all" checked={filterScore === 'all'} onChange={() => setFilterScore('all')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                <span className={`text-sm ${filterScore === 'all' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>Barchasi</span>
                            </label>

                            {filterType === 'CEFR' && (
                                <>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="C1" checked={filterScore === 'C1'} onChange={() => setFilterScore('C1')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'C1' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>C1 daraja</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="B2" checked={filterScore === 'B2'} onChange={() => setFilterScore('B2')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'B2' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>B2 daraja</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="B1" checked={filterScore === 'B1'} onChange={() => setFilterScore('B1')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'B1' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>B1 daraja</span>
                                    </label>
                                </>
                            )}

                            {(filterType === 'IELTS' || filterType === 'SAT') && (
                                <>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="high" checked={filterScore === 'high'} onChange={() => setFilterScore('high')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'high' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>
                                            {filterType === 'IELTS' ? '7.5+' : '1400+'}
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="medium" checked={filterScore === 'medium'} onChange={() => setFilterScore('medium')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'medium' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>
                                            {filterType === 'IELTS' ? '6.5 — 7.0' : '1250 — 1390'}
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="low" checked={filterScore === 'low'} onChange={() => setFilterScore('low')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'low' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>
                                            {filterType === 'IELTS' ? '6.0 va past' : '1250 dan past'}
                                        </span>
                                    </label>
                                </>
                            )}

                            {(filterType === 'A-Level' || filterType === 'AS-Level') && (
                                <>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="star" checked={filterScore === 'star'} onChange={() => setFilterScore('star')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm flex items-center gap-1 ${filterScore === 'star' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>
                                            A <span className="material-symbols-outlined text-amber-400 text-base leading-none">star</span>
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="A" checked={filterScore === 'A'} onChange={() => setFilterScore('A')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'A' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>A daraja</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="B" checked={filterScore === 'B'} onChange={() => setFilterScore('B')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'B' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>B daraja</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="C" checked={filterScore === 'C'} onChange={() => setFilterScore('C')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'C' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>C daraja</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="radio" name="scoreFilter" value="D-E" checked={filterScore === 'D-E'} onChange={() => setFilterScore('D-E')} className="accent-[#0088cc] w-4 h-4 cursor-pointer" />
                                        <span className={`text-sm ${filterScore === 'D-E' ? 'text-[#0088cc] font-bold' : 'text-slate-600 group-hover:text-[#0a1b3f]'}`}>D / E daraja</span>
                                    </label>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Yil bo'yicha */}
                    <div>
                        <h4 className="font-semibold text-slate-700 text-sm mb-3">Olingan yil</h4>
                        <select 
                            value={filterYear} 
                            onChange={(e) => setFilterYear(e.target.value)}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-[#0088cc]"
                        >
                            <option value="all">Barcha yillar</option>
                            {uniqueYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    {/* Filtrlarni tozalash tugmasi */}
                    {(filterType !== 'all' || filterScore !== 'all' || filterSubject !== 'all' || filterYear !== 'all' || searchQuery.trim()) && (
                        <div className="pt-4 mt-5 border-t border-slate-100">
                            <button
                                onClick={() => {
                                    setFilterType('all');
                                    setFilterScore('all');
                                    setFilterSubject('all');
                                    setFilterYear('all');
                                    setSearchQuery('');
                                }}
                                className="w-full py-2.5 px-3 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-sm">filter_alt_off</span>
                                Filtrlarni tozalash
                            </button>
                        </div>
                    )}
                </div>

                {/* Main Content (Certificates Grid) */}
                <div className="flex-1">
                    {/* Active search pill indicator */}
                    {searchQuery.trim() && (
                        <div className="mb-4 flex items-center justify-between bg-blue-50/70 border border-blue-200/60 rounded-xl px-4 py-2.5">
                            <div className="flex items-center gap-2 text-xs font-semibold text-blue-900">
                                <span className="material-symbols-outlined text-blue-600 text-base">search</span>
                                <span>"<strong>{searchQuery}</strong>" so'rovi bo'yicha {filteredStudents.length} ta natija</span>
                            </div>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-xs text-blue-700 hover:text-blue-900 font-bold underline cursor-pointer"
                            >
                                Qidiruvni bekor qilish
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => {
                                const isCEFR = student.type === 'CEFR';
                                const isIELTS = student.type === 'IELTS';
                                const isSAT = student.type === 'SAT';
                                const isCambridge = student.type === 'A-Level' || student.type === 'AS-Level';

                                return (
                                    <div 
                                        key={student.id} 
                                        onClick={() => setSelectedCert(student)}
                                        className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 group transition-all duration-300 bg-white flex flex-col justify-between hover:shadow-2xl hover:border-[#0088cc] hover:-translate-y-1.5 cursor-pointer"
                                    >
                                        {/* Dynamic Digital Certificate Card Visual Banner (matching namuna 1-2-rasmlar) */}
                                        <div className={`relative w-full aspect-[4/3] overflow-hidden flex flex-col justify-between p-4 transition-all duration-300 ${
                                            isCEFR 
                                                ? 'bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-950'
                                                : isIELTS 
                                                    ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950' 
                                                    : isSAT 
                                                        ? 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900'
                                                        : 'bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900'
                                        }`}>
                                            {/* Decorative Background Accents */}
                                            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                                            <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
                                            
                                            {/* Certificate Inner Frame Border */}
                                            <div className="absolute inset-2 border border-white/15 rounded-xl pointer-events-none flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[80px] text-white/5 select-none transform rotate-12">
                                                    {isCambridge ? 'verified' : isCEFR ? 'translate' : 'workspace_premium'}
                                                </span>
                                            </div>

                                            {/* Top Row: School & Certificate Level Badge */}
                                            <div className="relative z-10 flex items-center justify-between">
                                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                    <span className="text-[9px] font-bold text-white tracking-wider uppercase">
                                                        {isCambridge ? 'CAMBRIDGE RESULT' : 'VERIFIED RESULT'}
                                                    </span>
                                                </div>

                                                <div className={`px-2 py-0.5 rounded-lg text-xs font-black shadow-md border ${
                                                    isCEFR
                                                        ? 'bg-emerald-600/90 text-white border-emerald-400/50'
                                                        : isIELTS 
                                                            ? 'bg-blue-600/90 text-white border-blue-400/50' 
                                                            : isSAT 
                                                                ? 'bg-purple-600/90 text-white border-purple-400/50'
                                                                : 'bg-emerald-600/90 text-white border-emerald-400/50'
                                                }`}>
                                                    {student.type}
                                                </div>
                                            </div>

                                            {/* Center Section: Certificate Score Badge */}
                                            <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center">
                                                <div className="text-[10px] font-extrabold tracking-widest text-slate-300 uppercase mb-1">
                                                    {isCambridge ? (student.subject || 'CAMBRIDGE EXAM') : 'OFFICIAL CERTIFICATE'}
                                                </div>
                                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/20 shadow-lg">
                                                    <span className="text-xs font-bold text-white/80">
                                                        {isCambridge ? 'GRADE:' : 'SCORE:'}
                                                    </span>
                                                    
                                                    {/* Score / Grade formatted display */}
                                                    <span className={`text-2xl font-black flex items-center gap-1 ${
                                                        isCEFR 
                                                            ? 'text-emerald-300'
                                                            : isIELTS 
                                                                ? 'text-cyan-300' 
                                                                : isSAT 
                                                                    ? 'text-purple-300' 
                                                                    : 'text-emerald-300'
                                                    }`}>
                                                        {student.score}
                                                        {student.score === 'A*' && (
                                                             <span className="material-symbols-outlined text-amber-300 text-xl animate-pulse">star</span>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Bottom Row: Candidate Name & Year */}
                                            <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 font-medium pt-1">
                                                <span className="truncate max-w-[130px] font-bold text-white/90" title={student.fullName || student.name}>
                                                    {student.name}
                                                </span>
                                                <span className="font-mono text-white/60">{student.year}</span>
                                            </div>

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] z-20">
                                                <div className="px-3.5 py-2 rounded-full bg-white text-[#0a1b3f] text-xs font-extrabold flex items-center gap-2 shadow-2xl transform scale-95 group-hover:scale-100 transition-transform">
                                                    <span className="material-symbols-outlined text-base">visibility</span>
                                                    <span>Natijani ko'rish</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Student Info & Details Card (matching namuna 1-2-rasmlar) */}
                                        <div className="p-4 bg-white border-t border-slate-100 flex flex-col justify-between space-y-2">
                                            <div>
                                                <h4 className="font-bold text-[#0a1b3f] text-base leading-snug tracking-tight truncate transition-colors group-hover:text-[#0088cc]" title={student.fullName || student.name}>
                                                    {student.name}
                                                </h4>
                                                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                                                    {isCambridge ? (
                                                        <>
                                                            <span className="material-symbols-outlined text-sm text-emerald-500">menu_book</span>
                                                            <span className="font-semibold text-slate-700">{student.subject}</span>
                                                        </>
                                                    ) : (
                                                        <span>Prezident Maktabi O'quvchisi</span>
                                                    )}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs text-slate-400 font-semibold">Natija:</span>
                                                    
                                                    {isCambridge ? (
                                                        <span className={`font-black text-sm px-2.5 py-0.5 rounded-md flex items-center gap-1 ${getGradeBadgeStyle(student.score)}`}>
                                                            {student.score}
                                                            {student.score === 'A*' && (
                                                                <span className="material-symbols-outlined text-xs">star</span>
                                                            )}
                                                        </span>
                                                    ) : (
                                                        <span className={`font-black text-base px-2.5 py-0.5 rounded-lg ${
                                                            isCEFR
                                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                                : isIELTS
                                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                                    : 'bg-purple-50 text-purple-700 border border-purple-200'
                                                        }`}>
                                                            {student.score}
                                                        </span>
                                                    )}
                                                </div>

                                                <span className="text-slate-400 font-bold text-xs bg-slate-100 px-2 py-1 rounded-md">
                                                    {student.year}
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 px-4">
                                <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">search_off</span>
                                <h4 className="font-bold text-slate-800 text-base mb-1">Mos keluvchi sertifikat topilmadi</h4>
                                <p className="text-sm text-slate-500 max-w-md mx-auto mb-4">
                                    {searchQuery ? `"${searchQuery}" bo'yicha hech qanday natija chiqmadi. Boshqa ism yoki filtr parametrlarini sinab ko'ring.` : "Tanlangan filtrlar bo'yicha sertifikatlar topilmadi."}
                                </p>
                                <button
                                    onClick={() => {
                                        setFilterType('all');
                                        setFilterScore('all');
                                        setFilterSubject('all');
                                        setFilterYear('all');
                                        setSearchQuery('');
                                    }}
                                    className="px-4 py-2 rounded-xl bg-[#0088cc] text-white text-xs font-bold hover:bg-[#0077bb] transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                                >
                                    <span className="material-symbols-outlined text-sm">refresh</span>
                                    Barcha filtrlarni tiklash
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* ========================================================================= */}
            {/* FULL-SCREEN CERTIFICATE MODAL POPUP */}
            {/* ========================================================================= */}
            {selectedCert && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
                    onClick={() => setSelectedCert(null)}
                >
                    <div 
                        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden relative z-10 animate-scale-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                            <div className="flex items-center gap-3">
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase ${
                                    selectedCert.type === 'CEFR'
                                        ? 'bg-emerald-500 text-white'
                                        : selectedCert.type === 'IELTS' 
                                            ? 'bg-blue-500 text-white' 
                                            : selectedCert.type === 'SAT' 
                                                ? 'bg-purple-500 text-white' 
                                                : 'bg-emerald-500 text-white'
                                }`}>
                                    {selectedCert.type}
                                </span>
                                <div>
                                    <h3 className="font-extrabold text-lg sm:text-xl text-white leading-tight">
                                        {selectedCert.fullName || selectedCert.name}
                                    </h3>
                                    <p className="text-xs text-cyan-300 font-medium">
                                        Natija: <strong className="text-white">{selectedCert.score}</strong> | Yil: <strong className="text-white">{selectedCert.year}</strong>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {selectedCert.file && (
                                    <a 
                                        href={getAssetPath(selectedCert.file)} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 transition-colors border border-white/10"
                                        title="Yangi oynada ochish"
                                    >
                                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                                        <span className="hidden sm:inline">Ochish</span>
                                    </a>
                                )}
                                <button 
                                    onClick={() => setSelectedCert(null)}
                                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-xl">close</span>
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 bg-slate-100 p-4 sm:p-6 overflow-y-auto min-h-[50vh] flex items-center justify-center">
                            {selectedCert.file ? (
                                <object 
                                    data={getAssetPath(selectedCert.file)} 
                                    type="application/pdf"
                                    className="w-full h-[65vh] rounded-xl border border-slate-300 shadow-inner bg-white"
                                >
                                    <iframe 
                                        src={getAssetPath(selectedCert.file)} 
                                        className="w-full h-full rounded-xl border-none"
                                        title={`Full Certificate - ${selectedCert.name}`}
                                    >
                                        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white rounded-xl">
                                            <span className="material-symbols-outlined text-6xl text-[#0088cc] mb-3">picture_as_pdf</span>
                                            <h4 className="font-extrabold text-slate-800 text-lg mb-1">{selectedCert.name} - Sertifikat PDF</h4>
                                            <a 
                                                href={getAssetPath(selectedCert.file)} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="mt-4 px-6 py-3 rounded-xl bg-[#0088cc] text-white font-bold text-sm shadow-md hover:bg-[#0077bb] transition-all"
                                            >
                                                Faylni ochish / yuklab olish
                                            </a>
                                        </div>
                                    </iframe>
                                </object>
                            ) : (
                                /* Verified Digital Certificate Card Popup for all certificate types */
                                <div className={`w-full p-8 sm:p-12 rounded-3xl border text-white text-center shadow-2xl relative overflow-hidden ${
                                    selectedCert.type === 'CEFR'
                                        ? 'bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 border-emerald-500/30'
                                        : selectedCert.type === 'IELTS'
                                            ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 border-blue-500/30'
                                            : selectedCert.type === 'SAT'
                                                ? 'bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950 border-purple-500/30'
                                                : 'bg-gradient-to-br from-slate-900 via-[#0a1c36] to-slate-950 border-emerald-500/30'
                                }`}>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                                    <div className="relative z-10 flex flex-col items-center">
                                        <img 
                                            src="/images/aa1_logo.png" 
                                            alt="Prezident Maktabi" 
                                            className="w-16 h-16 object-contain mb-4 bg-white/10 rounded-full p-2 border border-white/20"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />

                                        <span className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-1">
                                            {selectedCert.type === 'CEFR'
                                                ? 'DAVLAT TEST MARKAZI VA MILLIY SERTIFIKATSIYA'
                                                : selectedCert.type === 'IELTS'
                                                    ? 'INTERNATIONAL ENGLISH LANGUAGE TESTING SYSTEM'
                                                    : selectedCert.type === 'SAT'
                                                        ? 'COLLEGE BOARD SAT REASONING TEST'
                                                        : 'CAMBRIDGE ASSESSMENT INTERNATIONAL EDUCATION'}
                                        </span>
                                        <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                                            {selectedCert.type === 'CEFR'
                                                ? 'CEFR Rasmiy Til Bilish Natijasi'
                                                : selectedCert.type === 'IELTS'
                                                    ? 'IELTS Rasmiy Natija Sertifikati'
                                                    : selectedCert.type === 'SAT'
                                                        ? 'SAT Rasmiy Natija Hisoboti'
                                                        : (selectedCert.type === 'A-Level' ? 'Cambridge International A Level' : 'Cambridge International AS Level')}
                                        </h3>
                                        <p className="text-slate-300 text-sm mb-6 max-w-md">
                                            Termiz shahridagi Prezident maktabi o'quvchisining rasmiy imtihon natijasi sertifikati
                                        </p>

                                        <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-md space-y-4 mb-6">
                                            <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                                <span className="text-xs text-slate-400 font-bold uppercase">O'quvchi ismi:</span>
                                                <span className="text-base font-extrabold text-white text-right">
                                                    {selectedCert.fullName || selectedCert.name}
                                                </span>
                                            </div>
                                            {selectedCert.grade && (
                                                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                                    <span className="text-xs text-slate-400 font-bold uppercase">Sinfi:</span>
                                                    <span className="text-base font-extrabold text-cyan-300">{selectedCert.grade}</span>
                                                </div>
                                            )}
                                            {selectedCert.subject && (
                                                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                                    <span className="text-xs text-slate-400 font-bold uppercase">Fan nomi:</span>
                                                    <span className="text-base font-extrabold text-cyan-300">{selectedCert.subject}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                                <span className="text-xs text-slate-400 font-bold uppercase">Sertifikat turi:</span>
                                                <span className="text-base font-extrabold text-white">{selectedCert.type}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                                <span className="text-xs text-slate-400 font-bold uppercase">Yil / Sana:</span>
                                                <span className="text-base font-extrabold text-white">
                                                    {selectedCert.date ? selectedCert.date : `${selectedCert.year}-yil`}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center pt-1">
                                                <span className="text-xs text-slate-400 font-bold uppercase">Natija (Daraja):</span>
                                                <span className={`text-xl font-black px-4 py-1 rounded-xl flex items-center gap-1.5 ${
                                                    selectedCert.type === 'CEFR'
                                                        ? 'bg-emerald-500 text-white'
                                                        : selectedCert.type === 'IELTS'
                                                            ? 'bg-blue-600 text-white'
                                                            : selectedCert.type === 'SAT'
                                                                ? 'bg-purple-600 text-white'
                                                                : getGradeBadgeStyle(selectedCert.score)
                                                }`}>
                                                    <span>{selectedCert.score}</span>
                                                    {selectedCert.score === 'A*' && (
                                                        <span className="material-symbols-outlined text-amber-300 text-lg">star</span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-2 rounded-full text-xs font-bold">
                                            <span className="material-symbols-outlined text-base">verified</span>
                                            <span>Rasmiy Ma'lumot Tasdiqlangan</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}
