<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request){
        try {
            $query = Product::with('category');

            if ($request->filled('search')){
                $query->where('name', 'like', '%' . $request->input('search') . '%');
            }

            if ($request->filled('category_id')){
                $query->where('category_id', $request->input('category_id'));
            }

            $products = $query->paginate(10)->withQueryString();
            return Inertia::render('dashboard',[
                'products' => $products,
                'categories' => Category::all(),
                'stats' => [
                    'total' => Product::count(),
                    'totalCategory' => Category::count(),
                    'lowStock' => Product::where('stock', '<', 'min_stock')->count(),
                    'emptyStock' => Product::where('stock', 0)->count(),
                ],
                'filters' => $request->only(['search', 'category_id'])
            ]);
        } catch (\Exception $e) {
            return Inertia::render('dashboard', [
                'products'   => [],
                'categories' => [],
                'stats'      => [],
                'filters'    => [],
                'errors'     => $e->getMessage()
            ]);
        }
    }
}
