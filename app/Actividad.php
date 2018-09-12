<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class Actividad extends Model
{
    use Filterable;

    protected $table = 'dge_actividades';
    protected $primaryKey = 'id_actividad';

    public $fillable = [
     	'actividad',
     	'unidad_apoyo',
     	'mes_inicio',
     	'anho_inicio',
     	'mes_termino',
     	'anho_termino',
     	'detalle_gasto',
     	'monto_total',
        'hito',
     	'origen_recurso',
        'recursos'
    ];

    public function unidad(){
        return $this->belongsTo(UnidadEstrategica::class, 'unidad_apoyo', 'id_unidad_estrategica');
    }

    public function hito()
    {
        return $this->belongsTo(Hito::class, 'hito', 'id_hito');
    }
}
