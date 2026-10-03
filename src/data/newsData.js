export const formatNewsDate = (itemOrDate) => {
    if (!itemOrDate) return "";
    if (typeof itemOrDate === 'object') {
        if (itemOrDate.isToday || itemOrDate.date === "Bugun") {
            return "Bugun";
        }
        return itemOrDate.date || "";
    }
    if (itemOrDate === "Bugun") return "Bugun";
    return itemOrDate;
};

const rawNewsData = [
    {
        id: 1,
        title: "Termiz shahridagi Prezident maktabida 'STEM Expo-2026' ko'rgazmasi yakunlandi",
        date: "25 Aprel, 2026",
        isToday: true,
        category: "Tadbir",
        image: "/images/01.jpg",
        images: ["/images/01.jpg", "/images/02.jpg", "/images/03.jpg", "/images/04.jpg"],
        desc: "O'quvchilar tomonidan tayyorlangan innovatsion ishlanmalar va muhandislik loyihalari mutaxassislar tomonidan yuqori baholandi. Ko'rgazma davomida o'quvchilar robotexnika, yashil energiya va aqlli shahar texnologiyalari bo'yicha o'z ishlarini namoyish etishdi.",
        content: `
            <p>Termiz shahridagi Prezident maktabida o‘quvchilarning ijodiy va ilmiy salohiyatini ro‘yobga chiqarish maqsadida tashkil etilgan "STEM Expo-2026" ko‘rgazmasi o‘z yakuniga yetdi.</p>
            <p>Ushbu tadbirda maktabning 5-11-sinf o‘quvchilari o‘zlari ishlab chiqqan 50 dan ortiq loyihalarni taqdim etishdi. Loyihalar orasida ayniqsa quyidagilar diqqat markazida bo'ldi:</p>
            <ul>
                <li>Quyosh panellari yordamida ishlaydigan aqlli sug'orish tizimi;</li>
                <li>Sun'iy intellekt asosida ishlaydigan saralash roboti;</li>
                <li>Ekologik toza plastik muqobillari.</li>
            </ul>
            <p>Ko'rgazmaga tashrif buyurgan mutaxassislar o'quvchilarning bilimi va loyihalarning amaliy ahamiyatiga yuqori baho berdilar. Eng yaxshi loyiha mualliflari Agentlikning maxsus diplom va esdalik sovg'alari bilan taqdirlandilar.</p>
        `
    },
    {
        id: 2,
        title: "Prezident maktabiga qabul: Eng ko'p beriladigan savollarga mutaxassis javobi",
        date: "24 Aprel, 2026",
        category: "E'lonlar",
        image: "/images/02.jpg",
        images: ["/images/02.jpg", "/images/03.jpg", "/images/04.jpg", "/images/05.jpg"],
        desc: "2026-2027 o'quv yili uchun qabul jarayoni boshlanishi munosabati bilan barcha savollarga ochiq oydin javob berildi.",
        content: `
            <p>Ixtisoslashtirilgan ta'lim muassasalari agentligi 2026-2027 o'quv yili uchun Prezident maktablariga qabul jarayonlari boshlanganini e'lon qildi. Shu munosabat bilan ota-onalarni qiziqtirgan asosiy savollarga javob berib o'tamiz.</p>
            <p><b>Hujjatlar qachon qabul qilinadi?</b><br/>Hujjatlar onlayn tarzda ariza.piima.uz sayti orqali joriy yilning iyun oyi davomida qabul qilinadi.</p>
            <p><b>Qaysi sinflarga qabul bor?</b><br/>Prezident maktablariga faqat 5-sinfga qabul amalga oshiriladi. Nomzodlar 4-sinfni bitirayotgan bo'lishlari lozim.</p>
            <p>Batafsil ma'lumot olish uchun Telegram kanalimiz yoki rasmiy <a href="/qabul-2026" class="text-blue-500 hover:underline">qabul saytimizni</a> kuzatib boring.</p>
        `
    },
    {
        id: 3,
        title: "Maktabimizda kitobxonlik haftaligi munosabati bilan adabiy kecha o'tkazildi",
        date: "23 Aprel, 2026",
        category: "Ma'naviyat",
        image: "/images/03.jpg",
        images: ["/images/03.jpg", "/images/04.jpg", "/images/05.jpg", "/images/01.jpg"],
        desc: "O'quvchilar o'rtasida mutolaa madaniyatini yuksaltirish maqsadida tashkil etilgan tadbirda yangi kitoblar taqdimoti bo'lib o'tdi.",
        content: `
            <p>Inson kamolotida kitobning o'rni beqiyos. Shu maqsadda maktabimizda "Kitob - ma'naviyat sarchashmasi" mavzusida adabiy-badiiy kecha tashkil etildi.</p>
            <p>Tadbir davomida o'quvchilar o'zlari sevgan asarlardan parchalar o'qib berdilar, buyuk mutafakkirlar hayoti va ijodi haqida sahnalashtirilgan ko'rinishlarni namoyish etishdi. Shuningdek, maktab kutubxonasiga yangi keltirilgan badiiy adabiyotlar ko'rgazmasi ham tashkil qilindi.</p>
            <p>Tadbir yakunida "Eng faol kitobxon" nominatsiyasi bo'yicha g'oliblar aniqlandi va ularga kitoblar to'plami sovg'a qilingandi.</p>
        `
    },
    {
        id: 4,
        title: "Ota-onalar uchun 'Ochiq eshiklar kuni' tadbiri tashkil etildi",
        date: "19 Aprel, 2026",
        category: "Tadbir",
        image: "/images/04.jpg",
        images: ["/images/04.jpg", "/images/05.jpg", "/images/01.jpg", "/images/02.jpg"],
        desc: "Mehmonlar maktabning zamonaviy o'quv xonalari, laboratoriyalari va yashash sharoitlari bilan yaqindan tanishdilar.",
        content: `
            <p>Termiz shahridagi Prezident maktabida navbatdagi "Ochiq eshiklar kuni" bo'lib o'tdi. Unda ota-onalar va jamoatchilik vakillari ishtirok etishdi.</p>
            <p>Tashrif buyuruvchilar dars jarayonlarini kuzatishdi, STEM laboratoriyalaridagi sharoitlar bilan tanishishdi. Shuningdek, o'quvchilarning yashash yotoqxonasi va oshxonadagi taomnoma ham ko'zdan kechirildi.</p>
            <p>Maktab ma'muriyati ota-onalarni qiziqtirgan barcha savollarga javob berdi va kelgusidagi rejalar bilan o'rtoqlashdi.</p>
        `
    },
    {
        id: 5,
        title: "Ixtisoslashtirilgan ta'lim muassasalari agentligi: Yangi istiqbollar",
        date: "16 Aprel, 2026",
        category: "Tadbir",
        image: "/images/01.jpg",
        images: ["/images/01.jpg", "/images/02.jpg", "/images/03.jpg"],
        desc: "Agentlik tomonidan rejalashtirilgan yangi loyihalar va ularning ta'lim tizimidagi ahamiyati tushuntirildi.",
        content: `
            <p>Respublika miqyosida o'tkazilgan matbuot anjumanida Ixtisoslashtirilgan ta'lim muassasalari agentligi vakillari 2026-yilda amalga oshiriladigan yangi loyihalar haqida so'z yuritdilar.</p>
            <p>Asosiy e'tibor ta'lim sifatini xalqaro standartlarga muvofiqlashtirish, o'quvchilarning kreativ fikrlashini rivojlantirishga qaratilgan yangi o'quv dasturlarini joriy etishga qaratiladi.</p>
            <p>Shuningdek, iqtidorli yoshlarni qo'llab-quvvatlash uchun qo'shimcha grantlar va xalqaro almashinuv dasturlari ko'paytirilishi ma'lum qilindi.</p>
        `
    },
    {
        id: 6,
        title: "Amaliy sayohat",
        date: "14 May, 2026",
        category: "Sayohat",
        image: "/images/1_14_05_2026.jpg",
        images: [
            "/images/1_14_05_2026.jpg",
            "/images/2_14_05_2026.jpg",
            "/images/3_14_05_2026.jpg",
            "/images/4_14_05_2026.jpg",
            "/images/5_14_05_2026.jpg",
            "/images/6_14_05_2026.jpg",
            "/images/7_14_05_2026.jpg"
        ],
        desc: "Termiz shahridagi Prezident maktabi o‘quvchilarini kasbga yo‘naltirish maqsadida “O‘zaeronavigatsiya” markaziga amaliy sayohat tashkil etildi.",
        content: `
            <p>Termiz shahridagi Prezident maktabi o‘quvchilarini kasbga yo‘naltirish va oliy ta’lim muassasalariga tayyorlash maqsadida “O‘zaeronavigatsiya” markazi DUK Havo harakatini boshqarish hududiy boshqarmasiga amaliy sayohat tashkil etildi.</p>
            <p>Ekskursiyadan ko‘zlangan asosiy maqsad o‘quvchi-yoshlarga aviatsiya sohasi, aeronavigatsiya tizimi, zamonaviy texnologiyalar hamda ushbu yo‘nalishdagi kasb imkoniyatlari haqida tushuncha berishdan iborat bo‘ldi.</p>
            <p>Mutaxassislar tomonidan aeronavigatsiya xizmatlari, parvozlar xavfsizligini ta’minlash jarayonlari, ishlatiladigan texnik vositalar hamda sohada talab yuqori bo‘lgan kasblar haqida batafsil ma’lumotlar berildi.</p>
        `
    },
    {
        id: 7,
        title: "Termiz shahridagi Prezident maktabida “Yoshlar kuni” tadbiri o'tkazildi",
        date: "25 Aprel, 2026",
        category: "Tashrif",
        image: "/images/02.jpg",
        images: ["/images/02.jpg", "/images/01.jpg", "/images/03.jpg", "/images/04.jpg"],
        desc: "Davra suhbati Surxondaryo viloyati IIB huzuridagi Qo‘riqlash xizmati rahbari va xodimlari ishtirokida, Amir Temur tavalludining 690 yilligiga bag‘ishlandi.",
        content: `
            <p>O‘zbekiston Respublikasi Prezidentining 2026-yil 24-fevraldagi yoshlar bilan muloqotida belgilangan topshiriqlariga muvofiq har haftaning payshanba kuni vazirlik va idoralarda “Yoshlar kuni” etib belgilangan edi.</p>
            <p>Termiz shahridagi Prezident maktabida “Yoshlar kuni” munosabati tashkil etilgan Surxondaryo viloyati IIB huzuridagi Qo‘riqlash xizmati rahbari hamda xodimlari ishtirokidagi davra suhbati Amir Temur tavalludining 690 yilligiga bag‘ishlandi.</p>
            <p>Uchrashuv davomida yoshlarga ichki ishlar organlariga xizmatga qabul qilish tartibi, mazkur yo‘nalishda o‘zlashtirish zarur bo‘lgan fanlar haqida ham to‘xtalib o‘tildi.</p>
            <p>Tadbir yakunida yoshlar bilan ochiq muloqot o‘tkazilib, ularni qiziqtirgan savollariga batafsil javoblar berildi. Bu kabi uchrashuvlar yoshlarning ma’naviy-axloqiy tarbiyasini mustahkamlashda, vatanparvarlik ruhida voyaga yetishida muhim ahamiyat kasb etadi.</p>
        `
    },
    {
        id: 9,
        title: "Qabul davom etmoqda",
        date: "19 May, 2026",
        category: "E'lonlar",
        image: "/images/infografika.jpg",
        images: ["/images/infografika.jpg"],
        desc: "Ixtisoslashtirilgan ta’lim muassasalari agentligi tizimidagi maktablarga ariza.piima.uz sayti orqali arizalar kelib tushmoqda.",
        content: `
            <p>Ixtisoslashtirilgan ta’lim muassasalari agentligi tizimidagi maktablarga ariza.piima.uz sayti orqali arizalar kelib tushmoqda.</p>
            <p>Ushbu arizalarning 19-may soat 11:00 holatidagi statistikasi bilan yuqoridagi infografikada tanishishingiz mumkin.</p>
            <p><strong>Call-markaz: 1206</strong></p>
        `
    },
    {
        id: 10,
        title: "“Yangi O‘zbekistonning iqtidorli farzandiman” ijodiy chellenji",
        date: "12 Avgust, 2026",
        category: "Tanlov",
        image: "/images/35_yillik.jpg",
        images: ["/images/35_yillik.jpg"],
        desc: "Mustaqillikning 35 yilligi munosabati bilan “Yangi O‘zbekistonning iqtidorli farzandiman” ijodiy chellenji e’lon qilinadi.",
        content: `
            <p>Ixtisoslashtirilgan ta’lim muassasalari agentligi tashabbusi bilan Mustaqillikning 35 yilligi munosabati bilan “Yagona Vatan, yagona xalq bo‘lib, yangi hayot va kelajak yaratamiz!” shiori ostida “Yangi O‘zbekistonning iqtidorli farzandiman” ijodiy chellenji e’lon qilinadi.</p>
            <p><strong>Chellenj quyidagi yo‘nalishlarda bo‘lib o‘tadi:</strong></p>
            <ul>
                <li>✅ #YagonaVatan35 chellenji — o‘quvchilarning Vatan haqidagi fikrlari, tabriklari va ezgu tilaklari;</li>
                <li>✅ “Mustaqillik menga nima berdi?” mavzusida 30–60 soniyalik videorolik;</li>
                <li>✅ “Bir bayroq – bir yurak” fleshmobi;</li>
                <li>✅ O‘quvchilar ijrosida Vatan haqidagi she’r yoki vatanparvarlik qo‘shig‘i;</li>
                <li>✅ Mustaqillik aks etgan binolar va manzillarda rasmga tushish;</li>
                <li>✅ “Mening maktabim – Yangi O‘zbekiston kelajagi” mavzusida ijodiy videorolik;</li>
                <li>✅ Prezident, ijod, ixtisoslashtirilgan va sport maktablari yutuqlarini aks ettiruvchi motivatsion video;</li>
                <li>✅ O‘qituvchi, ota-ona va bitiruvchilarning Mustaqillik haqidagi samimiy fikrlari jamlangan videorolik;</li>
                <li>✅ Davlat ramzlariga hurmat, Vatanga sadoqat va milliy qadriyatlarni targ‘ib qiluvchi kreativ videolar.</li>
            </ul>
            <p><strong>Qatnashish uchun:</strong></p>
            <ul>
                <li>⚪️ O‘zingiz tanlagan yo‘nalishda ijodiy ish tayyorlang.</li>
                <li>⚪️ Ishingizni Telegram yoki Instagram sahifangizga joylang.</li>
                <li>⚪️ Postga #YagonaVatan35 heshtegini qo‘ying.</li>
            </ul>
            <p>Eng muhimi — ijodingizni namoyon eting va “Yangi O‘zbekistonning iqtidorli farzandiman!” degan g‘oyani o‘z uslubingizda ifodalang!</p>
            <p>🏆 Eng faol va kreativ ishtirokchilarning ijodiy ishlari e’tirof etilib, munosib taqdirlanadi.</p>
        `
    },
    {
        id: 11,
        title: "Mustaqillik buyuk neʼmat va erkinlikdir",
        date: "20 Avgust, 2026",
        category: "Tadbir",
        image: "/images/reklama.jpg",
        images: ["/images/reklama.jpg"],
        video: "/images/video2.mp4",
        desc: "Termiz shahridagi Prezident maktabi jamoasi Oʻzbekiston Respublikasi mustaqilligining 35 yilligi munosabati bilan ijtimoiy rolik tayyorladi.",
        content: `
            <p>Termiz shahridagi Prezident maktabi jamoasi Oʻzbekiston Respublikasi mustaqilligining 35 yilligi munosabati bilan ijtimoiy rolik tayyorladi.</p>
            <p>Yurtimiz mustaqilligi, xalqimiz farovonligi, sarhadlarimiz daxlsizligiga hech qachon koʻz tegmasin. Istiqlolimiz abadiy boʻlsin.</p>
        `
    },
    {
        id: 12,
        title: "Ustozga ehtirom-millatga ehtirom",
        date: "1 Oktabr, 2026",
        isToday: true,
        category: "Tadbir",
        image: "/images/01.jpg",
        images: ["/images/01.jpg"],
        video: "/images/ustozlar_bayrami.mp4",
        desc: "Termiz shahridagi Prezident maktabida erta tongdan 1-oktabr — O‘qituvchilar va murabbiylar kuni munosabati bilan bayramona kayfiyat hukm surdi.",
        content: `
            <p>Termiz shahridagi Prezident maktabida erta tongdan 1-oktabr — O‘qituvchilar va murabbiylar kuni munosabati bilan bayramona kayfiyat hukm surdi.</p>
            <p>Ertalab o‘quvchilarimiz ustoz va murabbiylarni musiqa sadolari ostida ko‘tarinki kayfiyatda kutib oldilar. Samimiy tabriklar, chiroyli tilaklar va bayramona muhit ushbu kunni yanada unutilmas qildi.</p>
            <p>Ustoz — qalblarga ilm va ma’rifat nurini olib kiruvchi, kelajak avlod tarbiyasiga beqiyos hissa qo‘shuvchi ulug‘ insondir.</p>
            <p>Aziz ustozlar! Sizlarni 1-oktabr — O‘qituvchilar va murabbiylar kuni bilan chin qalbimizdan muborakbod etamiz!</p>
            <p>Sizlarga mustahkam sog‘lik, oilaviy xotirjamlik, sharafli va mas’uliyatli faoliyatingizda ulkan zafarlar tilaymiz!</p>
        `
    }
];

export const newsData = [...rawNewsData].reverse();
