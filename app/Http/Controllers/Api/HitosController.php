<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Hito;
use App\Filters\HitoFilter;
use App\Http\Controllers\ApiController;

class HitosController extends ApiController
{
    public function index(HitoFilter $filter)
    {
        $query = Hito::with('iniciativa')->filter($filter);
        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'nombre'                => 'required',
            'responsable'           => 'required',
            'medios_verificacion'   => 'required',
            'observacion'           => 'required',
        ]);

        Hito::create($request->all());
        return $this->respondStore();
    }

    public function show( $id)
    {
        return Hito::find($id);
    }

    public function update(Request $request,  $id)
    {
        $this->validate($request, [
            'nombre'                => 'required',
            'responsable'           => 'required',
            'medios_verificacion'   => 'required',
            'observacion'           => 'required',
        ]);
        $hito = Hito::find($id);
        $hito->fill($request->all())->save();

        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $hito = Hito::find($id);
        $hito->delete();
        return $this->respondDestroy();
    }

    public function all()
    {
        return Hito::all();
    }
}