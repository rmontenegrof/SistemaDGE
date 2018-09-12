<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IniciativaEstrategia extends Model
{
    protected $table = 'dge_iniciativa_estrategia';
    public $timestamps = false;

    protected $fillable = [
    	'dge_estrategias_id_estrategia', 
    	'dge_iniciativas_id_iniciativa'
    ];

    public function estrategia(){
       return $this->belongsTo(Estrategia::class, 'dge_estrategias_id_estrategia', 'id_estrategia');
    }
    public function iniciativa(){
       return $this->belongsTo(Iniciativa::class, 'dge_iniciativas_id_iniciativa', 'id_iniciativa');
    }

}
