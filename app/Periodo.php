<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class Periodo extends Model
{
    use Filterable;

    protected $table = 'dge_periodo';
    protected $primaryKey = 'id_periodo';
    public $timestamps = false;

    protected $fillable = [
    	'activo',
    	'anho_fin',
    	'anho_inicio',
    	'descripcion',
    	'editable'
    ];
}
