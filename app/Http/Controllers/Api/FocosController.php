<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\FocoEstrategico;
use App\Filters\FocoFilter;
use App\Http\Controllers\ApiController;

class FocosController extends ApiController
{
    public function index(FocoFilter $filter)
    {
        $query = FocoEstrategico::filter($filter);
        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'activo'            => 'required',
            'descripcion_foco'  => 'required|max:255',
        ]);

        FocoEstrategico::create($request->all());
        return $this->respondStore();
    }

    public function show( $id)
    {
        return FocoEstrategico::find($id);
    }

    public function update(Request $request,  $id)
    {
        $this->validate($request, [
            'activo'            => 'required',
            'descripcion_foco'  => 'required|max:255',
        ]);
        
        $foco = FocoEstrategico::find($id);
        $foco->fill($request->all())->save();

        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $foco = FocoEstrategico::find($id);
        $foco->delete();
        return $this->respondDestroy();
    }

    public function all()
    {
        return FocoEstrategico::all();
    }
}