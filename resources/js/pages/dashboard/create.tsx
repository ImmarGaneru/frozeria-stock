import { Head, Link, useForm } from "@inertiajs/react";
import { ChevronLeft, UploadCloud } from "lucide-react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Category } from "@/types/category";

interface CreateProductProps {
    categories: Category[];
}

export default function CreateProduct({ categories }: CreateProductProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
        unit: '',
        stock: '',
        min_stock: '',
        sell_price: '',
        buy_price: '',
        weight: '',
        location: '',
        description: '',
        photo: null as File | null,
    });

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        post('/dashboard', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                alert('Barang berhasil ditambahkan.');
            }, onError: (errors) => {
                console.log(errors);
            }
        });
    };

    return (
        <>
            <Head title="Create Product" />

            <div className="py-6">
                {/* Header Section */}
                <div className="mb-2 mx-6 flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild className="h-9 w-9">
                        <Link href="/dashboard">
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Kembali</span>
                        </Link>
                    </Button>
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Tambah Barang Baru
                    </h1>
                </div>

                {/* Form Card */}
                <Card className="border-0 shadow-none py-2">
                    <CardContent className="p-2 md:p-6">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            
                            {/* Area Upload Foto */}
                            <div className="space-y-3">
                                <Label className="text-base font-semibold">Foto Barang</Label>
                                <div className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-12 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-zinc-900/50 dark:hover:bg-zinc-900/80">
                                    {data.photo ? (
                                        <div className="flex flex-col items-center">
                                            <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-gray-200">
                                                <img src={URL.createObjectURL(data.photo)} alt="Preview" className="h-full w-full object-cover" />
                                            </div>
                                            <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {data.photo.name}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">Klik untuk mengganti foto</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="rounded-full bg-white p-3 shadow-sm dark:bg-zinc-800">
                                                <UploadCloud className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                            </div>
                                            <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Klik untuk memilih foto, atau seret file ke sini
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                                Format yang didukung: JPG, PNG — Maks. 2 MB
                                            </p>
                                        </>
                                    )}
                                    {/* Input file sembunyi (hidden) untuk fungsionalitas aslinya nanti */}
                                    <input
                                        type="file" 
                                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0" 
                                        accept="image/png, image/jpeg, image/jpg"
                                        onChange={(e) => setData('photo', e.target.files?.[0] ?? null)}
                                    />
                                </div>
                                <InputError message={errors.photo} />
                            </div>

                            {/* Form Input Grid */}
                            <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
                                
                                {/* Nama Barang - Full Width */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="name" className="text-sm font-medium">
                                        Nama barang <span className="text-red-500">*</span>
                                    </Label>
                                    <Input 
                                        id="name" 
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama barang (mis. Ayam nugget crispy)" 
                                        className="h-11"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Kategori */}
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-sm font-medium">
                                        Kategori <span className="text-red-500">*</span>
                                    </Label>
                                    <Select value={data.category_id} onValueChange={(val) => setData('category_id', val)}>
                                        <SelectTrigger id="category" className="h-11">
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories?.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id.toString()} className="capitalize">{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category_id} />
                                </div>

                                {/* Satuan */}
                                <div className="space-y-2">
                                    <Label htmlFor="unit" className="text-sm font-medium">
                                        Satuan <span className="text-red-500">*</span>
                                    </Label>
                                    <Input 
                                        id="unit" 
                                        value={data.unit}
                                        onChange={(e) => setData('unit', e.target.value)}
                                        placeholder="mis. pcs, pack, box" 
                                        className="h-11"
                                    />
                                    <InputError message={errors.unit} />
                                </div>

                                {/* Jumlah Stok */}
                                <div className="space-y-2">
                                    <Label htmlFor="stock" className="text-sm font-medium">
                                        Jumlah stok <span className="text-red-500">*</span>
                                    </Label>
                                    <Input 
                                        id="stock" 
                                        type="number" 
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        placeholder="0" 
                                        className="h-11"
                                    />
                                    <InputError message={errors.stock} />
                                </div>

                                {/* Stok Minimum */}
                                <div className="space-y-2">
                                    <Label htmlFor="min-stock" className="text-sm font-medium">
                                        Stok minimum
                                    </Label>
                                    <Input 
                                        id="min-stock" 
                                        type="number" 
                                        value={data.min_stock}
                                        onChange={(e) => setData('min_stock', e.target.value)}
                                        placeholder="0" 
                                        className="h-11"
                                    />
                                    <InputError message={errors.min_stock} />
                                </div>

                                {/* Harga Jual */}
                                <div className="space-y-2">
                                    <Label htmlFor="selling-price" className="text-sm font-medium">
                                        Harga jual (Rp)
                                    </Label>
                                    <Input 
                                        id="selling-price" 
                                        type="number" 
                                        value={data.sell_price}
                                        onChange={(e) => setData('sell_price', e.target.value)}
                                        placeholder="0" 
                                        className="h-11"
                                    />
                                    <InputError message={errors.sell_price} />
                                </div>

                                {/* Harga Beli */}
                                <div className="space-y-2">
                                    <Label htmlFor="buying-price" className="text-sm font-medium">
                                        Harga beli (Rp)
                                    </Label>
                                    <Input 
                                        id="buying-price" 
                                        type="number" 
                                        value={data.buy_price}
                                        onChange={(e) => setData('buy_price', e.target.value)}
                                        placeholder="0" 
                                        className="h-11"
                                    />
                                    <InputError message={errors.buy_price} />
                                </div>

                                {/* Berat / Ukuran */}
                                <div className="space-y-2">
                                    <Label htmlFor="weight" className="text-sm font-medium">
                                        Berat / ukuran
                                    </Label>
                                    <Input 
                                        id="weight"
                                        value={data.weight}
                                        onChange={(e) => setData('weight', e.target.value)}
                                        placeholder="mis. 500 gram" 
                                        className="h-11"
                                    />
                                    <InputError message={errors.weight} />
                                </div>

                                {/* Lokasi Simpan */}
                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-sm font-medium">
                                        Lokasi simpan
                                    </Label>
                                    <Input 
                                        id="location" 
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="mis. Rak A-3, Freezer 1" 
                                        className="h-11"
                                    />
                                    <InputError message={errors.location} />
                                </div>

                                {/* Deskripsi - Full Width */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description" className="text-sm font-medium">
                                        Deskripsi
                                    </Label>
                                    <Textarea
                                        id="description" 
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Tambahkan detail atau catatan khusus mengenai barang ini..." 
                                        className="min-h-30 resize-y"
                                    />
                                    <InputError message={errors.description} />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 flex items-center justify-end gap-3 pt-6">
                                <Button variant="ghost" type="button" asChild className="h-11 px-6" disabled={processing}>
                                    <Link href="/dashboard">Batal</Link>
                                </Button>
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="h-11 bg-emerald-600 px-8 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Barang'}
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

CreateProduct.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Create',
            href: '/dashboard/create',
        },
    ],
}