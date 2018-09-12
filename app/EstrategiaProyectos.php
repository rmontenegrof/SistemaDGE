<?php

namespace App;

use App\Filters\Filterable;
use Illuminate\Database\Eloquent\Model;

class EstrategiaProyectos extends Model
{
    use Filterable;
    protected $table = 'dge_proyectos_estrategias';
    protected $primaryKey = 'id';

    protected $fillable = [
    	'estrategia',
        'objetivo',
        'activo'
    ];

    public function objetivo(){
       return $this->belongsTo(ObjetivoProyectos::class, 'objetivo', 'id');
    }

    public function proyectos(){
       return $this->hasMany(ActividadProyectos::class, 'estrategia', 'id');
    }

}