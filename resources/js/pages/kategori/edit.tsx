import { Head, Link, useForm } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import kategori from "@/routes/kategori";
import type { Category } from "@/types/category";

interface EditCategoryProps {
    category: Category;
}

export default function EditCategory({ category }: EditCategoryProps) {
    const { data, setData, patch, processing, errors, isDirty } = useForm({
        name: category.name || '',
        description: category.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(`/kategori/${category.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                alert('Kategori berhasil diperbarui.');
            }, onError: (errors) => {
                console.log(errors);
            }
        });
    };

    return (
        <>
            <Head title={`Edit Kategori - ${category.name}`} />

            <div className="py-6">
                {/* Header Section */}
                <div className="mb-2 mx-6 flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild className="h-9 w-9">
                        <Link href={kategori.index()}>
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Kembali</span>
                        </Link>
                    </Button>
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Edit Kategori
                    </h1>
                </div>

                {/* Form Card */}
                <Card className="border-0 shadow-none py-2">
                    <CardContent className="p-2 md:p-6">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            
                            {/* Form Input Grid */}
                            <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
                                
                                {/* Nama Kategori - Full Width */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="name" className="text-sm font-medium">
                                        Nama kategori <span className="text-red-500">*</span>
                                    </Label>
                                    <Input 
                                        id="name" 
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama kategori (mis. Daging, Sayuran)" 
                                        className="h-11"
                                    />
                                    <InputError message={errors.name} />
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
                                        placeholder="Tambahkan detail atau deskripsi mengenai kategori ini..." 
                                        className="min-h-30 resize-y"
                                    />
                                    <InputError message={errors.description} />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-4 flex items-center justify-end gap-3 pt-6">
                                <Button variant="ghost" type="button" asChild className="h-11 px-6" disabled={processing}>
                                    <Link href={kategori.index()}>Batal</Link>
                                </Button>
                                <Button 
                                    type="submit" 
                                    disabled={processing || !isDirty}
                                    className="h-11 bg-blue-600 px-8 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

EditCategory.layout = {
    breadcrumbs: [
        {
            title: 'Kategori',
            href: kategori.index(),
        },
        {
            title: 'Edit Kategori',
            href: '#',
        },
    ],
}
