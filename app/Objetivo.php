<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class Objetivo extends Model
{
    use Filterable;
    protected $table = 'dge_objetivos';
    protected $primaryKey = 'id_objetivo';
    public $timestamps = false;

    protected $fillable = [
    	'activo',
    	'avanceObj',
    	'foco',
    	'objetivo',
    	'objetivo_pei',
    	'periodo',
    	'unidad'
    ];

    public function estrategias(){
       return $this->hasMany(EstrategiaObjetivo::class, 'dge_objetivos_id_objetivo', 'id_objetivo');
    }

    public function unidad()
    {
        return $this->belongsTo(UnidadEstrategica::class, 'unidad', 'id_unidad_estrategica');
    }

    public function foco()
    {
        return $this->belongsTo(FocoEstrategico::class, 'foco', 'id_foco_estrategico');
    }

}
