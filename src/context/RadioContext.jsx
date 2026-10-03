import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { getAssetPath } from '../utils/assets';

// Fixed Institutional Frequency
export const FIXED_FREQUENCY = '103.0 FM';

// 5 Official Radio Broadcast Tracks (Sequential Loop Playlist)
export const OFFICIAL_RADIO_PLAYLIST = [
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

// Default / Latest Radio Broadcast Track (02 - Main Live Broadcast)
export const LATEST_RADIO_TRACK = OFFICIAL_RADIO_PLAYLIST[0];

const RadioContext = createContext(null);

export function RadioProvider({ children }) {
    const audioRef = useRef(null);
    const trackIndexRef = useRef(0);

    const [currentTrack, setCurrentTrack] = useState(OFFICIAL_RADIO_PLAYLIST[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(85);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isWidgetVisible, setIsWidgetVisible] = useState(false);

    // Sync HTML5 Audio native events directly to React state
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration || 0);
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => {
            // Auto play next track in playlist on track completion (Continuous loop)
            const nextIdx = (trackIndexRef.current + 1) % OFFICIAL_RADIO_PLAYLIST.length;
            playTrackByIndex(nextIdx);
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('ended', onEnded);
        };
    }, []);

    // Core method to play a specific track index (Automatic seamless transition via canplay listener)
    const playTrackByIndex = (idx) => {
        const safeIdx = (idx + OFFICIAL_RADIO_PLAYLIST.length) % OFFICIAL_RADIO_PLAYLIST.length;
        trackIndexRef.current = safeIdx;
        const targetTrack = OFFICIAL_RADIO_PLAYLIST[safeIdx];

        setCurrentTrack(targetTrack);
        setIsWidgetVisible(true);

        const audio = audioRef.current;
        if (audio) {
            const resolvedUrl = getAssetPath(targetTrack.audioUrl);
            const absoluteUrl = new URL(resolvedUrl, window.location.origin).href;

            const executePlay = () => {
                audio.currentTime = 0;
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setIsPlaying(true);
                    }).catch(err => {
                        console.log("Audio play error:", err);
                        setIsPlaying(false);
                    });
                }
            };

            if (audio.src !== absoluteUrl) {
                audio.src = resolvedUrl;
                
                // Wait until browser buffers first media bytes (canplay event) to automatically start playback!
                const handleCanPlay = () => {
                    audio.removeEventListener('canplay', handleCanPlay);
                    executePlay();
                };
                audio.addEventListener('canplay', handleCanPlay);
                audio.load();
            } else {
                executePlay();
            }
        }
    };

    const playNextTrack = () => {
        const nextIdx = (trackIndexRef.current + 1) % OFFICIAL_RADIO_PLAYLIST.length;
        playTrackByIndex(nextIdx);
    };

    // Play specific track object (Instant response)
    const playTrack = (track) => {
        const idx = OFFICIAL_RADIO_PLAYLIST.findIndex(
            t => t.audioUrl === track.audioUrl || t.id === track.id
        );

        // If clicking the track that is ALREADY playing -> toggle pause
        if (idx === trackIndexRef.current && isPlaying) {
            if (audioRef.current) audioRef.current.pause();
            return;
        }

        if (idx !== -1) {
            playTrackByIndex(idx);
        } else {
            setCurrentTrack(track);
            setIsWidgetVisible(true);
            const audio = audioRef.current;
            if (audio) {
                audio.src = track.audioUrl;
                audio.currentTime = 0;
                audio.play().catch(err => console.log("Audio play error:", err));
            }
        }
    };

    // Toggle radio (Instant response for Header/Mobile FM icon)
    const toggleRadio = () => {
        const audio = audioRef.current;
        if (!audio) return;
        
        if (isPlaying) {
            audio.pause();
        } else {
            setIsWidgetVisible(true);
            const resolvedUrl = getAssetPath(currentTrack.audioUrl);
            const absoluteUrl = new URL(resolvedUrl, window.location.origin).href;
            if (!audio.src || audio.src === '' || audio.src !== absoluteUrl) {
                audio.src = resolvedUrl;
            }
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.log("Audio play error:", err);
                });
            }
        }
    };

    // Stop Radio & Close Widget (X button action)
    const stopRadio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setIsWidgetVisible(false);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleVolume = (val) => {
        setVolume(val);
        if (audioRef.current) {
            audioRef.current.volume = val / 100;
            if (val === 0) setIsMuted(true);
            else if (isMuted) setIsMuted(false);
        }
    };

    const handleSeek = (timeSec) => {
        setCurrentTime(timeSec);
        if (audioRef.current) {
            audioRef.current.currentTime = timeSec;
        }
    };

    const formatSec = (sec) => {
        if (isNaN(sec) || sec <= 0) return '00:00';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Language Cookie Helper
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return '';
    };
    const langCookie = getCookie('googtrans');
    const lang = langCookie.includes('/uz/en') ? 'en' : 'uz';

    return (
        <RadioContext.Provider value={{
            audioRef,
            currentTrack,
            isPlaying,
            isMuted,
            volume,
            currentTime,
            duration,
            isWidgetVisible,
            playTrack,
            playNextTrack,
            toggleRadio,
            stopRadio,
            toggleMute,
            handleVolume,
            handleSeek,
            formatSec,
            lang
        }}>
            {children}

            {/* GLOBAL HTML5 AUDIO INSTANCE */}
            <audio ref={audioRef} src={getAssetPath(currentTrack.audioUrl)} preload="auto" />

            {/* FOREGROUND MINI FLOATING RADIO BADGE / WIDGET */}
            {isWidgetVisible && (
                <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-[9999] animate-fade-in group">
                    <div className="bg-gradient-to-r from-slate-950/95 via-[#0a1936]/95 to-slate-950/95 text-white p-3 rounded-2xl border border-cyan-400/40 shadow-[0_10px_35px_rgba(0,240,255,0.25)] backdrop-blur-2xl flex items-center gap-3 max-w-[320px] sm:max-w-[380px] relative transition-all duration-300 hover:border-cyan-400">
                        
                        {/* 'X' Close Button */}
                        <button 
                            onClick={stopRadio}
                            title="Radioni o'chirish"
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 border border-cyan-400/50 text-slate-300 hover:text-white hover:bg-red-500 hover:border-red-400 flex items-center justify-center transition-all shadow-md z-20 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-xs">close</span>
                        </button>

                        {/* Animated Equalizer / Radio Icon Badge */}
                        <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-[#0088cc] flex items-center justify-center text-slate-950 font-black shadow-md">
                                <span className="material-symbols-outlined text-xl animate-pulse">radio</span>
                            </div>
                            {isPlaying && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping border-2 border-slate-950" />
                            )}
                        </div>

                        {/* Track Info */}
                        <div className="flex-1 min-w-0 space-y-0.5">
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 font-bold">
                                <span className="px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-500/30">{FIXED_FREQUENCY}</span>
                                <span className="truncate">{isPlaying ? 'JONLI EFIR' : 'PAUSA'}</span>
                            </div>
                            <h4 className="text-xs font-bold text-white truncate leading-tight">
                                {typeof currentTrack.topic === 'object' ? currentTrack.topic[lang] : currentTrack.topic}
                            </h4>
                            <p className="text-[10px] text-slate-300 truncate">
                                🎙️ {currentTrack.hostName} ({currentTrack.hostGrade})
                            </p>
                        </div>

                        {/* Action Buttons (Play/Pause) */}
                        <div className="flex items-center gap-2 shrink-0">
                            <button 
                                onClick={toggleRadio}
                                className="w-9 h-9 rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 flex items-center justify-center font-bold shadow-md active:scale-95 transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-xl">
                                    {isPlaying ? 'pause' : 'play_arrow'}
                                </span>
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </RadioContext.Provider>
    );
}

export function useRadio() {
    const context = useContext(RadioContext);
    if (!context) {
        throw new Error('useRadio must be used within a RadioProvider');
    }
    return context;
}
