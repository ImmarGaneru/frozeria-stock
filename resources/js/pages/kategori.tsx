import { Head, router } from '@inertiajs/react';
// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { KategoriTable } from "@/components/Kategori/KategoriTable";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import kategori from '@/routes/kategori';
import type { Category } from '@/types/category';
import type { PaginatedData } from "@/types/product";


interface KategoriProps {
    categories: PaginatedData<Category>;
    filters?: {
        search?: string;
    };
}

export default function Kategori({ categories, filters }: KategoriProps) {
    const [search, setSearch] = useState(filters?.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(kategori.index(), {
                search: search,
            }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <>
            <Head title="Kategori" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="w-full p-4"> 
                    <div>
                        <h2 className="text-lg">Daftar Kategori</h2>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 py-3">
                        <Field orientation="horizontal">
                            <Input 
                                type="search" 
                                placeholder="Cari Kategori.."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Field>
                        <div className="flex justify-end">
                            <Button onClick={() => router.visit(kategori.create())}><Plus className="mr-2 h-4 w-4"/> Tambah Barang</Button>
                        </div>
                    </div>
                    <KategoriTable categories={categories}/>
                </div>
            </div>
        </>
    );
}

Kategori.layout = {
    breadcrumbs: [
        {
            title: 'Kategori',
            href: kategori.index(),
        },
    ],
};
