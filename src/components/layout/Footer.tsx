import Link from "next/link";
import { Activity } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t bg-slate-50 dark:bg-slate-900/50">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Activity className="h-6 w-6 text-blue-600" />
                            <span className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                                MedCare Insight
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Platform cerdas berbasis AI untuk deteksi dini dan edukasi pencegahan penyakit GERD. Memberikan solusi kesehatan tepat di genggaman Anda.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Navigasi</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link></li>
                            <li><Link href="/deteksi/gerd" className="hover:text-blue-600 transition-colors">Deteksi GERD</Link></li>
                            <li><Link href="/project" className="hover:text-blue-600 transition-colors">Project</Link></li>
                            <li><Link href="/about" className="hover:text-blue-600 transition-colors">Tentang Kami</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Layanan</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Skrining Gejala</li>
                            <li>Edukasi Kesehatan</li>
                            <li>Konsultasi Rujukan</li>
                            <li>Privasi Data</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Kontak</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>info@medcareinsight.id</li>
                            <li>+62 (21) 1234-5678</li>
                            <li>Jl. Kesehatan No. 123, Jakarta</li>
                            <li>Senin - Jumat: 08:00 - 20:00</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} MedCare Insight. Hak Cipta Dilindungi. Project 1: SVC Classification.
                    </p>
                    <div className="flex gap-6 text-xs text-muted-foreground">
                        <Link href="#" className="hover:underline">Kebijakan Privasi</Link>
                        <Link href="#" className="hover:underline">Syarat & Ketentuan</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
