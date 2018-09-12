<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Objetivo;
use App\EstrategiaObjetivo;
use App\Filters\ObjetivoFilter;
use App\Http\Requests;
use App\Http\Controllers\ApiController;

class ObjetivosController extends ApiController
{
    public function index(ObjetivoFilter $filter)
    {
        $query = Objetivo::with('unidad')->filter($filter);
        return $this->respondIndex($query);
    }

    public function show($id)
    {
        return Objetivo::findOrFail($id)->load('estrategias.estrategia');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'activo'      => 'required',
            'foco'        => 'required',
            'objetivo'    => 'required|max:255',
            'unidad'      => 'required',
            'avanceObj'   => 'required',
        ]);
        $objetivo = Objetivo::create($request->all());
        return $this->respondStore();
    }

    public function update(Request $request, Objetivo $obj)
    {
        $this->validate($request, [
            'activo'      => 'required',
            'foco'        => 'required',
            'objetivo'    => 'required|max:255',
            'unidad'      => 'required',
            'avanceObj'   => 'required',
        ]);
        $obj->fill($request->all())->save();
        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $obj = Objetivo::find($id);
        $obj->delete();
        return $this->respondDestroy();
    }

    public function objetivos_pei(){
        return Objetivo::where('unidad', 18)->get();
    }

    public function objetivos_acciones(){
        return Objetivo::with('foco', 'unidad', 'estrategias.estrategia.iniciativas.iniciativa')->get();
    }

    public function asociar(Request $request)
    { 
        $relaciones = EstrategiaObjetivo::where('dge_objetivos_id_objetivo', $request->id)->delete();
        //dd($relaciones);
        foreach ($request->estrategias as $estrategia ) {
            EstrategiaObjetivo::create([
                "dge_objetivos_id_objetivo" => intval($request->id),
                "dge_estrategias_id_estrategia" => intval($estrategia)
            ]);
        }
        return $this->respondUpdate();
    }
}
