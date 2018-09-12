<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    protected $table = 'dge_grupos';
    protected $primaryKey = 'id_grupo';
    public $timestamps = false;

    protected $fillable = [
    	'desc_grupo'
    ];
}
