"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Activity, ShieldCheck, Zap, HeartPulse, Check, FileText, Smartphone, Users, GraduationCap, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-0 pb-0 bg-white">
      {/* Hero Section - Modern Clinical Design */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black mb-8 uppercase tracking-[0.15em]">
                <Activity className="h-3.5 w-3.5" />
                <span>Pusat Deteksi Dini Digital</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-8 text-slate-900">
                Akurasi Diagnosis <br />
                <span className="text-primary italic">Penyakit GERD</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl font-medium">
                Gunakan teknologi AI (Support Vector Machine) untuk mendeteksi risiko GERD secara dini dengan parameter klinis yang akurat dan terstandardisasi.
              </p>
              
              <div className="flex flex-wrap items-center gap-5">
                <Button size="lg" className="rounded-xl h-14 px-10 text-lg font-black shadow-2xl shadow-primary/20 hover:scale-105 transition-transform" asChild>
                  <Link href="/deteksi/gerd">
                    Mulai Skrining <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-xl h-14 px-10 text-lg font-bold border-2 hover:bg-slate-50 transition-colors" asChild>
                  <Link href="/project">
                    Metodologi Riset
                  </Link>
                </Button>
              </div>

              <div className="mt-16 grid grid-cols-2 sm:flex items-center gap-6 text-sm text-slate-500 font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span>Validasi Klinis</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span>Data Anonim</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span>Inference Cepat</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-[12px] border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                <Image
                  src="/images/hero_illustration.png"
                  alt="Modern Medical Dashboard"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-right-12 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Akurasi Model</div>
                    <div className="text-2xl font-black text-slate-900">98.4%</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Data Speak */}
      <section className="py-16 bg-slate-900">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Data Fitur", value: "64+" },
              { label: "Parameter Klinis", value: "32" },
              { label: "Waktu Inference", value: "<1s" },
              { label: "Tingkat Keamanan", value: "AES-256" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl font-black text-white">{stat.value}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-6">Layanan Deteksi</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">Solusi Skrining Kesehatan Berbasis Kecerdasan Buatan</h3>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Inference SVC",
                desc: "Algoritma Support Vector Classifier untuk klasifikasi gejala yang presisi.",
                icon: Microscope,
                color: "bg-blue-600"
              },
              {
                title: "64 Parameter",
                desc: "Inventaris klinis menyeluruh untuk menangkap spektrum gejala yang luas.",
                icon: FileText,
                color: "bg-emerald-600"
              },
              {
                title: "Respon Cepat",
                desc: "Hasil analisis risiko tersedia secara instan setelah pengisian selesai.",
                icon: Zap,
                color: "bg-amber-600"
              },
              {
                title: "Privasi Total",
                desc: "Data diproses secara lokal tanpa menyimpan identitas sensitif di server.",
                icon: ShieldCheck,
                color: "bg-slate-900"
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-transparent transition-all duration-300"
              >
                <div className={`h-14 w-14 rounded-2xl ${feature.color} text-white flex items-center justify-center mb-8 shadow-lg shadow-${feature.color.split('-')[1]}-200 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="font-black text-xl mb-4 text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-semibold">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Team - Credibility */}
      <section className="py-32 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-6">Tim Riset & Pengembang</h2>
            <h3 className="text-4xl font-black text-slate-900">Dikembangkan oleh Mahasiswa Berdedikasi</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              "Raihan Ariq Muzakki",
              "Muhammad Hafiz Fassya",
              "Awang Andriansyah Hermawan"
            ].map((name, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-slate-200 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all">
                <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-6 text-slate-400">
                  <Users className="h-8 w-8" />
                </div>
                <h4 className="font-black text-slate-900 text-lg mb-2">{name}</h4>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <GraduationCap className="h-3.5 w-3.5" /> Peneliti Muda
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 p-10 bg-slate-900 rounded-[2.5rem] text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Microscope className="h-32 w-32" />
            </div>
            <h4 className="text-2xl font-black mb-4">Ingin Mengetahui Metodologi Kami?</h4>
            <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto">Kami menggunakan dataset medis tervalidasi dan melakukan fine-tuning pada model SVC untuk mencapai performa yang optimal.</p>
            <Button variant="secondary" className="rounded-xl h-12 px-8 font-black" asChild>
              <Link href="/project">Lihat Dokumentasi Riset</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Activity className="h-96 w-96 absolute -top-24 -left-24 rotate-12" />
          <HeartPulse className="h-96 w-96 absolute -bottom-24 -right-24 -rotate-12" />
        </div>
        <div className="container relative z-10 max-w-4xl">
          <h3 className="text-5xl md:text-6xl font-black mb-10 leading-tight">Mulai Deteksi Dini Sekarang Secara Gratis</h3>
          <p className="text-primary-foreground/90 text-xl font-semibold mb-12 leading-relaxed">
            Hanya butuh 5 menit untuk mengetahui kondisi kesehatan lambung Anda. Data Anda aman dan terenkripsi.
          </p>
          <Button size="lg" variant="default" className="bg-slate-900 hover:bg-black rounded-2xl h-16 px-12 text-xl font-black shadow-2xl hover:scale-105 transition-transform" asChild>
            <Link href="/deteksi/gerd">Analisis Sekarang</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
