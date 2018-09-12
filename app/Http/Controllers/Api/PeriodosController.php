<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Periodo;
use App\Filters\PeriodoFilter;
use App\Http\Controllers\ApiController;

class PeriodosController extends ApiController
{
    public function index(PeriodoFilter $filter)
    {
        $query = Periodo::filter($filter);
        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'activo'        => 'required',
            'anho_fin'      => 'required|max:255',
            'anho_inicio'   => 'required|max:255',
            'descripcion'   => 'required|max:255',
            'editable'      => 'required',
        ]);

        Periodo::create($request->all());

        return $this->respondStore();
    }

    public function show( $id)
    {
        return Periodo::find($id);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'activo'        => 'required',
            'anho_fin'      => 'required|max:255',
            'anho_inicio'   => 'required|max:255',
            'descripcion'   => 'required|max:255',
            'editable'      => 'required',
        ]);
        $unidad = Periodo::find($id);
        $unidad->fill($request->all())->save();

        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $unidad = Periodo::find($id);
        $unidad->delete();

        return $this->respondDestroy();
    }
    public function all()
    {
        return Periodo::all();
    }
    
    public function all_a()
    {
        return Periodo::where('activo', 1)->get();
    }
}