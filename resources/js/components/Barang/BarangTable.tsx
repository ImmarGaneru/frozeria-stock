import { router } from "@inertiajs/react";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import dashboard from "@/routes/dashboard";
import type { Product, PaginatedData } from "@/types/product";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface BarangTableProps {
    products: PaginatedData<Product>;
}

export function BarangTable({products}: BarangTableProps){
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const confirmDelete = () => {
        if (productToDelete) {
            router.delete(dashboard.destroy(productToDelete.id as number), {
                preserveScroll: true,
                onSuccess: () => setProductToDelete(null),
            });
        }
    };

    return (
        <>
            <div className="rounded-xl border border-sidebar-border/70 overflow-hidden">
                <Table>
                    <TableCaption className="text-left mx-5 my-3">{products.total} Barang terdaftar</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-25 text-center">Id</TableHead>
                        <TableHead className="text-left">Nama Barang</TableHead>
                        <TableHead className="text-left">Kategori</TableHead>
                        <TableHead className="text-left">Stok</TableHead>
                        <TableHead className="text-left">Satuan</TableHead>
                        <TableHead className="text-left">Harga Jual</TableHead>
                        <TableHead className="text-left">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.data.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium text-center">{product.id}</TableCell>
                            <TableCell className="text-left">{product.name}</TableCell>
                            <TableCell className="text-left capitalize">{product.category?.name}</TableCell>
                            <TableCell className="text-left">{product.stock}</TableCell>
                            <TableCell className="text-left">{product.unit}</TableCell>
                            <TableCell className="text-left">{product.sell_price}</TableCell>
                            <TableCell className="text-left">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => router.visit(dashboard.show(product.id))}
                                                className="h-8 w-8 text-blue-600 disabled:text-gray-400 bg-blue-100 hover:bg-blue-200"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Lihat detail barang
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 text-orange-600 disabled:text-gray-400 bg-orange-200 hover:bg-orange-300 mx-1"
                                                onClick={() => router.visit(dashboard.edit(product.id))}
                                            >
                                                <PencilLine/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Edit barang</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 text-red-600 disabled:text-gray-400 bg-red-200 hover:bg-red-300 mx-1"
                                            onClick={() => setProductToDelete(product)}
                                            >
                                                <Trash2/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Hapus barang</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                    </TableFooter>
                </Table>
            </div>

            <Dialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus Barang</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus barang <span className="font-semibold text-foreground">"{productToDelete?.name}"</span>? Aksi ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setProductToDelete(null)}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Hapus Barang
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}