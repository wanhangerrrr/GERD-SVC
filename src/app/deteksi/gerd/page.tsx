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
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { predictGERD } from "@/lib/predict";
import { GerdResponse, GerdPayload } from "@/types/gerd";
import { ResultCard } from "@/components/ResultCard";
import {
    Activity,
    Stethoscope,
    Thermometer,
    Pizza,
    Info,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    BrainCircuit,
    ShieldAlert,
    Clock,
    HeartPulse,
    FileText,
    Coffee,
    Zap,
    LayoutDashboard,
    StethoscopeIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const formSchema = z.object({
    features: z.array(z.coerce.number().min(0).max(5)).length(64),
    nama: z.string().optional(),
    catatan_tambahan: z.string().optional(),
});

// Original 64 Clinical Symptoms (Indonesian)
const gerdQuestions = [
    // Step 1: Gejala Utama I
    "Seberapa sering Anda merasa dada terbakar (heartburn)?",
    "Apakah Anda sering merasa mual?",
    "Apakah perut Anda sering terasa kembung?",
    "Seberapa sering Anda bersendawa secara berlebihan?",
    "Apakah mulut terasa pahit atau asam (regurgitasi)?",
    "Apakah ulu hati Anda sering terasa nyeri?",
    "Apakah Anda merasa sesak napas setelah makan?",
    "Apakah Anda merasa sulit saat menelan makanan?",
    
    // Step 2: Gejala Utama II
    "Apakah sering batuk kering terutama di malam hari?",
    "Apakah suara menjadi serak di pagi hari?",
    "Apakah tenggorokan terasa nyeri atau panas?",
    "Apakah ada sensasi mengganjal di tenggorokan?",
    "Apakah napas Anda sering berbau tidak sedap?",
    "Apakah produksi air liur Anda terasa berlebih?",
    "Apakah sendawa terasa menyengat atau panas?",
    "Apakah Anda merasakan nyeri dada non-jantung?",
    
    // Step 3: Kebiasaan Makan I
    "Seberapa sering makan dalam porsi yang sangat besar?",
    "Apakah Anda sering mengonsumsi makanan pedas?",
    "Apakah Anda sering mengonsumsi makanan asam?",
    "Apakah Anda sering mengonsumsi makanan berlemak/santan?",
    "Seberapa sering Anda mengonsumsi cokelat?",
    "Seberapa sering Anda mengonsumsi kafein (kopi/teh)?",
    "Apakah Anda mengonsumsi minuman beralkohol?",
    "Seberapa sering mengonsumsi minuman berkarbonasi (soda)?",
    
    // Step 4: Kebiasaan Makan II
    "Apakah Anda sering makan kurang dari 3 jam sebelum tidur?",
    "Apakah Anda sering melewatkan waktu makan (tidak teratur)?",
    "Apakah Anda makan terlalu cepat (tidak dikunyah lama)?",
    "Apakah Anda sering minum banyak air di sela-sela makan?",
    "Apakah Anda sering makan camilan di tengah malam?",
    "Apakah Anda mengonsumsi makanan olahan/instan?",
    "Apakah Anda mengonsumsi produk susu (dairy) berlebihan?",
    "Apakah Anda sering mengonsumsi gorengan?",
    
    // Step 5: Gaya Hidup I
    "Apakah Anda memiliki kebiasaan merokok?",
    "Apakah Anda langsung berbaring setelah makan?",
    "Seberapa sering Anda olahraga atau aktivitas fisik?",
    "Apakah Anda sering memakai pakaian ketat di area perut?",
    "Apakah Anda sering membungkuk setelah makan?",
    "Apakah berat badan Anda melebihi batas ideal (BMI)?",
    "Apakah Anda sering bekerja sambil makan?",
    "Apakah Anda kurang mengonsumsi serat (sayur/buah)?",
    
    // Step 6: Gaya Hidup II
    "Apakah durasi tidur harian Anda kurang dari 6 jam?",
    "Apakah Anda sering Begadang (tidur di atas jam 12)?",
    "Apakah posisi tidur Anda sudah benar (kepala lebih tinggi)?",
    "Apakah Anda sering mengangkat beban berat?",
    "Apakah Anda sering terpapar polusi atau asap?",
    "Apakah Anda mengonsumsi obat-obatan NSAID/pereda nyeri?",
    "Apakah Anda sering menunda buang air besar?",
    "Apakah Anda kurang minum air putih (hidrasi)?",
    
    // Step 7: Kondisi Mental I
    "Seberapa sering Anda merasa stress karena pekerjaan?",
    "Apakah Anda sering merasa cemas tanpa alasan?",
    "Apakah Anda sering merasa lelah (fatigue) berlebihan?",
    "Apakah Anda sulit berkonsentrasi saat perut tidak nyaman?",
    "Apakah masalah perut memengaruhi mood harian Anda?",
    "Apakah Anda sering merasa tertekan secara emosional?",
    "Apakah Anda memiliki gangguan tidur (insomnia)?",
    "Apakah Anda sering merasa gelisah di malam hari?",
    
    // Step 8: Kondisi Mental II
    "Apakah Anda sering merasa panik jika gejala muncul?",
    "Apakah stres memperparah rasa nyeri di perut Anda?",
    "Apakah Anda merasa mudah marah belakangan ini?",
    "Apakah Anda merasa kurang percaya diri karena penyakit ini?",
    "Apakah Anda sering merasa sedih atau putus asa?",
    "Apakah Anda memiliki riwayat trauma psikologis?",
    "Apakah Anda sering merasa was-was (overthinking)?",
    "Apakah Anda merasa membutuhkan dukungan mental tambahan?"
];

const sections = [
    { title: "Gejala Utama I", range: [0, 7], icon: <Stethoscope className="h-5 w-5 text-primary" />, description: "Identifikasi rasa tidak nyaman di area dada dan tenggorokan." },
    { title: "Gejala Utama II", range: [8, 15], icon: <Thermometer className="h-5 w-5 text-primary" />, description: "Efek lanjutan seperti mual, kembung, dan rasa pahit di mulut." },
    { title: "Kebiasaan Makan I", range: [16, 23], icon: <Pizza className="h-5 w-5 text-primary" />, description: "Frekuensi dan jenis makanan yang memicu asam lambung." },
    { title: "Kebiasaan Makan II", range: [24, 31], icon: <Coffee className="h-5 w-5 text-primary" />, description: "Pola makan harian dan kebiasaan sebelum tidur." },
    { title: "Gaya Hidup I", range: [32, 40], icon: <Activity className="h-5 w-5 text-primary" />, description: "Aktivitas fisik harian dan posisi setelah makan." },
    { title: "Gaya Hidup II", range: [41, 48], icon: <Clock className="h-5 w-5 text-primary" />, description: "Durasi tidur dan kebiasaan merokok atau alkohol." },
    { title: "Kondisi Mental I", range: [49, 56], icon: <BrainCircuit className="h-5 w-5 text-primary" />, description: "Tingkat stres harian dan pengaruhnya terhadap perut." },
    { title: "Kondisi Mental II", range: [57, 63], icon: <Zap className="h-5 w-5 text-primary" />, description: "Gangguan kecemasan dan kestabilan emosional harian." }
];

export default function GerdDetectionPage() {
    const [result, setResult] = useState<GerdResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("form");
    const [currentStep, setCurrentStep] = useState(0);

    const form = useForm<any>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            features: Array(64).fill(0),
            nama: "",
            catatan_tambahan: "",
        },
    });

    const progressValue = ((currentStep + 1) / sections.length) * 100;

    const nextStep = async () => {
        const currentSectionRange = sections[currentStep].range;
        const fieldsToValidate = Array.from(
            { length: currentSectionRange[1] - currentSectionRange[0] + 1 },
            (_, i) => `features.${currentSectionRange[0] + i}`
        );
        
        const isValid = await form.trigger(fieldsToValidate as any);
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, sections.length - 1));
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            toast.error("Mohon lengkapi semua pertanyaan di halaman ini.");
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(0, prev - 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    async function onSubmit(values: any) {
        setLoading(true);
        try {
            const data = await predictGERD(values as GerdPayload);
            setResult(data);
            setActiveTab("result");
            toast.success("Analisis selesai!");
        } catch (error: any) {
            toast.error(error.message || "Gagal melakukan analisis.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            <div className="bg-white border-b border-slate-200 pt-16 pb-8 mb-8 sticky top-0 z-40 backdrop-blur-md bg-white/90">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-sm border border-primary/20">
                                <StethoscopeIcon className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-none mb-1.5">
                                    Skrining Klinis GERD
                                </h1>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <ShieldAlert className="h-4 w-4" /> AI-Powered Diagnostic Assistant
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                            {sections.map((_, i) => (
                                <div 
                                    key={i}
                                    className={`h-1.5 w-6 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-primary' : 'bg-slate-200'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container px-4 max-w-4xl mx-auto">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="mb-6 w-full justify-start bg-transparent p-0 h-auto gap-4">
                        <TabsTrigger 
                            value="form" 
                            className="rounded-xl font-black px-6 py-2.5 border-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-white data-[state=active]:text-slate-900 transition-all shadow-sm bg-slate-100 text-slate-400 text-sm"
                        >
                            <LayoutDashboard className="h-4 w-4 mr-2" /> 1. Pengisian Data
                        </TabsTrigger>
                        <TabsTrigger 
                            value="result" 
                            className="rounded-xl font-black px-6 py-2.5 border-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-white data-[state=active]:text-slate-900 transition-all shadow-sm bg-slate-100 text-slate-400 text-sm"
                            disabled={!result}
                        >
                            <FileText className="h-4 w-4 mr-2" /> 2. Hasil Analisis
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="form" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-[1.5rem] hover:border-primary transition-all cursor-pointer group shadow-sm">
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                    <Info className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-black group-hover:text-primary transition-colors">Panduan Pengisian</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">Pilih angka 0-5 sesuai tingkat keparahan gejala</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-[1.5rem] hover:border-primary transition-all cursor-pointer group shadow-sm">
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-black group-hover:text-primary transition-colors">Waktu Pengisian</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Diperlukan ± 3-5 menit untuk 64 parameter</div>
                                </div>
                            </div>
                        </div>

                        <Card className="border-none shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] rounded-[1.5rem] overflow-hidden bg-white mb-8">
                            <div className="bg-slate-900 text-white p-6 md:p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12">
                                    <Activity className="h-16 w-16" />
                                </div>
                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                                    <div className="space-y-1">
                                        <div className="inline-block px-2.5 py-1 rounded-lg bg-white/10 text-white/60 text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 border border-white/10">
                                            Langkah {currentStep + 1} dari {sections.length}
                                        </div>
                                        <h3 className="text-2xl font-black text-white leading-tight">{sections[currentStep].title}</h3>
                                        <p className="text-slate-400 font-medium text-xs max-w-lg">
                                            {sections[currentStep].description}
                                        </p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-3">
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-primary leading-none">{Math.round(progressValue)}%</div>
                                            <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-0.5">Progress</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-6 md:p-8">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <AnimatePresence mode="wait" initial={false}>
                                            <motion.div
                                                key={currentStep}
                                                initial={{ opacity: 0, x: 4 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -4 }}
                                                transition={{ duration: 0.15, ease: "easeOut" }}
                                                className="grid grid-cols-1 gap-4 min-h-[460px] content-start"
                                            >
                                                {Array.from({ length: sections[currentStep].range[1] - sections[currentStep].range[0] + 1 }).map((_, i) => {
                                                    const featureIdx = sections[currentStep].range[0] + i;
                                                    return (
                                                        <FormField
                                                            key={featureIdx}
                                                            control={form.control}
                                                            name={`features.${featureIdx}`}
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-col space-y-4 rounded-xl border border-slate-100 p-6 bg-slate-50/50 hover:bg-white hover:border-primary/30 hover:shadow-sm transition-all group relative overflow-hidden h-fit">
                                                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                                        <div className="space-y-1 flex-1">
                                                                            <FormLabel className="font-black text-[10px] text-slate-400 group-hover:text-primary transition-colors uppercase tracking-[0.2em]">
                                                                                Parameter #{featureIdx + 1}
                                                                            </FormLabel>
                                                                            <div className="text-sm font-bold text-slate-700 leading-relaxed">
                                                                                {gerdQuestions[featureIdx]}
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-[10px] font-black text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100 shrink-0">
                                                                            SKALA 0 - 5
                                                                        </div>
                                                                    </div>
                                                                    <FormControl>
                                                                        <div className="flex items-center gap-1.5 md:gap-2">
                                                                            {[0, 1, 2, 3, 4, 5].map((v) => (
                                                                                <button
                                                                                    key={v}
                                                                                    type="button"
                                                                                    onClick={() => field.onChange(v)}
                                                                                    className={`
                                                                                        flex-1 h-11 rounded-xl font-black text-sm transition-all relative overflow-hidden border-2
                                                                                        ${field.value === v 
                                                                                            ? "bg-primary border-primary text-white shadow-lg scale-[1.02] z-10" 
                                                                                            : "bg-white border-slate-200 text-slate-400 hover:bg-slate-100 hover:border-slate-300"}
                                                                                    `}
                                                                                >
                                                                                    {v}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    );
                                                })}
                                            </motion.div>
                                        </AnimatePresence>

                                        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100">
                                            {currentStep > 0 && (
                                                <Button 
                                                    type="button" 
                                                    variant="outline" 
                                                    onClick={prevStep}
                                                    className="flex-1 h-12 rounded-xl font-black text-slate-600 gap-2 border-2 hover:bg-slate-50 transition-all text-sm"
                                                >
                                                    <ChevronLeft className="h-4 w-4" /> Kembali
                                                </Button>
                                            )}
                                            
                                            {currentStep < sections.length - 1 ? (
                                                <Button 
                                                    type="button" 
                                                    onClick={nextStep}
                                                    className="flex-[2] h-12 rounded-xl font-black text-base gap-2 shadow-lg bg-primary hover:bg-primary/90 transition-all hover:translate-y-[-1px] active:translate-y-[0px]"
                                                >
                                                    Lanjutkan <ChevronRight className="h-4 w-4" />
                                                </Button>
                                            ) : (
                                                <Button 
                                                    type="submit" 
                                                    className="flex-[2] h-12 rounded-xl font-black text-base gap-2 shadow-lg bg-slate-900 hover:bg-black transition-all hover:translate-y-[-1px] active:translate-y-[0px]"
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <BrainCircuit className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <>KIRIM ANALISIS KLINIS <Activity className="h-4 w-4" /></>
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border shadow-none rounded-[1.5rem] bg-slate-50 p-6 border-slate-200">
                                <div className="flex items-center gap-3 text-primary mb-4">
                                    <ShieldAlert className="h-5 w-5" />
                                    <h4 className="font-black text-[11px] uppercase tracking-[0.2em]">Clinical AI Intelligence</h4>
                                </div>
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed mb-6">
                                    SVC Engine (Support Vector Classifier) mengevaluasi dataset gejala lambung untuk menemukan korelasi probabilitas risiko secara statistik.
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1" className="border-slate-200">
                                        <AccordionTrigger className="text-[10px] font-black py-3 hover:no-underline uppercase tracking-widest">Cara Kerja AI?</AccordionTrigger>
                                        <AccordionContent className="text-[10px] font-bold text-slate-400 leading-relaxed pb-3">
                                            Model mencari "hyperplane" optimal yang memisahkan antara kondisi sehat dan risiko GERD berdasarkan titik data parameter pasien.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2" className="border-slate-200">
                                        <AccordionTrigger className="text-[10px] font-black py-3 hover:no-underline uppercase tracking-widest">Eksklusi Data</AccordionTrigger>
                                        <AccordionContent className="text-[10px] font-bold text-slate-400 leading-relaxed pb-3">
                                            Data gejala Anda tidak dipadankan dengan identitas pribadi, menjamin objektivitas hasil skrining.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </Card>

                            <div className="p-6 rounded-[1.5rem] bg-slate-900 text-white relative overflow-hidden shadow-xl flex flex-col justify-center">
                                <Activity className="absolute -right-2 -bottom-2 h-16 w-16 opacity-10" />
                                <div className="relative z-10">
                                    <div className="font-black text-base mb-2 tracking-tight">Proteksi Lambung</div>
                                    <p className="text-[10px] font-bold text-slate-400 mb-6 leading-relaxed">Lakukan pemantauan berkala jika gejala tidak membaik.</p>
                                    <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-widest bg-white/5 w-fit px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/5">
                                        <HeartPulse className="h-3 w-3" /> System Active
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-start gap-4">
                            <div className="h-8 w-8 bg-white rounded-lg shadow-sm border border-emerald-100 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            </div>
                            <div className="space-y-0.5">
                                <h4 className="font-black text-emerald-900 text-[11px] uppercase tracking-widest">Privasi & Keamanan</h4>
                                <p className="text-[12px] font-semibold text-emerald-700/70 leading-relaxed">
                                    Data diproses secara anonim dengan enkripsi AES-256. Kami menjamin kerahasiaan parameter klinis Anda.
                                </p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="result" className="mt-0 pb-20">
                        {result && <ResultCard result={result} formData={form.getValues()} />}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
