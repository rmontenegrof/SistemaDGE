<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class Hito extends Model
{
    use Filterable;
    
    protected $table = 'dge_hitos';
    protected $primaryKey = 'id_hito';

    protected $fillable = [
        'nombre',
        'responsable',
        'medios_verificacion',
        'observacion',
        'iniciativa'
    ];

    public function iniciativa(){
        return $this->belongsTo(Iniciativa::class, 'iniciativa', 'id_iniciativa');
    }

    public function actividades()
    {
        return $this->hasMany(Actividad::class, 'hito', 'id_hito');
    }
}
