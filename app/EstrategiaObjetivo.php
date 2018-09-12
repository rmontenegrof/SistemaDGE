<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EstrategiaObjetivo extends Model
{
    protected $table = 'dge_estrategias_objetivos';
    protected $primaryKey = 'dge_estrategias_id_estrategia';
    public $timestamps = false;

    protected $fillable = [
    	'dge_objetivos_id_objetivo',
    	'dge_estrategias_id_estrategia'
    ];

    public function estrategia(){
       return $this->belongsTo(Estrategia::class, 'dge_estrategias_id_estrategia', 'id_estrategia');
    }
    public function objetivo(){
       return $this->belongsTo(Objetivo::class, 'dge_objetivos_id_objetivo', 'id_objetivo');
    }
}
