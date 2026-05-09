import { Head } from '@inertiajs/react';
// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { KategoriTable } from "@/components/Kategori/KategoriTable";
import { kategori } from '@/routes';
import type { Category } from '@/types/category';

interface KategoriProps {
    categories: Category[];
}

export default function Kategori({ categories }: KategoriProps) {
    return (
        <>
            <Head title="Kategori" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <KategoriTable categories={categories}/>
            </div>
        </>
    );
}

Kategori.layout = {
    breadcrumbs: [
        {
            title: 'Kategori',
            href: kategori(),
        },
    ],
};
