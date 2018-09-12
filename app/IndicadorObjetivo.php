<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IndicadorObjetivo extends Model
{
    protected $table = 'dge_indicador_objetivo';
    protected $primaryKey = 'id_file';
    public $timestamps = false;

    protected $fillable = [
    	'dge_indicadores_id_indicador',
    	'dge_objetivos_id_objetivo'
    ];
}
