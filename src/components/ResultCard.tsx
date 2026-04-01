"use client";

import { GerdResponse, GerdPayload } from "@/types/gerd";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
    Activity, 
    AlertTriangle, 
    CheckCircle2, 
    ChevronRight, 
    Share2, 
    Info, 
    ArrowUpRight, 
    ShieldAlert, 
    FileText, 
    Download, 
    Printer, 
    Stethoscope,
    HeartPulse,
    Clock,
    TrendingUp,
    ShieldCheck
} from "lucide-react";
import { 
    RadarChart, 
    PolarGrid, 
    PolarAngleAxis, 
    Radar, 
    ResponsiveContainer, 
    Tooltip,
    PolarRadiusAxis 
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ResultCardProps {
    result: GerdResponse;
    formData: GerdPayload;
}

export function ResultCard({ result, formData }: ResultCardProps) {
    const { label, probability, top_factors } = result;
    const isHighRisk = label === "Risiko Tinggi";
    const isMediumRisk = label === "Risiko Sedang";
    const percentage = Math.round(probability * 100);

    const calculateGroupScore = (start: number, end: number) => {
        const group = formData.features.slice(start, end + 1);
        const sum = group.reduce((acc, val) => acc + val, 0);
        return (sum / (group.length * 5)) * 100; // Normalize to 0-100 scale
    };

    const chartData = [
        { name: "Gejala Utama", score: calculateGroupScore(0, 15) },
        { name: "Pola Makan", score: calculateGroupScore(16, 31) },
        { name: "Gaya Hidup", score: calculateGroupScore(32, 47) },
        { name: "Psikologis", score: calculateGroupScore(48, 63) },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
        >
            {/* Main Result Card */}
            <Card className="border-none shadow-[0_32px_64px_-16px_rgba(15,23,42,0.1)] rounded-[2.5rem] overflow-hidden bg-white">
                <div className="bg-slate-900 p-8 md:p-12 text-white relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <Activity className="h-96 w-96 absolute -top-24 -right-24 rotate-12" />
                        <Stethoscope className="h-96 w-96 absolute -bottom-24 -left-24 -rotate-12" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.25em] border border-white/10 backdrop-blur-md">
                                    <ShieldCheck className="h-4 w-4" /> Laporan Analisis Klinis v1.0
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none">Diagnostic Result</h2>
                            </div>
                            <div className="flex items-center gap-3 print:hidden">
                                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all shadow-sm" onClick={() => window.print()}>
                                    <Printer className="h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all shadow-sm" onClick={() => window.print()}>
                                    <Download className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">
                            <div className="space-y-8">
                                <div className={`inline-flex items-center gap-6 px-8 py-6 rounded-[2rem] border shadow-xl transition-all duration-500 ${
                                    isHighRisk 
                                    ? "bg-red-500/10 border-red-500/20 text-red-100" 
                                    : isMediumRisk
                                    ? "bg-amber-500/10 border-amber-500/20 text-amber-100"
                                    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-100"
                                }`}>
                                    <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xl shrink-0 border border-white/10">
                                        {isHighRisk ? <ShieldAlert className="h-8 w-8 text-red-400" /> : <CheckCircle2 className="h-8 w-8 text-emerald-400" />}
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40">Status Analisis AI</div>
                                        <div className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none">{label}</div>
                                    </div>
                                </div>
                                <p className="text-base text-slate-400 font-bold max-w-md leading-relaxed">
                                    Setelah memproses <span className="text-white">64 parameter klinis</span> secara menyeluruh, sistem mendeteksi pola gejala yang merujuk pada indikasi di atas.
                                </p>
                            </div>

                            {/* Circular Score */}
                            <div className="relative h-64 w-64 shrink-0 group flex items-center justify-center">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <svg className="h-full w-full transform -rotate-90 relative z-10" viewBox="0 0 256 256">
                                    <circle
                                        cx="128" cy="128" r="100"
                                        className="stroke-white/5 fill-none"
                                        strokeWidth="12"
                                    />
                                     <motion.circle
                                        cx="128" cy="128" r="100"
                                        className={`fill-none ${isHighRisk ? 'stroke-red-500' : 'stroke-primary'}`}
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                        initial={{ strokeDasharray: "0 628" }}
                                        animate={{ strokeDasharray: `${percentage * 6.28} 628` }}
                                        transition={{ duration: 2, ease: "circOut" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        className="text-6xl font-black tracking-tighter"
                                    >
                                        {percentage}<span className="text-2xl opacity-40 ml-1">%</span>
                                    </motion.div>
                                    <div className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em] mt-2">CONFIDENCE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <CardContent className="p-10 md:p-16">
                    <div className="grid lg:grid-cols-2 gap-20">
                        {/* Data Visualization */}
                        <div className="space-y-12">
                            <div>
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Peta Spektrum Gejala</h3>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                                        <div className="h-2 w-2 rounded-full bg-primary"></div> Indeks Risiko
                                    </div>
                                </div>
                                <div className="h-[400px] w-full bg-slate-50/50 rounded-[3rem] border border-slate-100 p-8 shadow-inner">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                            <PolarGrid stroke="#e2e8f0" />
                                            <PolarAngleAxis 
                                                dataKey="name" 
                                                tick={{ fill: "#64748b", fontSize: 11, fontWeight: 800, letterSpacing: '0.05em' }}
                                            />
                                            <Radar
                                                name="Score"
                                                dataKey="score"
                                                stroke={isHighRisk ? "#ef4444" : "#10b981"}
                                                fill={isHighRisk ? "#ef4444" : "#10b981"}
                                                fillOpacity={0.15}
                                                strokeWidth={4}
                                            />
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', fontWeight: 'black', background: '#0f172a', color: '#fff' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {chartData.map((c, i) => (
                                    <div key={i} className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{c.name}</div>
                                        <div className="flex items-end justify-between gap-4">
                                            <div className="text-3xl font-black text-slate-900">{Math.round(c.score)}</div>
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                                                <div className={`h-full ${isHighRisk ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${c.score}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Practical Recommendations */}
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Tindakan Medis Prioritas</h3>
                                <div className="space-y-8">
                                    {[
                                        {
                                            title: "Konsultasi Gastroenterologi",
                                            desc: isHighRisk 
                                                ? "Sistem merekomendasikan rujukan segera ke Dokter Spesialis untuk evaluasi laringoskopi atau endoskopi." 
                                                : "Lakukan pemeriksaan berkala jika gejala dirasa mengganggu aktivitas harian.",
                                            icon: Stethoscope,
                                            level: isHighRisk ? "Mendesak" : "Pilihan"
                                        },
                                        {
                                            title: "Manajemen Diet & Lambung",
                                            desc: "Terapkan pola makan 'Low-Acid'. Hindari makanan berlemak, pedas, dan minuman berkarbonasi tinggi.",
                                            icon: HeartPulse,
                                            level: "Penting"
                                        },
                                        {
                                            title: "Aktivitas Fisik & Istirahat",
                                            desc: "Posisikan kepala lebih tinggi saat tidur (30 derajat) dan kelola tingkat stress harian Anda.",
                                            icon: Activity,
                                            level: "Sangat Disarankan"
                                        }
                                    ].map((rec, i) => (
                                        <div key={i} className="flex gap-8 group">
                                            <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                                                <rec.icon className="h-7 w-7" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">{rec.title}</h4>
                                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                                                        rec.level === 'Mendesak' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-400'
                                                    }`}>
                                                        {rec.level}
                                                    </span>
                                                </div>
                                                <p className="text-[14px] font-semibold text-slate-500 leading-relaxed italic">
                                                    "{rec.desc}"
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                             <Card className="border-none bg-slate-900 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl print:hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <TrendingUp className="h-24 w-24" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 text-primary mb-6">
                                        <Info className="h-6 w-6" />
                                        <h4 className="font-black text-sm uppercase tracking-[0.2em]">Clinical Compliance Note</h4>
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 leading-relaxed mb-8">
                                        Hasil ini merupakan output algoritma deteksi pola statistik. Gunakan sebagai alat bantu skrining, bukan pengganti diagnosis klinis oleh dokter manusia. Segera cari pertolongan medis jika Anda mengalami nyeri dada hebat atau kesulitan menelan.
                                    </p>
                                    <div className="flex gap-4">
                                        <Button 
                                            className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 font-black shadow-xl transition-all hover:-translate-y-1"
                                            onClick={() => window.print()}
                                        >
                                            <Download className="mr-2 h-5 w-5" /> Simpan PDF
                                        </Button>
                                        <Button variant="outline" className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-2xl h-14 font-black transition-all hover:-translate-y-1">
                                            <Share2 className="mr-2 h-5 w-5" /> Bagikan
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-start gap-6 p-10 bg-slate-100/50 border border-slate-200 rounded-[2rem] text-xs font-bold text-slate-500 leading-relaxed print:bg-white print:border-slate-100 mb-20">
                <ShieldCheck className="h-10 w-10 shrink-0 text-slate-300" />
                <div className="space-y-3">
                    <p className="text-slate-900 uppercase tracking-[0.3em] font-black">Digital Medical Trust & Privacy Guarantee:</p>
                    <p className="text-base text-slate-400 font-semibold leading-relaxed">
                        Parameter klinis di atas diproses secara anonim dan tidak disimpan sebagai data identitas pasien. Kami berkomitmen pada transparansi algoritma kami sebagai wujud kontribusi pada riset kesehatan digital berbasis teknologi Machine Learning.
                    </p>
                </div>
            </div>
            
            <style jsx global>{`
                @media print {
                    header, nav, footer, .print-hidden, .tabs-list, button {
                        display: none !important;
                    }
                    body {
                        background: white !important;
                        padding: 0 !important;
                        color: black !important;
                    }
                    .container {
                        max-width: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    .Card, .ResultCard {
                        border: none !important;
                        box-shadow: none !important;
                        background: white !important;
                        color: black !important;
                    }
                    .bg-slate-900 {
                        background: #0f172a !important;
                        -webkit-print-color-adjust: exact;
                    }
                    .text-white {
                        color: white !important;
                    }
                }
            `}</style>
        </motion.div>
    );
}
