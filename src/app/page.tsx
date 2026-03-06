"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Activity, ShieldCheck, Zap, HeartPulse, Check, FileText, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-0 pb-0">
      {/* Hero Section - Refined Pro Clinic Style */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 bg-slate-50 border-b border-slate-100">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-primary text-xs font-bold mb-6 shadow-sm uppercase tracking-widest">
                <Activity className="h-3 w-3" />
                <span>Pusat Layanan Deteksi Dini Digital</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900">
                Deteksi Dini Penyakit <span className="text-primary italic">GERD</span>
              </h1>
              <div className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                <p className="font-bold mb-2 text-slate-900">Disusun Oleh :</p>
                <div className="space-y-1 font-semibold text-slate-600">
                  <p>Raihan Ariq Muzakki</p>
                  <p>Muhammad Hafiz Fassya</p>
                  <p>Awang Andriansyah Hermawan</p>
                  <p>Ryan Maulana</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" className="rounded-md h-12 px-8 text-base font-bold shadow-md" asChild>
                  <Link href="/deteksi/gerd">
                    Mulai Skrining <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-md h-12 px-8 text-base font-bold bg-white" asChild>
                  <Link href="/project">
                    Metodologi Riset
                  </Link>
                </Button>
              </div>

              <div className="mt-12 flex items-center gap-4 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Validasi Klinis</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Data Aman & Anonim</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-8 border-white shadow-2xl">
                <Image
                  src="/images/hero_illustration.png"
                  alt="Professional Medical Illustration"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Services - Clean Cards */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Layanan Unggulan</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">Solusi Skrining Kesehatan Pencernaan Berbasis Teknologi Modern</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Analisis AI SVC",
                desc: "Sistem klasifikasi cerdas untuk memetakan tingkat risiko GERD secara objektif.",
                icon: Activity,
                accent: "border-primary/20 bg-primary/5"
              },
              {
                title: "Edukasi Medis",
                desc: "Informasi komprehensif mengenai pola makan dan gaya hidup pencegah GERD.",
                icon: FileText,
                accent: "border-emerald-500/20 bg-emerald-500/5"
              },
              {
                title: "Rujukan Cerdas",
                desc: "Panduan konsultasi lanjut ke dokter spesialis berdasarkan hasil analisis.",
                icon: HeartPulse,
                accent: "border-red-500/20 bg-red-500/5"
              },
              {
                title: "Diagnosis Mandiri",
                desc: "Akses skrining kesehatan yang cepat dari perangkat seluler Anda kapan pun.",
                icon: Smartphone,
                accent: "border-amber-500/20 bg-amber-500/5"
              }
            ].map((feature, i) => (
              <div
                key={i}
                className={`p-8 rounded-xl border transition-all hover:shadow-lg hover:-translate-y-1 ${feature.accent}`}
              >
                <div className="h-12 w-12 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-slate-900" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section - Structured Process */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-bold text-primary-foreground/60 uppercase tracking-[0.2em] mb-6">Alur Kerja Sistem</h2>
              <h3 className="text-4xl md:text-5xl font-black mb-12 leading-tight">Proses Deteksi yang Akurat & Terukur</h3>

              <div className="space-y-0 relative">
                {/* Visual line */}
                <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-slate-800" />

                {[
                  { step: "01", title: "Pengisian Gejala", desc: "Anda melengkapi data gejala klinis, antropometri, dan pola hidup pada form digital." },
                  { step: "02", title: "Pemrosesan SVC", desc: "Sistem mengolah data menggunakan algoritma Machine Learning yang telah dilatih secara klinis." },
                  { step: "03", title: "Laporan Riset", desc: "Dashboard hasil prediksi menyajikan tingkat risiko beserta rekomendasi medis prioritas." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 pb-12 last:pb-0 relative group">
                    <div className="h-14 w-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center shrink-0 z-10 group-hover:border-primary transition-colors">
                      <span className="text-lg font-black">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-2xl mb-2 group-hover:text-primary transition-colors">{step.title}</h4>
                      <p className="text-slate-400 leading-relaxed text-lg font-medium">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square md:aspect-video lg:aspect-square bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 flex items-center justify-center p-12">
              <div className="relative w-full text-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <Activity className="h-64 w-64 text-white" />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="text-4xl font-extrabold text-primary">SVC ENGINE</div>
                  <div className="h-2 w-48 bg-slate-700 mx-auto rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      animate={{ width: ["0%", "100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                  <div className="font-mono text-xs text-slate-500">ANALYZING_DATA_PATTERNS... SUCCESS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Access - High Trust */}
      <section className="py-24 bg-slate-50">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Privasi & Standar Keamanan Medis</h2>
            <p className="text-slate-600 font-medium text-lg">Keamanan identitas digital pasien adalah prioritas utama kami.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-slate-200 rounded-xl">
              <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-500" /> Data Anonim
              </h4>
              <p className="text-slate-500 leading-relaxed font-medium">Prediksi diproses tanpa menyimpan identitas pribadi seperti KTP atau nomor telepon langsung secara eksplisit jika Anda memilih anonim.</p>
            </div>
            <div className="p-8 bg-white border border-slate-200 rounded-xl">
              <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-500" /> Standar Enkripsi
              </h4>
              <p className="text-slate-500 leading-relaxed font-medium">Setiap transmisi data gejala klinis dilakukan melalui jalur SSL/TLS terenkripsi guna menjamin kerahasiaan informasi medis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Professional Invitation */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container max-w-4xl">
          <h3 className="text-4xl md:text-5xl font-black mb-8">Lindungi Kesehatan Lambung Anda Mulai Hari Ini</h3>
          <p className="text-primary-foreground/80 text-xl font-medium mb-12">
            Skrining awal mandiri dapat membantu Anda mengambil langkah medis yang tepat waktu sebelum gejala memburuk. Gratis dan efisien.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="rounded-md h-14 px-10 text-lg font-bold hover:scale-105 transition-transform" asChild>
              <Link href="/deteksi/gerd">Mulai Deteksi Sekarang</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
