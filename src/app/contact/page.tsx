"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Globe, Sparkles, Building2 } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const formSchema = z.object({
    nama: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    pesan: z.string().min(10, "Pesan minimal 10 karakter"),
});

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama: "",
            email: "",
            pesan: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(values);
        setLoading(false);
        setSubmitted(true);
        toast.success("Pesan Anda telah dikirim ke tim dukungan medis kami.");
        form.reset();
    }

    return (
        <div className="container py-16 md:py-24 max-w-6xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl mx-auto mb-20"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black mb-6 border border-primary/20 uppercase tracking-[0.2em]">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>Contact Support</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
                    Pusat Bantuan & <span className="text-primary italic">Layanan Kolaborasi</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    Apakah Anda memiliki pertanyaan mengenai penggunaan portal deteksi dini atau ingin bermitra dengan riset kami? Kami siap merespons kebutuhan Anda secara profesional.
                </p>
                <div className="h-1.5 w-20 bg-primary mx-auto mt-10 rounded-full" />
            </motion.div>

            <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-start">
                {/* Contact Form Container - Solid Medical Card */}
                <div className="bg-white border-2 border-slate-100 p-8 md:p-12 rounded-xl shadow-xl shadow-slate-200/50 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-8">
                                    <CheckCircle className="h-10 w-10 text-primary" />
                                </div>
                                <h2 className="text-2xl font-black mb-4">Pesan Terkirim</h2>
                                <p className="text-slate-500 font-medium mb-10 max-w-xs">Terima kasih atas informasinya. Tim koordinasi kami akan segera menghubungi Anda kembali.</p>
                                <Button variant="outline" className="rounded-md font-bold" onClick={() => setSubmitted(false)}>Kirim Ulang Pesan</Button>
                            </motion.div>
                        ) : (
                            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-white">
                                        <Send className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Formulir Kontak</h2>
                                </div>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <FormField
                                                control={form.control}
                                                name="nama"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-bold text-slate-700">Nama Lengkap Pasca/Mitra</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Nama Anda" className="h-12 rounded-lg bg-slate-50 border-slate-200 font-semibold" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-bold text-slate-700">Alamat Email Aktif</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="email@contoh.id" className="h-12 rounded-lg bg-slate-50 border-slate-200 font-semibold" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="pesan"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-bold text-slate-700">Detail Pesan atau Kolaborasi</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Tuliskan pertanyaan medis atau proposal kemitraan Anda di sini secara detail..."
                                                            className="min-h-[200px] rounded-lg bg-slate-50 border-slate-200 font-medium p-4"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full h-14 rounded-md text-lg font-black shadow-md hover:translate-y-[-2px] transition-all" disabled={loading}>
                                            {loading ? "Sedang Mengirim..." : "Submit Pesan Sekarang"}
                                        </Button>
                                    </form>
                                </Form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Contact Information Sidebar - High Contrast */}
                <div className="space-y-12">
                    <div className="space-y-8">
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest border-l-4 border-primary pl-6">Informasi Kontak</h2>
                        <div className="space-y-6">
                            <ContactInfoItem
                                icon={Mail}
                                label="Support Email"
                                val="info@medcareinsight.id"
                            />
                            <ContactInfoItem
                                icon={Phone}
                                label="Hotline Layanan"
                                val="+62 (21) 1234-5678"
                            />
                            <ContactInfoItem
                                icon={MapPin}
                                label="Lokasi Utama"
                                val="Cyber Center Lt. 12, Jakarta"
                            />
                            <ContactInfoItem
                                icon={Clock}
                                label="Jam Operasional"
                                val="Senin - Jumat: 08:00 - 18:00"
                            />
                        </div>
                    </div>

                    <Card className="rounded-xl bg-slate-900 text-white p-10 relative overflow-hidden border-none shadow-xl">
                        <div className="absolute top-0 right-0 p-6 opacity-20">
                            <Globe className="h-10 w-10 text-primary" />
                        </div>
                        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                            Situs Riset GERD-SVC
                        </h4>
                        <div className="space-y-6">
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                Ingin mempelajari metodologi riset kami secara mendalam? Silakan kunjungi halaman dokumentasi project.
                            </p>
                            <Button variant="outline" className="w-full h-12 rounded-md font-bold text-white border-slate-700 hover:bg-slate-800" asChild>
                                <Link href="/project">Buka Dokumentasi Riset</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function ContactInfoItem({ icon: Icon, label, val }: { icon: any; label: string; val: string }) {
    return (
        <div className="flex gap-6 items-center group">
            <div className="h-12 w-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</div>
                <div className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{val}</div>
            </div>
        </div>
    );
}
