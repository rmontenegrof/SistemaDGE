<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class Estrategia extends Model
{
    use Filterable;

    protected $table = 'dge_estrategias';
    protected $primaryKey = 'id_estrategia';
    public $timestamps = false;

    protected $fillable = [
    	'activo',
    	'avanceEst',
    	'estrategia',
    	'ponderacion'
    ];

    public function objetivos(){
       return $this->hasMany(EstrategiaObjetivo::class, 'dge_estrategias_id_estrategia', 'id_estrategia');
    }

    public function iniciativas(){
       return $this->hasMany(IniciativaEstrategia::class, 'dge_estrategias_id_estrategia', 'id_estrategia');
    }
}
