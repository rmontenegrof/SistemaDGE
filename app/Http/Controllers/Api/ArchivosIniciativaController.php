<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
set_time_limit(-1);
use App\Files;
use App\Filters\ArchivoFilter;
use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use DB;

class ArchivosIniciativaController extends ApiController
{
    protected $folder = 'uploads/';

    public function index($iniciativa, ArchivoFilter $filter)
    {
        $files = Files::where('id_iniciativa_file', $iniciativa)
                        ->orderBy('fecha_subida', 'desc')
                        ->filter($filter);

        return $this->respondIndex($files);
    }

    public function store($iniciativa, Request $request)
    {
        $validations = [
            'file'          => 'required|file',
        ];

        $this->validate($request, $validations);

        $nombre_original = $request->file('file')->getClientOriginalName();
        $filename = $this->filename($request->file('file'));
        
        $request->file('file')->move($this->folder, $filename);


        $campos = [
            'name_file' => $filename,
            'path' => $this->folder, 
            'fecha_subida' => Carbon::now()->format('Y-m-d'),
            'real_name' => $nombre_original,
            'id_iniciativa_file' => $iniciativa
        ];

        $archivo = Files::create($campos);

        return $this->respondStore('Archivo cargado en el sistema');
    }

    public function destroy($iniciativa, $archivo)
    {
        $archivo = Files::find($archivo);
        \File::delete(public_path($archivo->archivo));
        $archivo->delete();

        return $this->respondDestroy();
    }

    private function filename($file)
    {
        return uniqid() . '_' . $file->getClientOriginalName();
    }
}