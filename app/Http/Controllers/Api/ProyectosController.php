<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Proyecto;
use App\Filters\ProyectoFilter;
use App\Http\Controllers\ApiController;

class ProyectosController extends ApiController
{
    public function index(ProyectoFilter $filter)
    {
        $query = Proyecto::with('estrategia', 'unidad')->filter($filter);
        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'iniciativa'           => 'required|max:255',
            'unidad_responsable'   => 'required',
            'avance'               => 'required',
            'estrategia'           => 'required',
        ]);

        Proyecto::create($request->all());
        return $this->respondStore();
    }

    public function show( $id)
    {
        return Proyecto::find($id);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'iniciativa'           => 'required|max:255',
            'unidad_responsable'   => 'required',
            'avance'               => 'required',
            'estrategia'           => 'required',
        ]);
        $proyecto = Proyecto::find($id);
        $proyecto->fill($request->all())->save();
        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $proyecto = Proyecto::find($id);
        $proyecto->delete();
        return $this->respondDestroy();
    }

    public function all()
    {
        return Proyecto::all();
    }
}