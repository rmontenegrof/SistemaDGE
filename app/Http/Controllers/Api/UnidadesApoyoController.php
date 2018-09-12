<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\UnidadApoyo;
use App\Filters\UnidadApoyoFilter;
use App\Http\Controllers\ApiController;

class UnidadesApoyoController extends ApiController
{
    public function index(UnidadApoyoFilter $filter)
    {
        $query = UnidadApoyo::filter($filter);

        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'unidad_apoyo' => 'required',
        ]);

        UnidadApoyo::create($request->all());

        return $this->respondStore();
    }

    public function show( $id)
    {
        return UnidadApoyo::find($id);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'unidad_apoyo' => 'required',
        ]);
        $unidad = UnidadApoyo::find($id);
        $unidad->fill($request->all())->save();

        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $unidad = UnidadApoyo::find($id);
        $unidad->delete();
        return $this->respondDestroy();
    }

    public function all()
    {
        return UnidadApoyo::all();
    }
}