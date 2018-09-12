<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Grupo;
use App\Http\Controllers\ApiController;

class GruposController extends ApiController
{
    public function index()
    {
        $query = Grupo::all();

        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|max:255',
            'code'      => 'required|max:255|unique:servicios',
            'region_id' => 'required',
        ]);

        Grupo::create($request->all());

        return $this->respondStore();
    }

    public function show(Grupo $grupo)
    {
        if (request()->has('with')) {
            $grupo->load(request()->input('with'));
        }

        return $grupo;
    }

    public function update(Request $request, Grupo $grupo)
    {
        $this->validate($request, [
            'name'      => 'sometimes|required|max:255',
            'code'      => 'sometimes|required|max:255|unique:servicios,code,' . $grupo->id,
            'region_id' => 'sometimes|required',
        ]);

        $grupo->fill($request->all())->save();

        return $this->respondUpdate();
    }

    public function destroy(Grupo $grupo)
    {
        $grupo->delete();

        return $this->respondDestroy();
    }

    public function all()
    {
        return Grupo::all();
    }
}