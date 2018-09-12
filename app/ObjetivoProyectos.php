<?php

namespace App;

use App\Filters\Filterable;
use Illuminate\Database\Eloquent\Model;

class ObjetivoProyectos extends Model
{
    use Filterable;
    
    protected $table = 'dge_proyectos_objetivos';
    protected $primaryKey = 'id';

    protected $fillable = [
        'objetivo',
        'activo',
        'foco'
    ];

    public function foco(){
       return $this->hasOne(FocoEstrategico::class, 'id_foco_estrategico', 'foco');
    }

    public function estrategia(){
       return $this->hasOne(EstrategiaProyectos::class, 'id', 'estrategia');
    }

}