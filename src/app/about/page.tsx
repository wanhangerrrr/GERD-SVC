"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Shield, Target, Lightbulb, Users, Globe, Award, CheckCircle2, Activity, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
    const team = [
        { name: "Yosep Mulia", role: "Project Lead", icon: User, bio: "Digital health strategist & architecture lead." },
        { name: "Alex Johnson", role: "ML Engineer", icon: Target, bio: "Expert in diagnostic classification models." },
        { name: "Sarah Doe", role: "UX Designer", icon: Lightbulb, bio: "Medical interface & accessibility professional." },
        { name: "Michael Chen", role: "Data Analyst", icon: Shield, bio: "Specialized in clinical data security standards." },
    ];

    return (
        <div className="container py-16 md:py-24 max-w-6xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-4xl mx-auto mb-20"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-black mb-6 border border-primary/20 uppercase tracking-[0.2em]">
                    <Users className="h-3.5 w-3.5" />
                    <span>Meet Our Team</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-8 leading-tight">
                    Menggabungkan <span className="text-primary italic">AI Precision</span> dengan Layanan Medis
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    Kami berdedikasi untuk menciptakan portal skrining mandiri yang cerdas guna membantu mendeteksi risiko GERD lebih dini melalui pemrosesan data klinis yang transparan dan akurat.
                </p>
                <div className="h-1.5 w-24 bg-primary mx-auto mt-12 rounded-full" />
            </motion.div>

            <div className="space-y-24">
                {/* Vision & Mission - Solid Pro Style */}
                <section>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="p-12 bg-primary rounded-2xl text-white shadow-xl">
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] mb-6 opacity-70">Vision Statement</h2>
                            <p className="text-2xl leading-snug font-bold italic mb-8">
                                "Menyediakan layanan skrining kesehatan berbasis data yang terjangkau, aman, dan divalidasi secara ilmiah bagi masyarakat luas."
                            </p>
                            <div className="flex items-center gap-3 text-sm font-black text-primary-foreground/60 uppercase tracking-widest">
                                <Globe className="h-5 w-5" /> Global Standards
                            </div>
                        </div>
                        <div className="space-y-8 p-10 bg-slate-50 border rounded-2xl">
                            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <Award className="h-6 w-6 text-primary" /> Misi Kami
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex gap-4 items-start group">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                    </div>
                                    <p className="text-slate-700 font-bold leading-relaxed">Mengembangkan algoritma diagnostik dengan validasi klinis.</p>
                                </li>
                                <li className="flex gap-4 items-start group">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                    </div>
                                    <p className="text-slate-700 font-bold leading-relaxed">Memberikan edukasi kesehatan yang berbasis riset medis terbaru.</p>
                                </li>
                                <li className="flex gap-4 items-start group">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                    </div>
                                    <p className="text-slate-700 font-bold leading-relaxed">Menjaga standar privasi data tertinggi untuk kenyamanan pasien.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Team Grid - Clean Profiles */}
                <section>
                    <div className="mb-12">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Tim Pengembang</h2>
                        <p className="text-slate-500 font-medium">Kombinasi talenta di bidang kesehatan, teknologi, dan analisis data.</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <Card key={i} className="text-center p-8 rounded-xl border-none bg-white shadow-sm hover:shadow-md transition-all border border-slate-100">
                                <CardContent className="p-0 space-y-4">
                                    <div className="mx-auto h-20 w-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 transition-transform hover:scale-105">
                                        <member.icon className="h-10 w-10 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg text-slate-900">{member.name}</div>
                                        <Badge variant="secondary" className="mt-2 font-bold bg-primary/5 text-primary border-none">{member.role}</Badge>
                                        <p className="text-[11px] text-slate-500 font-bold mt-4 leading-relaxed uppercase tracking-widest">{member.bio}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Tech & Trust - Solid Footer Style */}
                <section className="p-10 md:p-16 border rounded-2xl bg-white shadow-sm flex flex-col md:flex-row gap-12 items-center">
                    <div className="space-y-6 flex-1">
                        <h2 className="text-2xl font-black text-slate-900">Teknologi yang Kami Gunakan</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Kami membangun platform ini menggunakan ekosistem pengembangan modern yang teruji secara performa dan skalabilitas.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {["Next.js 14", "TypeScript", "TailwindCSS", "Framer Motion", "Recharts", "Scikit-Learn", "SVC Engine"].map((tech) => (
                                <Badge key={tech} className="rounded-full px-5 py-2 text-xs font-black bg-slate-100 border-none text-slate-900">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="h-40 w-40 bg-slate-900 rounded-3xl flex items-center justify-center p-8 relative overflow-hidden shrink-0">
                        <Activity className="h-full w-full text-primary animate-pulse" />
                    </div>
                </section>
            </div>
        </div>
    );
}
