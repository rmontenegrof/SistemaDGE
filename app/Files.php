<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class Files extends Model
{
    use Filterable;
    
    protected $table = 'dge_files';
    protected $primaryKey = 'id_file';
    public $timestamps = false;

    protected $fillable = [
    	'name_file',
    	'fecha_subida',
    	'path',
    	'real_name',
    	'id_iniciativa_file'
    ];
}
