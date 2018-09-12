<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\HitoProyectos;
use App\Filters\HitoProyectoFilter;
use App\Http\Controllers\ApiController;

class ProyectosHitosController extends ApiController
{
    public function index(HitoProyectoFilter $filter)
    {
        $query = HitoProyectos::with('actividades', 'proyecto')->filter($filter);
        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'hito'          => 'required|max:255',
            'responsable'   => 'required|max:255',
            'origen'        => 'required',
            'proyecto'      => 'required',
            'monto_total'   => 'required',
            'observacion'   => 'required|max:255',
        ]);

        HitoProyectos::create($request->all());
        return $this->respondStore();
    }

    public function show( $id)
    {
        return HitoProyectos::find($id);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'hito'          => 'required|max:255',
            'responsable'   => 'required|max:255',
            'origen'        => 'required',
            'proyecto'      => 'required',
            'monto_total'   => 'required',
            'observacion'   => 'required|max:255',
        ]);
        $hito = HitoProyectos::find($id);
        $hito->fill($request->all())->save();
        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $hito = HitoProyectos::find($id);
        $hito->delete();
        return $this->respondDestroy();
    }

    public function all()
    {
        return HitoProyectos::all();
    }
}