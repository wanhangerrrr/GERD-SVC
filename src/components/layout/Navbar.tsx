"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Activity, Moon, Sun, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Deteksi GERD", href: "/deteksi/gerd" },
    { name: "Project", href: "/project" },
    { name: "About", href: "/about" },
    { name: "Kontak", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-950 shadow-sm">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="p-1.5 bg-primary rounded-md group-hover:bg-primary/90 transition-colors">
                            <Activity className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            MedCare<span className="text-primary tracking-tighter ml-0.5">Insight</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "px-4 py-2 text-sm font-semibold transition-all rounded-md",
                                pathname === item.href
                                    ? "bg-slate-100 text-primary dark:bg-slate-800"
                                    : "text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-900"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-4" />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-9 w-9"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <Button className="ml-4 rounded-md font-bold px-5" asChild>
                        <Link href="/deteksi/gerd" className="gap-2">
                            Mulai Deteksi <ChevronRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </nav>

                {/* Mobile Nav */}
                <div className="flex items-center gap-2 md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-md"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-md">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px]">
                            <SheetHeader>
                                <SheetTitle className="text-left flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-primary" />
                                    MedCare Insight
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-2 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center px-4 py-3 rounded-md text-base font-bold transition-all",
                                            pathname === item.href
                                                ? "bg-slate-100 text-primary dark:bg-slate-800"
                                                : "text-slate-600 hover:bg-slate-50 dark:text-slate-400"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Button className="mt-8 w-full rounded-md font-bold py-6 text-lg" asChild onClick={() => setIsOpen(false)}>
                                    <Link href="/deteksi/gerd">Mulai Deteksi</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
