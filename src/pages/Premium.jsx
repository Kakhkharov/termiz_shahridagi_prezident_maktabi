import React from 'react';

export default function Premium() {
    return (
        <main className="pt-24 pb-12 max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8 py-12">
                <h1 className="text-4xl md:text-6xl font-black text-primary">Daryo Premium</h1>
                <p className="text-xl text-slate-600">Maxsus maqolalar, reklamasiz sayt va eksklyuziv intervyular bilan tanishing.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full text-left">
                    <div className="border border-slate-200 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-2xl font-bold text-on-surface">1 Oylik Obuna</h3>
                        <p className="text-4xl font-black text-primary my-4">20 000 UZS</p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2 text-slate-600"><span className="material-symbols-outlined text-green-500">check_circle</span> Reklamasiz o'qish</li>
                            <li className="flex items-center gap-2 text-slate-600"><span className="material-symbols-outlined text-green-500">check_circle</span> Premium maqolalar</li>
                            <li className="flex items-center gap-2 text-slate-600"><span className="material-symbols-outlined text-green-500">check_circle</span> Fikr qoldirish imkoniyati</li>
                        </ul>
                        <button className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-container transition-colors">Tanlash</button>
                    </div>

                    <div className="border-2 border-primary bg-primary/5 rounded-2xl p-8 shadow-sm relative">
                        <span className="absolute -top-3 right-8 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">ENG MASHHUR</span>
                        <h3 className="text-2xl font-bold text-on-surface">1 Yillik Obuna</h3>
                        <p className="text-4xl font-black text-primary my-4">200 000 UZS</p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2 text-slate-600"><span className="material-symbols-outlined text-green-500">check_circle</span> Reklamasiz o'qish</li>
                            <li className="flex items-center gap-2 text-slate-600"><span className="material-symbols-outlined text-green-500">check_circle</span> Premium maqolalar</li>
                            <li className="flex items-center gap-2 text-slate-600"><span className="material-symbols-outlined text-green-500">check_circle</span> Fikr qoldirish imkoniyati</li>
                            <li className="flex items-center gap-2 text-slate-600"><span className="material-symbols-outlined text-green-500">check_circle</span> Jami 2 oy bepul!</li>
                        </ul>
                        <button className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-container transition-colors shadow-lg hover:shadow-primary/30">Tanlash</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
