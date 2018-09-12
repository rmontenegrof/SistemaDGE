<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\ObjetivoProyectos;
use App\Filters\ObjetivoProyectoFilter;
use App\Http\Controllers\ApiController;

class ProyectosObjetivosController extends ApiController
{
    public function index(ObjetivoProyectoFilter $filter)
    {
        $query = ObjetivoProyectos::with('foco')->filter($filter);
        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'objetivo'       => 'required',
            'activo'         => 'required',
        ]);

        ObjetivoProyectos::create($request->all());
        return $this->respondStore();
    }

    public function show( $id)
    {
        return ObjetivoProyectos::find($id);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'objetivo'       => 'required',
            'activo'         => 'required',
        ]);
        $objetivo = ObjetivoProyectos::find($id);
        $objetivo->fill($request->all())->save();
        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $objetivo = ObjetivoProyectos::find($id);
        $objetivo->delete();
        return $this->respondDestroy();
    }

    public function all()
    {
        return ObjetivoProyectos::all();
    }
}