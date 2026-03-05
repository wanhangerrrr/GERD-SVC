"use client";

import { GerdResponse, GerdPayload } from "@/types/gerd";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, AlertTriangle, CheckCircle2, ChevronRight, Share2, Info, ArrowUpRight, ShieldAlert, FileText, Download, Printer, Stethoscope } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";
import Link from "next/link";

interface ResultCardProps {
    result: GerdResponse;
    formData: GerdPayload;
}

export function ResultCard({ result, formData }: ResultCardProps) {
    const { label, probability, top_factors } = result;
    const percentage = Math.round(probability * 100);

    const chartData = [
        { name: "Heartburn", score: formData.frekuensi_heartburn * 1.4 },
        { name: "BMI Context", score: Math.min(Math.max((formData.bmi - 18) / 2, 0), 10) },
        { name: "Habits", score: (formData.perokok ? 5 : 0) + (formData.makan_malam_larut ? 5 : 0) },
        { name: "Stress", score: formData.stress_level },
        { name: "Symptoms", score: (formData.regurgitasi ? 3 : 0) + (formData.nyeri_dada ? 4 : 0) + (formData.mual ? 3 : 0) },
    ];

    const getStatusTheme = () => {
        if (label === "Risiko Tinggi") return {
            color: "text-red-600",
            bg: "bg-red-50",
            border: "border-red-200",
            accent: "bg-red-600",
            icon: <ShieldAlert className="h-12 w-12 text-red-600" />
        };
        if (label === "Risiko Sedang") return {
            color: "text-amber-600",
            bg: "bg-amber-50",
            border: "border-amber-200",
            accent: "bg-amber-500",
            icon: <AlertTriangle className="h-12 w-12 text-amber-600" />
        };
        return {
            color: "text-green-600",
            bg: "bg-green-50",
            border: "border-green-200",
            accent: "bg-green-600",
            icon: <CheckCircle2 className="h-12 w-12 text-green-600" />
        };
    };

    const theme = getStatusTheme();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <Card className="rounded-xl border-2 shadow-xl overflow-hidden bg-white border-slate-100">
                <div className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="font-bold text-sm tracking-widest uppercase">Clinical Analysis Report</span>
                    </div>
                    <span className="text-[10px] font-black opacity-60">REF: SVC-9902-ID</span>
                </div>

                <CardHeader className="text-center pt-16 pb-12 border-b bg-slate-50/50">
                    <div className="flex justify-center mb-6">
                        <div className={`p-4 rounded-full ${theme.bg} border-4 border-white shadow-md`}>
                            {theme.icon}
                        </div>
                    </div>
                    <CardTitle className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">
                        {label}
                    </CardTitle>
                    <CardDescription className="text-xl font-bold text-slate-500">
                        Probabilitas Terdeteksi: <span className={theme.color}>{percentage}%</span>
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-8 md:p-12 space-y-16">
                    {/* Metrics Section */}
                    <div className="grid lg:grid-cols-[1fr_400px] gap-16">
                        <div className="space-y-10">
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                    <Activity className="h-4 w-4" /> Risk Score Visualization
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-bold text-slate-700">Analisis Beban Gejala</span>
                                        <span className={`text-2xl font-black ${theme.color}`}>{percentage}%</span>
                                    </div>
                                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className={`h-full rounded-full ${theme.accent}`}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase pt-1">
                                        <span>Minimal</span>
                                        <span>Critical</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-xl border bg-slate-50 space-y-6">
                                <h4 className="font-bold text-slate-900 border-b pb-4">Faktor Kontribusi Dominan:</h4>
                                <div className="grid gap-4">
                                    {top_factors.map((factor, i) => (
                                        <div key={i} className="flex gap-4 items-center">
                                            <div className={`h-2.5 w-2.5 rounded-full ${theme.accent} shrink-0`} />
                                            <span className="text-sm font-bold text-slate-700">{factor}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                <Activity className="h-4 w-4" /> Clinical Factor Breakdown
                            </h4>
                            <div className="h-[280px] w-full border rounded-xl p-6 bg-white shadow-sm">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                                        <XAxis
                                            dataKey="name"
                                            fontSize={10}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontWeight: 800, fill: '#64748b' }}
                                        />
                                        <YAxis hide />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                            contentStyle={{
                                                borderRadius: '8px',
                                                border: '1px solid #e2e8f0',
                                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                                fontSize: '11px',
                                                fontWeight: 'bold'
                                            }}
                                        />
                                        <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={32}>
                                            {chartData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.score > 7 ? '#dc2626' : entry.score > 4 ? '#f59e0b' : '#1e40af'}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Recommendation Section */}
                    <div className={`p-10 rounded-xl ${theme.bg} border-2 ${theme.border} relative overflow-hidden`}>
                        <div className="relative z-10">
                            <h4 className="font-black text-2xl text-slate-900 mb-6 flex items-center gap-3">
                                <Stethoscope className="h-7 w-7 text-primary" /> Rekomendasi Medis Prioritas
                            </h4>
                            <div className="text-lg leading-relaxed font-semibold text-slate-700 space-y-4">
                                {label === "Risiko Tinggi" ? (
                                    <>
                                        <p>Tindakan medis segera diperlukan. Kondisi Anda menunjukkan probabilitas <span className="text-red-600 font-black">GERD Akut</span> yang tinggi.</p>
                                        <ul className="list-disc pl-6 space-y-2 text-base">
                                            <li>Segera hubungi Dokter Spesialis Penyakit Dalam (Gastroenterologi).</li>
                                            <li>Pertimbangkan pemeriksaan penunjang (Endoskopi/Uji pH Esophageal).</li>
                                            <li>Hindari konsumsi makanan pemicu (Pedas, Asam, Berlemak) secara total untuk sementara.</li>
                                        </ul>
                                    </>
                                ) : label === "Risiko Sedang" ? (
                                    <>
                                        <p>Disarankan untuk melakukan <span className="text-amber-600 font-black">Konsultasi Medis</span> guna mencegah esofagitis (peradangan kerongkongan).</p>
                                        <ul className="list-disc pl-6 space-y-2 text-base">
                                            <li>Lakukan modifikasi pola makan: porsi kecil namun sering.</li>
                                            <li>Hindari berbaring minimal 3 jam setelah makan.</li>
                                            <li>Kelola tingkat stres yang terukur.</li>
                                        </ul>
                                    </>
                                ) : (
                                    <p>Kondisi Anda saat ini <span className="text-green-600 font-black">Terpantau Stabil</span>. Tetap pertahankan pola hidup sehat dan lakukan pemantauan mandiri secara berkala di platform ini jika gejala muncul kembali.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col md:flex-row gap-4 p-12 bg-slate-900 border-t">
                    <Button className="flex-1 h-14 rounded-md text-lg font-black gap-2 shadow-lg" asChild>
                        <Link href="/contact">
                            Request Medical Consultation <ArrowUpRight className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-14 w-14 rounded-md bg-white hover:bg-slate-50" title="Download PDF">
                            <Download className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-14 w-14 rounded-md bg-white hover:bg-slate-50" title="Print Report">
                            <Printer className="h-5 w-5" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <div className="flex items-start gap-4 p-8 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 leading-relaxed">
                <Info className="h-6 w-6 shrink-0 text-primary mt-0.5" />
                <div className="space-y-2">
                    <p className="text-slate-900 uppercase tracking-widest font-black">Clinical Disclaimer & Legal Note:</p>
                    <p>
                        Laporan ini dihasilkan oleh Sistem Kecerdasan Buatan (SVC) berbasis parameter input mandiri. Hasil ini bersifat <span className="text-red-600 font-black underline">Skrining Awal (Screening)</span> dan <span className="text-slate-900">BUKAN merupakan Diagnosis Medis Final</span>. Hanya tenaga medis profesional tersertifikasi yang berwenang memberikan diagnosis dan rencana perawatan resmi. Data Anda telah dienkripsi untuk keamanan informasi kesehatan.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
