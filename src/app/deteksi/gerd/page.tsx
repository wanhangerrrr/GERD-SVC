"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { predictGERD } from "@/lib/predict";
import { GerdResponse, GerdPayload } from "@/types/gerd";
import { ResultCard } from "@/components/ResultCard";
import {
    Activity,
    Stethoscope,
    User2,
    Thermometer,
    Pizza,
    Info,
    CheckCircle2,
    ChevronRight,
    BrainCircuit,
    ShieldAlert,
    Clock,
    HeartPulse,
    FileText,
    Coffee,
    Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const formSchema = z.object({
    usia: z.coerce.number(),
    jenis_kelamin: z.enum(["Laki-laki", "Perempuan"]),
    bmi: z.coerce.number(),
    frekuensi_heartburn: z.coerce.number(),
    regurgitasi: z.boolean().default(false),
    nyeri_dada: z.boolean().default(false),
    mual: z.boolean().default(false),
    batuk_malam: z.boolean().default(false),
    sulit_menelan: z.boolean().default(false),
    perokok: z.boolean().default(false),
    konsumsi_kopi: z.coerce.number(),
    makan_malam_larut: z.boolean().default(false),
    stress_level: z.coerce.number(),
    nama: z.string().optional(),
    catatan_tambahan: z.string().optional(),
});

export default function GerdDetectionPage() {
    const [result, setResult] = useState<GerdResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("form");

    const form = useForm<any>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            usia: 25,
            jenis_kelamin: "Laki-laki",
            bmi: 22.5,
            frekuensi_heartburn: 0,
            regurgitasi: false,
            nyeri_dada: false,
            mual: false,
            batuk_malam: false,
            sulit_menelan: false,
            perokok: false,
            konsumsi_kopi: 0,
            makan_malam_larut: false,
            stress_level: 5,
            nama: "",
            catatan_tambahan: "",
        },
    });

    async function onSubmit(values: any) {
        setLoading(true);
        try {
            const data = await predictGERD(values as GerdPayload);
            setResult(data);
            setActiveTab("result");
            toast.success("Analisis selesai!");
        } catch (error) {
            toast.error("Gagal melakukan analisis.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container py-12 md:py-20 lg:py-24">
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <Stethoscope className="h-5 w-5" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                        Skrining Diagnostik GERD
                    </h1>
                </div>
                <p className="text-lg text-slate-600 font-medium max-w-3xl leading-relaxed">
                    Lengkapi parameter klinis di bawah ini untuk memulai analisis risiko Gastroesophageal Reflux Disease menggunakan algoritma SVC Engine v1.0.
                </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="mb-8 w-fit bg-slate-100 p-1 rounded-lg border">
                        <TabsTrigger value="form" className="rounded-md font-bold px-8 data-[state=active]:bg-white data-[state=active]:shadow-sm">Formulir Skrining</TabsTrigger>
                        <TabsTrigger value="result" className="rounded-md font-bold px-8 data-[state=active]:bg-white data-[state=active]:shadow-sm" disabled={!result}>Hasil Analisis</TabsTrigger>
                    </TabsList>

                    <TabsContent value="form">
                        <Card className="border shadow-md rounded-xl overflow-hidden bg-white">
                            <div className="bg-slate-900 text-white p-6 font-bold flex items-center gap-3 justify-between">
                                <span className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-primary" /> Data Pasien & Clinical Intake
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Session ID: 7721-AI</span>
                            </div>
                            <CardContent className="p-8 md:p-12">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                                        <section className="space-y-6">
                                            <div className="flex items-center gap-3 pb-2 border-b">
                                                <User2 className="h-5 w-5 text-primary" />
                                                <h3 className="text-xl font-bold text-slate-900">Biodata & Antropometri</h3>
                                            </div>
                                            <div className="grid md:grid-cols-3 gap-8">
                                                <FormField
                                                    control={form.control}
                                                    name="usia"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="font-bold text-slate-700 text-sm">Usia (Tahun)</FormLabel>
                                                            <FormControl>
                                                                <Input type="number" className="h-12 text-lg font-semibold bg-slate-50" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="jenis_kelamin"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="font-bold text-slate-700 text-sm">Jenis Kelamin</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className="h-12 font-semibold bg-slate-50">
                                                                        <SelectValue placeholder="Pilih" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                                                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="bmi"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="font-bold text-slate-700 text-sm">Body Mass Index (BMI)</FormLabel>
                                                            <FormControl>
                                                                <Input type="number" step="0.1" className="h-12 text-lg font-semibold bg-slate-50" {...field} />
                                                            </FormControl>
                                                            <FormDescription className="text-[10px] font-medium opacity-60">Exp: 22.5</FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </section>

                                        <section className="space-y-6">
                                            <div className="flex items-center gap-3 pb-2 border-b">
                                                <Thermometer className="h-5 w-5 text-primary" />
                                                <h3 className="text-xl font-bold text-slate-900">Indikator Gejala Klinis</h3>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <FormField
                                                    control={form.control}
                                                    name="frekuensi_heartburn"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="font-bold text-slate-700 text-sm">Frekuensi Heartburn (Hari/Minggu)</FormLabel>
                                                            <FormControl>
                                                                <Input type="number" min="0" max="7" className="h-12 text-lg font-semibold bg-slate-50" {...field} />
                                                            </FormControl>
                                                            <FormDescription className="text-xs font-medium">Panas terbakar di dada dlm 7 hari.</FormDescription>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="grid grid-cols-2 gap-3">
                                                    {[
                                                        { id: "regurgitasi", label: "Regurgitasi" },
                                                        { id: "nyeri_dada", label: "Nyeri Dada" },
                                                        { id: "mual", label: "Mual" },
                                                        { id: "batuk_malam", label: "Batuk Malam" },
                                                        { id: "sulit_menelan", label: "Disfagia" }
                                                    ].map((gejala) => (
                                                        <FormField
                                                            key={gejala.id}
                                                            control={form.control}
                                                            name={gejala.id as any}
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-row items-center space-x-2 space-y-0 rounded-md border p-3 bg-slate-50 hover:bg-white transition-colors">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={!!field.value}
                                                                            onCheckedChange={field.onChange}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-bold text-[12px] cursor-pointer">{gejala.label}</FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </section>

                                        <section className="space-y-6">
                                            <div className="flex items-center gap-3 pb-2 border-b">
                                                <Pizza className="h-5 w-5 text-primary" />
                                                <h3 className="text-xl font-bold text-slate-900">Profil Gaya Hidup & Psikologis</h3>
                                            </div>
                                            <div className="grid md:grid-cols-3 gap-8">
                                                <div className="space-y-4 md:col-span-2">
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="perokok"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-row items-center space-x-2 space-y-0 rounded-md border p-4 bg-slate-50">
                                                                    <FormControl>
                                                                        <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
                                                                    </FormControl>
                                                                    <FormLabel className="font-bold text-sm cursor-pointer">Aktif Merokok</FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="makan_malam_larut"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-row items-center space-x-2 space-y-0 rounded-md border p-4 bg-slate-50">
                                                                    <FormControl>
                                                                        <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
                                                                    </FormControl>
                                                                    <FormLabel className="font-bold text-sm cursor-pointer">Makan Malam Larut</FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                    <FormField
                                                        control={form.control}
                                                        name="konsumsi_kopi"
                                                        render={({ field }) => (
                                                            <FormItem className="p-4 border rounded-md bg-slate-50">
                                                                <FormLabel className="font-bold flex items-center gap-2 mb-2 text-sm">
                                                                    <Coffee className="h-4 w-4" /> Konsumsi Kopi (Gelas/Hari)
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input type="number" min="0" max="10" className="h-10 font-bold bg-white" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <FormField
                                                    control={form.control}
                                                    name="stress_level"
                                                    render={({ field }) => (
                                                        <FormItem className="p-5 border rounded-md bg-slate-50">
                                                            <FormLabel className="font-bold block mb-4 flex justify-between text-sm">
                                                                Tingkat Stres
                                                                <Zap className="h-4 w-4 text-amber-500" />
                                                            </FormLabel>
                                                            <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                                                                <FormControl>
                                                                    <SelectTrigger className="h-12 font-black text-lg bg-white">
                                                                        <SelectValue placeholder="Pilih" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => (
                                                                        <SelectItem key={v} value={String(v)} className="font-bold">
                                                                            Level {v} {v > 7 ? "(Tinggi)" : v > 4 ? "(Sedang)" : "(Rendah)"}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormDescription className="text-[10px] mt-4 font-bold opacity-50 uppercase tracking-widest text-center">Score 1-10</FormDescription>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </section>

                                        <Button type="submit" className="w-full h-16 rounded-md text-xl font-black shadow-xl hover:translate-y-[-2px] transition-all" disabled={loading}>
                                            {loading ? (
                                                <span className="flex items-center gap-2 animate-pulse uppercase tracking-[0.1em]">
                                                    <BrainCircuit className="h-6 w-6 animate-spin" /> Analisis SVC Active...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-3">
                                                    PROSES ANALISIS MEDIS <ChevronRight className="h-6 w-6" />
                                                </span>
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="result">
                        <AnimatePresence>
                            {result && (
                                <ResultCard result={result} formData={form.getValues()} />
                            )}
                        </AnimatePresence>
                    </TabsContent>
                </Tabs>

                <div className="space-y-8">
                    <Card className="border shadow-none rounded-xl bg-slate-50 p-6 border-slate-200">
                        <div className="flex items-center gap-2 text-primary mb-4">
                            <ShieldAlert className="h-5 w-5" />
                            <h4 className="font-extrabold text-sm uppercase tracking-wider">Clinical Intelligence</h4>
                        </div>
                        <p className="text-[11px] font-bold text-slate-500 leading-relaxed mb-6">
                            SVC Engine (Support Vector Classifier) mengevaluasi dataset gejala lambung untuk menemukan korelasi probabilitas risiko secara statistik.
                        </p>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="border-slate-200">
                                <AccordionTrigger className="text-xs font-bold hover:no-underline">Bagaimana AI Bekerja?</AccordionTrigger>
                                <AccordionContent className="text-[11px] font-medium text-slate-500 leading-relaxed">
                                    Model mencari "hyperplane" optimal yang memisahkan antara kondisi sehat dan risiko GERD berdasarkan titik data parameter pasien.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border-slate-200">
                                <AccordionTrigger className="text-xs font-bold hover:no-underline">Apakah Data Saya Aman?</AccordionTrigger>
                                <AccordionContent className="text-[11px] font-medium text-slate-500 leading-relaxed">
                                    Enkripsi SSL digunakan dalam pengiriman data. Kami berkomitmen menjaga kerahasiaan informasi medis Anda sesuai standar privasi digital.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </Card>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Pusat Bantuan Digital</h4>
                        <div className="grid gap-3">
                            <div className="flex items-center gap-3 p-4 bg-white border rounded-xl hover:border-primary transition-colors cursor-pointer group shadow-sm">
                                <Info className="h-5 w-5 text-primary" />
                                <div>
                                    <div className="text-xs font-bold group-hover:text-primary">Panduan Pengisian</div>
                                    <div className="text-[10px] text-slate-400 font-bold tracking-tight">Pelajari parameter klinis</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white border rounded-xl hover:border-primary transition-colors cursor-pointer group shadow-sm">
                                <Clock className="h-5 w-5 text-primary" />
                                <div>
                                    <div className="text-xs font-bold group-hover:text-primary">Bantuan Medis</div>
                                    <div className="text-[10px] text-slate-400 font-bold tracking-tight">Hubungi dokter spesialis</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-xl bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                        <Activity className="absolute -right-4 -bottom-4 h-24 w-24 opacity-10" />
                        <div className="relative z-10">
                            <div className="font-bold text-xl mb-3">Proteksi Lambung</div>
                            <p className="text-[11px] font-medium text-slate-400 mb-8 leading-relaxed">Gunakan portal ini secara berkala jika gejala Anda menetap atau memhuruk dalam 2 minggu ke depan.</p>
                            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest bg-primary/10 w-fit px-3 py-1.5 rounded-full">
                                <HeartPulse className="h-4 w-4" /> Live System Active
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
