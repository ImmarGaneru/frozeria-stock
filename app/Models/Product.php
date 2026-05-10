<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'category_id',
    'name',
    'unit',
    'stock',
    'min_stock',
    'sell_price',
    'buy_price',
    'weight',
    'location',
    'description',
    'photo',
])]
class Product extends Model
{
    protected $attribute = [
        'category_id',
        'name',
        'unit',
        'stock',
        'min_stock',
        'sell_price',
        'buy_price',
        'weight',
        'location',
        'description',
        'photo',
    ];

    public function category(){
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
