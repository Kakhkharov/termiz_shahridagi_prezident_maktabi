import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PageHeroBanner from '../components/PageHeroBanner';

const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
};

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

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        if (!images || images.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [images]);

    if (!images || images.length === 0) return null;
    
    return (
        <div 
            className="relative w-full rounded-[1.5rem] overflow-hidden mb-8 shadow-md group bg-slate-100 shrink-0"
            style={{ height: '300px', minHeight: '250px', flexShrink: 0 }}
        >
            {/* Sliding Track (Right-to-Left Slide Animation) */}
            <div 
                className="flex w-full h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)`, height: '100%' }}
            >
                {images.map((img, idx) => (
                    <div key={idx} className="w-full h-full shrink-0 relative" style={{ minWidth: '100%', height: '100%' }}>
                        <img 
                            src={img} 
                            className="w-full h-full object-cover block" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            alt={`Dars jarayoni - ${idx + 1}`} 
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-slate-900/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                    {images.map((_, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-6' : 'bg-white/50 w-2 hover:bg-white/80'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const TeacherPortfolioCard = ({ item, index, isArticle }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const storageKeyPrefix = isArticle ? 'article_' : 'lesson_';
    
    const theme = isArticle
        ? {
            fillBg: 'bg-emerald-600',
            tagStyle: 'bg-emerald-50 text-emerald-600 border-emerald-100/50',
            iconText: 'text-emerald-600',
            modalTagStyle: 'bg-emerald-50 text-emerald-600 border-emerald-100',
          }
        : {
            fillBg: 'bg-sky-600',
            tagStyle: 'bg-sky-50 text-sky-600 border-sky-100/50',
            iconText: 'text-sky-600',
            modalTagStyle: 'bg-sky-50 text-sky-600 border-sky-100',
          };
    
    const [views, setViews] = useState(item.views);
    const [stars, setStars] = useState(item.stars);
    const [hasStarred, setHasStarred] = useState(false);

    useEffect(() => {
        const storedStars = localStorage.getItem(`starred_${storageKeyPrefix}${item.id}`);
        if (storedStars) {
            setHasStarred(true);
            setStars(item.stars + 1);
        }
        
        const storedView = localStorage.getItem(`viewed_${storageKeyPrefix}${item.id}`);
        if (storedView) {
            setViews(item.views + 1);
        }
    }, [item.id, item.stars, item.views, storageKeyPrefix]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        if (!localStorage.getItem(`viewed_${storageKeyPrefix}${item.id}`)) {
            localStorage.setItem(`viewed_${storageKeyPrefix}${item.id}`, 'true');
            setViews(prev => prev + 1);
        }
    };

    const handleStarClick = () => {
        if (!hasStarred) {
            localStorage.setItem(`starred_${storageKeyPrefix}${item.id}`, 'true');
            setHasStarred(true);
            setStars(prev => prev + 1);
        }
    };

    return (
        <>
            <Reveal type="fade-up" delay={index * 100} className="h-full">
                <div className="relative bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 p-5 md:p-6 rounded-[1.5rem] flex flex-col h-full group hover:-translate-y-1">
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.map(tag => (
                            <span key={tag} className={`px-2.5 py-1 ${theme.tagStyle} text-[10px] font-bold uppercase rounded-md tracking-wider border`}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title & Author */}
                    <div className="flex flex-col gap-1.5 mb-4">
                        <h3 className="text-[16px] md:text-[18px] font-black text-slate-800 tracking-tight leading-tight">
                            {item.title}
                        </h3>
                        <div className="text-slate-400 font-bold text-[9px] md:text-[10px] uppercase tracking-wider mt-0.5 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">person</span> {item.author} • {item.date}
                        </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-[13px] md:text-[14px] text-slate-600 leading-[1.6] font-medium mb-6 line-clamp-4 flex-grow">
                        {item.description}
                    </p>

                    {/* Stats & Button */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 text-slate-400 font-medium text-[12px]">
                            <span className="flex items-center gap-1" title="Ko'rishlar"><span className="material-symbols-outlined text-[16px]">visibility</span> {formatNumber(views)}</span>
                            <span className="flex items-center gap-1 text-amber-500" title="Yulduzchalar"><span className="material-symbols-outlined text-[16px] fill-current">star</span> {formatNumber(stars)}</span>
                        </div>
                        
                        <button 
                            onClick={handleOpenModal}
                            className="relative overflow-hidden flex items-center justify-center px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-transparent group/btn shadow-sm z-10 cursor-pointer"
                        >
                            {/* Animated Fill Background */}
                            <div className={`absolute inset-0 ${theme.fillBg} transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out z-0 pointer-events-none`}></div>
                            
                            {/* Text and Icon */}
                            <div className="relative z-10 flex items-center text-[#0a1b3f] transition-colors duration-200 group-hover/btn:delay-500 group-hover/btn:text-white">
                                <span className="font-bold text-[12px]">O'qish</span>
                                <span className="material-symbols-outlined text-[16px] ml-1 transition-transform duration-300 group-hover/btn:translate-x-1">
                                    arrow_forward
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </Reveal>

            {/* Modal */}
            {isModalOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
                    <div 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    
                    <div className="relative bg-white w-full max-w-3xl rounded-[2rem] p-6 md:p-10 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto custom-scrollbar z-10 flex flex-col">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-5 right-5 md:top-8 md:right-8 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors shrink-0 z-20"
                        >
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>

                        <div className="mb-6 mt-2 pr-12 md:pr-0">
                            <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight mb-2.5">
                                {item.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {item.tags.map(tag => (
                                    <span key={tag} className={`px-3 py-1 ${theme.modalTagStyle} text-[11px] font-bold uppercase rounded-full tracking-wider border`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Image Slider for Lesson/Article Images */}
                        <ImageSlider images={item.images} />

                        <p className="text-[16px] md:text-[17px] text-slate-600 leading-[1.7] font-medium mb-8 whitespace-pre-line">
                            {item.content || item.description}
                        </p>

                        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border-l-[4px] border-slate-800 relative mb-8">
                            <span className="absolute -left-4 -top-6 text-6xl text-slate-200 font-serif">"</span>
                            <p className="italic text-slate-700 text-[15px] md:text-[16px] leading-[1.7] font-medium relative z-10">
                                {item.quote}
                            </p>
                            <div className="mt-4 font-bold text-slate-800 text-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">person</span> {item.author}
                            </div>
                        </div>

                        {/* Maqola sizga yoqdimi? */}
                        <div className="flex flex-col items-center justify-center pt-8 border-t border-slate-100 mt-auto">
                            <h4 className="text-slate-800 font-bold text-[18px] mb-4">Ushbu {isArticle ? 'maqola' : 'ochiq dars'} sizga yoqdimi?</h4>
                            <button 
                                onClick={handleStarClick}
                                disabled={hasStarred}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-[14px] transition-all duration-300 border ${
                                    hasStarred 
                                    ? 'bg-amber-50 text-amber-500 border-amber-200 cursor-not-allowed shadow-inner' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400 hover:text-amber-500 hover:shadow-[0_4px_15px_rgba(251,191,36,0.2)] hover:-translate-y-0.5'
                                }`}
                            >
                                <span className={`material-symbols-outlined text-[24px] ${hasStarred ? 'fill-current' : ''}`}>star</span>
                                {hasStarred ? "Baho berildi!" : "Ovoz berish"}
                                <span className="ml-2 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[12px]">{formatNumber(stars)}</span>
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default function TeacherPortfolio() {
    const [activeTab, setActiveTab] = useState('articles'); // 'articles' or 'lessons'
    const [filterBy, setFilterBy] = useState('new');

    const articles = [
        {
            id: 1,
            title: "Zamonaviy ta'limda raqamli texnologiyalarning o'rni",
            author: "Xamdamov Nurali",
            date: "12 Aprel, 2026",
            tags: ["#IT", "#Pedagogika"],
            description: "Ushbu maqolada umumta'lim maktablarida o'qitish jarayonini raqamlashtirishning ahamiyati, interaktiv vositalar va sun'iy intellekt orqali o'quvchilar qiziqishini oshirish yo'llari haqida so'z boradi. Raqamli texnologiyalar dars sifatini yangi bosqichga olib chiqadi.",
            content: "Ushbu maqolada umumta'lim maktablarida o'qitish jarayonini raqamlashtirishning ahamiyati, interaktiv vositalar va sun'iy intellekt orqali o'quvchilar qiziqishini oshirish yo'llari haqida so'z boradi.\n\nBugungi kunda har bir o'qituvchi kompyuter texnologiyalaridan dars davomida unumli foydalanishi lozim. Bunga e-boardlar, 3D modellar va onlayn simulyatorlar misol bo'lishi mumkin. Xususan, aniq fanlarda abstrakt tushunchalarni vizualizatsiya qilish o'quvchi xotirasida chuqur iz qoldiradi.",
            quote: "Texnologiya o'qituvchini o'rnini bosa olmaydi, lekin texnologiyadan foydalanadigan o'qituvchi undan foydalanmaydiganning o'rnini egallaydi.",
            images: [
                "/images/01.jpg",
                "/images/02.jpg",
                "/images/03.jpg",
                "/images/04.jpg"
            ],
            views: 1240500,
            stars: 450000,
            timestamp: 1712900000000
        },
        {
            id: 2,
            title: "Matematikani o'rganishda loyiha asosida ta'lim (PBL)",
            author: "Maxmatqobilova Fozila",
            date: "25 Mart, 2026",
            tags: ["#Matematika", "#PBL"],
            description: "O'quvchilarga matematik formulalar va teoremalarni faqat quruq yodlatish emas, balki hayotiy loyihalar orqali yechim topishga undash uslubiyatlari chuqur tahlil qilingan.",
            quote: "Matematika bu shunchaki sonlar emas, u koinotni anglash tilidir.",
            images: [
                "/images/02.jpg",
                "/images/03.jpg",
                "/images/04.jpg",
                "/images/01.jpg"
            ],
            views: 8900,
            stars: 3200,
            timestamp: 1711350000000
        },
        {
            id: 3,
            title: "Ingliz tili darslarida kommunikativ yondashuv",
            author: "Aminova Munisa",
            date: "08 Fevral, 2026",
            tags: ["#Ingliz_tili", "#Metodika"],
            description: "Til o'rganishda grammatik qoidalarni chetlab o'tib, ko'proq muloqot va jonli suhbatlarga urg'u berishning o'quvchi xotirasiga va nutqiga ijobiy ta'siri batafsil ko'rib chiqilgan.",
            quote: "Yangi til - bu hayotga yangi deraza ochish demakdir.",
            images: [
                "/images/03.jpg",
                "/images/04.jpg",
                "/images/01.jpg",
                "/images/02.jpg"
            ],
            views: 2150000000,
            stars: 680000000,
            timestamp: 1707370000000
        },
        {
            id: 4,
            title: "Biologiyani virtual laboratoriyalar orqali o'qitish",
            author: "Abdimurotov Dilmuhammad",
            date: "19 Yanvar, 2026",
            tags: ["#Biologiya", "#Innovatsiya"],
            description: "Xavfli yoki maktab sharoitida o'tkazish qiyin bo'lgan tajribalarni 3D va virtual laboratoriyalar orqali namoyish qilishning zamonaviy usullari keltirilgan.",
            quote: "Tabiatni tushunish uchun avvalo uning mitti zarralarini his qilish kerak.",
            images: [
                "/images/04.jpg",
                "/images/01.jpg",
                "/images/02.jpg",
                "/images/03.jpg"
            ],
            views: 34000,
            stars: 9500,
            timestamp: 1705640000000
        }
    ];

    const openLessons = [
        {
            id: 1,
            title: "Fizika: Nyutonning 3-qonuni va kosmik parvozlar",
            author: "Edwin",
            date: "05 May, 2026",
            tags: ["#Fizika", "#Koinot"],
            description: "Fizika fanidan 9-sinflar uchun ochiq dars. Dars davomida reaktiv harakat va koinotni tadqiq etish tamoyillari tajribalar asosida ko'rsatib beriladi.",
            quote: "Har bir ta'sirga teng va qarama-qarshi aks ta'sir mavjud. Bu qonun nafaqat fizika, balki hayot uchun ham o'rinlidir.",
            images: [
                "/images/01.jpg",
                "/images/03.jpg",
                "/images/04.jpg"
            ],
            views: 4500,
            stars: 1200,
            timestamp: 1714890000000
        },
        {
            id: 2,
            title: "Tarix: Buyuk Ipak yo'lining Markaziy Osiyo sivilizatsiyasiga ta'siri",
            author: "Sheraliyev Murodjon",
            date: "22 Aprel, 2026",
            tags: ["#Tarix", "#Madaniyat"],
            description: "Ochiq darsda o'quvchilar guruhlarga bo'linib, qadimiy savdo yo'llari bo'ylab sayohatni taqdimotlar va ro'lli o'yinlar orqali yoritib beradilar.",
            quote: "Tarixni bilmasdan turib kelajakni qurib bo'lmaydi.",
            images: [
                "/images/02.jpg",
                "/images/04.jpg",
                "/images/01.jpg"
            ],
            views: 1800000,
            stars: 500000,
            timestamp: 1713760000000
        },
        {
            id: 3,
            title: "Informatika: Python dasturlash tilida sun'iy intellekt elementlari",
            author: "Allaqulov Safarmurod",
            date: "10 Aprel, 2026",
            tags: ["#AI", "#Python"],
            description: "11-sinf o'quvchilari uchun mo'ljallangan ushbu amaliy mashg'ulotda sodda neyron tarmog'i yaratish hamda ma'lumotlarni tahlil qilish algoritmlari namoyish etiladi.",
            quote: "Kelajakda kim kod yoza olsa, u koinotni boshqaradi.",
            images: [
                "/images/03.jpg",
                "/images/01.jpg",
                "/images/02.jpg"
            ],
            views: 29000,
            stars: 8700,
            timestamp: 1712730000000
        }
    ];

    // Filter Logic
    let currentData = activeTab === 'articles' ? [...articles] : [...openLessons];
    
    if (filterBy === 'new') {
        currentData.sort((a, b) => b.timestamp - a.timestamp);
    } else if (filterBy === 'old') {
        currentData.sort((a, b) => a.timestamp - b.timestamp);
    } else if (filterBy === 'popular') {
        currentData.sort((a, b) => (b.views + b.stars * 2) - (a.views + a.stars * 2));
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 pt-[112px] lg:pt-[132px] pb-32 relative overflow-hidden">
            
            {/* Modern Minimalistic Animated Background Elements */}
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute top-10 right-[-10%] w-[600px] h-[600px] bg-emerald-300/25 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[7000ms]"></div>
            <div className="absolute top-[40%] left-[-15%] w-[700px] h-[700px] bg-sky-300/20 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[10000ms]"></div>
            <div className="absolute bottom-10 right-[15%] w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[130px] pointer-events-none animate-pulse duration-[8000ms]"></div>

            <div className="relative z-20">
                <PageHeroBanner category="Statistikalar" title="O'qituvchi portfoliosi" />
            </div>

            <main className="max-w-[1200px] mx-auto relative z-10 px-4 md:px-8 mt-12">
                
                {/* Tab Switcher Centered */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 relative w-[320px]">
                        <button 
                            onClick={() => setActiveTab('articles')}
                            className={`relative w-1/2 py-2.5 rounded-xl font-bold text-[13px] md:text-sm transition-all duration-300 z-10 ${
                                activeTab === 'articles' ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            Ilmiy Maqolalar
                        </button>
                        <button 
                            onClick={() => setActiveTab('lessons')}
                            className={`relative w-1/2 py-2.5 rounded-xl font-bold text-[13px] md:text-sm transition-all duration-300 z-10 ${
                                activeTab === 'lessons' ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            Ochiq Darslar
                        </button>
                        
                        {/* Animated background pill matching O'qish button theme color */}
                        <div 
                            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] ${activeTab === 'articles' ? 'bg-emerald-600' : 'bg-sky-600'} rounded-xl transition-all duration-500 ease-out shadow-sm`}
                            style={{ 
                                transform: activeTab === 'articles' ? 'translateX(0)' : 'translateX(100%)',
                                left: '0.375rem'
                            }}
                        />
                    </div>
                </div>

                {/* Filter Right-Aligned, New Line, Small Size */}
                <div className="flex justify-end mb-8">
                    <div className="relative z-20 group w-[160px]">
                        <div className="bg-white px-3 py-2 rounded-lg border border-slate-200/60 shadow-sm flex items-center gap-2 cursor-pointer hover:border-sky-300 transition-colors w-full">
                            <span className="material-symbols-outlined text-slate-400 text-[18px]">tune</span>
                            <span className="text-[12px] font-bold text-slate-700 flex-1">
                                {filterBy === 'new' && "Yangi"}
                                {filterBy === 'popular' && "Mashhur"}
                                {filterBy === 'old' && "Eski"}
                            </span>
                            <span className="material-symbols-outlined text-slate-400 text-[18px]">expand_more</span>
                        </div>
                        
                        <div className="absolute top-full right-0 mt-1.5 w-full bg-white rounded-lg shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right group-hover:scale-100 scale-95 overflow-hidden z-30">
                            <button onClick={() => setFilterBy('new')} className={`w-full text-left px-4 py-2.5 text-[12px] font-bold transition-colors border-b border-slate-50 flex items-center justify-between ${filterBy === 'new' ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                                Yangi
                                {filterBy === 'new' && <span className="material-symbols-outlined text-sky-600 text-[16px]">check</span>}
                            </button>
                            <button onClick={() => setFilterBy('popular')} className={`w-full text-left px-4 py-2.5 text-[12px] font-bold transition-colors border-b border-slate-50 flex items-center justify-between ${filterBy === 'popular' ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                                Mashhur
                                {filterBy === 'popular' && <span className="material-symbols-outlined text-sky-600 text-[16px]">check</span>}
                            </button>
                            <button onClick={() => setFilterBy('old')} className={`w-full text-left px-4 py-2.5 text-[12px] font-bold transition-colors flex items-center justify-between ${filterBy === 'old' ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:bg-slate-50'}`}>
                                Eski
                                {filterBy === 'old' && <span className="material-symbols-outlined text-sky-600 text-[16px]">check</span>}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
                    {currentData.map((item, index) => (
                        <TeacherPortfolioCard key={item.id} item={item} index={index} isArticle={activeTab === 'articles'} />
                    ))}
                </div>

            </main>
        </div>
    );
}
