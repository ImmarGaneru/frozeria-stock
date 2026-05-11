import { Head } from "@inertiajs/react";
import kategori from "@/routes/kategori";

export default function CreateCategory() {
    return (
        <>
            <Head title="Create Category" />

        </>
    )
}

CreateCategory.layout = {
    breadcrumbs: [
        {
            title: 'Kategori',
            href: kategori.index(),
        },
        {
            title: 'Create',
            href: kategori.create(),
        },
    ],
};