import Link from "next/link";
import { Activity } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t bg-white">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Activity className="h-6 w-6 text-slate-950" />
                            <span className="text-xl font-bold tracking-tight text-slate-950">
                                MedCare Insight
                            </span>
                        </Link>
                        <p className="text-sm text-slate-950 leading-relaxed">
                            Platform cerdas berbasis AI untuk deteksi dini dan edukasi pencegahan penyakit GERD. Memberikan solusi kesehatan tepat di genggaman Anda.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-950">Navigasi</h3>
                        <ul className="space-y-2 text-sm text-slate-950">
                            <li><Link href="/" className="hover:text-blue-600 transition-colors font-medium">Beranda</Link></li>
                            <li><Link href="/deteksi/gerd" className="hover:text-blue-600 transition-colors font-medium">Deteksi GERD</Link></li>
                            <li><Link href="/project" className="hover:text-blue-600 transition-colors font-medium">Project</Link></li>
                            <li><Link href="/about" className="hover:text-blue-600 transition-colors font-medium">Tentang Kami</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-950">Layanan</h3>
                        <ul className="space-y-2 text-sm text-slate-950 font-medium">
                            <li>Skrining Gejala</li>
                            <li>Edukasi Kesehatan</li>
                            <li>Konsultasi Rujukan</li>
                            <li>Privasi Data</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-950">Kontak</h3>
                        <ul className="space-y-2 text-sm text-slate-950 font-medium">
                            <li>info@medcareinsight.id</li>
                            <li>+62 (21) 1234-5678</li>
                            <li>Jl. Kesehatan No. 123, Jakarta</li>
                            <li>Senin - Jumat: 08:00 - 20:00</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <p className="text-xs text-slate-950 font-medium">
                        © {new Date().getFullYear()} MedCare Insight. Hak Cipta Dilindungi. Project 1: SVC Classification.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-950 font-medium">
                        <Link href="#" className="hover:underline">Kebijakan Privasi</Link>
                        <Link href="#" className="hover:underline">Syarat & Ketentuan</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
