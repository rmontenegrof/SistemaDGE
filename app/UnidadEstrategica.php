<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class UnidadEstrategica extends Model
{
    use Filterable;

    protected $table = 'dge_unidad_estrategica';
    protected $primaryKey = 'id_unidad_estrategica';
    public $timestamps = false;

    protected $fillable = [
    	'CodCC',
    	'estado',
    	'id_grupo',
    	'mision',
    	'unidad',
    	'vision'
    ];

    public function usuarios(){
       return $this->hasMany(UsuarioUnidad::class, 'dge_unidad_estrategica_id_unidad_estrategica', 'id_unidad_estrategica');
    }

    public function objetivos(){
       return $this->hasMany(Objetivo::class, 'unidad', 'id_unidad_estrategica');
    }

    public function actividades()
    {
        return $this->hasMany(Actividad::class, 'unidad_apoyo', 'id_unidad_estrategica');
    }


}
