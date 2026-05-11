import { Head, Link, router } from "@inertiajs/react";
import { ChevronLeft, Image as ImageIcon, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import dashboard from "@/routes/dashboard";
import type { Product } from "@/types/product";

interface DetailProductProps {
    product: Product;
}

export default function DetailProduct({ product }: DetailProductProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        router.delete(dashboard.destroy(product.id), {
            preserveScroll: true,
            onSuccess: () => setIsDeleteDialogOpen(false),
        });
    };

    const formatRupiah = (value?: number | string) => {
        if (value === undefined) {
            return '-'
        }
        
        const numericValue = Number(value);
        
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(numericValue);
    };

    return (
        <>
            <Head title={`Detail - ${product.name}`} />

            <div className="py-6">
                {/* Header Section */}
                <div className="mb-2 mx-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild className="h-9 w-9">
                            <Link href={dashboard.index()}>
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Kembali</span>
                            </Link>
                        </Button>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            Detail Barang
                        </h1>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <Button variant="outline" asChild className="h-9 border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40">
                            <Link href={dashboard.edit(product.id)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Barang
                            </Link>
                        </Button>
                    <Button onClick={() => setIsDeleteDialogOpen(true)} variant="outline" className="h-9 border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                        </Button>
                    </div>
                </div>

                {/* Main Content Card */}
                <Card className="border-0 shadow-none py-2">
                    <CardContent className="p-0">
                        {/* Hero Section (Image & Title) */}
                        <div className="flex flex-col items-start gap-6 p-6 sm:flex-row md:p-8">
                            <div className="flex h-32 w-32 shrink-0 items-center justify-center bg-gray-50 dark:bg-zinc-900/50">
                                {product.photo ? (
                                    <img src={`/storage/${product.photo}`} alt={product.name} className="h-full w-full rounded-lg object-cover" />
                                ) : (
                                    <ImageIcon className="h-10 w-10 text-gray-400 dark:text-gray-600" />
                                )}
                            </div>
                            <div className="flex flex-col pt-2">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {product.name}
                                </h2>
                                <div className="mt-3">
                                    <Badge variant="secondary" className="capitalize rounded-md px-3 py-1 font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300">
                                        {product.category?.name || 'Tanpa Kategori'}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid Section */}
                        <div className="p-6 md:p-8">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <DetailBox 
                                    label="Jumlah stok" 
                                    value={`${product.stock} ${product.unit}`} 
                                    highlight={product.min_stock !== undefined && product.stock <= product.min_stock}
                                />
                                <DetailBox 
                                    label="Stok minimum" 
                                    value={`${product.min_stock ?? 0} ${product.unit}`} 
                                />
                                <DetailBox 
                                    label="Harga jual" 
                                    value={formatRupiah(product.sell_price)} 
                                />
                                <DetailBox 
                                    label="Harga beli" 
                                    value={formatRupiah(product.buy_price)} 
                                />
                                <DetailBox 
                                    label="Berat / ukuran" 
                                    value={product.weight || '-'} 
                                />
                                <DetailBox 
                                    label="Lokasi simpan" 
                                    value={product.location || '-'} 
                                />
                            </div>

                            {/* Description Section */}
                            <div className="mt-4 rounded-xl border bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-zinc-900/30">
                                <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Deskripsi
                                </h3>
                                <p className="text-base leading-relaxed text-gray-900 dark:text-gray-200">
                                    {product.description || 'Tidak ada deskripsi untuk barang ini.'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus Barang</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus barang <span className="font-semibold text-foreground">"{product.name}"</span>? Aksi ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Batal</Button>
                        <Button variant="destructive" onClick={handleDelete}>Hapus Barang</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            </div>
        </>
    );
}

// Sub-komponen (Helper) untuk membuat kotak-kotak detail agar kode lebih rapi
function DetailBox({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
    return (
        <div className="flex flex-col justify-center rounded-xl border p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-zinc-900/50">
            <span className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                {label}
            </span>
            <span className={`text-lg font-semibold ${highlight ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
                {value}
            </span>
        </div>
    );
}

DetailProduct.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard.index(),
        },
        {
            title: 'Detail',
            href: '#', // Halaman saat ini tidak memerlukan link
        },
    ],
};