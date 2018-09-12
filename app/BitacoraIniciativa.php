<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BitacoraIniciativa extends Model
{
    protected $table = 'dge_usuario';
    protected $primaryKey = 'iddetalle_iniciativa';
    public $timestamps = false;

    protected $fillable = [
    	'descripcion_avance',
    	'dge_iniciativa_id_iniciativa',
    	'fecha_actualizacion'
    ];
}
