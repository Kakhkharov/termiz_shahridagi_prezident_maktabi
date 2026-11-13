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
        title: "Termiz şahridagi Prezident maktabida 'STEM Expo-2026' körgazmasi yakunlandi",
        date: "25 Aprel, 2026",
        isToday: true,
        category: "Tadbir",
        image: "/images/01.jpg",
        images: ["/images/01.jpg", "/images/02.jpg", "/images/03.jpg", "/images/04.jpg"],
        desc: "Öquvçilar tomonidan tayyorlangan innovatsion işlanmalar va muhandislik loyihalari mutaxassislar tomonidan yuqori baholandi. Körgazma davomida öquvçilar robotexnika, yaşil energiya va aqlli şahar texnologiyalari böyiça öz işlarini namoyiş etişdi.",
        content: `
            <p>Termiz şahridagi Prezident maktabida öquvçilarning ijodiy va ilmiy salohiyatini röyobga çiqariş maqsadida taşkil etilgan "STEM Expo-2026" körgazmasi öz yakuniga yetdi.</p>
            <p>Uşbu tadbirda maktabning 5-11-sinf öquvçilari özlari işlab çiqqan 50 dan ortiq loyihalarni taqdim etişdi. Loyihalar orasida ayniqsa quyidagilar diqqat markazida böldi:</p>
            <ul>
                <li>Quyoş panellari yordamida işlaydigan aqlli suğoriş tizimi;</li>
                <li>Sun'iy intellekt asosida işlaydigan saralaş roboti;</li>
                <li>Ekologik toza plastik muqobillari.</li>
            </ul>
            <p>Körgazmaga taşrif buyurgan mutaxassislar öquvçilarning bilimi va loyihalarning amaliy ahamiyatiga yuqori baho berdilar. Eng yaxşi loyiha mualliflari Agentlikning maxsus diplom va esdalik sovğalari bilan taqdirlandilar.</p>
        `
    },
    {
        id: 2,
        title: "Prezident maktabiga qabul: Eng köp beriladigan savollarga mutaxassis javobi",
        date: "24 Aprel, 2026",
        category: "E'lonlar",
        image: "/images/02.jpg",
        images: ["/images/02.jpg", "/images/03.jpg", "/images/04.jpg", "/images/05.jpg"],
        desc: "2026-2027 öquv yili uçun qabul jarayoni boşlanişi munosabati bilan barça savollarga oçiq oydin javob berildi.",
        content: `
            <p>Ixtisoslaştirilgan ta'lim muassasalari agentligi 2026-2027 öquv yili uçun Prezident maktablariga qabul jarayonlari boşlanganini e'lon qildi. Şu munosabat bilan ota-onalarni qiziqtirgan asosiy savollarga javob berib ötamiz.</p>
            <p><b>Hujjatlar qaçon qabul qilinadi?</b><br/>Hujjatlar onlayn tarzda ariza.piima.uz sayti orqali joriy yilning iyun oyi davomida qabul qilinadi.</p>
            <p><b>Qaysi sinflarga qabul bor?</b><br/>Prezident maktablariga faqat 5-sinfga qabul amalga oşiriladi. Nomzodlar 4-sinfni bitirayotgan bölişlari lozim.</p>
            <p>Batafsil ma'lumot oliş uçun Telegram kanalimiz yoki rasmiy <a href="/qabul-2026" class="text-blue-500 hover:underline">qabul saytimizni</a> kuzatib boring.</p>
        `
    },
    {
        id: 3,
        title: "Maktabimizda kitobxonlik haftaligi munosabati bilan adabiy keça ötkazildi",
        date: "23 Aprel, 2026",
        category: "Ma'naviyat",
        image: "/images/03.jpg",
        images: ["/images/03.jpg", "/images/04.jpg", "/images/05.jpg", "/images/01.jpg"],
        desc: "Öquvçilar örtasida mutolaa madaniyatini yuksaltiriş maqsadida taşkil etilgan tadbirda yangi kitoblar taqdimoti bölib ötdi.",
        content: `
            <p>Inson kamolotida kitobning örni beqiyos. Şu maqsadda maktabimizda "Kitob - ma'naviyat sarçaşmasi" mavzusida adabiy-badiiy keça taşkil etildi.</p>
            <p>Tadbir davomida öquvçilar özlari sevgan asarlardan parçalar öqib berdilar, buyuk mutafakkirlar hayoti va ijodi haqida sahnalaştirilgan körinişlarni namoyiş etişdi. Şuningdek, maktab kutubxonasiga yangi keltirilgan badiiy adabiyotlar körgazmasi ham taşkil qilindi.</p>
            <p>Tadbir yakunida "Eng faol kitobxon" nominatsiyasi böyiça ğoliblar aniqlandi va ularga kitoblar töplami sovğa qilingandi.</p>
        `
    },
    {
        id: 4,
        title: "Ota-onalar uçun 'Oçiq eşiklar kuni' tadbiri taşkil etildi",
        date: "19 Aprel, 2026",
        category: "Tadbir",
        image: "/images/04.jpg",
        images: ["/images/04.jpg", "/images/05.jpg", "/images/01.jpg", "/images/02.jpg"],
        desc: "Mehmonlar maktabning zamonaviy öquv xonalari, laboratoriyalari va yaşaş şaroitlari bilan yaqindan tanişdilar.",
        content: `
            <p>Termiz şahridagi Prezident maktabida navbatdagi "Oçiq eşiklar kuni" bölib ötdi. Unda ota-onalar va jamoatçilik vakillari iştirok etişdi.</p>
            <p>Taşrif buyuruvçilar dars jarayonlarini kuzatişdi, STEM laboratoriyalaridagi şaroitlar bilan tanişişdi. Şuningdek, öquvçilarning yaşaş yotoqxonasi va oşxonadagi taomnoma ham közdan keçirildi.</p>
            <p>Maktab ma'muriyati ota-onalarni qiziqtirgan barça savollarga javob berdi va kelgusidagi rejalar bilan örtoqlaşdi.</p>
        `
    },
    {
        id: 5,
        title: "Ixtisoslaştirilgan ta'lim muassasalari agentligi: Yangi istiqbollar",
        date: "16 Aprel, 2026",
        category: "Tadbir",
        image: "/images/01.jpg",
        images: ["/images/01.jpg", "/images/02.jpg", "/images/03.jpg"],
        desc: "Agentlik tomonidan rejalaştirilgan yangi loyihalar va ularning ta'lim tizimidagi ahamiyati tuşuntirildi.",
        content: `
            <p>Respublika miqyosida ötkazilgan matbuot anjumanida Ixtisoslaştirilgan ta'lim muassasalari agentligi vakillari 2026-yilda amalga oşiriladigan yangi loyihalar haqida söz yuritdilar.</p>
            <p>Asosiy e'tibor ta'lim sifatini xalqaro standartlarga muvofiqlaştiriş, öquvçilarning kreativ fikrlaşini rivojlantirişga qaratilgan yangi öquv dasturlarini joriy etişga qaratiladi.</p>
            <p>Şuningdek, iqtidorli yoşlarni qöllab-quvvatlaş uçun qöşimça grantlar va xalqaro almaşinuv dasturlari köpaytirilişi ma'lum qilindi.</p>
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
        desc: "Termiz şahridagi Prezident maktabi öquvçilarini kasbga yönaltiriş maqsadida “Özaeronavigatsiya” markaziga amaliy sayohat taşkil etildi.",
        content: `
            <p>Termiz şahridagi Prezident maktabi öquvçilarini kasbga yönaltiriş va oliy ta’lim muassasalariga tayyorlaş maqsadida “Özaeronavigatsiya” markazi DUK Havo harakatini boşqariş hududiy boşqarmasiga amaliy sayohat taşkil etildi.</p>
            <p>Ekskursiyadan közlangan asosiy maqsad öquvçi-yoşlarga aviatsiya sohasi, aeronavigatsiya tizimi, zamonaviy texnologiyalar hamda uşbu yönalişdagi kasb imkoniyatlari haqida tuşunça berişdan iborat böldi.</p>
            <p>Mutaxassislar tomonidan aeronavigatsiya xizmatlari, parvozlar xavfsizligini ta’minlaş jarayonlari, işlatiladigan texnik vositalar hamda sohada talab yuqori bölgan kasblar haqida batafsil ma’lumotlar berildi.</p>
        `
    },
    {
        id: 7,
        title: "Termiz şahridagi Prezident maktabida “Yoşlar kuni” tadbiri ötkazildi",
        date: "25 Aprel, 2026",
        category: "Taşrif",
        image: "/images/02.jpg",
        images: ["/images/02.jpg", "/images/01.jpg", "/images/03.jpg", "/images/04.jpg"],
        desc: "Davra suhbati Surxondaryo viloyati IIB huzuridagi Qöriqlaş xizmati rahbari va xodimlari iştirokida, Amir Temur tavalludining 690 yilligiga bağişlandi.",
        content: `
            <p>Özbekiston Respublikasi Prezidentining 2026-yil 24-fevraldagi yoşlar bilan muloqotida belgilangan topşiriqlariga muvofiq har haftaning payşanba kuni vazirlik va idoralarda “Yoşlar kuni” etib belgilangan edi.</p>
            <p>Termiz şahridagi Prezident maktabida “Yoşlar kuni” munosabati taşkil etilgan Surxondaryo viloyati IIB huzuridagi Qöriqlaş xizmati rahbari hamda xodimlari iştirokidagi davra suhbati Amir Temur tavalludining 690 yilligiga bağişlandi.</p>
            <p>Uçraşuv davomida yoşlarga içki işlar organlariga xizmatga qabul qiliş tartibi, mazkur yönalişda özlaştiriş zarur bölgan fanlar haqida ham töxtalib ötildi.</p>
            <p>Tadbir yakunida yoşlar bilan oçiq muloqot ötkazilib, ularni qiziqtirgan savollariga batafsil javoblar berildi. Bu kabi uçraşuvlar yoşlarning ma’naviy-axloqiy tarbiyasini mustahkamlaşda, vatanparvarlik ruhida voyaga yetişida muhim ahamiyat kasb etadi.</p>
        `
    },
    {
        id: 9,
        title: "Qabul davom etmoqda",
        date: "19 May, 2026",
        category: "E'lonlar",
        image: "/images/infografika.jpg",
        images: ["/images/infografika.jpg"],
        desc: "Ixtisoslaştirilgan ta’lim muassasalari agentligi tizimidagi maktablarga ariza.piima.uz sayti orqali arizalar kelib tuşmoqda.",
        content: `
            <p>Ixtisoslaştirilgan ta’lim muassasalari agentligi tizimidagi maktablarga ariza.piima.uz sayti orqali arizalar kelib tuşmoqda.</p>
            <p>Uşbu arizalarning 19-may soat 11:00 holatidagi statistikasi bilan yuqoridagi infografikada tanişişingiz mumkin.</p>
            <p><strong>Call-markaz: 1206</strong></p>
        `
    },
    {
        id: 10,
        title: "“Yangi Özbekistonning iqtidorli farzandiman” ijodiy çellenji",
        date: "12 Avgust, 2026",
        category: "Tanlov",
        image: "/images/35_yillik.jpg",
        images: ["/images/35_yillik.jpg"],
        desc: "Mustaqillikning 35 yilligi munosabati bilan “Yangi Özbekistonning iqtidorli farzandiman” ijodiy çellenji e’lon qilinadi.",
        content: `
            <p>Ixtisoslaştirilgan ta’lim muassasalari agentligi taşabbusi bilan Mustaqillikning 35 yilligi munosabati bilan “Yagona Vatan, yagona xalq bölib, yangi hayot va kelajak yaratamiz!” şiori ostida “Yangi Özbekistonning iqtidorli farzandiman” ijodiy çellenji e’lon qilinadi.</p>
            <p><strong>Çellenj quyidagi yönalişlarda bölib ötadi:</strong></p>
            <ul>
                <li>✅ #YagonaVatan35 çellenji — öquvçilarning Vatan haqidagi fikrlari, tabriklari va ezgu tilaklari;</li>
                <li>✅ “Mustaqillik menga nima berdi?” mavzusida 30–60 soniyalik videorolik;</li>
                <li>✅ “Bir bayroq – bir yurak” fleşmobi;</li>
                <li>✅ Öquvçilar ijrosida Vatan haqidagi şe’r yoki vatanparvarlik qöşiği;</li>
                <li>✅ Mustaqillik aks etgan binolar va manzillarda rasmga tuşiş;</li>
                <li>✅ “Mening maktabim – Yangi Özbekiston kelajagi” mavzusida ijodiy videorolik;</li>
                <li>✅ Prezident, ijod, ixtisoslaştirilgan va sport maktablari yutuqlarini aks ettiruvçi motivatsion video;</li>
                <li>✅ Öqituvçi, ota-ona va bitiruvçilarning Mustaqillik haqidagi samimiy fikrlari jamlangan videorolik;</li>
                <li>✅ Davlat ramzlariga hurmat, Vatanga sadoqat va milliy qadriyatlarni tarğib qiluvçi kreativ videolar.</li>
            </ul>
            <p><strong>Qatnaşiş uçun:</strong></p>
            <ul>
                <li>⚪️ Özingiz tanlagan yönalişda ijodiy iş tayyorlang.</li>
                <li>⚪️ Işingizni Telegram yoki Instagram sahifangizga joylang.</li>
                <li>⚪️ Postga #YagonaVatan35 heştegini qöying.</li>
            </ul>
            <p>Eng muhimi — ijodingizni namoyon eting va “Yangi Özbekistonning iqtidorli farzandiman!” degan ğoyani öz uslubingizda ifodalang!</p>
            <p>🏆 Eng faol va kreativ iştirokçilarning ijodiy işlari e’tirof etilib, munosib taqdirlanadi.</p>
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
        desc: "Termiz şahridagi Prezident maktabi jamoasi Özbekiston Respublikasi mustaqilligining 35 yilligi munosabati bilan ijtimoiy rolik tayyorladi.",
        content: `
            <p>Termiz şahridagi Prezident maktabi jamoasi Özbekiston Respublikasi mustaqilligining 35 yilligi munosabati bilan ijtimoiy rolik tayyorladi.</p>
            <p>Yurtimiz mustaqilligi, xalqimiz farovonligi, sarhadlarimiz daxlsizligiga heç qaçon köz tegmasin. Istiqlolimiz abadiy bölsin.</p>
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
        desc: "Termiz şahridagi Prezident maktabida erta tongdan 1-oktabr — Öqituvçilar va murabbiylar kuni munosabati bilan bayramona kayfiyat hukm surdi.",
        content: `
            <p>Termiz şahridagi Prezident maktabida erta tongdan 1-oktabr — Öqituvçilar va murabbiylar kuni munosabati bilan bayramona kayfiyat hukm surdi.</p>
            <p>Ertalab öquvçilarimiz ustoz va murabbiylarni musiqa sadolari ostida kötarinki kayfiyatda kutib oldilar. Samimiy tabriklar, çiroyli tilaklar va bayramona muhit uşbu kunni yanada unutilmas qildi.</p>
            <p>Ustoz — qalblarga ilm va ma’rifat nurini olib kiruvçi, kelajak avlod tarbiyasiga beqiyos hissa qöşuvçi uluğ insondir.</p>
            <p>Aziz ustozlar! Sizlarni 1-oktabr — Öqituvçilar va murabbiylar kuni bilan çin qalbimizdan muborakbod etamiz!</p>
            <p>Sizlarga mustahkam soğlik, oilaviy xotirjamlik, şarafli va mas’uliyatli faoliyatingizda ulkan zafarlar tilaymiz!</p>
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
        desc: "UNESCO tarixida ilk bor maktab öqituvçilari ta'lim vazirlari bilan bir qatorda panel sessiyalarida iştirok etişdi. Özbekistonlik ustoz Durdona Boynazarova jahon pedagoglari nomidan sözga çiqdi.",
        content: `
            <p><b>UNESCO tarixida ilk bor ustozlar vazirlar panelida: özbekistonlik öqituvçi jahon pedagoglari nomidan sözga çiqdi</b></p>
            <p>Joriy yilning 8-11-sentabr kunlari Fransiyaning Parij şahrida “Sun’iy intellekt davrida ta’lim: Faktlar, muammolar, yangi ufqlar" mavzusida YUNESKOning Raqamli ta’lim haftaligi — 2026 bölib ötdi.</p>
            <p>Unda dunyoning qator mamlakatlaridan kelgan pedagoglar, ekspertlar va ta‘lim sohasi xodimlari, xususan IŞONÇ — Vision 2030 loyihasi mentorlari iştirok etişdi.</p>
            <p>Tadbirlar davomida sun‘iy intellekt, raqamli ta‘lim va kelgusi rejalarga bağişlangan muhokamalar bölib ötdi.</p>
            <p>Unda Özbekiston delegatsiyasi vakillari sözga çiqib, ta'limdagi yangi tendensiyalar, sohada raqamli texnologiyalardan foydalaniş, şuningdek, mamlakatimizda amalga oşirilayotgan islohotlar, ta‘limga e‘tibor va ta‘limda sun‘iy intellekt yönalişidagi tajribalar haqida söz yuritişdi.</p>
            <p>Ta‘kidlaş joiz: 15 yildan beri UNESCOning Parijdagi Boş qarorgohida ötkazib kelinayotgan Raqamli ta’lim haftaligi tarixida ilk bor maktab öqituvçilari ta'lim vazirlari bilan bir qatorda panel sessiyalarida iştirok etişdi.</p>
            <p>Bunda özbekistonlik ustoz — Durdona Boynazarova butun dunyo ustozlari nomidan sözga çiqib, ta’limda sun’iy intellekt, bu boradagi siyosatni işlab çiqişda ustozlarning roli haqida söz yuritdi.</p>
            <p>Şuningdek, Behruz Ruziyev va Sevara Şamsiyevalar tadbirda öz taqdimotlari bilan qatnaşişdi.</p>
        `
    },
    {
        id: 14,
        title: "Çavondozlik mahorat maktabi bilan hamkorlik",
        date: "11 Sentyabr, 2026",
        category: "Hamkorlik",
        image: "/images/ot_0.jpg",
        images: ["/images/ot_0.jpg"],
        video: "/images/video3.mp4",
        desc: "Termiz şahridagi Prezident maktabi Çavandozlik mahorat maktabi hamda Turon yakka kuraş federatsiyalari bilan hamkorlik aloqalarini yölga qöydi.",
        content: `
            <p>Termiz şahridagi Prezident maktabi Çavandozlik mahorat maktabi hamda Turon yakka kuraş federatsiyalari bilan tuzilgan hamkorlikdan videolavha.</p>
            <p>Bizni kuzatib boring!</p>
        `
    },
    {
        id: 15,
        title: "Ta'lim sohasidagi islohotlar: “Ta’limga bekorga eng işongan kadrimni olib kelmadim” — Şavkat Mirziyoyev",
        date: "12 Oktyabr, 2026",
        category: "Islohotlar",
        image: "/images/yangilik_0.jpg",
        images: ["/images/yangilik_0.jpg"],
        desc: "Prezident Yangi Toşkentda ötkazilgan uçraşuv davomida Boş vazirning birinçi örinbosari — ta’lim va ilm-fan vaziri haqida töxtalib ötdi.",
        content: `
            <p>❗️<b>“Ta’limga bekorga eng işongan kadrimni olib kelmadim” — Şavkat Mirziyoyev</b></p>
            <p>Prezident Yangi Toşkentda ötkazilgan uçraşuv davomida Özbekiston Respublikasi Boş vazirining birinçi örinbosari — ta’lim va ilm-fan vaziri Erkinjon Turdimov haqida töxtalib ötdi. Bu haqda tadbirda iştirok etgan “Daryo” muxbiri <a href="https://t.me/daryo_live/148051" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">xabar berdi</a>.</p>
            <p>“Son köpaydi, sifat esa kam. Bundan keyin har bir universitet kim uçun qanday kadr tayyorlaşini özi uçun aniq belgilab olişi kerak. Törtta viloyatga hokim bölgan odamni Ta’lim vazirligiga bekorga olib kelmadim”, — dedi prezident.</p>
        `
    },
    {
        id: 16,
        title: "«OVOZ» — Ğoyalar minbari loyihasi uçun röyxatdan ötiş boşlandi",
        date: "13 Oktyabr, 2026",
        category: "Loyiha",
        image: "/images/yangilik_1.jpg",
        images: ["/images/yangilik_1.jpg"],
        desc: "Ixtisoslaştirilgan ta'lim muassasalari agentligi tizimida öquvçilar uçun «OVOZ» intellektual ma’ruzalar loyihasi uçun röyxatdan ötiş boşlandi.",
        content: `
            <p>Ixtisoslaştirilgan ta'lim muassasalari agentligi tizimida öquvçilarning intellektual salohiyati, mustaqil fikrlaşi va notiqlik mahoratini rivojlantirişga qaratilgan «OVOZ» intellektual ma’ruzalar loyihasi uçun röyxatdan ötiş boşlandi. TED va TED-Ed formatlaridan ilhomlangan loyiha yoşlarning dolzarb masalalar yuzasidan öz qaraşlarini erkin ifoda etişi, yangi ğoyalarni ilgari surişi va ularni keng auditoriyaga yetkazişi uçun imkoniyat yaratadi.</p>
            <p>Iştirokçilar raqamli texnologiyalar va innovatsiyalar, tarix va şaxsiyat, şaxsiy qaraşlar hamda jamiyat va maktab hayotiga oid yönalişlarda öz ğoyalarini taqdim etişlari mumkin. Loyihaning asosiy maqsadi — yoşlarning fikrlaş madaniyati, nutq könikmalari va öz ğoyalarini asosli ravişda ifoda etiş qobiliyatini rivojlantiriş, şuningdek, ularning taşabbuslarini qöllab-quvvatlaşdir.</p>
            <p>Röyxatdan ötiş 17-oktabrga qadar davom etadi. Iştirok etiş şartlari va barça talablar bilan quyidagi <a href="https://ovoz.prteam.uz/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline font-semibold">havola</a> orqali tanişiş mumkin.</p>
            <p>Qöşimça ma’lumot uçun: <b>@ovozadm1n</b></p>
        `
    },
    {
        id: 17,
        title: "“Rahbar kubogi” sport musobaqasining Surxondaryo viloyati bosqiçi bölib ötdi",
        date: "13 Oktyabr, 2026",
        category: "Sport",
        image: "/images/school.jpg",
        images: ["/images/school.jpg"],
        video: "/images/video4.mp4",
        desc: "Termiz şahridagi Prezident maktabida Ixtisoslaştirilgan ta’lim muassasalari agentligi tizimidagi maktablar örtasida “Rahbar kubogi” sport musobaqasi ötkazildi.",
        content: `
            <p>Ixtisoslaştirilgan ta’lim muassasalari agentligi tizimidagi Termiz şahridagi Prezident maktabida Ixtisoslaştirilgan ta’lim muassasalari agentligi tizimidagi maktablar örtasida <b>“Rahbar kubogi”</b> sport musobaqasining Surxondaryo viloyati bosqiçi bölib ötdi.</p>
            <p>Uşbu nufuzli sport musobaqasida öquvçilar sportning bir qança turlari böyiça öz mahorat va çaqqonliklarini namoyiş etib, özaro bellaşdilar.</p>
        `
    },
    {
        id: 18,
        title: "Termiz garnizoni harbiy xizmatçisi bilan “Uç avlod uçraşuvi” tadbiri bölib ötdi",
        date: "13 Oktyabr, 2026",
        category: "Tadbir",
        image: "/images/school.jpg",
        images: ["/images/school.jpg"],
        video: "/images/video5.mp4",
        desc: "Termiz şahridagi Prezident maktabida Termiz garnizoni harbiy xizmatçisi, faxriylar hamda öquvçi-yoşlar iştirokida “Uç avlod uçraşuvi” tadbiri bölib ötdi.",
        content: `
            <p>Termiz şahridagi Prezident maktabida Termiz garnizoni harbiy xizmatçisi, faxriylar hamda öquvçi-yoşlar iştirokida <b>“Uç avlod uçraşuvi”</b> tadbiri bölib ötdi.</p>
            <p>Samimiy muloqot va özaro tajriba almaşiş ruhida ötgan uçraşuvda faxriylar mustaqillik yillarida mamlakatimiz erişgan yutuqlar, boy hayotiy tajribalari hamda samarali mehnat faoliyati haqida sözlab berdilar.</p>
            <p>Şuningdek, yoş avlod vakillariga çuqur bilim oliş, zamonaviy kasb-hunarlarni puxta egallaş, yurt ravnaqi yölida munosib hissa qöşiş va Vatanga sadoqatli farzand bölib kamol topiş yuzasidan qimmatli tavsiyalar berildi.</p>
            <p>Bunday uçraşuvlar avlodlar örtasidagi mehr-oqibat, hurmat va hamjihatlikni mustahkamlaş, yoşlarda milliy qadriyatlarga sadoqat hamda vatanparvarlik tuyğularini yanada yuksaltirişga xizmat qiladi.</p>
        `
    },
    {
        id: 19,
        title: "“Zukko kitobxon” tanlovining yangi mavsumiga start berildi",
        date: "13 Oktyabr, 2026",
        category: "Tanlov",
        image: "/images/yangilik_3.jpg",
        images: ["/images/yangilik_3.jpg"],
        desc: "Termiz şahridagi Prezident maktabida an’anaviy “Zukko kitobxon” tanlovining yangi mavsum saralaş bosqiçiga start berildi.",
        content: `
            <blockquote class="italic text-slate-600 border-l-4 border-[#0088cc] pl-4 my-3 bg-slate-50 py-2.5 rounded-r">
                Agar yolğiz esang, hamdam kitobdir,<br/>
                Bilim subhidagi nur ham kitobdir.<br/>
                <span class="text-xs font-semibold not-italic block mt-1.5 text-slate-500">— Abdurahmon Jomiy</span>
            </blockquote>
            <p>Termiz şahridagi Prezident maktabida <b>“Zukko kitobxon”</b> tanlovining yangi mavsumiga start berildi!</p>
            <p>Har yili ötkazilişi an’anaga aylangan uşbu tanlovda faol iştirok etiş uçun barça kitobxon, zukko yoşlarimizni çorlab qolamiz.</p>
            <p>Tanlovning joriy mavsum saralaş bosqiçiga <b>19-noyabr</b> kuni start beriladi.</p>
            <div class="my-4">
                <a href="https://telegra.ph/Termiz-shahridagi-Prezident-maktabida-otkaziladigan-Zukko-kitobxon-tanlovi-nizomi-10-09" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-white bg-[#0088cc] hover:bg-[#0077b3] px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow">
                    Tanlov nizomi bilan tanişing ➡️
                </a>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-100">
                <p class="font-semibold text-slate-800 mb-2">Termiz şahridagi Prezident maktabining rasmiy ijtimoiy tarmoq sahifalari:</p>
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
        title: "Özbekiston Respublikasi Prezidenti Farmoni: Ta’lim va ilm-fan vaziri lavozimi kiritildi",
        date: "13 Oktyabr, 2026",
        category: "Islohotlar",
        image: "/images/yangilik_4.jpg",
        images: ["/images/yangilik_4.jpg", "/images/durdona_0.jpg", "/images/durdona_1.jpg"],
        desc: "Özbekiston Respublikasi Prezidentining “Özbekiston Respublikasi Vazirlar Mahkamasining ijro etuvçi tuzilmasini yanada takomillaştiriş çora-tadbirlari töğrisida”gi Farmoni qabul qilindi.",
        content: `
            <p>✅ Özbekiston Respublikasi Prezidentining <b>“Özbekiston Respublikasi Vazirlar Mahkamasining ijro etuvçi tuzilmasini yanada takomillaştiriş çora-tadbirlari töğrisida”</b>gi Farmoni qabul qilindi. Unga köra, Vazirlar Mahkamasi ijro etuvçi tuzilmasida:</p>
            <ul class="list-disc pl-5 space-y-1.5 my-3 text-slate-700">
                <li>Özbekiston Respublikasi Boş vazirining birinçi örinbosari — ta’lim va ilm-fan vaziri lavozimi kiritildi;</li>
                <li>12 nafar ştat birligidan iborat bölgan Ta’lim, ilm-fan va soğliqni saqlaş masalalari kotibiyati taşkil qilindi.</li>
            </ul>
            <p class="font-semibold text-slate-800 mt-4">👉 Vazirlar Mahkamasi Ta’lim, ilm-fan va soğliqni saqlaş masalalari kotibiyatining:</p>
            <ul class="list-disc pl-5 space-y-1.5 my-2 text-slate-700">
                <li>5 ta ştat birligi — Vazirlar Mahkamasining Ijtimoiy rivojlaniş masalalari bölimi hisobidan;</li>
                <li>7 ta ştat birligi — qayta taşkil etilgan Maktabgaça va maktab ta’limi vazirligi hamda Oliy ta’lim, fan va innovatsiyalar vazirligining ştat birliklarini maqbullaştiriş hisobidan şakllantiriladi.</li>
            </ul>
            <p class="font-semibold text-slate-800 mt-4">👉 Farmonga köra:</p>
            <p>Boş vazirning birinçi örinbosari — ta’lim va ilm-fan vaziri respublika ijro etuvçi hokimiyat organlari — vazirliklar, qömitalar, agentliklar va inspeksiyalar rahbarlari hamda Qoraqalpoğiston Respublikasi Vazirlar Kengaşi Raisi, viloyatlar va Toşkent şahar hokimlarining ta’lim, ilm-fan va soğliqni saqlaş sohalarida zimmasiga yuklatilgan vazifa va funksiyalarni amalga oşiriş böyiça faoliyatiga vakolati doirasida umumiy rahbarlik qiladi, ularni muvofiqlaştiradi.</p>
            <div class="mt-5 p-4 bg-blue-50/80 border border-blue-200/80 rounded-xl">
                <a href="https://lex.uz/uz/pdfs/8530785" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-[#0088cc] hover:text-[#006699] font-bold text-sm md:text-base transition-colors hover:underline">
                    <span class="material-symbols-outlined text-[22px]">description</span>
                    👉 Farmonning töliq matni bilan tanişing (lex.uz)
                </a>
            </div>
        `
    },
    {
        id: 21,
        title: "Prezident maktablari tarixida ilk mukofot",
        date: "11 Noyabr, 2026",
        category: "Mukofot",
        image: "/images/prezident00.jpg",
        images: ["/images/prezident00.jpg", "/images/prezident01.jpg", "/images/prezident02.jpg", "/images/prezident03.jpg"],
        video: "/images/video6.mp4",
        desc: "Prezident maktablari tarixida ilk bor: Bir guruh öquvçilar nufuzli “Outstanding Pearson Learner Awards” xalqaro mukofotiga sazovor böldi.",
        content: `
            <p>Prezident maktablari tarixida ilk bor: Bir guruh öquvçilar nufuzli <b>“Outstanding Pearson Learner Awards”</b> xalqaro mukofotiga <a href="https://t.me/piimauz/33321" target="_blank" rel="noopener noreferrer" class="text-[#0088cc] hover:underline font-semibold">sazovor böldi</a>.</p>
        `
    },
    {
        id: 22,
        title: "MADANIYAT — DUNYONI BIRLAŞTIRUVÇI KÖPRIK!",
        date: "11 Noyabr, 2026",
        isToday: true,
        category: "Madaniyat",
        image: "/images/11_02.jpg",
        images: [
            "/images/11_02.jpg",
            "/images/11_01.jpg",
            "/images/11_03.jpg",
            "/images/11_04.jpg",
            "/images/11_05.jpg",
            "/images/11_06.jpg",
            "/images/11_07.jpg",
            "/images/11_08.jpg"
        ],
        desc: "Termiz şahridagi Prezident maktabining 9-sinf öquvçilari iştirokida zamonaviy yondaşuv fanidan “Tradition, Culture and Identity” (An’ana, madaniyat va özlik) mavzusi doirasida “Cultural Exhibition” — Madaniyatlar körgazmasi taşkil etildi.",
        content: `
            <p>Termiz şahridagi Prezident maktabining 9-sinf öquvçilari iştirokida zamonaviy yondaşuv fanidan <b>“Tradition, Culture and Identity”</b> (An’ana, madaniyat va özlik) mavzusi doirasida <b>“Cultural Exhibition”</b> — Madaniyatlar körgazmasi taşkil etildi.</p>
            <p>Tadbir davomida öquvçilar jamoalarga bölinib, özlari tanlagan xalqlar va mamlakatlar madaniyatini namoyiş etdilar. Har bir jamoa öz taqdimotlari orqali turli xalqlarning milliy liboslari, an’anaviy taomlari, musiqa va raqslari, tarixiy obidalari, anʼana va urf-odatlari haqida qiziqarli ma’lumotlar bilan örtoqlaşdi.</p>
            <p>Körgazma öquvçilarga nafaqat turli xalqlarning boy madaniy merosi bilan yaqindan tanişiş, balki özaro hurmat, bağrikenglik va madaniyatlararo muloqot könikmalarini rivojlantiriş imkonini ham berdi.</p>
        `
    }
];

export const newsData = [...rawNewsData].reverse();
