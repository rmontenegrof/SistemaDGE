<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use App\Iniciativa;
use App\Filters\IniciativaFilter;
use App\Http\Controllers\ApiController;

class IniciativasController extends ApiController
{
    public function index(IniciativaFilter $filter)
    {
        $query = Iniciativa::with('estrategias.estrategia','unidad')->filter($filter);
        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'activo'                => 'required',
            'anho_fin'              => 'required|numeric',
            'anho_inicio'           => 'required|numeric',
            'descripcion'           => 'required',
            'descripcion_corta'     => 'required',
            'responsable'           => 'required',
            'semestre_fin'          => 'required',
            'semestre_inicio'       => 'required',
            'unidad_apoyo'          => 'required',
            'origen_iniciativa'     => 'required',
            'estado_avance'         => 'required',
        ]);
        Iniciativa::create($request->all());
        return $this->respondStore();
    }

    public function show($id)
    {
        return Iniciativa::find($id)->load('unidad');
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'activo'                => 'required',
            'anho_fin'              => 'required|numeric',
            'anho_inicio'           => 'required|numeric',
            'descripcion'           => 'required',
            'descripcion_corta'     => 'required',
            'responsable'           => 'required',
            'semestre_fin'          => 'required',
            'semestre_inicio'       => 'required',
            'unidad_apoyo'          => 'required',
            'origen_iniciativa'     => 'required',
            'estado_avance'         => 'required',
        ]);
        $iniciativa = Iniciativa::find($id);
        $iniciativa->fill($request->all())->save();
        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $iniciativa = Iniciativa::find($id);
        $iniciativa->delete();
        return $this->respondDestroy();
    }

    public function all()
    {
        return Iniciativa::all();
    }    
}
