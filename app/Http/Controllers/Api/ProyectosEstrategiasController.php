<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\EstrategiaProyectos;
use App\Filters\EstrategiaProyectoFilter;
use App\Http\Controllers\ApiController;

class ProyectosEstrategiasController extends ApiController
{
    public function index(EstrategiaProyectoFilter $filter)
    {
        $query = EstrategiaProyectos::with('objetivo')->filter($filter);
        
        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'estrategia'     => 'required',
            'objetivo'       => 'required|max:255',
            'activo'         => 'required',
        ]);

        EstrategiaProyectos::create($request->all());
        return $this->respondStore();
    }

    public function show( $id)
    {
        return EstrategiaProyectos::find($id);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'estrategia'     => 'required',
            'objetivo'       => 'required|max:255',
            'activo'         => 'required',
        ]);
        $estrategia = EstrategiaProyectos::find($id);
        $estrategia->fill($request->all())->save();
        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $estrategia = EstrategiaProyectos::find($id);
        $estrategia->delete();
        return $this->respondDestroy();
    }

    public function all()
    {
        return EstrategiaProyectos::all();
    }
}