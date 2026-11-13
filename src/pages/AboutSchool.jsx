import React, { useEffect, useRef, useState } from 'react';
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

export default function AboutSchool() {
    return (
        <div className="min-h-screen bg-[#f8fafc] pt-[112px] lg:pt-[132px] pb-24 relative overflow-x-hidden text-slate-800">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,#ffffff_0%,#f1f5f9_100%)] opacity-80 pointer-events-none" />
            
            <div className="relative z-20">
                <PageHeroBanner category="Biz haqimizda" title="Maktab haqida" />
            </div>

            <main className="max-w-[1200px] mx-auto relative z-10 px-4 md:px-8 pt-10 md:pt-16 flex flex-col gap-12 md:gap-16">
                
                {/* 0. Umumiy ma'lumot */}
                <Reveal type="fade-up">
                <section>
                    <div className="flex flex-col lg:flex-row gap-10 items-center">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1b3f] mb-8">Termiz şahridagi Prezident maktabi</h2>
                            <p className="text-lg text-slate-600 leading-relaxed text-justify mb-6">
                                Termiz şahridagi Prezident maktabi <strong>2021-yil 1-noyabr</strong> kuni öz faoliyatini boşlagan. Maktab asosan iqtidorli yoşlarni kaşf etiş va ularni xalqaro standartlar asosida öqitişga ixtisoslaşgan. Har yili maktabning 5-sinfiga qabul uçun 24 ta örin ajratiladi va uşbu örinlarga minglab iqtidorli nomzodlar hujjat topşirib, öta yuqori soğlom raqobat asosida saralab olinadi. 
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed text-justify">
                                Maktabda öquvçilarning töliq jismoniy va psixologik xavfsizligini ta'minlaş eng ustuvor vazifa hisoblanadi. Hudud 24/7 video kuzatuv kameralari, "Face ID" aqlli kiriş tizimi hamda maxsus qöriqlaş xizmati bilan jihozlangan. Maktab xalqaro ta’lim va xavfsizlik standartlariga töla javob bergani uçun nufuzli <strong>Xalqaro maktablar kengaşi (CIS)</strong> a’zoligiga qabul qilingan.
                            </p>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                                <span className="material-symbols-outlined text-4xl text-[#0088cc] mb-3">calendar_month</span>
                                <h4 className="text-2xl font-bold text-[#0a1b3f]">2021-yil</h4>
                                <p className="text-sm font-medium text-slate-500 mt-1">Taşkil etilgan vaqt</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                                <span className="material-symbols-outlined text-4xl text-[#0088cc] mb-3">group</span>
                                <h4 className="text-2xl font-bold text-[#0a1b3f]">168 örin</h4>
                                <p className="text-sm font-medium text-slate-500 mt-1">Maktab siğimi</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                                <span className="material-symbols-outlined text-4xl text-[#0088cc] mb-3">verified_user</span>
                                <h4 className="text-2xl font-bold text-[#0a1b3f]">100%</h4>
                                <p className="text-sm font-medium text-slate-500 mt-1">Xavfsiz ta'lim muhiti</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                                <span className="material-symbols-outlined text-4xl text-[#0088cc] mb-3">public</span>
                                <h4 className="text-2xl font-bold text-[#0a1b3f]">CIS</h4>
                                <p className="text-sm font-medium text-slate-500 mt-1">Xalqaro akkreditatsiya</p>
                            </div>
                        </div>
                    </div>
                </section>
                </Reveal>
                {/* 1. Ta'lim me'zoni */}
                <Reveal type="fade-right">
                <section>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0a1b3f] mb-8">Ta'lim me'zoni</h2>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-5xl text-justify">
                        Termiz şahridagi Prezident maktabi milliy öquv dasturini Cambridge Assessment International Education (CAIE) tizimi bilan uyğunlaştirgan yuqori sifatli akademik dasturni taklif etadi. Bu ikki tomonlama yondaşuv öquvçilarning milliy va xalqaro standartlarga javob beradigan keng qamrovli ta’lim olişini ta’minlaydi.
                    </p>
                </section>
                </Reveal>

                {/* 2. Ta'lim tizimi bosqichlari */}
                <Reveal type="fade-left">
                <section id="talim-tizimi">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0a1b3f] mb-8">Ta'lim tizimi bosqiçlari</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* 5-7 sinflar */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-bold text-[#0088cc] mb-2">5-7 sinflar</h3>
                            <p className="text-slate-500 font-semibold mb-6">Quyi örta ta'lim bosqiçi</p>
                            <ul className="space-y-4 font-medium text-slate-700">
                                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#0088cc] shrink-0"></span> Özbek milliy fanlari</li>
                                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#0088cc] shrink-0"></span> Cambridge Çeckpoint</li>
                                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#0088cc] shrink-0"></span> ESL & Global Perspectives</li>
                                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#0088cc] shrink-0"></span> Science & ICT</li>
                            </ul>
                        </div>
                        {/* 8-9 sinflar */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-bold text-[#0088cc] mb-2">8-9 sinflar</h3>
                            <p className="text-slate-500 font-semibold mb-6">IGCSE xalqaro sertifikati</p>
                            <ul className="space-y-4 font-medium text-slate-700">
                                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#0088cc] shrink-0"></span> Özbek milliy fanlari</li>
                                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#0088cc] shrink-0"></span> Cambridge Çeckpoint</li>
                                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#0088cc] shrink-0"></span> ESL & Global Perspectives</li>
                                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#0088cc] shrink-0"></span> Science & ICT</li>
                            </ul>
                        </div>
                        {/* 10-11 sinflar */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <h3 className="text-2xl font-bold text-[#0088cc] mb-2">10-11 sinflar</h3>
                            <p className="text-slate-500 font-semibold mb-6">AS & A Level ixtisoslaşuv</p>
                            <ul className="space-y-4 font-medium text-slate-700">
                                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#0088cc] shrink-0"></span> Özbek milliy fanlari</li>
                                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#0088cc] shrink-0"></span> Cambridge Çeckpoint</li>
                                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#0088cc] shrink-0"></span> ESL & Global Perspectives</li>
                                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-[#0088cc] shrink-0"></span> Science & ICT</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed bg-sky-50/50 p-6 rounded-xl border border-sky-100 text-justify">
                        Maktabda ta’lim uç tilda — özbek, rus va ingliz tillarida olib boriladi. Öquv dasturi Özbekiston milliy öquv dasturi hamda xalqaro ta’lim standartlarini, jumladan Cambridge Assessment International Education (CAIE) va Pearson Edexcel dasturlarini öz içiga oladi. Xalqaro fanlar ingliz tilida öqitilib, dars jarayonida mahalliy va xorijiy öqituvçilar birgalikda faoliyat yuritadi. 5–7-sinf öquvçilari Cambridge dasturi asosida matematika, ingliz tili, tabiiy fanlar, kompyuter fanlari va global istiqbollar fanlarini örganadilar. 8–9-sinflarda öquvçilar IGCSE dasturi böyiça tahsil olib, keyingi bosqiçdagi AS va A Level dasturlariga tayyorlanadilar. 10–11-sinflarda esa öquvçilar öz qiziqişlariga köra fanlarni tanlab, AS va A Level xalqaro dasturlari asosida ta’lim oladilar. Şu bilan birga, IELTS va SAT imtihonlariga tayyorgarlik köradilar hamda akademik yozuv könikmalarini rivojlantiradilar.
                    </p>
                </section>
                </Reveal>

                {/* 3. Dastur haqida */}
                <section>
                    <Reveal>
                        <div className="flex flex-col items-center mb-10">
                            <span className="text-sky-500 font-bold tracking-wider uppercase text-sm mb-2">Maktab öquv dasturi</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0a1b3f] mb-8">Dastur haqida</h2>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full mt-6"></div>
                        </div>
                    </Reveal>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        <Reveal delay={100} className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute -right-4 -top-8 text-[120px] font-black text-slate-50 group-hover:text-sky-50 transition-colors duration-500 select-none z-0 pointer-events-none">01</div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-sky-500 transition-all duration-500">
                                    <span className="material-symbols-outlined text-[28px] text-sky-500 group-hover:text-white transition-colors duration-500">school</span>
                                </div>
                                <h4 className="text-2xl font-bold text-[#0a1b3f] mb-3 group-hover:text-sky-600 transition-colors">5–11-sinflar</h4>
                                <p className="text-slate-500 font-medium text-[16px] leading-relaxed">milliy va xalqaro fanlarni özlaştiriş</p>
                            </div>
                        </Reveal>
                        
                        <Reveal delay={200} className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute -right-4 -top-8 text-[120px] font-black text-slate-50 group-hover:text-indigo-50 transition-colors duration-500 select-none z-0 pointer-events-none">02</div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-indigo-500 transition-all duration-500">
                                    <span className="material-symbols-outlined text-[28px] text-indigo-500 group-hover:text-white transition-colors duration-500">translate</span>
                                </div>
                                <h4 className="text-2xl font-bold text-[#0a1b3f] mb-3 group-hover:text-indigo-600 transition-colors">Tillar</h4>
                                <p className="text-slate-500 font-medium text-[16px] leading-relaxed">Ingliz tili (EFL), özbek tili, rus tili;</p>
                            </div>
                        </Reveal>

                        <Reveal delay={300} className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute -right-4 -top-8 text-[120px] font-black text-slate-50 group-hover:text-purple-50 transition-colors duration-500 select-none z-0 pointer-events-none">03</div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-purple-500 transition-all duration-500">
                                    <span className="material-symbols-outlined text-[28px] text-purple-500 group-hover:text-white transition-colors duration-500">history_edu</span>
                                </div>
                                <h4 className="text-2xl font-bold text-[#0a1b3f] mb-3 group-hover:text-purple-600 transition-colors">Gumanitar fanlar</h4>
                                <p className="text-slate-500 font-medium text-[16px] leading-relaxed">Özbekiston tarixi, jahon tarixi, zamonaviy yondaşuv.</p>
                            </div>
                        </Reveal>

                        <Reveal delay={400} className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute -right-4 -top-8 text-[120px] font-black text-slate-50 group-hover:text-emerald-50 transition-colors duration-500 select-none z-0 pointer-events-none">04</div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-emerald-500 transition-all duration-500">
                                    <span className="material-symbols-outlined text-[28px] text-emerald-500 group-hover:text-white transition-colors duration-500">science</span>
                                </div>
                                <h4 className="text-2xl font-bold text-[#0a1b3f] mb-3 group-hover:text-emerald-600 transition-colors">AS va A darajalar</h4>
                                <p className="text-slate-500 font-medium text-[16px] leading-relaxed">matematika va tanlov fanlari (kimyo, fizika, biologiya va informatika)</p>
                            </div>
                        </Reveal>

                        <Reveal delay={500} className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute -right-4 -top-8 text-[120px] font-black text-slate-50 group-hover:text-rose-50 transition-colors duration-500 select-none z-0 leading-none pointer-events-none">05</div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-rose-500 transition-all duration-500">
                                    <span className="material-symbols-outlined text-[28px] text-rose-500 group-hover:text-white transition-colors duration-500">biotech</span>
                                </div>
                                <h4 className="text-2xl font-bold text-[#0a1b3f] mb-3 group-hover:text-rose-600 transition-colors">IGCSE fanlari</h4>
                                <p className="text-slate-500 font-medium text-[16px] leading-relaxed">Matematika, fizika, kimyo, biologiya va informatika</p>
                            </div>
                        </Reveal>

                    </div>
                </section>

                {/* 4. Kun tartibi */}
                <Reveal>
                <section>
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0a1b3f] mb-8">Kun tartibi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        
                        {/* Uyg'onish Column */}
                        <div className="flex flex-col gap-2">
                            <div className="bg-[#43a08e] rounded-xl p-5 flex items-center justify-between text-white shadow-sm cursor-pointer transition-transform hover:-translate-y-1">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[28px]">wb_twilight</span>
                                    <div>
                                        <h3 className="text-2xl font-bold">Uyğoniş</h3>
                                        <p className="text-xs text-white/90 font-medium">Kunni töğri boşlang</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined">expand_more</span>
                            </div>
                            
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#43a08e] font-bold text-sm min-w-[70px] text-center">6:00 AM</div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Öquvçilar uçun uyğoniş vaqti</div>
                            </div>
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#43a08e] font-bold text-sm min-w-[70px] text-center">6:30 AM</div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Sport zalida badan tarbiya bilan şuğullaniş vaqti</div>
                            </div>
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#43a08e] font-bold text-sm min-w-[70px] text-center">7:00 AM</div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Nonuşta vaqti</div>
                            </div>
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#43a08e] font-bold text-sm min-w-[70px] text-center">8:00 AM</div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Ertalabki saflaniş vaqti</div>
                            </div>
                        </div>

                        {/* Akademik darslar Column */}
                        <div className="flex flex-col gap-2">
                            <div className="bg-[#6282b9] rounded-xl p-5 flex items-center justify-between text-white shadow-sm cursor-pointer transition-transform hover:-translate-y-1">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[28px]">light_mode</span>
                                    <div>
                                        <h3 className="text-2xl font-bold">Akademik darslar</h3>
                                        <p className="text-xs text-white/90 font-medium">Asosiy öquv soatlari</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined">expand_more</span>
                            </div>
                            
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#6282b9] font-bold text-[13px] min-w-[70px] text-center flex flex-col leading-tight">
                                    <span>8:30 AM</span>
                                    <span>3:35 PM</span>
                                </div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Akademik darslar vaqti</div>
                            </div>
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#6282b9] font-bold text-[13px] min-w-[70px] text-center flex flex-col leading-tight">
                                    <span>10:55 AM</span>
                                    <span>11:25 AM</span>
                                </div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Ikkinçi nonuşta vaqti</div>
                            </div>
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#6282b9] font-bold text-[13px] min-w-[70px] text-center flex flex-col leading-tight">
                                    <span>1:00 PM</span>
                                    <span>2:00 PM</span>
                                </div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Tuşlik vaqti</div>
                            </div>
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#6282b9] font-bold text-[13px] min-w-[70px] text-center flex flex-col leading-tight">
                                    <span>2:45 PM</span>
                                    <span>3:55 PM</span>
                                </div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">5-sinflar uçun qisqa uyqu vaqti</div>
                            </div>
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#6282b9] font-bold text-[13px] min-w-[70px] text-center flex flex-col leading-tight">
                                    <span>2:45 PM</span>
                                    <span>3:55 PM</span>
                                </div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Böş vaqt</div>
                            </div>
                        </div>

                        {/* Kechqurun Column */}
                        <div className="flex flex-col gap-2">
                            <div className="bg-[#2b3a67] rounded-xl p-5 flex items-center justify-between text-white shadow-sm cursor-pointer transition-transform hover:-translate-y-1">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[28px]">dark_mode</span>
                                    <div>
                                        <h3 className="text-2xl font-bold">Keçqurun</h3>
                                        <p className="text-xs text-white/90 font-medium">Mulohaza va tayyorgarlik</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined">expand_more</span>
                            </div>
                            
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#2b3a67] font-bold text-[13px] min-w-[70px] text-center flex flex-col leading-tight">
                                    <span>3:55 PM</span>
                                    <span>4:15 PM</span>
                                </div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Çoy vaqti</div>
                            </div>
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#2b3a67] font-bold text-[13px] min-w-[70px] text-center flex flex-col leading-tight">
                                    <span>4:15 PM</span>
                                    <span>6:00 PM</span>
                                </div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Tögarak vaqti</div>
                            </div>
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#2b3a67] font-bold text-[13px] min-w-[70px] text-center flex flex-col leading-tight">
                                    <span>6:00 PM</span>
                                    <span>7:00 PM</span>
                                </div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Uyga vazifa va sport vaqti</div>
                            </div>
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#2b3a67] font-bold text-[13px] min-w-[70px] text-center flex flex-col leading-tight">
                                    <span>7:00 PM</span>
                                    <span>8:00 PM</span>
                                </div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Keçki ovqat vaqti</div>
                            </div>
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#2b3a67] font-bold text-[13px] min-w-[70px] text-center flex flex-col leading-tight">
                                    <span>8:00 PM</span>
                                    <span>9:30 PM</span>
                                </div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Öqiş va qöşimça maşğulotlar vaqti</div>
                            </div>
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#2b3a67] font-bold text-[13px] min-w-[70px] text-center flex flex-col leading-tight">
                                    <span>9:30 PM</span>
                                    <span>10:00 PM</span>
                                </div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Tungi saflaniş vaqti</div>
                            </div>
                            <div className="bg-[#f4f7f8] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="text-[#2b3a67] font-bold text-sm min-w-[70px] text-center">10:00 PM</div>
                                <div className="text-[#4a5568] text-[15px] font-medium leading-snug">Uxlaş vaqti</div>
                            </div>
                        </div>

                    </div>
                </section>
                </Reveal>

                {/* 5. Baholash */}
                <Reveal type="zoom-in">
                <section>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0a1b3f] mb-8">Baholaş</h2>
                    <p className="text-lg text-slate-600 mb-10 max-w-4xl text-justify">
                        Öquvçilarning özlaştiriş samaradorligini aniqlaş formativ va summativ baholaşga asoslanadi. Har bir semestrda formativ baholaş 60%ni va summativ baholaş 40%ni taşkil qiladi. Yakuniy imtihon yillik baholaşning 40%ini taşkil qiladi. Baholaş 1 dan 5 gaça bölgan şkala böyiça:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div className="bg-white border-2 border-green-100 hover:border-green-400 px-6 py-5 rounded-2xl flex flex-col items-center text-center gap-2 transition-colors">
                            <span className="text-4xl font-black text-green-500">5</span>
                            <span className="text-slate-700 font-bold text-lg">85–100%</span>
                            <span className="text-sm font-medium text-slate-500">(a’lo)</span>
                        </div>
                        <div className="bg-white border-2 border-blue-100 hover:border-blue-400 px-6 py-5 rounded-2xl flex flex-col items-center text-center gap-2 transition-colors">
                            <span className="text-4xl font-black text-blue-500">4</span>
                            <span className="text-slate-700 font-bold text-lg">75–84%</span>
                            <span className="text-sm font-medium text-slate-500">(yaxşi)</span>
                        </div>
                        <div className="bg-white border-2 border-yellow-100 hover:border-yellow-400 px-6 py-5 rounded-2xl flex flex-col items-center text-center gap-2 transition-colors">
                            <span className="text-4xl font-black text-yellow-500">3</span>
                            <span className="text-slate-700 font-bold text-lg">60–74%</span>
                            <span className="text-sm font-medium text-slate-500">(qoniqarli)</span>
                        </div>
                        <div className="bg-white border-2 border-orange-100 hover:border-orange-400 px-6 py-5 rounded-2xl flex flex-col items-center text-center gap-2 transition-colors">
                            <span className="text-4xl font-black text-orange-500">2</span>
                            <span className="text-slate-700 font-bold text-lg">45–59%</span>
                            <span className="text-sm font-medium text-slate-500">(qoniqarsiz)</span>
                        </div>
                        <div className="bg-white border-2 border-red-100 hover:border-red-400 px-6 py-5 rounded-2xl flex flex-col items-center text-center gap-2 transition-colors">
                            <span className="text-4xl font-black text-red-500">1</span>
                            <span className="text-slate-700 font-bold text-lg">1–44%</span>
                            <span className="text-sm font-medium text-slate-500">(muvaffaqiyatsiz)</span>
                        </div>
                    </div>
                </section>
                </Reveal>

                {/* 6. Qo'shimcha mashg'ulotlar */}
                <Reveal type="fade-right">
                <section>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0a1b3f] mb-8">Qöşimça maşğulotlar</h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-4xl">Öquvçilarning jismoniy, ruhiy va aqliy muvozanatini taʻminlaydi.</p>
                    <div className="flex flex-wrap gap-4">
                        <span className="bg-sky-50 text-[#0088cc] border border-sky-100 px-6 py-3 rounded-full font-bold shadow-sm">Robototexnika va dasturlaş klublari</span>
                        <span className="bg-sky-50 text-[#0088cc] border border-sky-100 px-6 py-3 rounded-full font-bold shadow-sm">San’at va musiqa guruhlari</span>
                        <span className="bg-sky-50 text-[#0088cc] border border-sky-100 px-6 py-3 rounded-full font-bold shadow-sm">Fan tögaraklari</span>
                        <span className="bg-sky-50 text-[#0088cc] border border-sky-100 px-6 py-3 rounded-full font-bold shadow-sm">Olimpiadalariga tayyorlov</span>
                        <span className="bg-sky-50 text-[#0088cc] border border-sky-100 px-6 py-3 rounded-full font-bold shadow-sm">Sport maşğulotlari</span>
                    </div>
                </section>
                </Reveal>

                {/* 7. Bitiruv talablari va Universitetlar */}
                <Reveal type="fade-left">
                <section>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0a1b3f] mb-8">Bitiruv talablari</h2>
                    <p className="text-lg text-slate-600 mb-6 max-w-5xl leading-relaxed text-justify">
                        Öquv yili yakunida 10-sinf öquvçilari rasmiy AS Level, 11-sinf öquvçilari esa A Level imtihonlarini topşiradilar. Bitiruvçilar Milliy örta ta’lim sertifikati (NCSE) hamda 3 ta fan böyiça CAIE AS va A Level diplomiga ega böladilar. Milliy örta ta’lim sertifikatini oliş uçun öquvçilar ona tili va Özbekiston tarixi fanlari böyiça davlat imtihonlarini muvaffaqiyatli topşirişlari lozim.
                    </p>
                    <p className="text-lg text-slate-600 mb-10 max-w-5xl leading-relaxed font-medium text-justify">
                        Bitiruvçilarimizning Özbekiston va xorijdagi yetakçi universitetlarga qabul qilinişi ularning yuqori akademik tayyorgarligi hamda global ta’lim muhitiga muvaffaqiyatli integratsiyasini körsatadi.
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                        {['O’zbekiston', 'AQSH', 'Kanada', 'Britaniya', 'Italiya', 'Avstraliya', 'Qatar', 'Germaniya', 'BAA', 'Turkiya', 'Yaponiya', 'Koreya', 'Saudiya Arabistoni'].map((country) => (
                            <span key={country} className="border-2 border-slate-200 text-slate-600 bg-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:border-[#0088cc] hover:text-[#0088cc] hover:bg-sky-50 transition-all cursor-default">
                                {country}
                            </span>
                        ))}
                    </div>
                </section>
                </Reveal>

            </main>
        </div>
    );
}
