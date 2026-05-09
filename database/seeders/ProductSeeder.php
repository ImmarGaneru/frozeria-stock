<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'category_id' => 1, // Daging Ayam
                'name' => 'Paha Ayam Fillet',
                'unit' => 'kg',
                'stock' => 25,
                'min_stock' => 5,
                'sell_price' => 55000,
                'buy_price' => 48000,
                'weight' => 1000, // Gram (simpan dalam angka saja)
                'location' => 'Freezer A-1',
            ],
            [
                'category_id' => 1, // Daging Ayam
                'name' => 'Sayap Ayam',
                'unit' => 'kg',
                'stock' => 15,
                'min_stock' => 5,
                'sell_price' => 40000,
                'buy_price' => 32000,
                'weight' => 1000,
                'location' => 'Freezer A-1',
            ],
            [
                'category_id' => 2, // Daging Sapi
                'name' => 'Sirloin Steak Premium',
                'unit' => 'pack',
                'stock' => 10,
                'min_stock' => 3,
                'sell_price' => 125000,
                'buy_price' => 95000,
                'weight' => 250, 
                'location' => 'Freezer B-1',
            ],
            [
                'category_id' => 2, // Daging Sapi
                'name' => 'Daging Giling Sapi',
                'unit' => 'pack',
                'stock' => 20,
                'min_stock' => 5,
                'sell_price' => 65000,
                'buy_price' => 50000,
                'weight' => 500,
                'location' => 'Freezer B-2',
            ],
            [
                'category_id' => 3, // Seafood
                'name' => 'Udang Vaname',
                'unit' => 'kg',
                'stock' => 12,
                'min_stock' => 4,
                'sell_price' => 90000,
                'buy_price' => 75000,
                'weight' => 1000,
                'location' => 'Freezer C-1',
            ],
            [
                'category_id' => 4, // Sayuran
                'name' => 'Jagung Manis',
                'unit' => 'pcs',
                'stock' => 50,
                'min_stock' => 10,
                'sell_price' => 5000,
                'buy_price' => 3500,
                'weight' => 200,
                'location' => 'Chiller D-1',
            ],
            [
                'category_id' => 4, // Sayuran
                'name' => 'Wortel Impor',
                'unit' => 'kg',
                'stock' => 30,
                'min_stock' => 5,
                'sell_price' => 18000,
                'buy_price' => 12000,
                'weight' => 1000,
                'location' => 'Chiller D-2',
            ],
        ]);
    }
}
