import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeroBanner from '../components/PageHeroBanner';
import { useRadio, FIXED_FREQUENCY } from '../context/RadioContext';

// Helper to check language from cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
}

// Initial / Official Radio Schedule (02 is main broadcast track)
const defaultScheduleData = [
    {
        id: 'track-02-main',
        day: { uz: 'Dushanba', en: 'Monday' },
        time: '10:50 — 11:25',
        topic: { 
            uz: 'Termiz shahridagi Prezident maktabi misolida amalga oshirilgan ishlar', 
            en: 'Work done on the example of Termez Presidential School' 
        },
        hostName: 'Jumayev Zuxriddin',
        hostGrade: '11-sinf',
        direction: { uz: 'Bosh boshlovchi & Reporter', en: 'Head Anchor & Reporter' },
        audioUrl: '/images/02_Termiz_shahridagi_Prezident_maktabi_misolida_amalga_oshirilgan_ishlar.m4a',
        durationStr: '15:30',
        isLiveNow: true
    },
    {
        id: 'track-01',
        day: { uz: 'Seshanba', en: 'Tuesday' },
        time: '13:00 — 14:00',
        topic: { 
            uz: 'Bayrog\'im ko\'ksimning minbari sen uchun', 
            en: 'My Flag, You Are the Pulpit of My Heart' 
        },
        hostName: 'Choriyeva Hurzoda',
        hostGrade: '10-sinf',
        direction: { uz: 'Ingliz tili va debat rukni', en: 'English & Debate Host' },
        audioUrl: "/images/01_BAYROG'IM_KO'KSIMNING_MINBARI_SEN_UCHUN.m4a",
        durationStr: '08:15',
        isLiveNow: false
    },
    {
        id: 'track-03',
        day: { uz: 'Chorshanba', en: 'Wednesday' },
        time: '10:50 — 11:25',
        topic: { 
            uz: '11-sinf o\'quvchisi Qarshiyeva Laylo haqida', 
            en: 'About 11th Grade Student Qarshiyeva Laylo' 
        },
        hostName: 'Jumayev Zuxriddin',
        hostGrade: '11-sinf',
        direction: { uz: 'Bosh boshlovchi & Reporter', en: 'Head Anchor & Reporter' },
        audioUrl: '/images/03_11_sinf_o‘quvchisi_Qarshiyeva_Laylo_haqida.m4a',
        durationStr: '14:50',
        isLiveNow: false
    },
    {
        id: 'track-04',
        day: { uz: 'Payshanba', en: 'Thursday' },
        time: '13:00 — 14:00',
        topic: { 
            uz: 'E\'zoza Chorshanbiyeva — TEDxTermez PS Youth', 
            en: 'E\'zoza Chorshanbiyeva — TEDxTermez PS Youth' 
        },
        hostName: 'E\'zoza Chorshanbiyeva',
        hostGrade: '11-sinf',
        direction: { uz: 'TEDx Youth Ma\'ruzachisi', en: 'TEDx Youth Speaker' },
        audioUrl: "/images/04_E'zoza_Chorshanbiyeva_TEDxTermez_PS_Youth.m4a",
        durationStr: '59:45',
        isLiveNow: false
    },
    {
        id: 'track-05',
        day: { uz: 'Juma', en: 'Friday' },
        time: '10:50 — 11:25',
        topic: { 
            uz: 'Abbos Jurayev — TEDxTermez PS Youth', 
            en: 'Abbos Jurayev — TEDxTermez PS Youth' 
        },
        hostName: 'Abbos Jurayev',
        hostGrade: '10-sinf',
        direction: { uz: 'TEDx Youth Ma\'ruzachisi', en: 'TEDx Youth Speaker' },
        audioUrl: '/images/05_Abbos Jurayev_TEDxTermez_PS_Youth.m4a',
        durationStr: '27:50',
        isLiveNow: false
    }
];

// Section 4: Archive Audio Tracks Data (5 Official School Broadcast Audio Files)
const archiveTracks = [
    {
        id: 'arch-2-main',
        topic: { 
            uz: 'Termiz shahridagi Prezident maktabi misolida amalga oshirilgan ishlar', 
            en: 'Work done on the example of Termez Presidential School' 
        },
        hostName: 'Jumayev Zuxriddin',
        hostGrade: '11-sinf',
        date: '10.08.2026',
        monthKey: '08',
        durationStr: '15:30',
        audioUrl: '/images/02_Termiz_shahridagi_Prezident_maktabi_misolida_amalga_oshirilgan_ishlar.m4a'
    },
    {
        id: 'arch-1',
        topic: { 
            uz: 'Bayrog\'im ko\'ksimning minbari sen uchun', 
            en: 'My Flag, You Are the Pulpit of My Heart' 
        },
        hostName: 'Choriyeva Hurzoda',
        hostGrade: '10-sinf',
        date: '08.08.2026',
        monthKey: '08',
        durationStr: '08:15',
        audioUrl: "/images/01_BAYROG'IM_KO'KSIMNING_MINBARI_SEN_UCHUN.m4a"
    },
    {
        id: 'arch-3',
        topic: { 
            uz: '11-sinf o\'quvchisi Qarshiyeva Laylo haqida', 
            en: 'About 11th Grade Student Qarshiyeva Laylo' 
        },
        hostName: 'Jumayev Zuxriddin',
        hostGrade: '11-sinf',
        date: '05.08.2026',
        monthKey: '08',
        durationStr: '14:50',
        audioUrl: '/images/03_11_sinf_o‘quvchisi_Qarshiyeva_Laylo_haqida.m4a'
    },
    {
        id: 'arch-4',
        topic: { 
            uz: 'E\'zoza Chorshanbiyeva — TEDxTermez PS Youth', 
            en: 'E\'zoza Chorshanbiyeva — TEDxTermez PS Youth' 
        },
        hostName: 'E\'zoza Chorshanbiyeva',
        hostGrade: '11-sinf',
        date: '28.07.2026',
        monthKey: '07',
        durationStr: '59:45',
        audioUrl: "/images/04_E'zoza_Chorshanbiyeva_TEDxTermez_PS_Youth.m4a"
    },
    {
        id: 'arch-5',
        topic: { 
            uz: 'Abbos Jurayev — TEDxTermez PS Youth', 
            en: 'Abbos Jurayev — TEDxTermez PS Youth' 
        },
        hostName: 'Abbos Jurayev',
        hostGrade: '10-sinf',
        date: '20.07.2026',
        monthKey: '07',
        durationStr: '27:50',
        audioUrl: '/images/05_Abbos Jurayev_TEDxTermez_PS_Youth.m4a'
    }
];

// Broadcasters Team (Radio Jamoasi)
const teamMembers = [
    {
        name: 'Jumayev Zuxriddin',
        grade: '11-sinf',
        direction: { uz: 'Bosh boshlovchi & Reporter', en: 'Main Host & Reporter' },
        img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
        badge: 'Lead Broadcaster'
    },
    {
        name: 'Choriyeva Hurzoda',
        grade: '10-sinf',
        direction: { uz: 'Ingliz tili va debat rukni', en: 'English & Debate Host' },
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        badge: 'International Anchor'
    },
    {
        name: 'Madiyev Sardor',
        grade: '11-sinf',
        direction: { uz: 'STEM va IT Texnologiyalar', en: 'STEM & IT Tech Lead' },
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        badge: 'STEM Editor'
    },
    {
        name: 'Norboyev Nurbek',
        grade: '9-sinf',
        direction: { uz: 'Musiqiy va madaniy sharhlovchi', en: 'Music & Cultural Producer' },
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        badge: 'Cultural Host'
    }
];

export default function FmRadio() {
    // Detect Language
    const currentCookie = getCookie('googtrans');
    const isEn = currentCookie.includes('/uz/en');
    const lang = isEn ? 'en' : 'uz';

    // Consume Global Radio Context (Background Audio)
    const { 
        currentTrack, 
        isPlaying, 
        playTrack, 
        toggleRadio, 
        toggleMute, 
        isMuted, 
        volume, 
        handleVolume, 
        currentTime, 
        duration, 
        formatSec 
    } = useRadio();

    const [scheduleList, setScheduleList] = useState(defaultScheduleData);
    const [selectedDayFilter, setSelectedDayFilter] = useState('all');
    const [selectedMonthFilter, setSelectedMonthFilter] = useState('all');

    // Admin Panel Integration via localStorage sync
    useEffect(() => {
        try {
            const savedSchedule = localStorage.getItem('school_fm_schedule');
            if (savedSchedule) {
                const parsed = JSON.parse(savedSchedule);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setScheduleList(parsed);
                }
            }
        } catch (e) {
            console.warn("Schedule sync fallback to defaults:", e);
        }
    }, []);

    // Filter Schedule
    const filteredSchedule = selectedDayFilter === 'all' 
        ? scheduleList 
        : scheduleList.filter(item => item.day.uz.toLowerCase() === selectedDayFilter.toLowerCase() || item.day.en.toLowerCase() === selectedDayFilter.toLowerCase());

    // Filter Archive by Month
    const filteredArchive = selectedMonthFilter === 'all'
        ? archiveTracks
        : archiveTracks.filter(item => item.monthKey === selectedMonthFilter);

    // Dictionary text
    const t = {
        pageCategory: lang === 'en' ? 'School Media' : 'Maktab Mediasi',
        pageTitle: lang === 'en' ? 'Presidential School FM Radio' : 'Presidential School FM Radiosi',
        radioAboutTitle: lang === 'en' ? 'Presidential School FM Radio' : 'Presidential School FM Radiosi',
        radioAboutDesc: lang === 'en' 
            ? 'Presidential School FM is an interactive digital media platform. Educational broadcasts, student achievements, analytical talks, and inspirational audio programs run automatically based on admin panel schedules.'
            : 'Prezident maktabi FM radiosi — bu o\'quvchilar hayoti, ilmiy muvaffaqiyatlar va ilhomlantiruvchi loyihalar uchun yagona raqamli audio platforma. Admin panel orqali rejalashtirilgan audio yozuvlar avtomatik tarzda jonli efirga uzatiladi.',
        fixedFreqBadge: FIXED_FREQUENCY,
        liveNowBadge: lang === 'en' ? 'LIVE BROADCAST' : 'JONLI EFIRDA',
        teamSectionTitle: lang === 'en' ? 'Radio Team' : 'Radio Jamoasi',
        scheduleSectionTitle: lang === 'en' ? 'Weekly Broadcast Schedule' : 'Haftalik Eshittirishlar Rejasi',
        scheduleSectionSub: lang === 'en' ? 'Smart schedule managed via admin panel' : 'Admin panel orqali boshqariladigan avtomatik efir jadvali',
        archiveSectionTitle: lang === 'en' ? 'Broadcast Audio Archive' : 'Arxiv Eshittirishlar',
        archiveSectionSub: lang === 'en' ? 'List of previously recorded & aired radio sessions' : 'Avval eshittirilgan audio yozuvlar ro\'yxati',
        colDay: lang === 'en' ? 'Day' : 'Eshittirish Kuni',
        colTime: lang === 'en' ? 'Time' : 'Vaqt',
        colTopic: lang === 'en' ? 'Broadcast Topic' : 'Eshittirish Mavzusi',
        colHost: lang === 'en' ? 'Presenter' : 'Boshlovchi (Ism & Sinf)',
        colAction: lang === 'en' ? 'Status / Listen' : 'Holat & Tinglash',
        ctaSectionTitle: lang === 'en' ? 'Connect with School Radio Team' : 'Maktab Radio Jamoasi Bilan Bog\'lanish',
        ctaDesc: lang === 'en' 
            ? 'Have an interesting project, topic, or feedback for our radio crew? Submit your ideas to our team.'
            : 'Maktabimiz radiosi uchun ajoyib g\'oya, mavzu yoki audio taklifingiz bormi? Jamoamiz bilan bevosita bog\'laning!',
        ctaButton: lang === 'en' ? 'Go to Contact Page' : 'Aloqa Bo\'limiga O\'tish',
        filterAll: lang === 'en' ? 'All Days' : 'Barcha Kunlar',
        filterMonthAll: lang === 'en' ? 'All Months' : 'Barcha oylar',
        monthAugust: lang === 'en' ? 'August' : 'Avgust',
        monthJuly: lang === 'en' ? 'July' : 'Iyul',
        monthJune: lang === 'en' ? 'June' : 'Iyun',
    };

    return (
        <div className="min-h-screen bg-[#050814] text-white pt-[105px] lg:pt-[125px] pb-28 relative overflow-x-hidden font-sans">

            {/* Radio-Themed Animated Ambient Lights & Background Orbs (Preserved deep theme background) */}
            <div className="absolute top-10 left-1/4 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-600/15 via-[#0088cc]/10 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulse" />
            <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-gradient-to-br from-purple-600/15 via-blue-600/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

            {/* Page Hero Banner Header */}
            <div className="relative z-20">
                <PageHeroBanner category={t.pageCategory} title={t.pageTitle} />
            </div>

            <main className="max-w-[1240px] mx-auto relative z-10 px-4 md:px-6 pt-6 space-y-12">

                {/* ========================================================================= */}
                {/* 1-SECTION: HERO ABOUT & RADIO TEAM SHOWCASE (KREATIV & KAYFIYATBOP) */}
                {/* ========================================================================= */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* LEFT (7 cols): MAKTAB RADIOSI HAQIDA & FIXED FREQUENCY 103.0 FM PLAYER */}
                    <div className="lg:col-span-7 bg-gradient-to-br from-slate-900/95 via-[#0a1428]/95 to-slate-900/95 rounded-3xl border border-cyan-500/30 p-6 md:p-8 shadow-[0_0_50px_rgba(0,240,255,0.12)] backdrop-blur-xl relative overflow-hidden flex flex-col justify-between group">
                        
                        {/* Background Radio Equalizer Glow */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="space-y-5 relative z-10">
                            {/* Fixed Frequency & Live Tag */}
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-cyan-400 to-[#0088cc] text-slate-950 font-mono font-black text-sm shadow-md">
                                        📻 {FIXED_FREQUENCY}
                                    </span>
                                    <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                                        FIXED FREQUENCY
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-wider animate-pulse">
                                    <span className="w-2 h-2 rounded-full bg-red-500 inline-block shadow-[0_0_8px_#ef4444]" />
                                    {t.liveNowBadge}
                                </div>
                            </div>

                            {/* Title & Description */}
                            <div className="space-y-2">
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                                    {t.radioAboutTitle}
                                </h1>
                                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                                    {t.radioAboutDesc}
                                </p>
                            </div>

                            {/* Active Scheduled Track Display Banner */}
                            <div className="bg-slate-950/80 rounded-2xl p-4 border border-white/10 space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="text-cyan-400 font-bold uppercase">HOZIRGI AUDIO: {currentTrack.date ? `(ARCHIVE ${currentTrack.date})` : currentTrack.time || '08:00'}</span>
                                    <span className="text-slate-400 font-semibold">{currentTrack.durationStr || '45:00'}</span>
                                </div>
                                <h3 className="text-base font-bold text-white leading-snug">
                                    {typeof currentTrack.topic === 'object' ? currentTrack.topic[lang] : currentTrack.topic}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-slate-300">
                                    <span className="material-symbols-outlined text-cyan-400 text-base">mic</span>
                                    <span>Boshlovchi: <strong className="text-white">{currentTrack.hostName}</strong> ({currentTrack.hostGrade})</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Soundwave Equalizer & Player Bar */}
                        <div className="pt-6 relative z-10 space-y-3">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={toggleRadio}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer shrink-0 ${
                                        isPlaying 
                                            ? 'bg-gradient-to-r from-cyan-400 to-[#0088cc] text-slate-950 scale-105 ring-4 ring-cyan-400/30 shadow-[0_0_25px_rgba(0,240,255,0.4)]' 
                                            : 'bg-white text-slate-950 hover:bg-cyan-400 hover:text-slate-950'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-3xl">
                                        {isPlaying ? 'pause' : 'play_arrow'}
                                    </span>
                                </button>

                                <div className="flex-1 space-y-1.5 min-w-0">
                                    <div className="flex justify-between text-xs font-mono text-cyan-300 font-bold px-1">
                                        <span>{formatSec(currentTime)}</span>
                                        <span>{formatSec(duration)}</span>
                                    </div>
                                    
                                    {/* Modern Interactive Soundwave Waveform Equalizer (Seekable Bar) */}
                                    <div 
                                        onClick={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const clickX = e.clientX - rect.left;
                                            const percent = Math.max(0, Math.min(1, clickX / rect.width));
                                            if (duration > 0) {
                                                handleSeek(percent * duration);
                                            }
                                        }}
                                        className="group relative flex items-center gap-[3px] h-10 bg-slate-950/90 rounded-xl px-3 py-1.5 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] overflow-hidden"
                                        title="Audio vaqtini o'zgartirish uchun bosing"
                                    >
                                        {/* Glowing Progress Background Track */}
                                        <div 
                                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/20 to-cyan-400/30 transition-all duration-100 pointer-events-none"
                                            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                                        />

                                        {/* 36 Dynamic Equalizer Bars */}
                                        {[45, 80, 30, 95, 60, 100, 50, 85, 40, 90, 70, 100, 35, 75, 95, 60, 40, 85, 100, 50, 75, 90, 40, 95, 60, 80, 50, 100, 35, 70, 90, 50, 85, 40, 95, 60].map((baseHeight, idx) => {
                                            const barProgress = (idx / 36) * 100;
                                            const isPassed = duration > 0 ? (currentTime / duration) * 100 >= barProgress : false;
                                            return (
                                                <span 
                                                    key={idx} 
                                                    className={`flex-1 rounded-full transition-all duration-200 pointer-events-none ${
                                                        isPassed 
                                                            ? isPlaying 
                                                                ? 'bg-gradient-to-t from-cyan-400 via-sky-300 to-white shadow-[0_0_8px_#00f0ff]' 
                                                                : 'bg-cyan-400' 
                                                            : 'bg-slate-800/90 group-hover:bg-slate-700'
                                                    }`}
                                                    style={{ 
                                                        height: isPlaying 
                                                            ? `${Math.max(20, Math.sin(currentTime * 4 + idx) * 40 + baseHeight * 0.6)}%` 
                                                            : `${Math.max(15, baseHeight * 0.35)}%`,
                                                    }}
                                                />
                                            );
                                        })}

                                        {/* Cursor Glow Head Dot */}
                                        <div 
                                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-cyan-400 shadow-[0_0_12px_#00f0ff] pointer-events-none transition-all duration-75"
                                            style={{ left: `calc(${duration > 0 ? (currentTime / duration) * 100 : 0}% - 6px)` }}
                                        />
                                    </div>
                                </div>

                                <div className="hidden sm:flex items-center gap-2 shrink-0">
                                    <button onClick={toggleMute} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                                        <span className="material-symbols-outlined text-lg">
                                            {isMuted || volume === 0 ? 'volume_off' : volume < 50 ? 'volume_down' : 'volume_up'}
                                        </span>
                                    </button>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        value={isMuted ? 0 : volume}
                                        onChange={(e) => handleVolume(Number(e.target.value))}
                                        className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT (5 cols): RADIO JAMOA BOSHLOVCHILARI (ISM, SINF, YO'NALISH, RASM) */}
                    <div className="lg:col-span-5 bg-gradient-to-br from-slate-900/90 via-[#10172a]/95 to-slate-900/90 rounded-3xl border border-white/10 p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between space-y-4">
                        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-cyan-400 text-lg">record_voice_over</span>
                                {t.teamSectionTitle}
                            </h2>
                            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/20">4 BOSHLOVCHI</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                            {teamMembers.map((member, idx) => (
                                <div 
                                    key={idx} 
                                    className="bg-slate-950/60 rounded-2xl p-3 border border-white/5 hover:border-cyan-500/40 transition-all duration-300 group flex flex-col items-center text-center justify-between"
                                >
                                    <div className="relative mb-2">
                                        <img 
                                            src={member.img} 
                                            alt={member.name} 
                                            className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400/40 group-hover:scale-105 transition-transform" 
                                        />
                                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-slate-950" />
                                    </div>

                                    <div className="space-y-0.5">
                                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                                            {member.name}
                                        </h4>
                                        <span className="inline-block text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-500/20 my-0.5">
                                            {member.grade}
                                        </span>
                                        <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                                            {member.direction[lang]}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </section>

                {/* ========================================================================= */}
                {/* 2-SECTION: HAFTALIK ESHITTIRISHLAR REJASI (SMART JADVAL) */}
                {/* ========================================================================= */}
                <section className="space-y-4">
                    
                    {/* Header & Smart Day Filter Tabs */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 gap-4">
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-cyan-400 text-xl">calendar_month</span>
                                {t.scheduleSectionTitle}
                            </h2>
                            <p className="text-xs text-slate-400">{t.scheduleSectionSub}</p>
                        </div>

                        {/* Day Tabs Filter */}
                        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                            <button
                                onClick={() => setSelectedDayFilter('all')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                    selectedDayFilter === 'all' 
                                        ? 'bg-cyan-400 text-slate-950 shadow-md' 
                                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                                }`}
                            >
                                {t.filterAll}
                            </button>
                            {['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'].map(d => (
                                <button
                                    key={d}
                                    onClick={() => setSelectedDayFilter(d)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                        selectedDayFilter === d 
                                            ? 'bg-cyan-400 text-slate-950 shadow-md' 
                                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                                    }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SMART TABLE CONTAINER */}
                    <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 rounded-2xl border border-white/10 overflow-hidden shadow-xl backdrop-blur-md">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse min-w-[700px]">
                                <thead>
                                    <tr className="bg-slate-950/80 border-b border-white/10 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                                        <th className="py-3.5 px-4">{t.colDay}</th>
                                        <th className="py-3.5 px-4">{t.colTime}</th>
                                        <th className="py-3.5 px-4">{t.colTopic}</th>
                                        <th className="py-3.5 px-4">{t.colHost}</th>
                                        <th className="py-3.5 px-4 text-right">{t.colAction}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-xs text-slate-200">
                                    {filteredSchedule.map((item) => {
                                        const isCurrentActive = currentTrack.id === item.id;
                                        return (
                                            <tr 
                                                key={item.id} 
                                                className={`transition-colors hover:bg-white/5 ${
                                                    isCurrentActive ? 'bg-cyan-500/10 font-medium' : ''
                                                }`}
                                            >
                                                {/* Day */}
                                                <td className="py-3.5 px-4">
                                                    <span className="font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 inline-block">
                                                        {item.day[lang]}
                                                    </span>
                                                </td>

                                                {/* Time */}
                                                <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                                                    {item.time}
                                                </td>

                                                {/* Topic */}
                                                <td className="py-3.5 px-4 max-w-[280px]">
                                                    <div className="font-bold text-white leading-snug">{item.topic[lang]}</div>
                                                    <span className="text-[10px] text-slate-400">{item.direction[lang]}</span>
                                                </td>

                                                {/* Host Name & Grade */}
                                                <td className="py-3.5 px-4 whitespace-nowrap">
                                                    <div className="font-bold text-white">{item.hostName}</div>
                                                    <span className="text-[10px] text-cyan-400 font-mono">{item.hostGrade}</span>
                                                </td>

                                                {/* Status & Play Action */}
                                                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                                    <button 
                                                        onClick={() => playTrack(item)}
                                                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 ml-auto shadow-md transition-all cursor-pointer ${
                                                            isPlaying && isCurrentActive 
                                                                ? 'bg-cyan-400 text-slate-950' 
                                                                : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300'
                                                        }`}
                                                    >
                                                        {isPlaying && isCurrentActive && <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />}
                                                        <span>{isPlaying && isCurrentActive ? 'IJRODA' : 'TINGLASH'}</span>
                                                        <span className="material-symbols-outlined text-sm">{isPlaying && isCurrentActive ? 'equalizer' : 'play_arrow'}</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </section>

                {/* ========================================================================= */}
                {/* 3-SECTION: ARXIV ESHITTIRISHLAR (3 CARDS PER ROW & COMPACT MONTH FILTER) */}
                {/* ========================================================================= */}
                <section className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 gap-3">
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-cyan-400 text-xl">folder_zip</span>
                                {t.archiveSectionTitle}
                            </h2>
                            <p className="text-xs text-slate-400">{t.archiveSectionSub}</p>
                        </div>

                        {/* COMPACT & SMALL MONTH FILTER */}
                        <div className="flex items-center gap-1.5 shrink-0 bg-slate-950/70 p-1 rounded-xl border border-white/10">
                            <span className="material-symbols-outlined text-cyan-400 text-xs pl-1">filter_alt</span>
                            <button
                                onClick={() => setSelectedMonthFilter('all')}
                                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                    selectedMonthFilter === 'all'
                                        ? 'bg-cyan-400 text-slate-950 shadow'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {t.filterMonthAll}
                            </button>
                            <button
                                onClick={() => setSelectedMonthFilter('08')}
                                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                    selectedMonthFilter === '08'
                                        ? 'bg-cyan-400 text-slate-950 shadow'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {t.monthAugust}
                            </button>
                            <button
                                onClick={() => setSelectedMonthFilter('07')}
                                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                    selectedMonthFilter === '07'
                                        ? 'bg-cyan-400 text-slate-950 shadow'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {t.monthJuly}
                            </button>
                            <button
                                onClick={() => setSelectedMonthFilter('06')}
                                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                    selectedMonthFilter === '06'
                                        ? 'bg-cyan-400 text-slate-950 shadow'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {t.monthJune}
                            </button>
                        </div>
                    </div>

                    {/* 3 CARDS PER ROW GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredArchive.map((item) => {
                            const isCurrentActive = currentTrack.id === item.id;
                            return (
                                <div 
                                    key={item.id}
                                    className={`bg-slate-900/50 rounded-2xl p-4 border transition-all duration-300 flex items-center justify-between gap-3 group hover:scale-[1.01] ${
                                        isCurrentActive 
                                            ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400/40 shadow-lg' 
                                            : 'border-white/10 hover:border-cyan-500/40 hover:bg-slate-900/80'
                                    }`}
                                >
                                    <div className="space-y-1.5 min-w-0 flex-1">
                                        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                                            <span className="text-cyan-400 font-bold flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[11px]">calendar_today</span>
                                                {item.date}
                                            </span>
                                            <span>•</span>
                                            <span>{item.durationStr}</span>
                                        </div>

                                        <h3 className="text-xs font-bold text-white leading-snug line-clamp-2 group-hover:text-cyan-300 transition-colors">
                                            {typeof item.topic === 'object' ? item.topic[lang] : item.topic}
                                        </h3>

                                        <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-0.5">
                                            <span className="material-symbols-outlined text-xs text-cyan-400">person</span>
                                            <span className="truncate">{item.hostName} ({item.hostGrade})</span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => playTrack(item)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 transition-all shadow-md cursor-pointer ${
                                            isPlaying && isCurrentActive 
                                                ? 'bg-cyan-400 text-slate-950 scale-105 ring-2 ring-cyan-400/40' 
                                                : 'bg-white/10 text-white hover:bg-cyan-400 hover:text-slate-950'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {isPlaying && isCurrentActive ? 'pause' : 'play_arrow'}
                                        </span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ========================================================================= */}
                {/* 4-SECTION: MAKTAB RADIO JAMOASI BILAN BOG'LANISH & ALOQA CTA */}
                {/* ========================================================================= */}
                <section className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 rounded-3xl p-6 md:p-8 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                    
                    {/* Glowing Pulse Orb */}
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="space-y-1.5 text-center md:text-left relative z-10">
                        <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest">
                            <span className="material-symbols-outlined text-sm">connect_without_contact</span>
                            Maktab Radio Jamoasi
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white">{t.ctaSectionTitle}</h3>
                        <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
                            {t.ctaDesc}
                        </p>
                    </div>

                    <div className="relative z-10 shrink-0">
                        <Link 
                            to="/aloqa" 
                            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-[#0088cc] hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-xl transition-all active:scale-95 cursor-pointer"
                        >
                            <span>{t.ctaButton}</span>
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>

                </section>

            </main>

        </div>
    );
}
