<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsuarioUnidad extends Model
{
    protected $table = 'dge_usuario_unidad';
    public $timestamps = false;

    protected $fillable = [
    	'dge_usuario_id_usuario',
    	'dge_unidad_estrategica_id_unidad_estrategica'
    ];

    public function usuario(){
       return $this->belongsTo(User::class, 'dge_usuario_id_usuario', 'id_usuario');
    }
    public function unidad(){
       return $this->belongsTo(UnidadEstrategica::class, 'dge_unidad_estrategica_id_unidad_estrategica', 'id_unidad_estrategica');
    }
}
