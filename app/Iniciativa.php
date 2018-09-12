<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class Iniciativa extends Model
{
    use Filterable;
    
    protected $table = 'dge_iniciativas';
    protected $primaryKey = 'id_iniciativa';
    public $timestamps = false;

    protected $fillable = [
        'activo',
        'anho_fin',
        'anho_inicio',
        'avance',
        'descripcion',
        'descripcion_corta',
        'observaciones',
        'ponderacion',
        'responsable',
        'presupuesto',
        'semestre_fin',
        'semestre_inicio',
        'unidad_apoyo',
        'origen_iniciativa',
        'monto_total_periodo',
        'estado_avance',
        'avance'      
    ];

    public function estrategias(){
       return $this->hasMany(IniciativaEstrategia::class, 'dge_iniciativas_id_iniciativa', 'id_iniciativa');
    }

    public function unidad(){
        return $this->belongsTo(UnidadApoyo::class, 'unidad_apoyo', 'id_unidad_apoyo');
    }

    public function hitos()
    {
        return $this->hasMany(Hito::class, 'iniciativa', 'id_iniciativa');
    }

    public function origen()
    {
        return $this->belongsTo(Origen::class, 'origen_iniciativa', 'id_origen');
    }
}
