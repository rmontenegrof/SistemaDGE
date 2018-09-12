<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
set_time_limit(-1);
use App\Docs;
use App\Filters\ArchivoFilter;
use App\Http\Requests;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use DB;

class ArchivosController extends ApiController
{
    protected $folder = 'docs/';

    public function index(ArchivoFilter $filter)
    {
        $docs = Docs::orderBy('fecha_subida', 'desc')->filter($filter);
        return $this->respondIndex($docs);
    }

    public function store(Request $request)
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
            'real_name' => $nombre_original
        ];

        $archivo = Docs::create($campos);

        return $this->respondStore('Archivo cargado en el sistema');
    }

    public function destroy($id)
    {
        $archivo = Docs::find($id);
        \File::delete(public_path($archivo->archivo));
        $archivo->delete();

        return $this->respondDestroy();
    }

    private function filename($file)
    {
        return uniqid() . '_' . $file->getClientOriginalName();
    }
}
