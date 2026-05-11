import { Head, router } from '@inertiajs/react';
import { Plus } from "lucide-react";
import { useState, useEffect } from 'react';
import { BarangTable } from "@/components/Barang/BarangTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import dashboard from '@/routes/dashboard';
import type { Category } from "@/types/category";
import type { Product, Stats, PaginatedData } from "@/types/product";

interface DashboardProps {
    products: PaginatedData<Product>;
    categories: Category[];
    stats: Stats;
    filters?: {
        search?: string;
        category_id?: string;
    };
}

export default function Dashboard({ products, stats, categories, filters }: DashboardProps) {
    const [search, setSearch] = useState(filters?.search || '');
    const [categoryId, setCategoryId] = useState(filters?.category_id || 'all');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(dashboard.index(), {
                search: search,
                category_id: categoryId === 'all' ? undefined : categoryId,
            }, {
                preserveState: true,
                preserveScroll: true,
                replace: true, // mencegah penumpukan history (Back) di browser
            });
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [search, categoryId]);

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card className="rounded-xl border border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Total Barang
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                {stats.total}
                            </h2>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Total Kategori
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                {stats.totalCategory}
                            </h2>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Stok Menipis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                {stats.lowStock}
                            </h2>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Stok Habis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                {stats.emptyStock}
                            </h2>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 py-2">
                    <Field orientation="horizontal">
                        <Input 
                            type="search" 
                            placeholder="Cari Barang.."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Select value={categoryId} onValueChange={setCategoryId}>
                            <SelectTrigger className="w-full max-w-48 capitalize">
                                <SelectValue placeholder="Semua Kategori" className="capitalize"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>
                                        Kategori
                                    </SelectLabel>
                                    <SelectItem value="all">
                                        Semua Kategori
                                    </SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()} className="capitalize">
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                    <div className="flex justify-end">
                        <Button onClick={() => router.visit(dashboard.create())}><Plus className="mr-2 h-4 w-4"/> Tambah Barang</Button>
                    </div>
                </div>
                <BarangTable products={products}/>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard.index(),
        },
    ],
};
