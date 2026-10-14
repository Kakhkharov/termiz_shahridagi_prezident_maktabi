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
    },
    {
        id: 13,
        title: "XALQARO HAMKORLIK: UNESCO tarixida ilk bor ustozlar vazirlar panelida",
        date: "11 Sentyabr, 2026",
        category: "Xalqaro",
        image: "/images/durdona_0.jpg",
        images: [
            "/images/durdona_0.jpg",
            "/images/durdona_1.jpg",
            "/images/durdona_2.jpg",
            "/images/durdona_3.jpg"
        ],
        desc: "UNESCO tarixida ilk bor maktab o‘qituvchilari ta'lim vazirlari bilan bir qatorda panel sessiyalarida ishtirok etishdi. O‘zbekistonlik ustoz Durdona Boynazarova jahon pedagoglari nomidan so‘zga chiqdi.",
        content: `
            <p><b>UNESCO tarixida ilk bor ustozlar vazirlar panelida: o‘zbekistonlik o‘qituvchi jahon pedagoglari nomidan so‘zga chiqdi</b></p>
            <p>Joriy yilning 8-11-sentabr kunlari Fransiyaning Parij shahrida “Sun’iy intellekt davrida ta’lim: Faktlar, muammolar, yangi ufqlar" mavzusida YUNESKOning Raqamli ta’lim haftaligi — 2026 bo‘lib o‘tdi.</p>
            <p>Unda dunyoning qator mamlakatlaridan kelgan pedagoglar, ekspertlar va ta‘lim sohasi xodimlari, xususan ISHONCH — Vision 2030 loyihasi mentorlari ishtirok etishdi.</p>
            <p>Tadbirlar davomida sun‘iy intellekt, raqamli ta‘lim va kelgusi rejalarga bag‘ishlangan muhokamalar bo‘lib o‘tdi.</p>
            <p>Unda O‘zbekiston delegatsiyasi vakillari so‘zga chiqib, ta'limdagi yangi tendensiyalar, sohada raqamli texnologiyalardan foydalanish, shuningdek, mamlakatimizda amalga oshirilayotgan islohotlar, ta‘limga e‘tibor va ta‘limda sun‘iy intellekt yo‘nalishidagi tajribalar haqida so‘z yuritishdi.</p>
            <p>Ta‘kidlash joiz: 15 yildan beri UNESCOning Parijdagi Bosh qarorgohida o‘tkazib kelinayotgan Raqamli ta’lim haftaligi tarixida ilk bor maktab o‘qituvchilari ta'lim vazirlari bilan bir qatorda panel sessiyalarida ishtirok etishdi.</p>
            <p>Bunda o‘zbekistonlik ustoz — Durdona Boynazarova butun dunyo ustozlari nomidan so’zga chiqib, ta’limda sun’iy intellekt, bu boradagi siyosatni ishlab chiqishda ustozlarning roli haqida so‘z yuritdi.</p>
            <p>Shuningdek, Behruz Ruziyev va Sevara Shamsiyevalar tadbirda o‘z taqdimotlari bilan qatnashishdi.</p>
        `
    },
    {
        id: 14,
        title: "Chavondozlik mahorat maktabi bilan hamkorlik",
        date: "11 Sentyabr, 2026",
        category: "Hamkorlik",
        image: "/images/ot_0.jpg",
        images: ["/images/ot_0.jpg"],
        video: "/images/video3.mp4",
        desc: "Termiz shahridagi Prezident maktabi Chavandozlik mahorat maktabi hamda Turon yakka kurash federatsiyalari bilan hamkorlik aloqalarini yo‘lga qo‘ydi.",
        content: `
            <p>Termiz shahridagi Prezident maktabi Chavandozlik mahorat maktabi hamda Turon yakka kurash federatsiyalari bilan tuzilgan hamkorlikdan videolavha.</p>
            <p>Bizni kuzatib boring!</p>
        `
    },
    {
        id: 15,
        title: "Ta'lim sohasidagi islohotlar: “Ta’limga bekorga eng ishongan kadrimni olib kelmadim” — Shavkat Mirziyoyev",
        date: "12 Oktyabr, 2026",
        category: "Islohotlar",
        image: "/images/yangilik_0.jpg",
        images: ["/images/yangilik_0.jpg"],
        desc: "Prezident Yangi Toshkentda o‘tkazilgan uchrashuv davomida Bosh vazirning birinchi o‘rinbosari — ta’lim va ilm-fan vaziri haqida to‘xtalib o‘tdi.",
        content: `
            <p>❗️<b>“Ta’limga bekorga eng ishongan kadrimni olib kelmadim” — Shavkat Mirziyoyev</b></p>
            <p>Prezident Yangi Toshkentda o‘tkazilgan uchrashuv davomida O‘zbekiston Respublikasi Bosh vazirining birinchi o‘rinbosari — ta’lim va ilm-fan vaziri Erkinjon Turdimov haqida to‘xtalib o‘tdi. Bu haqda tadbirda ishtirok etgan “Daryo” muxbiri <a href="https://t.me/daryo_live/148051" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">xabar berdi</a>.</p>
            <p>“Son ko‘paydi, sifat esa kam. Bundan keyin har bir universitet kim uchun qanday kadr tayyorlashini o‘zi uchun aniq belgilab olishi kerak. To‘rtta viloyatga hokim bo‘lgan odamni Ta’lim vazirligiga bekorga olib kelmadim”, — dedi prezident.</p>
        `
    },
    {
        id: 16,
        title: "«OVOZ» — G‘oyalar minbari loyihasi uchun ro‘yxatdan o‘tish boshlandi",
        date: "13 Oktyabr, 2026",
        category: "Loyiha",
        image: "/images/yangilik_1.jpg",
        images: ["/images/yangilik_1.jpg"],
        desc: "Ixtisoslashtirilgan ta'lim muassasalari agentligi tizimida o‘quvchilar uchun «OVOZ» intellektual ma’ruzalar loyihasi uchun ro‘yxatdan o‘tish boshlandi.",
        content: `
            <p>Ixtisoslashtirilgan ta'lim muassasalari agentligi tizimida o‘quvchilarning intellektual salohiyati, mustaqil fikrlashi va notiqlik mahoratini rivojlantirishga qaratilgan «OVOZ» intellektual ma’ruzalar loyihasi uchun ro‘yxatdan o‘tish boshlandi. TED va TED-Ed formatlaridan ilhomlangan loyiha yoshlarning dolzarb masalalar yuzasidan o‘z qarashlarini erkin ifoda etishi, yangi g‘oyalarni ilgari surishi va ularni keng auditoriyaga yetkazishi uchun imkoniyat yaratadi.</p>
            <p>Ishtirokchilar raqamli texnologiyalar va innovatsiyalar, tarix va shaxsiyat, shaxsiy qarashlar hamda jamiyat va maktab hayotiga oid yo‘nalishlarda o‘z g‘oyalarini taqdim etishlari mumkin. Loyihaning asosiy maqsadi — yoshlarning fikrlash madaniyati, nutq ko‘nikmalari va o‘z g‘oyalarini asosli ravishda ifoda etish qobiliyatini rivojlantirish, shuningdek, ularning tashabbuslarini qo‘llab-quvvatlashdir.</p>
            <p>Ro‘yxatdan o‘tish 17-oktabrga qadar davom etadi. Ishtirok etish shartlari va barcha talablar bilan quyidagi <a href="https://ovoz.prteam.uz/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline font-semibold">havola</a> orqali tanishish mumkin.</p>
            <p>Qo‘shimcha ma’lumot uchun: <b>@ovozadm1n</b></p>
        `
    },
    {
        id: 17,
        title: "“Rahbar kubogi” sport musobaqasining Surxondaryo viloyati bosqichi bo‘lib o‘tdi",
        date: "13 Oktyabr, 2026",
        category: "Sport",
        image: "/images/school.jpg",
        images: ["/images/school.jpg"],
        video: "/images/video4.mp4",
        desc: "Termiz shahridagi Prezident maktabida Ixtisoslashtirilgan ta’lim muassasalari agentligi tizimidagi maktablar o‘rtasida “Rahbar kubogi” sport musobaqasi o‘tkazildi.",
        content: `
            <p>Ixtisoslashtirilgan ta’lim muassasalari agentligi tizimidagi Termiz shahridagi Prezident maktabida Ixtisoslashtirilgan ta’lim muassasalari agentligi tizimidagi maktablar o‘rtasida <b>“Rahbar kubogi”</b> sport musobaqasining Surxondaryo viloyati bosqichi bo‘lib o‘tdi.</p>
            <p>Ushbu nufuzli sport musobaqasida o‘quvchilar sportning bir qancha turlari bo‘yicha o‘z mahorat va chaqqonliklarini namoyish etib, o‘zaro bellashdilar.</p>
        `
    },
    {
        id: 18,
        title: "Termiz garnizoni harbiy xizmatchisi bilan “Uch avlod uchrashuvi” tadbiri bo‘lib o‘tdi",
        date: "13 Oktyabr, 2026",
        category: "Tadbir",
        image: "/images/school.jpg",
        images: ["/images/school.jpg"],
        video: "/images/video5.mp4",
        desc: "Termiz shahridagi Prezident maktabida Termiz garnizoni harbiy xizmatchisi, faxriylar hamda o‘quvchi-yoshlar ishtirokida “Uch avlod uchrashuvi” tadbiri bo‘lib o‘tdi.",
        content: `
            <p>Termiz shahridagi Prezident maktabida Termiz garnizoni harbiy xizmatchisi, faxriylar hamda o‘quvchi-yoshlar ishtirokida <b>“Uch avlod uchrashuvi”</b> tadbiri bo‘lib o‘tdi.</p>
            <p>Samimiy muloqot va o‘zaro tajriba almashish ruhida o‘tgan uchrashuvda faxriylar mustaqillik yillarida mamlakatimiz erishgan yutuqlar, boy hayotiy tajribalari hamda samarali mehnat faoliyati haqida so‘zlab berdilar.</p>
            <p>Shuningdek, yosh avlod vakillariga chuqur bilim olish, zamonaviy kasb-hunarlarni puxta egallash, yurt ravnaqi yo‘lida munosib hissa qo‘shish va Vatanga sadoqatli farzand bo‘lib kamol topish yuzasidan qimmatli tavsiyalar berildi.</p>
            <p>Bunday uchrashuvlar avlodlar o‘rtasidagi mehr-oqibat, hurmat va hamjihatlikni mustahkamlash, yoshlarda milliy qadriyatlarga sadoqat hamda vatanparvarlik tuyg‘ularini yanada yuksaltirishga xizmat qiladi.</p>
        `
    },
    {
        id: 19,
        title: "“Zukko kitobxon” tanlovining yangi mavsumiga start berildi",
        date: "13 Oktyabr, 2026",
        category: "Tanlov",
        image: "/images/yangilik_3.jpg",
        images: ["/images/yangilik_3.jpg"],
        desc: "Termiz shahridagi Prezident maktabida an’anaviy “Zukko kitobxon” tanlovining yangi mavsum saralash bosqichiga start berildi.",
        content: `
            <blockquote class="italic text-slate-600 border-l-4 border-[#0088cc] pl-4 my-3 bg-slate-50 py-2.5 rounded-r">
                Agar yolg'iz esang, hamdam kitobdir,<br/>
                Bilim subhidagi nur ham kitobdir.<br/>
                <span class="text-xs font-semibold not-italic block mt-1.5 text-slate-500">— Abdurahmon Jomiy</span>
            </blockquote>
            <p>Termiz shahridagi Prezident maktabida <b>“Zukko kitobxon”</b> tanlovining yangi mavsumiga start berildi!</p>
            <p>Har yili o‘tkazilishi an’anaga aylangan ushbu tanlovda faol ishtirok etish uchun barcha kitobxon, zukko yoshlarimizni chorlab qolamiz.</p>
            <p>Tanlovning joriy mavsum saralash bosqichiga <b>19-noyabr</b> kuni start beriladi.</p>
            <div class="my-4">
                <a href="https://telegra.ph/Termiz-shahridagi-Prezident-maktabida-otkaziladigan-Zukko-kitobxon-tanlovi-nizomi-10-09" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-white bg-[#0088cc] hover:bg-[#0077b3] px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow">
                    Tanlov nizomi bilan tanishing ➡️
                </a>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-100">
                <p class="font-semibold text-slate-800 mb-2">Termiz shahridagi Prezident maktabining rasmiy ijtimoiy tarmoq sahifalari:</p>
                <div class="flex flex-wrap items-center gap-3 text-sm">
                    <a href="http://t.me/pmtermiz" target="_blank" rel="noopener noreferrer" class="text-[#0088cc] hover:underline font-semibold flex items-center gap-1">
                        Telegram
                    </a> | 
                    <a href="https://www.instagram.com/pmtermiz/?r=nametag" target="_blank" rel="noopener noreferrer" class="text-pink-600 hover:underline font-semibold flex items-center gap-1">
                        Instagram
                    </a> | 
                    <a href="https://m.facebook.com/pmtermiz" target="_blank" rel="noopener noreferrer" class="text-blue-700 hover:underline font-semibold flex items-center gap-1">
                        Facebook
                    </a> | 
                    <a href="https://www.youtube.com/channel/UCFZmnpi6L7K5GgPSYgKB_hA" target="_blank" rel="noopener noreferrer" class="text-red-600 hover:underline font-semibold flex items-center gap-1">
                        YouTube
                    </a>
                </div>
            </div>
        `
    },
    {
        id: 20,
        title: "O‘zbekiston Respublikasi Prezidenti Farmoni: Ta’lim va ilm-fan vaziri lavozimi kiritildi",
        date: "13 Oktyabr, 2026",
        isToday: true,
        category: "Islohotlar",
        image: "/images/yangilik_4.jpg",
        images: ["/images/yangilik_4.jpg", "/images/durdona_0.jpg", "/images/durdona_1.jpg"],
        desc: "O‘zbekiston Respublikasi Prezidentining “O‘zbekiston Respublikasi Vazirlar Mahkamasining ijro etuvchi tuzilmasini yanada takomillashtirish chora-tadbirlari to‘g‘risida”gi Farmoni qabul qilindi.",
        content: `
            <p>✅ O‘zbekiston Respublikasi Prezidentining <b>“O‘zbekiston Respublikasi Vazirlar Mahkamasining ijro etuvchi tuzilmasini yanada takomillashtirish chora-tadbirlari to‘g‘risida”</b>gi Farmoni qabul qilindi. Unga ko‘ra, Vazirlar Mahkamasi ijro etuvchi tuzilmasida:</p>
            <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-700">
                <li>O‘zbekiston Respublikasi Bosh vazirining birinchi o‘rinbosari — ta’lim va ilm-fan vaziri lavozimi kiritildi;</li>
                <li>12 nafar shtat birligidan iborat bo‘lgan Ta’lim, ilm-fan va sog‘liqni saqlash masalalari kotibiyati tashkil qilindi.</li>
            </ul>
            <p class="font-semibold text-slate-800 mt-4">👉 Vazirlar Mahkamasi Ta’lim, ilm-fan va sog‘liqni saqlash masalalari kotibiyatining:</p>
            <ul class="list-disc pl-5 space-y-1.5 my-2 text-slate-700">
                <li>5 ta shtat birligi — Vazirlar Mahkamasining Ijtimoiy rivojlanish masalalari bo‘limi hisobidan;</li>
                <li>7 ta shtat birligi — qayta tashkil etilgan Maktabgacha va maktab ta’limi vazirligi hamda Oliy ta’lim, fan va innovatsiyalar vazirligining shtat birliklarini maqbullashtirish hisobidan shakllantiriladi.</li>
            </ul>
            <p class="font-semibold text-slate-800 mt-4">👉 Farmonga ko‘ra:</p>
            <p>Bosh vazirning birinchi o‘rinbosari — ta’lim va ilm-fan vaziri respublika ijro etuvchi hokimiyat organlari — vazirliklar, qo‘mitalar, agentliklar va inspeksiyalar rahbarlari hamda Qoraqalpog‘iston Respublikasi Vazirlar Kengashi Raisi, viloyatlar va Toshkent shahar hokimlarining ta’lim, ilm-fan va sog‘liqni saqlash sohalarida zimmasiga yuklatilgan vazifa va funksiyalarni amalga oshirish bo‘yicha faoliyatiga vakolati doirasida umumiy rahbarlik qiladi, ularni muvofiqlashtiradi.</p>
            <div class="mt-5 p-4 bg-blue-50/80 border border-blue-200/80 rounded-xl">
                <a href="https://lex.uz/uz/pdfs/8530785" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-[#0088cc] hover:text-[#006699] font-bold text-sm md:text-base transition-colors hover:underline">
                    <span class="material-symbols-outlined text-[22px]">description</span>
                    👉 Farmonning to‘liq matni bilan tanishing (lex.uz)
                </a>
            </div>
        `
    }
];

export const newsData = [...rawNewsData].reverse();
