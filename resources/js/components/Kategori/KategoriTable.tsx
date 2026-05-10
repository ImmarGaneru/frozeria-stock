import { Link } from "@inertiajs/react";
import { Eye, Trash2 } from "lucide-react";
import type { Category } from "@/types/category";
import type { PaginatedData } from "@/types/product";
import { Button } from "../ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface KategoriTableProps {
    categories: PaginatedData<Category>;
}

export function KategoriTable({categories}: KategoriTableProps){
    return (
            <div className="rounded-xl border border-sidebar-border/70 overflow-hidden">
                <Table className="">
                    <TableCaption className="text-left mx-5 my-3">{categories?.total || 0} kategori terdaftar</TableCaption>
                    <TableHeader className="bg-muted">
                        <TableRow >
                            <TableHead className="w-25 text-center">Id</TableHead>
                            <TableHead className="text-left">Nama Kategori</TableHead>
                            <TableHead className="text-left">Jumlah barang</TableHead>
                            <TableHead className="text-left">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="px-4">
                        {categories?.data?.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell className="font-medium text-center">{category.id}</TableCell>
                            <TableCell className="text-left capitalize">{category.name}</TableCell>
                            <TableCell className="text-left">{category.products_count}</TableCell>
                            <TableCell className="text-left">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                //onClick=""
                                                className="h-8 w-8 text-blue-600 disabled:text-gray-400 bg-blue-100 hover:bg-blue-200"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Lihat detail kategori
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 text-red-600 disabled:text-gray-400 bg-red-200 hover:bg-red-300 mx-1"
                                            >
                                                <Trash2/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Hapus kategori</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
                {/* Custom Pagination Controls */}
                {categories?.links && categories.links.length > 3 && (
                    <div className="flex items-center justify-end px-4 py-4 space-x-1 border-t border-sidebar-border/70">
                        {categories.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || ""}
                                preserveScroll
                                className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                                    link.active 
                                        ? "bg-primary text-primary-foreground border-primary" 
                                        : "bg-background hover:bg-muted text-muted-foreground"
                                } ${!link.url ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
    );
}