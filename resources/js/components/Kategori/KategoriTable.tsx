import type { Category } from "@/types/category";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Eye, Trash2 } from "lucide-react";

interface KategoriTableProps {
    categories: Category[];
}

export function KategoriTable({categories}: KategoriTableProps){
    return (
        <div className="mx-auto w-full max-w-6xl p-4"> 
            <div className="rounded-xl border border-sidebar-border/70 overflow-hidden pb-5 px-2">
                <Table>
                    <TableCaption>{categories.length} kategori terdaftar</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead className="text-center">Nama Kategori</TableHead>
                        <TableHead className="text-center">Jumlah barang</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((id) => (
                        <TableRow key={id.id}>
                            <TableCell className="font-medium">{id.id}</TableCell>
                            <TableCell className="text-center">{id.name}</TableCell>
                            <TableCell className="text-center">{id.products_count}</TableCell>
                            <TableCell className="text-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                //onClick=""
                                                className="h-8 w-8 text-blue-600 disabled:text-gray-400"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            View Baseline Detail
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-600 disabled:text-gray-400"
                                            >
                                                <Trash2/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Delete Baseline</TooltipContent>
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
        </div>
    );
}