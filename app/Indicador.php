<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Indicador extends Model
{
    protected $table = 'dge_indicadores';
    protected $primaryKey = 'id_indicador';
    public $timestamps = false;

    protected $fillable = [
    	'Indicador',
    	'meta_1',
    	'meta_2',
    	'meta_3',
    	'meta_4',
    	'meta_5',
    	'unit',
    	'valor_1',
    	'valor_2',
    	'valor_3',
    	'valor_4',
    	'valor_5'
    ];
}
