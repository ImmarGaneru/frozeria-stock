import { Head } from '@inertiajs/react';
import { Info, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bantuan } from "@/routes";

export default function Bantuan() {
    return (
        <>
            <Head title="Bantuan" />
            <div className="mx-6 py-6">
                {/* Header Section */}
                <div className="mb-6 flex items-center gap-3 px-2 md:px-0">
                    <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
                        <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Panduan Penggunaan Sistem
                    </h1>
                </div>

                <div className="flex flex-col gap-5">
                    
                    {/* Card 1: Cara menambah barang baru */}
                    <Card className="border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Cara menambah barang baru</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="flex flex-col gap-3">
                                <StepItem number={1}>
                                    Buka halaman <strong className="font-semibold text-gray-900 dark:text-white">Dashboard</strong>, klik tombol <strong className="font-semibold text-gray-900 dark:text-white">+ Tambah Barang</strong> di kanan atas tabel.
                                </StepItem>
                                <StepItem number={2}>
                                    Unggah foto barang (opsional), lalu isi formulir: nama, kategori, satuan, jumlah stok, harga, dan lainnya.
                                </StepItem>
                                <StepItem number={3}>
                                    Klik <strong className="font-semibold text-gray-900 dark:text-white">Simpan Barang</strong>. Barang akan muncul di daftar dashboard.
                                </StepItem>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Card 2: Cara update stok barang masuk */}
                    <Card className="border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Cara update stok barang masuk</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="flex flex-col gap-3">
                                <StepItem number={1}>
                                    Temukan barang di dashboard menggunakan kolom pencarian atau filter kategori.
                                </StepItem>
                                <StepItem number={2}>
                                    Klik tombol <strong className="font-semibold text-gray-900 dark:text-white">Edit</strong> pada baris barang tersebut.
                                </StepItem>
                                <StepItem number={3}>
                                    Ubah nilai <strong className="font-semibold text-gray-900 dark:text-white">Jumlah stok</strong> sesuai kondisi saat ini, lalu klik <strong className="font-semibold text-gray-900 dark:text-white">Simpan Barang</strong>.
                                </StepItem>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Card 3: Cara mengelola kategori */}
                    <Card className="border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Cara mengelola kategori</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="flex flex-col gap-3">
                                <StepItem number={1}>
                                    Buka halaman <strong className="font-semibold text-gray-900 dark:text-white">Kategori</strong> dari navigasi di sebelah kiri.
                                </StepItem>
                                <StepItem number={2}>
                                    Tambah, edit, atau hapus kategori sesuai kebutuhan toko.
                                </StepItem>
                                <StepItem number={3}>
                                    Menghapus kategori tidak akan menghapus barang — barang akan menjadi tidak berkategori.
                                </StepItem>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Info Alert Box */}
                    <div className="mt-2 flex items-center gap-3 rounded-xl border border-sidebar-border/70 bg-gray-50 p-4 text-gray-700 shadow-sm dark:border-sidebar-border dark:bg-zinc-900/50 dark:text-gray-300">
                        <Info className="h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400" />
                        <p className="text-sm">
                            Satuan barang diisi bebas sesuai kebutuhan — misalnya: <strong className="font-semibold text-gray-900 dark:text-white">pcs, pack, box, kg, liter</strong>, dan lain-lain.
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}

function StepItem({ number, children }: { number: number; children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-3">
            <span className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded border border-gray-300 bg-white text-xs font-medium text-gray-700 shadow-sm dark:border-gray-700 dark:bg-zinc-800 dark:text-gray-300">
                {number}
            </span>
            <span className="pt-0.75 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {children}
            </span>
        </li>
    );
}

Bantuan.layout = {
    breadcrumbs: [
        {
            title: 'Bantuan',
            href: bantuan(),
        },
    ],
};
