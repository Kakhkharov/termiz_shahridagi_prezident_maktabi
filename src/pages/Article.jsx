import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { newsData, formatNewsDate } from '../data/newsData';
import { getAssetPath } from '../utils/assets';

const ArticleImageSlider = ({ images, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const slideImages = (images && images.length > 0) ? images : [];

    useEffect(() => {
        if (!slideImages || slideImages.length <= 1 || isHovered) return;
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % slideImages.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [slideImages, isHovered]);

    if (!slideImages || slideImages.length === 0) return null;

    const nextSlide = (e) => {
        e?.preventDefault();
        setCurrentIndex(prev => (prev + 1) % slideImages.length);
    };

    const prevSlide = (e) => {
        e?.preventDefault();
        setCurrentIndex(prev => (prev - 1 + slideImages.length) % slideImages.length);
    };

    return (
        <div 
            className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg group bg-slate-900 shrink-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Sliding Track (Right-to-Left Slide Animation) */}
            <div 
                className="flex w-full h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)`, height: '100%' }}
            >
                {slideImages.map((img, idx) => (
                    <div key={idx} className="w-full h-full shrink-0 relative" style={{ minWidth: '100%', height: '100%' }}>
                        <img
                            src={getAssetPath(img)}
                            className="w-full h-full object-cover block"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            alt={`${title} - Rasm ${idx + 1}`}
                        />
                    </div>
                ))}
            </div>

            {/* Manual Switch Controls (Arrows & Dots) */}
            {slideImages.length > 1 && (
                <>
                    {/* Left Chevron Button */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/60 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-900/80 hover:scale-110 z-20 cursor-pointer shadow-md"
                        aria-label="Oldingi rasm"
                    >
                        <span className="material-symbols-outlined text-xl">chevron_left</span>
                    </button>

                    {/* Right Chevron Button */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/60 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-900/80 hover:scale-110 z-20 cursor-pointer shadow-md"
                        aria-label="Keyingi rasm"
                    >
                        <span className="material-symbols-outlined text-xl">chevron_right</span>
                    </button>

                    {/* Sleek, Creative & Compact Slide Navigator Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-slate-900/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 shadow-sm">
                        {slideImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`transition-all duration-300 cursor-pointer ${
                                    idx === currentIndex 
                                        ? 'w-4 h-1.5 bg-[#0088cc] rounded-full shadow-[0_0_8px_rgba(0,136,204,0.7)]' 
                                        : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80 rounded-full'
                                }`}
                                aria-label={`Rasm ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default function Article() {
    const { id } = useParams();
    const article = newsData.find(item => item.id === parseInt(id)) || newsData[0];
    const [copied, setCopied] = useState(false);

    const getShareUrl = () => {
        const origin = window.location.origin;
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
            return window.location.href;
        }
        return `https://www.pstermez.uz/article/${article.id}`;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (article) {
            document.title = `${article.title} | Termiz shahridagi Prezident maktabi`;

            const setMeta = (prop, content) => {
                let el = document.querySelector(`meta[property="${prop}"]`);
                if (!el) {
                    el = document.createElement('meta');
                    el.setAttribute('property', prop);
                    document.head.appendChild(el);
                }
                el.setAttribute('content', content);
            };

            const fullImageUrl = article.image 
                ? (article.image.startsWith('http') ? article.image : `https://www.pstermez.uz${article.image}`) 
                : 'https://www.pstermez.uz/images/maktab.jpg';

            setMeta('og:title', article.title);
            setMeta('og:description', article.desc || article.title);
            setMeta('og:image', fullImageUrl);
            setMeta('og:url', getShareUrl());
            setMeta('og:type', 'article');
        }
    }, [id, article]);

    const handleShare = async () => {
        const shareUrl = getShareUrl();
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.desc || article.title,
                    url: shareUrl,
                });
                return;
            } catch (err) {
                if (err.name === 'AbortError') return;
            }
        }

        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const imagesToDisplay = article.images && article.images.length > 0 
        ? article.images 
        : [article.image];

    return (
        <main className="pt-[160px] pb-12 max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Main Article Content */}
                <div className="flex-1 space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                    
                    {/* Header Group: Compact Breadcrumbs + Title + Meta */}
                    <div className="space-y-3">
                        <nav className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            <Link to="/" className="hover:text-[#0088cc] transition-colors">Asosiy</Link>
                            <span className="material-symbols-outlined text-[13px]">chevron_right</span>
                            <Link to="/news" className="hover:text-[#0088cc] transition-colors">Yangiliklar</Link>
                            <span className="material-symbols-outlined text-[13px]">chevron_right</span>
                            <span className="text-[#0088cc]">{article.category}</span>
                        </nav>

                        <h1 className="text-lg md:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight">
                            {article.title}
                        </h1>

                        <div className="flex items-center gap-5 pt-2 pb-2.5 border-y border-slate-100 text-xs text-slate-500 font-bold uppercase tracking-wider">
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[#0088cc] text-[16px]">calendar_today</span>
                                {formatNewsDate(article)}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[#0088cc] text-[16px]">visibility</span>
                                {Math.floor(Math.random() * 500) + 100} marta ko'rildi
                            </div>
                        </div>
                    </div>

                    {/* Render Video Player if article.video exists, otherwise Image Slider */}
                    {article.video ? (
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-black shrink-0 border border-slate-200">
                            <video 
                                controls 
                                playsInline
                                preload="metadata"
                                poster={article.image ? getAssetPath(article.image) : undefined}
                                className="w-full h-full object-contain"
                            >
                                <source src={getAssetPath(article.video)} type="video/mp4" />
                                Brauzeringiz videoni qo'llab-quvvatlamaydi.
                            </video>
                        </div>
                    ) : (
                        <ArticleImageSlider images={imagesToDisplay} title={article.title} />
                    )}

                    <div
                        className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    <div className="pt-4 border-t border-slate-100 mt-6">
                        <div className="flex items-center gap-4 flex-wrap">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ULASHISH:</span>
                            <div className="relative flex items-center gap-2.5">
                                {/* Telegram Share Button */}
                                <a 
                                    href={`https://t.me/share/url?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(article.title)}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-[#229ED9] hover:bg-[#1b8bc2] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                                    title="Telegram orqali ulashish"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                                    </svg>
                                </a>

                                {/* Native Share / Copy Button */}
                                <button 
                                    onClick={handleShare}
                                    className="w-10 h-10 rounded-full bg-[#0088cc] text-white flex items-center justify-center hover:bg-[#0077b5] hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                                    title="Havolani nusxalash yoki boshqa ilovalar bilan ulashish"
                                >
                                    <span className="material-symbols-outlined text-[20px]">share</span>
                                </button>

                                {copied && (
                                    <span className="px-3 py-1 bg-emerald-600 text-white text-[12px] font-bold rounded-lg shadow-md animate-fade-in flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                        Havola nusxalandi!
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="hidden lg:block shrink-0">
                    <Sidebar />
                </div>
            </div>
        </main>
    );
}
