<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
                    'lowStock' => Product::whereColumn('stock', '<', 'min_stock')->count(),
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

    public function create(){
        try {
            $query = Category::withCount('products');

            $categories = $query->get();
            
            return Inertia::render('dashboard/create',[
                'categories' => $categories
            ]);
        } catch (\Exception $e) {
            return Inertia::render('dashboard/create', [
                'categories' => ['data' => [], 'total' => 0],
                'errors' => $e->getMessage()
            ]);
        }
    }

    public function store(Request $request){
        $request->validate([
            'category_id' => 'required|integer|exists:categories,id',
            'name' => 'required|string',
            'unit' => 'required|string',
            'stock' => 'required|integer',
            'min_stock' => 'nullable|integer',
            'sell_price' => 'nullable|integer',
            'buy_price' => 'nullable|integer',
            'weight' => 'nullable|string',
            'location' => 'nullable|string',
            'description' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        try {
            $product = Product::create([
                'category_id' => $request->input('category_id'),
                'name' => $request->input('name'),
                'unit' => $request->input('unit'),
                'stock' => $request->input('stock'),
                'min_stock' => $request->input('min_stock'),
                'sell_price' => $request->input('sell_price'),
                'buy_price' => $request->input('buy_price'),
                'weight' => $request->input('weight'),
                'location' => $request->input('location'),
                'description' => $request->input('description'),
                'photo' => $request->hasFile('photo') ? $request->file('photo')->store('products', 'public') : null,
            ]);

            return redirect()->route('dashboard.index');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function show(Product $product){
        return Inertia::render('dashboard/show', [
            'product' => $product->load('category'),
        ]);
    }

    public function edit(Product $product){
        try {
            $categories = Category::withCount('products')->get();
            
            return Inertia::render('dashboard/edit', [
                'product' => $product,
                'categories' => $categories
            ]);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function update(Request $request, Product $product){
        $request->validate([
            'category_id' => 'required|integer|exists:categories,id',
            'name' => 'required|string',
            'unit' => 'required|string',
            'stock' => 'required|integer',
            'min_stock' => 'nullable|integer',
            'sell_price' => 'nullable|integer',
            'buy_price' => 'nullable|integer',
            'weight' => 'nullable|string',
            'location' => 'nullable|string',
            'description' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        try {
            $data = $request->only([
                'category_id', 'name', 'unit', 'stock', 'min_stock', 
                'sell_price', 'buy_price', 'weight', 'location', 'description'
            ]);

            // Jika user mengupload foto baru
            if ($request->hasFile('photo')) {
                // Hapus foto lama jika ada
                if ($product->photo) {
                    Storage::disk('public')->delete($product->photo);
                }
                $data['photo'] = $request->file('photo')->store('products', 'public');
            }

            $product->update($data);

            return redirect()->route('dashboard.index');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(Product $product){
        try {
            if ($product->photo) {
                Storage::disk('public')->delete($product->photo);
            }
            
            $product->delete();
            return redirect()->route('dashboard.index');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
