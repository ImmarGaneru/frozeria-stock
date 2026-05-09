<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(){
        try {
            $categories = Category::withCount('products')->get();
            return Inertia::render('kategori',[
                'categories' => $categories
            ]);
        } catch (\Exception $e) {
            return Inertia::render('kategori', [
                'category' => [],
                'errors' => $e->getMessage()
            ]);
        }
    }
}
