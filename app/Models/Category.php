<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name',
    'description'
])]
class Category extends Model
{
    protected $attribute = [
        'name',
        'description',
    ];

    public function products(){
        return $this->hasMany(Product::class, 'category_id', 'id');
    }
}
