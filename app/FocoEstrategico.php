<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class FocoEstrategico extends Model
{
	use Filterable;
    protected $table = 'dge_foco_estrategico';
    protected $primaryKey = 'id_foco_estrategico';
    public $timestamps = false;

    protected $fillable = [
    	'activo',
    	'descripcion_foco'
    ];

}
