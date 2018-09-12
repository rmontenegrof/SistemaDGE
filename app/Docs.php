<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Filters\Filterable;

class Docs extends Model
{
	use Filterable;
	
    protected $table = 'dge_docs';
    protected $primaryKey = 'id_file';
    public $timestamps = false;

    protected $fillable = [
    	'name_file',
    	'fecha_subida',
    	'path',
    	'real_name'
    ];
}
