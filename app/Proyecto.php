<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class Proyecto extends Model
{
    use Filterable;
    protected $table = 'dge_proyectos';
    protected $primaryKey = 'id';

    protected $fillable = [
    	'iniciativa',
    	'unidad_responsable',
        'avance',
        'estrategia'
    ];

    public function estrategia(){
       return $this->belongsTo(EstrategiaProyectos::class, 'estrategia', 'id');
    }

    public function hitos(){
       return $this->hasMany(ActividadProyectos::class, 'proyecto', 'id');
    }

    public function unidad(){
       return $this->belongsTo(UnidadEstrategica::class, 'unidad_responsable', 'id_unidad_estrategica');
    }


}
