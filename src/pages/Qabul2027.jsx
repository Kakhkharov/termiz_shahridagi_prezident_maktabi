import React from 'react';
import { Link } from 'react-router-dom';

export default function Qabul2027() {
    return (
        <div className="w-full bg-[#f4f7fb] text-slate-800 min-h-screen pt-[112px] lg:pt-[132px]">
            
            {/* ------------------------------------------------------------- */}
            {/* Hero Header Banner (Matching Image 2)                         */}
            {/* ------------------------------------------------------------- */}
            <div className="relative w-full overflow-hidden bg-[#163065] pt-12 md:pt-16 pb-8 md:pb-12">
                {/* Background Image on Right */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/maktab.jpg')" }}
                ></div>

                {/* Dark Blue Overlay Gradient fading from Left to Right */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#142d5e] via-[#142d5e]/90 to-transparent"></div>

                {/* Header Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 flex flex-col justify-center text-white space-y-3">
                    {/* Breadcrumb Navigation Map */}
                    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-slate-300 font-medium">
                        <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">home</span>
                            <span>Bosh sahifa</span>
                        </Link>
                        <span className="text-slate-400">&gt;</span>
                        <Link to="/qabul-nizomi" className="hover:text-white transition-colors">
                            Maktab qabuli
                        </Link>
                        <span className="text-slate-400">&gt;</span>
                        <span className="text-white font-bold">Qabul nizomi</span>
                    </nav>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                        Qabul nizomi
                    </h1>
                </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* Main Content Area                                             */}
            {/* ------------------------------------------------------------- */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-12 md:space-y-16">
                
                {/* ------------------------------------------------------------- */}
                {/* Section 1: Qabul jarayoni (Matching Image 2 Clean Format)      */}
                {/* ------------------------------------------------------------- */}
                <section className="space-y-3">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a182e] tracking-tight">
                        Qabul jarayoni
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                        Maktabning uch bosqichli qabul jarayoni juda saralovchan bo‘lib, unda tanqidiy fikrlash, muammolarni hal qilish ko‘nikmalari hamda ingliz tili bilimlarini baholovchi ikkita majburiy qobiliyat testi o‘tkaziladi. Har yili o‘rtacha 3 500 nafar abituriyent 5-sinfdagi atigi 24 ta o‘rin uchun raqobatlashadi. Natijada qabul ko‘rsatkichi taxminan 0,7 foizni tashkil etadi. Qabul jarayonining shaffofligi va xolisligini ta’minlash maqsadida, Kembrij xalqaro ta’limni baholash tashkiloti imtihon materiallarini taqdim etadi hamda qabul imtihonlarining butun jarayonini to‘liq nazorat qiladi.
                    </p>
                </section>

                {/* ------------------------------------------------------------- */}
                {/* Section 2: Nomzodlarga talablar va ro‘yxatdan o‘tish           */}
                {/* ------------------------------------------------------------- */}
                <section className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a182e] tracking-tight">
                            Nomzodlarga talablar va ro‘yxatdan o‘tish
                        </h2>
                    </div>

                    {/* 3 Stepper Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {/* Connecting Dashed Line (Desktop Only) */}
                        <div className="hidden md:block absolute top-[18px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-slate-300 z-0"></div>

                        {/* Card 1 */}
                        <div className="relative z-10 flex flex-col items-center">
                            {/* Step Badge Number */}
                            <div className="w-9 h-9 rounded-md bg-[#0f2d5c] text-white font-extrabold text-sm flex items-center justify-center shadow-md mb-4 ring-4 ring-[#f4f7fb]">
                                1
                            </div>
                            {/* Card Content */}
                            <div className="w-full h-full bg-slate-100/90 hover:bg-white transition-all border border-slate-200/90 rounded-2xl p-6 text-center space-y-3 shadow-xs hover:shadow-md flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-[#0f2d5c] text-white flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-2xl">school</span>
                                </div>
                                <h3 className="font-extrabold text-base md:text-lg text-[#0a182e]">
                                    Kimlar topshira oladi?
                                </h3>
                                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                                    4-sinf bitiruvchilari 5-sinfga qabul qilinadi. <strong className="text-[#0070c0]">STEAM</strong> fanlaridan (Matematika, Tabiatshunoslik) yillik baholar <strong className="text-[#0070c0]">"5" (a'lo)</strong> bo‘lishi shart.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="relative z-10 flex flex-col items-center">
                            {/* Step Badge Number */}
                            <div className="w-9 h-9 rounded-md bg-[#0f2d5c] text-white font-extrabold text-sm flex items-center justify-center shadow-md mb-4 ring-4 ring-[#f4f7fb]">
                                2
                            </div>
                            {/* Card Content */}
                            <div className="w-full h-full bg-slate-100/90 hover:bg-white transition-all border border-slate-200/90 rounded-2xl p-6 text-center space-y-3 shadow-xs hover:shadow-md flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-[#0f2d5c] text-white flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-2xl">location_on</span>
                                </div>
                                <h3 className="font-extrabold text-base md:text-lg text-[#0a182e]">
                                    Hududiy mansublik
                                </h3>
                                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                                    O‘quvchi faqat o‘zi ta’lim olayotgan hududdagi (viloyatdagi) Prezident maktabiga hujjat topshira oladi.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="relative z-10 flex flex-col items-center">
                            {/* Step Badge Number */}
                            <div className="w-9 h-9 rounded-md bg-[#0f2d5c] text-white font-extrabold text-sm flex items-center justify-center shadow-md mb-4 ring-4 ring-[#f4f7fb]">
                                3
                            </div>
                            {/* Card Content */}
                            <div className="w-full h-full bg-slate-100/90 hover:bg-white transition-all border border-slate-200/90 rounded-2xl p-6 text-center space-y-3 shadow-xs hover:shadow-md flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-[#0f2d5c] text-white flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-2xl">how_to_reg</span>
                                </div>
                                <h3 className="font-extrabold text-base md:text-lg text-[#0a182e]">
                                    Onlayn ariza
                                </h3>
                                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                                    Hujjatlar <a href="https://ariza.piima.uz/" target="_blank" rel="noreferrer" className="text-[#0070c0] font-bold hover:underline">ariza.piima.uz</a> yoki <a href="https://my.gov.uz" target="_blank" rel="noreferrer" className="text-[#0070c0] font-bold hover:underline">my.gov.uz</a> orqali 25-maydan 14-iyungacha qabul qilinadi. 3x4 rasm va tabel nusxasi talab etiladi.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ------------------------------------------------------------- */}
                {/* Section 3: Bosqichlar (Imtihon bosqichlari)                    */}
                {/* ------------------------------------------------------------- */}
                <section className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a182e] tracking-tight">
                            Bosqichlar
                        </h2>
                    </div>

                    <div className="space-y-6">
                        
                        {/* 1-bosqich Container */}
                        <div className="bg-white rounded-2xl border-t-4 border-[#0070c0] border-x border-b border-slate-200/90 p-5 md:p-8 shadow-sm space-y-5">
                            <h3 className="text-lg md:text-xl font-extrabold text-[#0a182e]">
                                1-bosqich: Saralash imtihoni
                            </h3>

                            <div className="bg-[#f0f5fc] rounded-xl p-4 md:p-6 space-y-4">
                                <div className="flex items-center gap-2 text-[#0070c0] font-extrabold text-sm md:text-base">
                                    <span className="material-symbols-outlined text-lg">calculate</span>
                                    <span>Matematika fanidan test</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Sub-box 1 */}
                                    <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs space-y-1">
                                        <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-sm">
                                            <span className="material-symbols-outlined text-base">check_circle</span>
                                            <span>30 ta topshiriq</span>
                                        </div>
                                        <p className="text-slate-500 text-xs font-medium pl-6">
                                            Test shaklida o‘tkaziladi.
                                        </p>
                                    </div>

                                    {/* Sub-box 2 */}
                                    <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs space-y-1">
                                        <div className="flex items-center gap-2 text-[#0070c0] font-extrabold text-sm">
                                            <span className="material-symbols-outlined text-base">category</span>
                                            <span>Toifalar</span>
                                        </div>
                                        <p className="text-slate-500 text-xs font-medium pl-6">
                                            Savollar <strong>A (yengil)</strong>, <strong>B (o‘rtacha)</strong> va <strong>C (murakkab)</strong> darajalarga bo‘linadi.
                                        </p>
                                    </div>

                                    {/* Sub-box 3 */}
                                    <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs space-y-1">
                                        <div className="flex items-center gap-2 text-[#0070c0] font-extrabold text-sm">
                                            <span className="material-symbols-outlined text-base">schedule</span>
                                            <span>90 daqiqa</span>
                                        </div>
                                        <p className="text-slate-500 text-xs font-medium pl-6">
                                            Vazifalarni bajarish uchun vaqt ajratiladi.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2-bosqich Container */}
                        <div className="bg-white rounded-2xl border-t-4 border-[#0070c0] border-x border-b border-slate-200/90 p-5 md:p-8 shadow-sm space-y-5">
                            <h3 className="text-lg md:text-xl font-extrabold text-[#0a182e]">
                                2-bosqich: Asosiy imtihon va Qoidalar
                            </h3>

                            <div className="bg-[#f0f5fc] rounded-xl p-4 md:p-6 space-y-4">
                                <div className="flex items-center gap-2 text-[#0070c0] font-extrabold text-sm md:text-base">
                                    <span className="material-symbols-outlined text-lg">description</span>
                                    <span>Imtihon tarkibi:</span>
                                </div>

                                <div className="space-y-4">
                                    {/* Top Row: 3 items */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Item 1 */}
                                        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs space-y-1">
                                            <div className="flex items-center gap-2 text-[#0070c0] font-extrabold text-sm">
                                                <span className="material-symbols-outlined text-base">psychology</span>
                                                <span>Tanqidiy fikrlash</span>
                                            </div>
                                            <p className="text-slate-500 text-xs font-medium pl-6">
                                                16 ta masala
                                            </p>
                                        </div>

                                        {/* Item 2 */}
                                        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs space-y-1">
                                            <div className="flex items-center gap-2 text-[#0070c0] font-extrabold text-sm">
                                                <span className="material-symbols-outlined text-base">translate</span>
                                                <span>Ingliz tili</span>
                                            </div>
                                            <p className="text-slate-500 text-xs font-medium pl-6">
                                                40 ta test
                                            </p>
                                        </div>

                                        {/* Item 3 */}
                                        <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs space-y-1">
                                            <div className="flex items-center gap-2 text-[#0070c0] font-extrabold text-sm">
                                                <span className="material-symbols-outlined text-base">calculate</span>
                                                <span>Mantiqiy matematika</span>
                                            </div>
                                            <p className="text-slate-500 text-xs font-medium pl-6">
                                                24 ta masala
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom Row: 2 items */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                        {/* Item 4 (5 cols) */}
                                        <div className="md:col-span-4 bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs space-y-1">
                                            <div className="flex items-center gap-2 text-[#0070c0] font-extrabold text-sm">
                                                <span className="material-symbols-outlined text-base">timer</span>
                                                <span>Jami vaqt</span>
                                            </div>
                                            <p className="text-slate-500 text-xs font-medium pl-6">
                                                150 daqiqa
                                            </p>
                                        </div>

                                        {/* Item 5 (8 cols) */}
                                        <div className="md:col-span-8 bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs space-y-1">
                                            <div className="flex items-center gap-2 text-[#0070c0] font-extrabold text-sm">
                                                <span className="material-symbols-outlined text-base">balance</span>
                                                <span>Ustunlik tartibi</span>
                                            </div>
                                            <p className="text-slate-600 text-xs font-medium pl-6 leading-relaxed">
                                                1. Muammoni yechish (Mantiq), 2. Tanqidiy fikrlash, 3. Ingliz tili (Reading), 4. Ingliz tili (Grammar)
                                            </p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </section>

                {/* ------------------------------------------------------------- */}
                {/* Section 4: Natijalar va qo‘shimcha imkoniyatlar               */}
                {/* ------------------------------------------------------------- */}
                <section className="space-y-8 pb-8">
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a182e] tracking-tight">
                            Natijalar va qo‘shimcha imkoniyatlar
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Card 1: Natijalar muddati (Light Blue) */}
                        <div className="bg-[#e8f4fc] border border-blue-200/80 rounded-2xl p-6 text-center space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-white text-[#0070c0] flex items-center justify-center shadow-xs">
                                <span className="material-symbols-outlined text-2xl">event_available</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-extrabold text-base md:text-lg text-[#0a182e]">
                                    Natijalar muddati
                                </h3>
                                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                                    * 1-bosqich: <strong className="text-[#0070c0]">20 kun</strong> ichida.<br />
                                    2-bosqich: <strong className="text-[#0070c0]">30 kun</strong> ichida.<br />
                                    <span className="text-slate-500 text-[11px] block mt-1">Eslatma: Natijalar qayta ko‘rib chiqilmaydi (apellyatsiya yo‘q).</span>
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Zaxira imkoniyati (Light Mint Teal) */}
                        <div className="bg-[#e6f6f5] border border-teal-200/80 rounded-2xl p-6 text-center space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-white text-teal-600 flex items-center justify-center shadow-xs">
                                <span className="material-symbols-outlined text-2xl">percent</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-extrabold text-base md:text-lg text-[#0a182e]">
                                    Zaxira imkoniyati
                                </h3>
                                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                                    2-bosqichda o‘qishga kira olmagan dastlabki <strong className="text-teal-700">48 nafar o‘quvchi</strong> o‘zi tanlagan ixtisoslashtirilgan maktabga imtihonsiz qabul qilinadi.
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Bog‘lanish (Light Cream Sand) */}
                        <div className="bg-[#fbf3e6] border border-amber-200/80 rounded-2xl p-6 text-center space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-white text-amber-600 flex items-center justify-center shadow-xs">
                                <span className="material-symbols-outlined text-2xl">call</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-extrabold text-base md:text-lg text-[#0a182e]">
                                    Bog‘lanish
                                </h3>
                                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                                    Qo‘shimcha ma'lumot uchun:<br />
                                    Call-markaz: <strong className="text-amber-700">1206</strong><br />
                                    Vebsayt: <a href="https://piima.uz" target="_blank" rel="noreferrer" className="text-amber-700 font-bold hover:underline">piima.uz</a><br />
                                    Sayt: <span className="font-bold text-amber-800">piima.uz +998 71 207-99-98</span>
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Final Call to Action */}
                <div className="bg-gradient-to-r from-[#0f2d5c] to-[#1c437e] rounded-2xl p-6 text-center text-white space-y-3 shadow-lg">
                    <h3 className="text-lg md:text-xl font-black">Prezident maktabiga ariza topshirmoqchimisiz?</h3>
                    <p className="text-xs md:text-sm text-slate-200 max-w-xl mx-auto">
                        Arizalar rasmiy PIIMA portali orqali 25-maydan 14-iyungacha onlayn qabul qilinadi.
                    </p>
                    <div className="pt-2">
                        <a 
                            href="https://ariza.piima.uz/" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="inline-flex items-center gap-2 bg-[#0088cc] hover:bg-sky-500 text-white px-6 py-3 rounded-xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all"
                        >
                            Ariza topshirish (PIIMA) <span className="text-base">↗</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
