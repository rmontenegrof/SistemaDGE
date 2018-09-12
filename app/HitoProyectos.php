<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class HitoProyectos extends Model
{
    use Filterable;
    
    protected $table = 'dge_proyectos_hitos';
    protected $primaryKey = 'id';

    protected $fillable = [
    	'hito',
    	'responsable',
    	'origen',
    	'proyecto',
    	'monto_total',
    	'observacion'
    ];

    public function proyecto(){
       return $this->belongsTo(Proyecto::class, 'proyecto', 'id');
    }

    public function actividades(){
       return $this->hasMany(ActividadProyectos::class, 'hito', 'id');
    }
}