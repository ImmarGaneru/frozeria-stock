import type { Category } from "./category"

export type Product = {
    id: number,
    category_id: number,
    name: string,
    unit: string,
    stock: number,
    min_stock?: number,
    sell_price?: number,
    buy_price?: number,
    weight?: string,
    location?: string,
    description?: string,
    photo?: string,
    category?: Category,
}

export type Stats = {
    total: number,
    totalCategory: number,
    lowStock: number,
    emptyStock: number,
}

export type PaginatedData<T> = {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}