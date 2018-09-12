<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Path extends Model
{
    protected $table = 'dge_path';
    public $timestamps = false;

    protected $fillable = [
    	'definicion',
    	'path'
    ];
}
