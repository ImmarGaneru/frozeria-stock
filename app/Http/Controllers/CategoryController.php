<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request){
        try {
            $query = Category::withCount('products');

            if ($request->filled('search')){
                $query->where('name', 'like', '%' . $request->input('search') . '%');
            }
            $categories = $query->paginate(10)->withQueryString();
            
            return Inertia::render('kategori',[
                'categories' => $categories
            ]);
        } catch (\Exception $e) {
            return Inertia::render('kategori', [
                'categories' => ['data' => [], 'total' => 0],
                'errors' => $e->getMessage()
            ]);
        }
    }
}
