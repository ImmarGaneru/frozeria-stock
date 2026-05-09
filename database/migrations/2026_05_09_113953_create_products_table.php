<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('unit');              // satuan: pcs, pack, box, dll
            $table->integer('stock')->default(0);
            $table->integer('min_stock')->default(0);
            $table->bigInteger('sell_price');   // harga jual (Rp)
            $table->bigInteger('buy_price');    // harga beli (Rp)
            $table->string('weight')->nullable();    // berat/ukuran, e.g. "500 gram"
            $table->string('location')->nullable();  // lokasi simpan, e.g. "Rak A-3"
            $table->text('description')->nullable();
            $table->string('photo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
