import React, { useEffect, useRef, useState } from 'react';
import direktorImg from '../../images/Isaqova_Elvina.png';
import safaraliImg from '../../images/rah_Mamarasulov_Safarali.png';
import sunnatilloImg from '../../images/rah_Safarov_Sunatilla.png';
import azizbekImg from '../../images/Azizbek_Azimovich.png';
import ziadImg from '../../images/ZiadAhmed.png';
import safarmurodImg from '../../images/safarmurod_allaqulov_p.JPG';
import musulmonImg from '../../images/Qahharov_Musulmon.jpg';
import p03 from '../../images/p03_portrait.jpg';
import p04 from '../../images/p04_portrait.jpg';
import p05 from '../../images/p05_portrait.jpg';
import p06 from '../../images/06.jpg';
import p07 from '../../images/p07_portrait.JPG';
import p08 from '../../images/p08_portrait.JPG';
import tXamdamov from '../../images/Xamdamo_ Nurali.png';
import tAminova from '../../images/Aminova_Munisa.png';
import tBoynazarova from '../../images/Boynazarova_Durdona.png';
import tXamdamova from '../../images/Xamdamova_Shoxista.png';
import tAbduraimov from '../../images/Abduraimov_Fazliddin.png';
import tSheraliyev from '../../images/Sheraliyev_Murodjon.png';
import tIsayev from '../../images/Isayev_Xayrulla.png';
import tMaxmatqobilova from '../../images/Maxmatqobilova_Fozila.png';
import tMengliboyev from '../../images/Mengliboyev_Xusniddin.png';
import tYuldosheva from '../../images/Yuldosheva_Charos.png';
import tAllaqulov from '../../images/Allaqulov_Safarmurod.png';
import tJurayev from '../../images/Jurayev_Eral.png';
import tShomirzayev from '../../images/Shomirzayev_Abdug‘appor.png';
import tFayziyev from '../../images/Fayziyev_Furqat.png';
import tAbduqahhorov from '../../images/Abduqahhorov_Iskandar.png';
import tNomozov from '../../images/Nomozov_Ramozon.png';
import tAbdimurotov from '../../images/Abdimurotov_Dilmuhammad.png';
import tXolmatov from '../../images/Xolmatov_Sadriddin.png';
import tEshonqulov from '../../images/Eshonqulov_Jahongir.png';
import oqlogoImg from '../../images/oqlogo.png';
import intImg1 from '../../images/53.png';
import intImg2 from '../../images/54.png';
import intImg3 from '../../images/55.png';
import intImg4 from '../../images/56.png';
import intImg5 from '../../images/57.png';
import intImg6 from '../../images/58.png';
import intImg7 from '../../images/59.png';
import eduImg1 from '../../images/43.png';
import eduImg2 from '../../images/44.png';
import eduImg3 from '../../images/45.png';
import eduImg4 from '../../images/46.png';
import eduImg5 from '../../images/47.png';
import eduImg6 from '../../images/48.png';
import eduImg7 from '../../images/49.png';
import eduImg8 from '../../images/50.png';
import eduImg9 from '../../images/Jabborova_Laylo.png';
import eduImg10 from '../../images/Nazarov_Abduvosid.png';

// Scroll Animation Hook
function useScrollReveal(options = { threshold: 0.1 }) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) observer.unobserve(elementRef.current);
        };
    }, [options]);

    return [elementRef, isVisible];
}

function Reveal({ children, className = "", delay = 0 }) {
    const [ref, isVisible] = useScrollReveal();
    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

const administration = [
    { 
        id: 1, 
        name: "Isaqova Elvina Dilaverovna", 
        role: "Termiz shahridagi Prezident maktabi Ijrochi direktori", 
        email: "director@pstmz.uz", 
        image: direktorImg, 
        isLead: true 
    },
    { 
        id: 2, 
        name: "Ziad Ahmed", 
        role: "Akademik direktor", 
        email: "a.anderson@piima.uz", 
        image: ziadImg, 
        isLead: false 
    },

    { 
        id: 4, 
        name: "Azizbek\nAsamov\nAzimovich", 
        role: "Maktab maslahatchisi", 
        email: "s.azizov@pstmz.uz", 
        image: azizbekImg, 
        isLead: false 
    },
    { 
        id: 5, 
        name: "Safarali\nMamarasulov\nBerdimurod o'g'li", 
        role: "Maxsus fanlar bo'yicha direktor o'rinbosari", 
        email: "safarali@pstmz.uz", 
        image: safaraliImg, 
        isLead: false 
    },
    { 
        id: 6, 
        name: "Sunnatillo\nSafarov\nG'ayratovich", 
        role: "Ma'naviy va ma'rifiy ishlar bo'yicha direktor o'rinbosari", 
        email: "sunnatillo@pstmz.uz", 
        image: sunnatilloImg, 
        isLead: false 
    }
];

const teachers = [
    { id: 101, name: "Xamdamov Nurali", subject: "Ona tili va adabiyot fani o'qituvchisi", email: "n.xamdamov@pstmz.uz", image: tXamdamov },
    { id: 103, name: "Aminova Munisa", subject: "Rus tili va adabiyoti fani o'qituvchisi", email: "m.aminova@pstmz.uz", image: tAminova },
    { id: 104, name: "Boynazarova Durdona", subject: "Ingliz tili fani o'qituvchisi", email: "d.boynazarova@pstmz.uz", image: tBoynazarova },
    { id: 105, name: "Xamdamova Shoxista", subject: "Ingliz tili fani o'qituvchisi", email: "s.xamdamova@pstmz.uz", image: tXamdamova },
    { id: 106, name: "Abduraimov Fazliddin", subject: "Tarbiya va tarix fani o'qituvchisi", email: "f.abduraimov@pstmz.uz", image: tAbduraimov },
    { id: 107, name: "Sheraliyev Murodjon", subject: "Tarbiya va tarix fani o'qituvchisi", email: "m.sheraliyev@pstmz.uz", image: tSheraliyev },
    { id: 108, name: "Isayev Xayrulla", subject: "Ingliz tili fani o'qituvchisi", email: "x.isayev@pstmz.uz", image: tIsayev },
    { id: 109, name: "Maxmatqobilova Fozila", subject: "Matematika fani o'qituvchisi", email: "f.maxmatqobilova@pstmz.uz", image: tMaxmatqobilova },
    { id: 110, name: "Mengliboyev Xusniddin", subject: "Matematika fani o'qituvchisi", email: "x.mengliboyev@pstmz.uz", image: tMengliboyev },
    { id: 111, name: "Yuldosheva Charos", subject: "Matematika fani o'qituvchisi", email: "c.yuldosheva@pstmz.uz", image: tYuldosheva },
    { id: 112, name: "Allaqulov Safarmurod", subject: "Informatika fani o'qituvchisi", email: "s.allaqulov@pstmz.uz", image: tAllaqulov },
    { id: 113, name: "Qahharov Musulmon", subject: "Informatika fani o'qituvchisi", email: "m.qahharov@pstmz.uz", image: musulmonImg },
    { id: 114, name: "Jurayev Erali", subject: "Science fani o'qituvchisi", email: "e.jurayev@pstmz.uz", image: tJurayev },
    { id: 116, name: "Shomirzayev Abdug'appor", subject: "Geografiya fani o'qituvchisi", email: "a.shomirzayev@pstmz.uz", image: tShomirzayev },
    { id: 117, name: "Fayziyev Furqat", subject: "Jismoniy tarbiya fani o'qituvchisi", email: "f.fayziyev@pstmz.uz", image: tFayziyev },
    { id: 118, name: "Abduqahhorov Iskandar", subject: "Fizika fani o'qituvchisi", email: "i.abduqahhorov@pstmz.uz", image: tAbduqahhorov },
    { id: 119, name: "Nomozov Ramozon", subject: "Biologiya fani o'qituvchisi", email: "r.nomozov@pstmz.uz", image: tNomozov },
    { id: 120, name: "Abdimurotov Dilmuhammad", subject: "Biologiya fani o'qituvchisi", email: "d.abdimurotov@pstmz.uz", image: tAbdimurotov },
    { id: 121, name: "Xolmatov Sadriddin", subject: "Kimyo fani o'qituvchisi", email: "s.xolmatov@pstmz.uz", image: tXolmatov },
    { id: 122, name: "Eshonqulov Jahongir", subject: "Fizika fani o'qituvchisi", email: "j.eshonqulov@pstmz.uz", image: tEshonqulov }
];

const internationalTeachers = [
    { id: 54, name: "Desiree Ramokolo", country: "Africa", subject: "Science fani o'qituvchisi", email: "d.ramokolo@pstmz.uz", image: intImg2 },
    { id: 59, name: "Alphayo Evans Mongare", country: "Africa", subject: "Matematika fani o'qituvchisi", email: "e.mongare@pstmz.uz", image: intImg7 },
    { id: 55, name: "Masibo Edwin Simiyu", country: "Africa", subject: "Fizika fani o'qituvchisi", email: "edwin@pstmz.uz", image: intImg3 },
    { id: 58, name: "Michelle Jane Rosello", country: "Indoneziya", subject: "Ingliz tili fani o'qituvchisi", email: "m.jane@pstmz.uz", image: intImg6 },
    { id: 53, name: "Nyabere Samuel Choi", country: "Africa", subject: "Ingliz tili fani o'qituvchisi", email: "s.nyabere@pstmz.uz", image: intImg1 },
    { id: 56, name: "Dokka Subrahmanya Shyam Sundar", country: "Hindiston", subject: "Informatika fani o'qituvchisi", email: "m.shyam@pstmz.uz", image: intImg4 },
    { id: 57, name: "Nayab Dure", country: "Pokiston", subject: "Kimyo fani o'qituvchisi", email: "d.nayab@pstmz.uz", image: intImg5 }
];

const educators = [
    { id: 43, name: "Abduraimov Sobirjon", subject: "Pedagog tarbiyachi", email: "s.abduraimov@pstmz.uz", image: eduImg1 },
    { id: 44, name: "Sattorova Dilnoza", subject: "Pedagog tarbiyachi", email: "d.sattorova@pstmz.uz", image: eduImg2 },
    { id: 45, name: "Shermoatova Dildora", subject: "Navbatchi tarbiyachi", email: "d.shermoatova@pstmz.uz", image: eduImg3 },
    { id: 46, name: "Toshmurodova Anora", subject: "Pedagog tarbiyachi", email: "a.toshmurodova@pstmz.uz", image: eduImg4 },
    { id: 47, name: "Ergashov Asadbek", subject: "Navbatchi tarbiyachi", email: "a.ergashov@pstmz.uz", image: eduImg5 },
    { id: 48, name: "Sattorov Bahtiyor", subject: "Navbatchi tarbiyachi", email: "b.sattorov@pstmz.uz", image: eduImg6 },
    { id: 49, name: "Kichikova Mehriniso", subject: "Navbatchi tarbiyachi", email: "m.kichikova@pstmz.uz", image: eduImg7 },
    { id: 50, name: "Abdumo‘minov Mas'ud", subject: "Pedagog tarbiyachi", email: "m.abdumominov@pstmz.uz", image: eduImg8 },
    { id: 51, name: "Jabborova Laylo", subject: "Pedagog tarbiyachi", email: "l.jabborova@pstmz.uz", image: eduImg9 },
    { id: 52, name: "Nazarov Abduvosid", subject: "Navbatchi tarbiyachi", email: "a.nazarov@pstmz.uz", image: eduImg10 }
];

import PageHeroBanner from '../components/PageHeroBanner';

export default function SchoolTeam({ category = "Biz haqimizda", title = "Maktab jamoasi", isRahbariyat = false }) {
    const showAdmin = isRahbariyat || title === "Rahbariyat";

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-[112px] lg:pt-[132px] pb-16 relative overflow-x-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,#f1f5f9_100%)] opacity-80 pointer-events-none" />
            
            {/* Dark Blue Hero Banner */}
            <div className="relative z-20">
                <PageHeroBanner category={category} title={title} />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10 px-4 md:px-8 pt-8">

                {/* Heading (Only show for Teachers page, remove for Rahbariyat as requested) */}
                {!showAdmin && (
                    <Reveal className="text-center mb-10 px-4">
                        <h2 className="text-2xl md:text-4xl font-['Cinzel',serif] text-[#004c91] font-bold mb-3 tracking-wider">
                            BIZNING PEDAGOGLARIMIZ
                        </h2>
                        <div className="w-16 h-1 bg-[#0088cc] mx-auto rounded-full" />
                    </Reveal>
                )}

                {/* IF RAHBARIYAT PAGE: Render compact Rahbariyat mixed-column cards grid */}
                {showAdmin ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5 lg:gap-6 max-w-[1120px] mx-auto mb-16">
                        {administration.map((member, idx) => (
                            <Reveal key={member.id} delay={idx * 120} className={`w-full ${idx < 2 ? 'lg:col-span-3 md:col-span-1' : 'lg:col-span-2 md:col-span-1'}`}>
                                <HorizontalAdminCard member={member} isLead={member.isLead} />
                            </Reveal>
                        ))}
                    </div>
                ) : (
                    /* IF O'QITUVCHILAR PAGE: Render Teachers Sections */
                    <>
                        {/* 1. TEACHERS SECTION */}
                        <div className="mb-20">
                            <Reveal>
                                <SectionHeader title="Pedagoglar" icon="menu_book" />
                            </Reveal>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 md:gap-4.5">
                                {teachers.map((teacher, idx) => (
                                    <Reveal key={teacher.id} delay={(idx % 6) * 80} className="h-full">
                                        <StaffCard member={teacher} subField={teacher.subject} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>

                        {/* 2. INTERNATIONAL TEACHERS SECTION */}
                        <div className="mb-20">
                            <Reveal>
                                <SectionHeader title="International Teachers" icon="public" />
                            </Reveal>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 md:gap-4.5">
                                {internationalTeachers.map((teacher, idx) => (
                                    <Reveal key={teacher.id} delay={(idx % 6) * 80} className="h-full">
                                        <StaffCard member={teacher} subField={teacher.subject} country={teacher.country} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>

                        {/* 3. EDUCATORS SECTION */}
                        <div className="mb-14">
                            <Reveal>
                                <SectionHeader title="Pedagog-Tarbiyachilar" icon="psychology" />
                            </Reveal>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 md:gap-4.5">
                                {educators.map((educator, idx) => (
                                    <Reveal key={educator.id} delay={(idx % 6) * 80} className="h-full">
                                        <StaffCard member={educator} subField={educator.role} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function SectionHeader({ title, icon }) {
    return (
        <div className="flex flex-col items-center mb-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-1.5">
                <div className="h-[1px] w-10 md:w-16 bg-[#004c91]/20" />
                <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#0088cc] text-[18px]">{icon}</span>
                    <h2 className="text-xl md:text-2xl font-['Cinzel',serif] text-[#004c91] font-bold">{title}</h2>
                </div>
                <div className="h-[1px] w-10 md:w-16 bg-[#004c91]/20" />
            </div>
            <div className="w-10 h-0.5 bg-[#0088cc] rounded-full" />
        </div>
    );
}

const isEnglishActive = () => {
    if (typeof document === 'undefined') return false;
    const cookie = document.cookie || '';
    return cookie.includes('/uz/en') || cookie.includes('%2Fuz%2Fen');
};

function HorizontalAdminCard({ member, isLead = false }) {
    const isEn = isEnglishActive();

    return (
        <div className={`relative w-full h-[180px] md:h-[185px] rounded-xl overflow-hidden shadow-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex flex-row ${isLead ? 'bg-[#163065] text-white border-[#163065]' : 'bg-white text-slate-800 border-slate-200/90'}`}>
            {/* Left Photo Container */}
            <div className="w-[38%] h-full overflow-hidden relative shrink-0 bg-slate-100">
                <img 
                    src={member.image} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105" 
                    alt={member.name} 
                />
            </div>

            {/* Right Info Container */}
            <div className="w-[62%] h-full p-4 md:p-5 flex flex-col justify-center relative overflow-hidden">
                {/* Background Watermark Logo */}
                <div className="absolute -right-2 -bottom-2 w-28 h-28 opacity-10 pointer-events-none">
                    <img 
                        src={isLead ? "/images/aa1_logo.png" : oqlogoImg} 
                        className="w-full h-full object-contain" 
                        alt="Watermark" 
                    />
                </div>

                <div className="flex flex-col">
                    {/* Top Role Indicator Line */}
                    <div className="flex items-start gap-2 mb-2 relative z-10">
                        <span className={`w-[3px] h-4 rounded-full shrink-0 mt-[2px] ${isLead ? 'bg-sky-400' : 'bg-[#004c91]'}`}></span>
                        <p className={`text-[11px] md:text-[13px] font-bold leading-snug line-clamp-3 ${isLead ? 'text-sky-200' : 'text-[#0088cc]'}`}>
                            {member.id === 5 ? (
                                <>
                                    <span className={isEn ? "hidden" : "inline safarali-uz"}>
                                        {member.role}
                                    </span>
                                    <span className={isEn ? "inline notranslate" : "hidden safarali-en notranslate"} translate="no">
                                        Deputy director-academics
                                    </span>
                                </>
                            ) : (
                                member.role
                            )}
                        </p>
                    </div>

                    {/* Horizontal Divider for White Cards */}
                    {!isLead && (
                        <div className="w-8 h-[2px] bg-[#0088cc]/20 my-2.5 relative z-10 ml-3"></div>
                    )}

                    {/* Full Name */}
                    <h3 className={`text-[13px] md:text-[15px] font-black leading-snug relative z-10 whitespace-pre-line mt-1 ${isLead ? 'text-white' : 'text-[#0a1b3f]'}`}>
                        {member.id === 5 ? (
                            <>
                                <span className={isEn ? "hidden" : "inline safarali-uz"}>
                                    {member.name}
                                </span>
                                <span className={isEn ? "inline notranslate" : "hidden safarali-en notranslate"} translate="no">
                                    {"Safarali\nMamarasulov\nBerdimurod Ugli"}
                                </span>
                            </>
                        ) : (
                            member.name
                        )}
                    </h3>
                </div>
            </div>
        </div>
    );
}

function StaffCard({ member, subField, country }) {
    const scaleClass = member.customScale || "scale-100";
    const displaySubject = member.subject || subField || "";

    return (
        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-sm border-[1.5px] border-slate-300/80 group transition-all duration-500 hover:shadow-xl hover:border-[#0088cc] hover:-translate-y-1.5 bg-slate-100 flex flex-col justify-end">
            {/* Background Teacher Image */}
            <img 
                src={member.image} 
                className={`absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ${scaleClass} group-hover:scale-105`} 
                alt={member.name} 
            />

            {/* Dark Gradient Overlay at Bottom for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

            {/* Country Badge (If international teacher) */}
            {country && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/95 backdrop-blur-md px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded-lg text-[9px] sm:text-[10px] font-bold sm:font-black text-[#004c91] shadow-sm sm:shadow-md border border-slate-100 z-10 tracking-tight">
                    {country}
                </div>
            )}

            {/* Bottom White Overlay Badge matching user screenshot */}
            <div className="relative z-10 m-2 bg-white rounded-xl p-2.5 sm:p-3 shadow-sm border border-slate-100 flex flex-col justify-center overflow-hidden">
                {/* Background Watermark Emblem */}
                <div className="absolute -right-2 -bottom-2 w-14 h-14 opacity-[0.1] pointer-events-none">
                    <img src={oqlogoImg} className="w-full h-full object-contain" alt="Emblem" />
                </div>

                {/* Teacher Name */}
                <h4 className="font-semibold text-[#0a1b3f] text-[13px] sm:text-[14px] leading-tight tracking-tight relative z-10 mb-0.5">
                    {member.name}
                </h4>

                {/* Subject / Role */}
                <p className="text-[#0088cc] font-medium text-[11px] sm:text-[12px] leading-tight relative z-10">
                    {displaySubject}
                </p>
            </div>
        </div>
    );
}
