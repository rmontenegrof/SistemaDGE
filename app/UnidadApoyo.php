<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class UnidadApoyo extends Model
{
    use Filterable;

    protected $table = 'dge_unidad_apoyo';
    protected $primaryKey = 'id_unidad_apoyo';
    public $timestamps = false;

    protected $fillable = [
    	'unidad_apoyo'
    ];

    public function iniciativas(){
        return $this->hasMany(Iniciativa::class, 'unidad_apoyo', 'id_unidad_apoyo');
    }
    
}
