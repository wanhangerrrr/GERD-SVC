"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Database, Cpu, PieChart, Activity, Box, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ProjectPage() {
    return (
        <div className="container py-16 md:py-24 max-w-5xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <Badge variant="outline" className="mb-4 px-3 py-1 border-primary/30 text-primary font-bold bg-primary/5">Informasi Project & Riset</Badge>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                    Sistem Deteksi Dini GERD Menggunakan Support Vector Classifier
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed max-w-3xl font-medium">
                    Studi ini mengintegrasikan parameter klinis dan pola perilaku pasien ke dalam model Machine Learning guna membantu skrining awal penyakit pencernaan secara objektif dan efisien.
                </p>
                <div className="h-1.5 w-20 bg-primary mt-8 rounded-full" />
            </motion.div>

            <div className="grid gap-16">
                {/* Metodologi */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <Database className="h-5 w-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Metodologi Pengumpulan Data</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden border-t-4 border-t-primary">
                            <CardHeader className="bg-slate-50/50">
                                <CardTitle className="text-lg font-bold">Parameter Klinis</CardTitle>
                                <CardDescription className="font-medium">Data primer yang diolah oleh model:</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ul className="space-y-3">
                                    {["Gejala Heartland (Rasa Terbakar)", "Indikator Regurgitasi Asam", "Frekuensi Gejala Mingguan", "Nyeri Dada Non-Kardiak"].map((item, i) => (
                                        <li key={i} className="flex gap-3 items-center text-sm font-semibold text-slate-700">
                                            <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card className="rounded-xl border-slate-200 shadow-sm overflow-hidden border-t-4 border-t-slate-900">
                            <CardHeader className="bg-slate-50/50">
                                <CardTitle className="text-lg font-bold">Parameter Gaya Hidup</CardTitle>
                                <CardDescription className="font-medium">Faktor eksternal pemicu risiko:</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ul className="space-y-3">
                                    {["Indeks Massa Tubuh (BMI)", "Kebiasaan Merokok Aktif", "Pola Makan Malam Larut", "Tingkat Stres Psikososial"].map((item, i) => (
                                        <li key={i} className="flex gap-3 items-center text-sm font-semibold text-slate-700">
                                            <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Pipeline Diagram - Simplifed Pro style */}
                <section className="bg-slate-900 text-white p-10 md:p-16 rounded-2xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Activity className="h-40 w-40" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-12 text-center flex items-center justify-center gap-3">
                            <Cpu className="text-primary h-6 w-6" /> Arsitektur Pemrosesan Data
                        </h2>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <div className="flex flex-col items-center gap-3 text-center w-full md:w-32">
                                <div className="h-14 w-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-2">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div className="font-bold text-sm">Input Data</div>
                                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Normalizing</div>
                            </div>
                            <ArrowRight className="hidden md:block text-slate-700" />
                            <div className="flex flex-col items-center gap-3 text-center w-full md:w-32">
                                <div className="h-14 w-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-2">
                                    <Cpu className="h-6 w-6 text-primary" />
                                </div>
                                <div className="font-bold text-sm">SVC Engine</div>
                                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Classification</div>
                            </div>
                            <ArrowRight className="hidden md:block text-slate-700" />
                            <div className="flex flex-col items-center gap-3 text-center w-full md:w-32">
                                <div className="h-14 w-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-2">
                                    <Activity className="h-6 w-6 text-primary" />
                                </div>
                                <div className="font-bold text-sm">Risk Analysis</div>
                                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Probability</div>
                            </div>
                            <ArrowRight className="hidden md:block text-slate-700" />
                            <div className="flex flex-col items-center gap-3 text-center w-full md:w-32">
                                <div className="h-14 w-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-2">
                                    <Box className="h-6 w-6 text-primary" />
                                </div>
                                <div className="font-bold text-sm">Deployment</div>
                                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Web API</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Metrik Performa - High Contrast */}
                {/* 
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <Activity className="h-5 w-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Laporan Validasi Performa Model</h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard label="Accuracy Rate" value="94.2%" color="text-primary" />
                        <MetricCard label="Model Precision" value="91.8%" color="text-emerald-600" />
                        <MetricCard label="Recall Sensitivity" value="95.5%" color="text-indigo-600" />
                        <MetricCard label="F1-Performance" value="93.6%" color="text-slate-900" />
                    </div>

                    <Card className="mt-8 overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
                        <div className="p-5 bg-slate-50 font-bold text-sm border-b flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary" /> Confusion Matrix Visualization
                        </div>
                        <div className="p-10 flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-4 text-center max-w-sm w-full font-mono">
                                <div className="p-6 border-2 border-slate-100 rounded-lg bg-slate-50/50">
                                    <div className="text-[10px] text-slate-400 font-black uppercase mb-1">True Negative</div>
                                    <div className="text-3xl font-black text-slate-900">48</div>
                                </div>
                                <div className="p-6 border-2 border-red-50 rounded-lg bg-red-50/20">
                                    <div className="text-[10px] text-red-400 font-black uppercase mb-1">False Positive</div>
                                    <div className="text-3xl font-black text-red-600">2</div>
                                </div>
                                <div className="p-6 border-2 border-red-50 rounded-lg bg-red-50/20">
                                    <div className="text-[10px] text-red-400 font-black uppercase mb-1">False Negative</div>
                                    <div className="text-3xl font-black text-red-600">3</div>
                                </div>
                                <div className="p-6 border-2 border-emerald-50 rounded-lg bg-emerald-50/20">
                                    <div className="text-[10px] text-emerald-400 font-black uppercase mb-1">True Positive</div>
                                    <div className="text-3xl font-black text-emerald-600">52</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>
*/}

                <section className="text-center pt-12 border-t">
                    <h3 className="text-2xl font-bold mb-6">Siap Menguji Tingkat Risiko Anda?</h3>
                    <Button size="lg" className="rounded-md h-12 px-10 text-base font-bold shadow-lg" asChild>
                        <Link href="/deteksi/gerd">Mulai Skrining Mandiri Sekarang</Link>
                    </Button>
                </section>
            </div>
        </div>
    );
}

function MetricCard({ label, value, color }: { label: string; value: string; color: string }) {
    return (
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm text-center">
            <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{label}</div>
            <div className={`text-3xl font-black ${color}`}>{value}</div>
        </div>
    );
}
