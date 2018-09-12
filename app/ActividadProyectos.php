<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class ActividadProyectos extends Model
{
    use Filterable;    
    protected $table = 'dge_proyectos_actividades';
    protected $primaryKey = 'id';

    protected $fillable = [
    	'actividad',
        'hito',
    	'medio_verificacion',
    	'unidad_apoyo',
    	'fecha_inicio',
    	'fecha_fin',
    	'recursos',
    	'detalle_gasto'
    ];

    public function hito(){
       return $this->belongsTo(HitoProyectos::class, 'hito', 'id');
    }

    public function unidad(){
       return $this->belongsTo(UnidadApoyo::class, 'unidad_apoyo', 'id_unidad_apoyo');
    }
}
