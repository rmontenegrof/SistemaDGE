<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class Origen extends Model
{
    use Filterable;
    
    protected $table = 'dge_origen';
    protected $primaryKey = 'id_origen';

    protected $fillable = [
        'origen'
    ];

    public function actividades()
    {
        return $this->hasMany(Actividad::class, 'origen_recurso', 'id_origen');
    }

}
