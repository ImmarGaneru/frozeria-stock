<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'ayam', 'description' => 'produk makanan yang berasal dari ayam'],
            ['name' => 'sapi', 'description' => 'produk makanan yang berasal dari sapi'],
            ['name' => 'seafood', 'description' => 'produk makanan yang berasal dari laut'],
            ['name' => 'sayuran', 'description' => 'produk makanan yang berasal dari tanaman'],
        ]);
    }
}
