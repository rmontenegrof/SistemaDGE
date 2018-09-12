<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Actividad;
use App\Filters\ActividadFilter;
use App\Http\Controllers\ApiController;

class ActividadesController extends ApiController
{
    public function index(ActividadFilter $filter)
    {
        $query = Actividad::with(['unidad','hito.iniciativa'])->filter($filter);

        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'actividad'         => 'required',
            'unidad_apoyo'      => 'required',
            'mes_inicio'        => 'required|numeric',
            'anho_inicio'       => 'required|numeric',
            'mes_termino'       => 'required|numeric',
            'anho_termino'      => 'required|numeric',
            'detalle_gasto'     => 'required',
            'origen_recurso'    => 'required',
            'hito'              => 'required',
            'recursos'          => 'required',
        ]);

        Actividad::create($request->all());

        return $this->respondStore();
    }

    public function show($id)
    {
        return Actividad::find($id)->load(['unidad','hito.iniciativa']);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'actividad'         => 'required',
            'unidad_apoyo'      => 'required',
            'mes_inicio'        => 'required|numeric',
            'anho_inicio'       => 'required|numeric',
            'mes_termino'       => 'required|numeric',
            'anho_termino'      => 'required|numeric',
            'detalle_gasto'     => 'required',
            'origen_recurso'    => 'required',
            'hito'              => 'required',
            'recursos'          => 'required',
        ]);

        $request->merge(['hito' => $request->hito["id_hito"]]);
             
        $actividad = Actividad::find($id);
        $actividad->fill($request->all())->save();

        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $actividad = Actividad::find($id);
        $actividad->delete();
        return $this->respondDestroy();
    }
}
