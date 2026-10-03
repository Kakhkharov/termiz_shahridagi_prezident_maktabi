import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { newsData } from '../data/newsData';

const YouTubeBackground = () => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        const videos = [
            { id: 'rjfi_2whzBs', startSeconds: 0, endSeconds: 20 },
            { id: 'owEO2Rn5OaQ', startSeconds: 0, endSeconds: 25 }
        ];
        let currentVideoIndex = 0;
        let checkInterval;
        let isSwitching = false;

        const playNext = (player) => {
            if (isSwitching) return;
            isSwitching = true;
            if (wrapperRef.current) wrapperRef.current.style.opacity = '0';
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;
            player.loadVideoById({
                videoId: videos[currentVideoIndex].id,
                startSeconds: videos[currentVideoIndex].startSeconds,
                endSeconds: videos[currentVideoIndex].endSeconds
            });
            setTimeout(() => { isSwitching = false; }, 2000);
        };

        const onPlayerReady = (event) => {
            event.target.mute();
            event.target.loadVideoById({
                videoId: videos[currentVideoIndex].id,
                startSeconds: videos[currentVideoIndex].startSeconds,
                endSeconds: videos[currentVideoIndex].endSeconds
            });

            checkInterval = setInterval(() => {
                if (event.target && typeof event.target.getCurrentTime === 'function') {
                    const currentTime = event.target.getCurrentTime();
                    const end = videos[currentVideoIndex].endSeconds;
                    // Majburiy o'tkazish, agar video o'z vaqtiga yetsa yoki ozod ishlasa
                    if (currentTime > 0 && currentTime >= (end - 0.5)) {
                        playNext(event.target);
                    }
                }
            }, 500);
        };

        const onPlayerStateChange = (event) => {
            if (event.data === 1) { // 1 = playing
                if (wrapperRef.current) wrapperRef.current.style.opacity = '0.9';
            } else if (event.data === 0) { // 0 = ended
                playNext(event.target);
            } else if (event.data === 3) { // 3 = buffering
                if (wrapperRef.current) wrapperRef.current.style.opacity = '0';
            }
        };

        const initPlayer = () => {
            if (containerRef.current) {
                playerRef.current = new window.YT.Player(containerRef.current, {
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        showinfo: 0,
                        modestbranding: 1,
                        rel: 0,
                        disablekb: 1,
                        iv_load_policy: 3,
                        mute: 1,
                        playsinline: 1,
                        fs: 0
                    },
                    events: {
                        onReady: onPlayerReady,
                        onStateChange: onPlayerStateChange
                    }
                });
            }
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            const prev = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                if (prev) prev();
                initPlayer();
            };
            if (!document.getElementById('youtube-api-script')) {
                const tag = document.createElement('script');
                tag.id = 'youtube-api-script';
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }
        }

        return () => {
            clearInterval(checkInterval);
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-950">
            <div 
                ref={wrapperRef}
                className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 scale-105 opacity-0 transition-opacity duration-1000 ease-in-out"
            >
                <div ref={containerRef} className="w-full h-full" />
            </div>
            {/* Creative Multi-layer Gradient Overlay to make text readable and pop */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1b3f]/90 via-[#0a1b3f]/40 to-[#024b88]/90"></div>
            {/* Subtle Dot Pattern for Premium Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05]"></div>
        </div>
    );
};

function InteractiveGalleryMarquee({ items }) {
    const containerRef = React.useRef(null);
    const [isMouseDown, setIsMouseDown] = React.useState(false);
    const [startX, setStartX] = React.useState(0);
    const [scrollLeftState, setScrollLeftState] = React.useState(0);
    const [isHovered, setIsHovered] = React.useState(false);
    const isDraggingRef = React.useRef(false);
    const dragDistanceRef = React.useRef(0);

    // Duplicate list 3 times to ensure 100% infinite smooth seamless scroll & drag loop
    const fullLoopList = React.useMemo(() => [...items, ...items, ...items], [items]);

    React.useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationFrameId;
        const speed = 0.8; // Smooth auto-scroll speed

        const autoScroll = () => {
            if (!isMouseDown && !isHovered && container) {
                container.scrollLeft += speed;
                
                // Seamless infinite loop wrap-around
                const oneThirdScroll = container.scrollWidth / 3;
                if (container.scrollLeft >= oneThirdScroll * 2) {
                    container.scrollLeft -= oneThirdScroll;
                }
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        animationFrameId = requestAnimationFrame(autoScroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isMouseDown, isHovered]);

    const handleMouseDown = (e) => {
        const container = containerRef.current;
        if (!container) return;
        setIsMouseDown(true);
        isDraggingRef.current = false;
        dragDistanceRef.current = 0;
        setStartX(e.pageX - container.offsetLeft);
        setScrollLeftState(container.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isMouseDown) return;
        const container = containerRef.current;
        if (!container) return;
        
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag sensitivity
        dragDistanceRef.current = Math.abs(walk);
        
        if (dragDistanceRef.current > 5) {
            isDraggingRef.current = true;
        }
        
        let newScrollLeft = scrollLeftState - walk;
        const oneThirdScroll = container.scrollWidth / 3;

        if (newScrollLeft >= oneThirdScroll * 2) {
            newScrollLeft -= oneThirdScroll;
        } else if (newScrollLeft <= 0) {
            newScrollLeft += oneThirdScroll;
        }

        container.scrollLeft = newScrollLeft;
    };

    const handleMouseUpOrLeave = () => {
        setIsMouseDown(false);
    };

    const handleTouchStart = (e) => {
        const container = containerRef.current;
        if (!container) return;
        setIsMouseDown(true);
        isDraggingRef.current = false;
        setStartX(e.touches[0].pageX - container.offsetLeft);
        setScrollLeftState(container.scrollLeft);
    };

    const handleTouchMove = (e) => {
        if (!isMouseDown) return;
        const container = containerRef.current;
        if (!container) return;
        
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5;
        let newScrollLeft = scrollLeftState - walk;
        const oneThirdScroll = container.scrollWidth / 3;

        if (newScrollLeft >= oneThirdScroll * 2) {
            newScrollLeft -= oneThirdScroll;
        } else if (newScrollLeft <= 0) {
            newScrollLeft += oneThirdScroll;
        }

        container.scrollLeft = newScrollLeft;
    };

    const handleLinkClick = (e) => {
        if (isDraggingRef.current) {
            e.preventDefault();
        }
    };

    return (
        <div 
            className="overflow-hidden w-full relative select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsMouseDown(false);
            }}
        >
            {/* Left and Right Subtle Vignette Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-10 pointer-events-none"></div>

            <div
                ref={containerRef}
                className="flex items-center gap-4 md:gap-6 py-3 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUpOrLeave}
            >
                {fullLoopList.map((item, index) => (
                    <Link
                        key={index}
                        to={item.id ? `/article/${item.id}` : "/news"}
                        onClick={handleLinkClick}
                        className="group/card relative shrink-0 w-[240px] sm:w-[280px] md:w-[320px] h-[280px] sm:h-[320px] md:h-[360px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/80 bg-white"
                        draggable={false}
                    >
                        <img
                            src={item.src}
                            alt={item.title}
                            draggable={false}
                            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 pointer-events-none"
                        />
                        {/* Gradient Overlay & Text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent opacity-85 group-hover/card:opacity-100 transition-opacity p-4 flex flex-col justify-end pointer-events-none">
                            <span className="inline-block bg-[#0088cc] text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-md w-max mb-1.5 shadow-sm">
                                {item.category || "Yangilik"}
                            </span>
                            <h4 className="text-white font-bold text-xs sm:text-sm line-clamp-2 leading-snug drop-shadow-md">
                                {item.title}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <main className="w-full overflow-hidden bg-slate-50">
            {/* Section 1: Hero Section */}
            <section className="relative w-full min-h-screen flex flex-col justify-between pt-[140px] md:pt-[160px] pb-10 px-4 md:px-8 overflow-hidden">
                {/* Dynamic YouTube Background (Multi-Video Playlist) */}
                <YouTubeBackground />

                {/* Hero Central Content */}
                <div className="relative z-10 max-w-[900px] mx-auto text-center my-auto py-10">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-md">
                        Kelajak yetakchilarini bugundan tayyorlaymiz
                    </h1>
                    <p className="text-slate-200 text-sm md:text-base lg:text-lg max-w-[750px] mx-auto leading-relaxed mb-8 drop-shadow">
                        Prezident maktabi — iqtidorli yoshlar uchun zamonaviy bilim, xalqaro standartlar va kuchli tarbiya uyg'unlashgan ta'lim maskani. Biz global fikrlaydigan, mas'uliyatli va raqobatbardosh avlodni yetishtiramiz.
                    </p>
                    <div className="flex items-center justify-center">
                        <Link 
                            to="/maktab-haqida" 
                            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Batafsil ma'lumot <span className="text-base">→</span>
                        </Link>
                    </div>
                </div>

                {/* Bottom 3 Cards Overlapping */}
                <div className="relative z-10 max-w-[1280px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                    {/* Card 1: Global nuqtai nazar */}
                    <div className="bg-[#024b88]/90 backdrop-blur-md rounded-2xl p-6 lg:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 flex flex-col items-center text-center group">
                        <div className="mb-4 p-3.5 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-[36px] lg:text-[42px] text-white">language</span>
                        </div>
                        <h3 className="text-lg lg:text-xl font-bold mb-2">Global nuqtai nazar</h3>
                        <p className="text-xs lg:text-sm text-slate-200 font-medium">"Cambridge" dasturi asosidagi STEM ta'limi</p>
                    </div>

                    {/* Card 2: Zamonaviy o'quv dasturi */}
                    <div className="bg-[#2b78a3]/90 backdrop-blur-md rounded-2xl p-6 lg:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 flex flex-col items-center text-center group">
                        <div className="mb-4 p-3.5 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-[36px] lg:text-[42px] text-white">menu_book</span>
                        </div>
                        <h3 className="text-lg lg:text-xl font-bold mb-2">Zamonaviy o'quv dasturi</h3>
                        <p className="text-xs lg:text-sm text-slate-200 font-medium">Global ta'lim va xalqaro akademik standartlar</p>
                    </div>

                    {/* Card 3: Malakali o'qituvchilar */}
                    <div className="bg-[#4c63b6]/90 backdrop-blur-md rounded-2xl p-6 lg:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 flex flex-col items-center text-center group">
                        <div className="mb-4 p-3.5 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-[36px] lg:text-[42px] text-white">workspace_premium</span>
                        </div>
                        <h3 className="text-lg lg:text-xl font-bold mb-2">Malakali o'qituvchilar</h3>
                        <p className="text-xs lg:text-sm text-slate-200 font-medium">Mahalliy va xalqaro yuqori malakali o'qituvchilar</p>
                    </div>
                </div>
            </section>

            {/* Section 2: President Quote Banner */}
            <section className="py-12 md:py-20 px-4 md:px-8 max-w-[1320px] mx-auto">
                <div className="relative rounded-[28px] overflow-hidden shadow-2xl bg-[#0d1f3d] text-white border border-white/10 flex flex-col lg:flex-row items-stretch group">
                    {/* Background Overlay Texture with Blur */}
                    <div className="absolute inset-0 bg-cover bg-center blur-[3px] scale-105 opacity-65 pointer-events-none" style={{ backgroundImage: "url('/images/maktab.jpg')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#091a34]/75 via-[#0e274e]/65 to-[#133060]/75 pointer-events-none"></div>

                    {/* Decorative Watermark Network Icon */}
                    <div className="absolute right-[-20px] bottom-[-30px] opacity-20 pointer-events-none text-white/40">
                        <span className="material-symbols-outlined text-[300px]">public</span>
                    </div>

                    {/* Left Column: President Photo */}
                    <div className="w-full lg:w-5/12 relative p-4 lg:p-6 flex items-center justify-center z-10 min-h-[320px] lg:min-h-[400px]">
                        <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                            <img 
                                src="/images/prezident.jpg" 
                                alt="Shavkat Mirziyoyev" 
                                className="w-full h-full object-cover object-center" 
                            />
                        </div>
                    </div>

                    {/* Right Column: Quote Text & Info */}
                    <div className="w-full lg:w-7/12 p-6 lg:p-12 flex flex-col justify-between relative z-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-6 tracking-tight leading-snug">
                                Termiz shahridagi Prezident maktabi
                            </h2>
                            <blockquote className="text-white text-sm md:text-base lg:text-lg leading-relaxed font-normal mb-8 relative pl-5">
                                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#00a2ff] rounded-full shadow-[0_0_10px_rgba(0,162,255,0.9)]"></div>
                                "Biz mamlakatimizni yangi bosqichga ko'tarishni maqsad qilgan ekanmiz, buni birinchi navbatda ta'lim va tarbiya rivoji bilan bog'laymiz. Prezident maktablari - bu yangi O'zbekiston poydevorini barpo etadigan, mamlakatimizni yorug' kelajakka yetaklaydigan intellektual elita maskanidir."
                            </blockquote>
                        </div>

                        {/* Author Footer */}
                        <div className="flex items-center gap-4 pt-4 border-t border-white/15">
                            <div className="w-[49px] h-[49px] lg:w-[57px] lg:h-[57px] rounded-full overflow-hidden bg-white border-2 border-white/40 shadow-xl shrink-0 flex items-center justify-center">
                                <img 
                                    src="/images/gerb2.png" 
                                    alt="O'zbekiston Gerbi" 
                                    className="w-full h-full object-contain rounded-full scale-[1.65]" 
                                />
                            </div>
                            <div>
                                <h4 className="text-base lg:text-lg font-bold text-white tracking-wide">Shavkat Mirziyoyev</h4>
                                <p className="text-xs lg:text-sm text-slate-300 font-medium">O'zbekiston Respublikasi Prezidenti</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Maktab haqida umumiy ma'lumot */}
            <section className="relative overflow-hidden py-12 md:py-20 px-4 md:px-8 max-w-[1320px] mx-auto">
                {/* Fluid Wave Background Layer matching Section 3 */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-[#0088cc]/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1c3879]/10 rounded-full blur-3xl"></div>
                    <svg className="absolute top-0 left-0 w-[200%] h-full opacity-15 animate-wave-layer1" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <linearGradient id="sec3Wave1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0088cc" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#1c3879" stopOpacity="0.2" />
                        </linearGradient>
                        <path fill="url(#sec3Wave1)" d="M0,192C320,100,640,280,960,160C1280,40,1400,220,1440,192V320H0Z"></path>
                    </svg>
                    <svg className="absolute bottom-0 left-0 w-[200%] h-full opacity-20 animate-wave-layer2" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <linearGradient id="sec3Wave2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
                        </linearGradient>
                        <path fill="url(#sec3Wave2)" d="M0,96C240,280,480,80,720,200C960,320,1200,120,1440,160V320H0Z"></path>
                    </svg>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
                    
                    {/* Left Content Column */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#e8f0fe] text-[#1e3a8a] px-4 py-1.5 rounded-lg text-xs md:text-sm font-bold tracking-wide">
                            <span className="material-symbols-outlined text-[18px]">domain</span>
                            Biz haqimizda
                        </div>

                        {/* Title */}
                        <h2 className="text-[30px] font-extrabold text-[#0a182e] tracking-tight leading-snug">
                            Maktab haqida umumiy ma'lumot
                        </h2>

                        {/* Description */}
                        <p className="text-slate-600 text-[18px] leading-relaxed font-normal">
                            Termiz shahridagi Prezident maktabi O‘zbekiston Respublikasi Prezidentining 2019-yil 20-fevraldagi Prezident maktablarini tashkil etish to‘g‘risidagi qarori asosida 2021-yil Surxondaryo viloyatida tashkil etilgan zamonaviy ixtisoslashtirilgan davlat umumta’lim muassasalaridan biridir. Prezident maktablarining asosiy maqsadi iqtidorli yoshlarni aniqlash, ularning intellektual, ilmiy va ijodiy salohiyatini rivojlantirish hamda ilg‘or ta’lim texnologiyalari asosida sifatli ta’lim berishdan iborat.
                        </p>

                        {/* CTA Button */}
                        <div className="pt-2">
                            <Link
                                to="/maktab-haqida"
                                className="inline-flex items-center gap-2 bg-[#0d2347] hover:bg-[#1a386b] text-white px-5 py-2.5 rounded-lg font-bold text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Batafsil ma'lumot <span className="text-lg leading-none">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Collage Grid (Matching Reference Image) */}
                    <div className="w-full lg:w-1/2 grid grid-cols-12 gap-4 items-stretch">
                        
                        {/* Left Column of Grid (7 cols out of 12) */}
                        <div className="col-span-7 flex flex-col gap-4">
                            {/* Top Image: gallery01.jpg */}
                            <div className="rounded-2xl overflow-hidden shadow-md h-[250px] md:h-[280px] border border-slate-100">
                                <img 
                                    src="/images/gallery01.jpg" 
                                    alt="Prezident maktabi galereya" 
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Bottom Blue Text Card */}
                            <div className="bg-[#1c3879] text-white rounded-2xl p-5 flex items-center justify-center text-center shadow-md border border-white/10 relative overflow-hidden h-[120px] md:h-[130px]">
                                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                                <span className="font-extrabold text-sm md:text-base lg:text-lg tracking-wider uppercase leading-snug relative z-10 drop-shadow">
                                    Termiz shahridagi<br />Prezident maktabi
                                </span>
                            </div>
                        </div>

                        {/* Right Column of Grid (5 cols out of 12) */}
                        <div className="col-span-5 flex flex-col gap-4">
                            {/* Top Logo Container (Solid Blue with gallery04.svg Emblem) */}
                            <div className="bg-[#1c3879] rounded-2xl p-4 flex items-center justify-center shadow-md border border-white/10 h-[180px] md:h-[200px] relative overflow-hidden">
                                <div className="w-32 h-32 md:w-36 md:h-36 relative z-10 flex items-center justify-center">
                                    <img 
                                        src="/images/gallery04.svg" 
                                        alt="Prezident Maktabi Emblemasi" 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Bottom Image: gallery05.jpg */}
                            <div className="rounded-2xl overflow-hidden shadow-md h-[190px] md:h-[210px] border border-slate-100">
                                <img 
                                    src="/images/gallery05.jpg" 
                                    alt="Prezident maktabi jamoasi va o'quvchilari" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* Section 4: Ta'lim dasturi va Qabul jarayoni */}
            <section id="talim-va-qabul" className="relative overflow-hidden py-6 lg:py-10 px-4 md:px-8 max-w-[1320px] mx-auto scroll-mt-16">
                {/* Fluid Wave Background Layer matching Section 4 teal & navy theme */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-10 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
                    <svg className="absolute top-0 left-0 w-[200%] h-full opacity-20 animate-wave-layer2" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <linearGradient id="sec4Wave1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2b9d97" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#1e3a73" stopOpacity="0.2" />
                        </linearGradient>
                        <path fill="url(#sec4Wave1)" d="M0,128C280,300,560,40,840,192C1120,340,1320,100,1440,160V320H0Z"></path>
                    </svg>
                    <svg className="absolute bottom-0 left-0 w-[200%] h-full opacity-25 animate-wave-layer1" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <linearGradient id="sec4Wave2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0f764c" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#1c3879" stopOpacity="0.1" />
                        </linearGradient>
                        <path fill="url(#sec4Wave2)" d="M0,224C360,96,720,280,1080,144C1260,76,1380,200,1440,224V320H0Z"></path>
                    </svg>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start relative z-10">
                    
                    {/* Left Column: Ta'lim dasturi haqida (7 cols out of 12) */}
                    <div className="lg:col-span-7 space-y-3">
                        
                        {/* Header row */}
                        <div>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-1.5 bg-[#e8f7f5] text-[#1e7a72] px-2.5 py-0.5 rounded-md text-xs font-bold tracking-wide mb-1.5">
                                <span className="material-symbols-outlined text-[15px]">school</span>
                                Ta'lim
                            </div>
                            
                            {/* Title + Link */}
                            <div className="flex items-center justify-between gap-4">
                                <h2 className="text-[22px] md:text-[26px] lg:text-[28px] font-extrabold text-[#0a182e] tracking-tight">
                                    Ta'lim dasturi haqida
                                </h2>
                                <Link to="/maktab-haqida#talim-tizimi" className="inline-flex items-center gap-1 text-xs md:text-sm font-bold text-[#1c3879] hover:text-[#0d2347] transition-colors shrink-0">
                                    Barchasi <span className="text-sm">→</span>
                                </Link>
                            </div>
                        </div>

                        {/* Cards Grid (Total height ~290px) */}
                        <div className="space-y-2.5">
                            
                            {/* Row 1: 3 cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                
                                {/* Card 1: 5-11-sinflar (Teal #2b9d97) */}
                                <div className="bg-[#2b9d97] text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 h-[138px] text-center shadow-md relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                                    <span className="material-symbols-outlined text-[36px] text-white leading-none drop-shadow-sm z-10">school</span>
                                    <div className="space-y-0.5 z-10">
                                        <h3 className="font-extrabold text-sm sm:text-base tracking-tight leading-snug">5-11-sinflar</h3>
                                        <p className="text-[10px] text-white/90 font-normal leading-snug max-w-[180px] mx-auto">
                                            Milliy va xalqaro fanlarni o'zlashtirish
                                        </p>
                                    </div>
                                </div>

                                {/* Card 2: Tillar (Blue #4e7bb4) */}
                                <div className="bg-[#4e7bb4] text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 h-[138px] text-center shadow-md relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                                    <span className="material-symbols-outlined text-[36px] text-white leading-none drop-shadow-sm z-10">language</span>
                                    <div className="space-y-0.5 z-10">
                                        <h3 className="font-extrabold text-sm sm:text-base tracking-tight leading-snug">Tillar</h3>
                                        <p className="text-[10px] text-white/90 font-normal leading-snug max-w-[180px] mx-auto">
                                            Ingliz tili (EFL), o'zbek tili, rus tili;
                                        </p>
                                    </div>
                                </div>

                                {/* Card 3: Gumanitar fanlar (Steel Blue #1e5385) */}
                                <div className="bg-[#1e5385] text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 h-[138px] text-center shadow-md relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                                    <span className="material-symbols-outlined text-[36px] text-white leading-none drop-shadow-sm z-10">menu_book</span>
                                    <div className="space-y-0.5 z-10">
                                        <h3 className="font-extrabold text-sm sm:text-base tracking-tight leading-snug">Gumanitar fanlar</h3>
                                        <p className="text-[10px] text-white/90 font-normal leading-snug max-w-[180px] mx-auto">
                                            O'zbekiston tarixi, jahon tarixi
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* Row 2: 2 cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                                
                                {/* Card 4: AS va A darajalar (Navy #1e3a73 - 5 cols) */}
                                <div className="sm:col-span-5 bg-[#1e3a73] text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 h-[138px] text-center shadow-md relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                                    <span className="material-symbols-outlined text-[36px] text-white leading-none drop-shadow-sm z-10">auto_awesome</span>
                                    <div className="space-y-0.5 z-10">
                                        <h3 className="font-extrabold text-sm sm:text-base tracking-tight leading-snug">AS va A darajalar</h3>
                                        <p className="text-[10px] text-white/90 font-normal leading-snug max-w-[240px] mx-auto">
                                            Matematika va tanlov fanlari
                                        </p>
                                    </div>
                                </div>

                                {/* Card 5: IGCSE fanlari (Green #0f764c - 7 cols) */}
                                <div className="sm:col-span-7 bg-[#0f764c] text-white rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 h-[138px] text-center shadow-md relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
                                    <span className="material-symbols-outlined text-[36px] text-white leading-none drop-shadow-sm z-10">auto_stories</span>
                                    <div className="space-y-0.5 z-10">
                                        <h3 className="font-extrabold text-sm sm:text-base tracking-tight leading-snug">IGCSE fanlari</h3>
                                        <p className="text-[10px] text-white/90 font-normal leading-snug max-w-[290px] mx-auto">
                                            Matematika, fizika, kimyo, biologiya va informatika
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Right Column: Qabul jarayoni (5 cols out of 12) */}
                    <div className="lg:col-span-5 space-y-3">
                        
                        {/* Header row */}
                        <div>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-1.5 bg-[#e8effc] text-[#1c3879] px-2.5 py-0.5 rounded-md text-xs font-bold tracking-wide mb-1.5">
                                <span className="material-symbols-outlined text-[15px]">description</span>
                                Qabul
                            </div>
                            
                            {/* Title + Link */}
                            <div className="flex items-center justify-between gap-4">
                                <h2 className="text-[22px] md:text-[26px] lg:text-[28px] font-extrabold text-[#0a182e] tracking-tight">
                                    Qabul jarayoni
                                </h2>
                                <Link to="/qabul-2026" className="inline-flex items-center gap-1 text-xs md:text-sm font-bold text-[#1c3879] hover:text-[#0d2347] transition-colors shrink-0">
                                    Barchasi <span className="text-sm">→</span>
                                </Link>
                            </div>
                        </div>

                        {/* Connected Neon Timeline Stepper Card (Exact matching height ~288px) */}
                        <div className="bg-gradient-to-br from-[#12325c] to-[#173e72] border border-white/10 text-white rounded-xl p-3.5 shadow-xl flex flex-col justify-between h-[288px] relative overflow-hidden">
                            {/* Ambient Glow */}
                            <div className="absolute -top-10 -right-10 w-36 h-36 bg-sky-500/10 rounded-full blur-xl pointer-events-none"></div>

                            {/* Vertical Connected Timeline Stepper */}
                            <div className="relative pl-1 flex flex-col justify-between flex-1 py-0.5">
                                {/* Continuous Gradient Line */}
                                <div className="absolute left-[15px] top-3 bottom-5 w-[2px] bg-gradient-to-b from-sky-400 via-blue-400 to-emerald-400 opacity-70"></div>

                                {/* Step 1 */}
                                <div className="relative flex items-center gap-3 z-10">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white font-black text-[11px] flex items-center justify-center shadow-md ring-4 ring-[#12325c] shrink-0">
                                        01
                                    </div>
                                    <div className="flex-1 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1 transition-all flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-xs text-white leading-tight">Tanishib chiqish</h4>
                                            <p className="text-[10px] text-slate-300 font-normal leading-tight">Dasturlar bilan tanishing</p>
                                        </div>
                                        <span className="material-symbols-outlined text-sky-300 text-base shrink-0">manage_search</span>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="relative flex items-center gap-3 z-10">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-[11px] flex items-center justify-center shadow-md ring-4 ring-[#12325c] shrink-0">
                                        02
                                    </div>
                                    <div className="flex-1 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1 transition-all flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-xs text-white leading-tight">Ariza topshirish</h4>
                                            <p className="text-[10px] text-slate-300 font-normal leading-tight">Arizani to'ldiring</p>
                                        </div>
                                        <span className="material-symbols-outlined text-blue-300 text-base shrink-0">edit_note</span>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="relative flex items-center gap-3 z-10">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-[11px] flex items-center justify-center shadow-md ring-4 ring-[#12325c] shrink-0">
                                        03
                                    </div>
                                    <div className="flex-1 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1 transition-all flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-xs text-white leading-tight">Imtihon</h4>
                                            <p className="text-[10px] text-slate-300 font-normal leading-tight">Imtihonda qatnashing</p>
                                        </div>
                                        <span className="material-symbols-outlined text-purple-300 text-base shrink-0">assignment</span>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="relative flex items-center gap-3 z-10">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-white font-black text-[11px] flex items-center justify-center shadow-md ring-4 ring-[#12325c] shrink-0">
                                        04
                                    </div>
                                    <div className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 backdrop-blur-sm border border-emerald-400/30 rounded-lg px-2.5 py-1 transition-all flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold text-xs text-emerald-200 leading-tight">Natijalarni olish</h4>
                                            <p className="text-[10px] text-emerald-100/80 font-normal leading-tight">Safimizga qo'shiling</p>
                                        </div>
                                        <span className="material-symbols-outlined text-emerald-300 text-base shrink-0">verified</span>
                                    </div>
                                </div>

                            </div>

                            {/* Bottom CTA Button */}
                            <a
                                href="https://ariza.piima.uz/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full text-center bg-gradient-to-r from-[#1d3b8a] to-[#255694] hover:from-[#152e72] hover:to-[#1e487e] text-white py-2 px-4 rounded-lg font-bold text-xs md:text-sm shadow-lg transition-all border border-white/20 animate-blik shrink-0 mt-1 block"
                            >
                                Ariza topshirish
                            </a>

                        </div>

                    </div>

                </div>
            </section>

            {/* Section 5: Bizning hamkorlar */}
            <section id="hamkorlar" className="relative overflow-hidden py-8 md:py-12 bg-gradient-to-b from-[#f2f5f9] via-[#e8eff8] to-[#f2f5f9] border-t border-b border-slate-200/50 mt-8">
                {/* Fluid Wave Background Layer matching Section 5 partners theme */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl"></div>
                    <svg className="absolute top-0 left-0 w-[200%] h-full opacity-20 animate-wave-layer3" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <linearGradient id="sec5Wave1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.1" />
                        </linearGradient>
                        <path fill="url(#sec5Wave1)" d="M0,160C320,40,640,280,960,128C1280,300,1400,80,1440,160V320H0Z"></path>
                    </svg>
                    <svg className="absolute bottom-0 left-0 w-[200%] h-full opacity-25 animate-wave-layer1" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <linearGradient id="sec5Wave2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.1" />
                        </linearGradient>
                        <path fill="url(#sec5Wave2)" d="M0,224C240,120,480,280,720,170C960,60,1200,240,1440,192V320H0Z"></path>
                    </svg>
                </div>

                <div className="max-w-[1320px] mx-auto px-4 md:px-8 mb-5 relative z-10">
                    <h2 className="text-[24px] md:text-[28px] font-extrabold text-[#0a182e] tracking-tight">
                        Bizning hamkorlar
                    </h2>
                </div>

                {/* Horizontal Continuous Infinite Marquee Slider */}
                <div className="overflow-hidden w-full relative">
                    {/* Left/Right Subtle Vignette Fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-[#f2f5f9] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-[#f2f5f9] to-transparent z-10 pointer-events-none"></div>
                    
                    <div className="animate-marquee flex items-center gap-3.5 md:gap-5 py-2">
                        {[
                            // Card 1: Cognia
                            {
                                name: "Cognia",
                                logo: (
                                    <div className="flex items-center gap-1">
                                        <span className="text-2xl sm:text-3xl font-black lowercase text-[#111827] tracking-tighter font-sans">cognia</span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] mb-2 shrink-0"></span>
                                    </div>
                                )
                            },
                            // Card 2: College Board
                            {
                                name: "College Board",
                                logo: (
                                    <div className="flex flex-col items-center justify-center text-center gap-2">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#004b87] flex items-center justify-center text-white p-1.5 shadow-xs">
                                            <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                                                <path d="M12 2C9.24 2 7 4.24 7 7c0 2.21 1.44 4.08 3.44 4.72-.08.43-.14.87-.14 1.33 0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6-.46 0-.9.06-1.33.14C14.33 5.19 12.46 3.75 12 2z"/>
                                            </svg>
                                        </div>
                                        <div className="font-serif font-extrabold text-xs sm:text-sm leading-tight text-[#004b87]">
                                            College<br/>Board
                                        </div>
                                    </div>
                                )
                            },
                            // Card 3: CIS - Council of International Schools
                            {
                                name: "CIS - Council of International Schools",
                                logo: <img src="/images/hamkor01.bmp" alt="CIS" className="w-full h-full object-contain" />
                            },
                            // Card 4: Cambridge Assessment International Education
                            {
                                name: "Cambridge Assessment International Education",
                                logo: <img src="/images/hamkor02.bmp" alt="Cambridge" className="w-full h-full object-contain" />
                            },
                            // Repeat set 2
                            {
                                name: "Cognia",
                                logo: (
                                    <div className="flex items-center gap-1">
                                        <span className="text-2xl sm:text-3xl font-black lowercase text-[#111827] tracking-tighter font-sans">cognia</span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] mb-2 shrink-0"></span>
                                    </div>
                                )
                            },
                            {
                                name: "College Board",
                                logo: (
                                    <div className="flex flex-col items-center justify-center text-center gap-2">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#004b87] flex items-center justify-center text-white p-1.5 shadow-xs">
                                            <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                                                <path d="M12 2C9.24 2 7 4.24 7 7c0 2.21 1.44 4.08 3.44 4.72-.08.43-.14.87-.14 1.33 0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6-.46 0-.9.06-1.33.14C14.33 5.19 12.46 3.75 12 2z"/>
                                            </svg>
                                        </div>
                                        <div className="font-serif font-extrabold text-xs sm:text-sm leading-tight text-[#004b87]">
                                            College<br/>Board
                                        </div>
                                    </div>
                                )
                            },
                            {
                                name: "CIS - Council of International Schools",
                                logo: <img src="/images/hamkor01.bmp" alt="CIS" className="w-full h-full object-contain" />
                            },
                            {
                                name: "Cambridge Assessment International Education",
                                logo: <img src="/images/hamkor02.bmp" alt="Cambridge" className="w-full h-full object-contain" />
                            },
                            // Repeat set 3
                            {
                                name: "Cognia",
                                logo: (
                                    <div className="flex items-center gap-1">
                                        <span className="text-2xl sm:text-3xl font-black lowercase text-[#111827] tracking-tighter font-sans">cognia</span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] mb-2 shrink-0"></span>
                                    </div>
                                )
                            },
                            {
                                name: "College Board",
                                logo: (
                                    <div className="flex flex-col items-center justify-center text-center gap-2">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#004b87] flex items-center justify-center text-white p-1.5 shadow-xs">
                                            <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                                                <path d="M12 2C9.24 2 7 4.24 7 7c0 2.21 1.44 4.08 3.44 4.72-.08.43-.14.87-.14 1.33 0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6-.46 0-.9.06-1.33.14C14.33 5.19 12.46 3.75 12 2z"/>
                                            </svg>
                                        </div>
                                        <div className="font-serif font-extrabold text-xs sm:text-sm leading-tight text-[#004b87]">
                                            College<br/>Board
                                        </div>
                                    </div>
                                )
                            },
                            {
                                name: "CIS - Council of International Schools",
                                logo: <img src="/images/hamkor01.bmp" alt="CIS" className="w-full h-full object-contain" />
                            },
                            {
                                name: "Cambridge Assessment International Education",
                                logo: <img src="/images/hamkor02.bmp" alt="Cambridge" className="w-full h-full object-contain" />
                            },
                            // Repeat set 4
                            {
                                name: "Cognia",
                                logo: (
                                    <div className="flex items-center gap-1">
                                        <span className="text-2xl sm:text-3xl font-black lowercase text-[#111827] tracking-tighter font-sans">cognia</span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] mb-2 shrink-0"></span>
                                    </div>
                                )
                            },
                            {
                                name: "College Board",
                                logo: (
                                    <div className="flex flex-col items-center justify-center text-center gap-2">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#004b87] flex items-center justify-center text-white p-1.5 shadow-xs">
                                            <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                                                <path d="M12 2C9.24 2 7 4.24 7 7c0 2.21 1.44 4.08 3.44 4.72-.08.43-.14.87-.14 1.33 0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6-.46 0-.9.06-1.33.14C14.33 5.19 12.46 3.75 12 2z"/>
                                            </svg>
                                        </div>
                                        <div className="font-serif font-extrabold text-xs sm:text-sm leading-tight text-[#004b87]">
                                            College<br/>Board
                                        </div>
                                    </div>
                                )
                            },
                            {
                                name: "CIS - Council of International Schools",
                                logo: <img src="/images/hamkor01.bmp" alt="CIS" className="w-full h-full object-contain" />
                            },
                            {
                                name: "Cambridge Assessment International Education",
                                logo: <img src="/images/hamkor02.bmp" alt="Cambridge" className="w-full h-full object-contain" />
                            }
                        ].map((partner, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-2xl px-4 py-4 shadow-xs border border-slate-200/50 flex flex-col items-center justify-center shrink-0 w-[140px] sm:w-[155px] h-[135px] sm:h-[145px] hover:shadow-md transition-shadow"
                            >
                                {partner.logo}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 6: Bizning jonli maktab hayotimiz */}
            <section className="py-12 md:py-16 bg-[#f8fafc] border-t border-slate-200/60 overflow-hidden">
                <div className="max-w-[1340px] mx-auto px-4 md:px-8 mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#14233b] tracking-tight">
                        Bizning jonli maktab hayotimiz
                    </h2>
                </div>

                {/* Interactive Drag & Auto-Sliding Marquee Gallery */}
                {(() => {
                    // Extract images from newsData (primary image + optional images array)
                    const newsImages = newsData.flatMap(news => {
                        const list = [];
                        if (news.image) list.push({ src: news.image, title: news.title, category: news.category, id: news.id });
                        if (news.images && Array.isArray(news.images)) {
                            news.images.forEach(img => {
                                if (img !== news.image) list.push({ src: img, title: news.title, category: news.category, id: news.id });
                            });
                        }
                        return list;
                    });

                    // Additional high quality school gallery photos
                    const extraGallery = [
                        { src: "/images/gallery01.jpg", title: "Maktab uchrashuvi", category: "Galereya" },
                        { src: "/images/gallery02.jpg", title: "Ustozlar muloqoti", category: "Galereya" },
                        { src: "/images/gallery03.jpg", title: "Prezident maktabi tadbiri", category: "Galereya" },
                        { src: "/images/gallery05.jpg", title: "O'quvchilar hayoti", category: "Galereya" },
                        { src: "/images/05.jpg", title: "STEM laboratoriyasi", category: "Ta'lim" },
                        { src: "/images/06.jpg", title: "Bosh korpus", category: "Maktab" }
                    ];

                    const combinedItems = [...newsImages, ...extraGallery];

                    return <InteractiveGalleryMarquee items={combinedItems} />;
                })()}
            </section>
        </main>
    );
}

