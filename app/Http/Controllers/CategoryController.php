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

    public function create()
    {
        return Inertia::render('kategori/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);

        try {
            Category::create($request->only(['name', 'description']));
            return redirect()->route('kategori.index');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function edit(Category $category)
    {
        return Inertia::render('kategori/edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);

        try {
            $category->update($request->only(['name', 'description']));
            return redirect()->route('kategori.index');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(Category $category)
    {
        try {
            $category->delete();
            return redirect()->route('kategori.index');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
