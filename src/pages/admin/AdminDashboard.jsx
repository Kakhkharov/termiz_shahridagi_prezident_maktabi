import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- DATA LAYER ---
const INITIAL_NEWS = [
    { id: 1, title: "STEM Expo-2026: Innovatsion g'oyalar ko'rgazmasi", content: "Maktabimizda katta ko'rgazma bo'lib o'tdi...", author: "Admin", date: "2026-04-25", category: "Yangiliklar", status: "Published", engagement: 85 },
    { id: 2, title: "Prezident maktabiga qabul jarayonlari boshlandi", content: "Yangi o'quv yili uchun qabul jarayonlari boshlandi...", author: "Moderator", date: "2026-04-24", category: "Qabul", status: "Published", engagement: 120 },
    { id: 3, title: "Maktabimiz o'quvchisi xalqaro olimpiada g'olibi", content: "O'quvchimiz oltin medalni qo'lga kiritdi...", author: "Admin", date: "2026-04-23", category: "Yutuqlar", status: "Review", engagement: 45 },
];

const INITIAL_SETTINGS = {
    schoolName: "Prezident Maktabi - Termiz",
    contactEmail: "info@pm-termiz.uz",
    contactPhone: "+998 76 222 33 44",
    address: "Surxondaryo vil., Termiz sh., Barkamol Avlod ko'chasi",
    primaryColor: "#4F46E5",
    isDarkMode: false,
    maintenanceMode: false
};

export default function AdminDashboard() {
    const [view, setView] = useState('dashboard'); // dashboard | posts | editor | settings
    const [posts, setPosts] = useState([]);
    const [settings, setSettings] = useState(INITIAL_SETTINGS);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [editingPost, setEditingPost] = useState(null);

    // Persistence
    useEffect(() => {
        const savedPosts = localStorage.getItem('pm_admin_posts');
        const savedSettings = localStorage.getItem('pm_school_settings');
        setPosts(savedPosts ? JSON.parse(savedPosts) : INITIAL_NEWS);
        if (savedSettings) setSettings(JSON.parse(savedSettings));
    }, []);

    const savePostsToDisk = (newPosts) => {
        setPosts(newPosts);
        localStorage.setItem('pm_admin_posts', JSON.stringify(newPosts));
    };

    const saveSettingsToDisk = (newSettings) => {
        setSettings(newSettings);
        localStorage.setItem('pm_school_settings', JSON.stringify(newSettings));
    };

    const handleAction = (type, payload) => {
        if (type === 'DELETE') {
            if (window.confirm("O'chirilsinmi?")) savePostsToDisk(posts.filter(p => p.id !== payload));
        } else if (type === 'EDIT') {
            setEditingPost(payload);
            setView('editor');
        } else if (type === 'CREATE') {
            setEditingPost(null);
            setView('editor');
        }
    };

    return (
        <div className="flex min-h-screen bg-[#F0F4F8] text-[#1E293B] font-['Outfit',sans-serif]">
            {/* SIDEBAR */}
            <aside className={`${isSidebarOpen ? 'w-[280px]' : 'w-[88px]'} bg-[#020617] transition-all duration-500 flex flex-col shrink-0 relative shadow-2xl z-50`}>
                <div className="p-8 flex items-center gap-4 h-24 border-b border-white/5 overflow-hidden">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-white text-2xl">shield</span>
                    </div>
                    {isSidebarOpen && <span className="font-extrabold text-xl tracking-tight text-white animate-fade-in uppercase">PM <span className="text-indigo-400">CORE</span></span>}
                </div>
                <div className="flex-1 px-4 py-8 space-y-3">
                    <SidebarLink active={view === 'dashboard'} icon="space_dashboard" label="Analitika" onClick={() => setView('dashboard')} minimized={!isSidebarOpen} />
                    <SidebarLink active={view === 'posts' || view === 'editor'} icon="auto_stories" label="Maqolalar" onClick={() => setView('posts')} minimized={!isSidebarOpen} />
                    <SidebarLink active={view === 'settings'} icon="settings" label="Sozlamalar" onClick={() => setView('settings')} minimized={!isSidebarOpen} />
                </div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute -right-4 top-10 w-8 h-8 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-indigo-600 z-[60]">
                    <span className="material-symbols-outlined text-lg">{isSidebarOpen ? 'chevron_left' : 'chevron_right'}</span>
                </button>
            </aside>

            {/* MAIN AREA */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-24 px-10 bg-white/70 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between sticky top-0 z-40">
                    <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
                        {view === 'dashboard' ? 'Overview' : view === 'posts' ? 'Content Matrix' : view === 'settings' ? 'System Settings' : 'Editor Pro'}
                    </h2>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col text-right">
                            <span className="text-sm font-extrabold text-[#0F172A]">{settings.schoolName}</span>
                            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Server: Online</span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200">
                            <span className="material-symbols-outlined text-slate-400">person</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-[linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.7)),url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
                    {view === 'dashboard' && <DashboardView posts={posts} />}
                    {view === 'posts' && <EngagementList posts={posts} onAction={handleAction} />}
                    {view === 'settings' && <SettingsView settings={settings} onSave={saveSettingsToDisk} />}
                    {view === 'editor' && (
                        <ContentEditor
                            post={editingPost}
                            onCancel={() => setView('posts')}
                            onSave={(p) => {
                                let updated = editingPost ? posts.map(item => item.id === p.id ? p : item) : [{ ...p, id: Date.now(), author: "Admin", engagement: 0 }, ...posts];
                                savePostsToDisk(updated);
                                setView('posts');
                            }}
                        />
                    )}
                </div>
            </main>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&display=swap');
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
                .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
}

function SidebarLink({ active, icon, label, onClick, minimized }) {
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${active ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
            <span className="material-symbols-outlined text-2xl">{icon}</span>
            {!minimized && <span className="text-sm font-bold">{label}</span>}
        </button>
    );
}

// --- DASHBOARD ---
function DashboardView({ posts }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-in">
            {[{ l: "Maqolalar", v: posts.length, i: "description" }, { l: "Qamrov", v: "12.2K", i: "analytics" }, { l: "Sorovlar", v: "48", i: "forum" }, { l: "Admin", v: "4", i: "verified_user" }].map((s, i) => (
                <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 group hover:shadow-2xl transition-all border-b-4 border-b-transparent hover:border-b-indigo-500">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-500 mb-6 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">{s.i}</span>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.l}</p>
                    <h4 className="text-3xl font-black text-[#0F172A]">{s.v}</h4>
                </div>
            ))}
        </div>
    );
}

// --- SETTINGS VIEW (NEW) ---
function SettingsView({ settings, onSave }) {
    const [localSettings, setLocalSettings] = useState(settings);
    const [activeTab, setActiveTab] = useState('general');

    const handleUpdate = () => {
        onSave(localSettings);
        alert("Sozlamalar muvaffaqiyatli saqlandi!");
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-20">
            <div className="flex bg-white/50 backdrop-blur p-2 rounded-[30px] border border-slate-200 w-fit">
                {['general', 'design', 'security', 'system'].map(t => (
                    <button
                        key={t} onClick={() => setActiveTab(t)}
                        className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === t ? 'bg-[#0F172A] text-white shadow-xl' : 'text-slate-400 hover:text-[#0F172A]'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-[50px] shadow-2xl shadow-indigo-900/5 border border-slate-100 p-12 overflow-hidden relative">
                {activeTab === 'general' && (
                    <div className="space-y-10 animate-fade-in">
                        <h3 className="text-2xl font-black text-[#0F172A]">Umumiy Sozlamalar</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <SettingsInput label="Maktab Nomi" icon="school" value={localSettings.schoolName} onChange={v => setLocalSettings({ ...localSettings, schoolName: v })} />
                            <SettingsInput label="Aloqa Email" icon="alternate_email" value={localSettings.contactEmail} onChange={v => setLocalSettings({ ...localSettings, contactEmail: v })} />
                            <SettingsInput label="Telefon Raqami" icon="call" value={localSettings.contactPhone} onChange={v => setLocalSettings({ ...localSettings, contactPhone: v })} />
                            <SettingsInput label="Maktab Manzili" icon="location_on" value={localSettings.address} onChange={v => setLocalSettings({ ...localSettings, address: v })} />
                        </div>
                    </div>
                )}

                {activeTab === 'design' && (
                    <div className="space-y-10 animate-fade-in">
                        <h3 className="text-2xl font-black text-[#0F172A]">Dizayn va Ko'rinish</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block ml-1">Brend Rangi</label>
                                <div className="flex items-center gap-4">
                                    <input type="color" value={localSettings.primaryColor} onChange={e => setLocalSettings({ ...localSettings, primaryColor: e.target.value })} className="w-16 h-16 rounded-2xl p-1 bg-white border border-slate-200 cursor-pointer" />
                                    <span className="text-sm font-bold text-slate-600">{localSettings.primaryColor.toUpperCase()}</span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center gap-4">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block ml-1">Tizim Rejimi</label>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-slate-400">LIGHT</span>
                                    <button onClick={() => setLocalSettings({ ...localSettings, isDarkMode: !localSettings.isDarkMode })} className={`w-14 h-8 rounded-full p-1 transition-all ${localSettings.isDarkMode ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                                        <div className={`w-6 h-6 bg-white rounded-full transition-all transform ${localSettings.isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </button>
                                    <span className="text-sm font-bold text-slate-800">DARK</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="space-y-10 animate-fade-in">
                        <h3 className="text-2xl font-black text-[#0F172A]">Xavfsizlik</h3>
                        <div className="bg-rose-50 border border-rose-100 p-8 rounded-[30px] flex items-center gap-6">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm">
                                <span className="material-symbols-outlined text-3xl">lock_reset</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-rose-900">Admin Parolini Yangilash</h4>
                                <p className="text-sm text-rose-600 font-medium">Parolni o'zgartirishdan oldin eski parolingizni kiritishingiz shart.</p>
                            </div>
                            <button className="ml-auto px-6 py-3 bg-white text-rose-500 rounded-xl text-xs font-black uppercase tracking-widest border border-rose-200 shadow-sm hover:bg-rose-500 hover:text-white transition-all">Yangilash</button>
                        </div>
                    </div>
                )}

                {activeTab === 'system' && (
                    <div className="space-y-10 animate-fade-in">
                        <h3 className="text-2xl font-black text-[#0F172A]">Tizim Sozlamalari</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 border border-slate-100 rounded-[35px] flex items-center gap-5">
                                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined">database</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800">Rezerv nusxa</p>
                                    <p className="text-[11px] text-slate-400 font-medium">Barcha postlar va sozlamalarni JSON faylga yuklab oling.</p>
                                </div>
                                <button className="px-4 py-2 bg-slate-50 text-[#0F172A] rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Yuklash</button>
                            </div>
                            <div className="p-8 border border-slate-100 rounded-[35px] flex items-center gap-5">
                                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined">restart_alt</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800">Reset System</p>
                                    <p className="text-[11px] text-slate-400 font-medium">Barcha ma'lumotlarni o'chirib tashlash.</p>
                                </div>
                                <button className="px-4 py-2 bg-rose-50 text-rose-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">O'chirish</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-12 pt-10 border-t border-slate-50 flex justify-end">
                    <button onClick={handleUpdate} className="px-12 py-4 bg-[#0F172A] text-white text-[13px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-2xl hover:bg-indigo-600 hover:-translate-y-1 transition-all">SOZLAMALARNI SAQLASH</button>
                </div>
            </div>
        </div>
    );
}

function SettingsInput({ label, icon, value, onChange }) {
    return (
        <div className="space-y-3 group">
            <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-300 group-focus-within:text-indigo-500 text-[20px] transition-colors">{icon}</span>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
            </div>
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-bold text-slate-700"
            />
        </div>
    );
}

// --- ENGAGEMENT LIST ---
function EngagementList({ posts, onAction }) {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center bg-white/70 backdrop-blur p-10 rounded-[45px] border border-slate-200">
                <div>
                    <h3 className="text-2xl font-black">Post Matrix</h3>
                    <p className="text-[14px] text-slate-400 font-semibold mt-1">Global Content Management</p>
                </div>
                <button onClick={() => onAction('CREATE')} className="px-10 py-4 bg-indigo-600 text-white font-black text-[12px] uppercase tracking-widest rounded-3xl shadow-xl shadow-indigo-600/30 hover:-translate-y-1 transition-all">ADD PUBLICATION</button>
            </div>
            <div className="bg-white rounded-[50px] overflow-hidden border border-slate-100 shadow-sm px-4">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                        <tr><th className="px-10 py-8">POST TITLE</th><th className="px-10 py-8">SECTION</th><th className="px-10 py-8">DATE</th><th className="px-10 py-8">STATUS</th><th className="px-10 py-8 text-right">ACTION</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {posts.map(p => (
                            <tr key={p.id} className="hover:bg-slate-50 group transition-all">
                                <td className="px-10 py-8 font-bold text-slate-800">{p.title}</td>
                                <td className="px-10 py-8"><span className="text-xs font-black text-slate-300 uppercase underline decoration-indigo-500/30 underline-offset-4">{p.category}</span></td>
                                <td className="px-10 py-8 text-sm font-medium text-slate-400">{p.date}</td>
                                <td className="px-10 py-8"><span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border ${p.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>{p.status}</span></td>
                                <td className="px-10 py-8 text-right">
                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                        <button onClick={() => onAction('EDIT', p)} className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                                        <button onClick={() => onAction('DELETE', p.id)} className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// --- CONTENT EDITOR PRO ---
function ContentEditor({ post, onCancel, onSave }) {
    const [title, setTitle] = useState(post?.title || "");
    const [content, setContent] = useState(post?.content || "");
    const [category, setCategory] = useState(post?.category || "Yangiliklar");
    const [date, setDate] = useState(post?.date || new Date().toISOString().split('T')[0]);

    const execCmd = (cmd, val = null) => { document.execCommand(cmd, false, val); };

    return (
        <div className="max-w-6xl mx-auto pb-40 animate-fade-in h-[calc(100vh-14rem)] flex flex-col">
            <div className="flex justify-between items-center mb-10 shrink-0">
                <div className="flex items-center gap-6">
                    <button onClick={onCancel} className="w-14 h-14 bg-white border rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all shadow-sm"><span className="material-symbols-outlined">west</span></button>
                    <h3 className="text-3xl font-black">{post ? 'Editing Matrix' : 'New Publication'}</h3>
                </div>
                <div className="flex gap-4">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-white border px-6 rounded-2xl text-xs font-black uppercase tracking-widest outline-none">
                        <option>Yangiliklar</option><option>Faoliyat</option><option>Ma'naviyat</option><option>Qabul</option>
                    </select>
                    <button onClick={() => onSave({ id: post?.id, title, content, category, date, status: 'Published' })} className="px-10 py-4 bg-[#0F172A] text-white rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-xl shadow-indigo-900/10 hover:bg-indigo-600 transition-all">PUBLISH NOW</button>
                </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0 bg-white rounded-[50px] shadow-2xl border border-slate-100 overflow-hidden">
                <div className="p-8 border-b">
                    <input className="w-full text-3xl font-black outline-none placeholder:text-slate-200" placeholder="Publication Title..." value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="p-4 bg-slate-50/50 border-b flex flex-wrap gap-1">
                    <TBtn i="format_bold" c="bold" /><TBtn i="format_italic" c="italic" /><TBtn i="format_underlined" c="underline" />
                    <div className="w-[1px] h-8 bg-slate-200 mx-2"></div>
                    <TBtn i="format_align_left" c="justifyLeft" /><TBtn i="format_align_center" c="justifyCenter" /><TBtn i="format_align_right" c="justifyRight" />
                    <div className="w-[1px] h-8 bg-slate-200 mx-2"></div>
                    <TBtn i="link" a="createLink" /><TBtn i="image" a="insertImage" /><TBtn i="table_chart" /><TBtn i="format_list_bulleted" c="insertUnorderedList" />
                    <div className="ml-auto flex items-center gap-4 px-4">
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-transparent text-[11px] font-black uppercase outline-none text-slate-400" />
                    </div>
                </div>
                <div
                    contentEditable
                    className="flex-1 p-12 outline-none prose max-w-none text-lg text-slate-700 font-medium overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: content }}
                    onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                ></div>
            </div>
            <style>{` .prose h1 { font-weight: 900; } .prose img { border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); } `}</style>
        </div>
    );
}

function TBtn({ i, c, a }) {
    const exec = (cmd, act) => {
        if (act === 'createLink' || act === 'insertImage') {
            let val = prompt(act === 'createLink' ? 'URL:' : 'Image URL:');
            if (val) document.execCommand(act, false, val);
        } else {
            document.execCommand(cmd, false, null);
        }
    };
    return <button onClick={() => exec(c, a)} className="w-10 h-10 rounded-xl hover:bg-white flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all"><span className="material-symbols-outlined text-[20px]">{i}</span></button>;
}
