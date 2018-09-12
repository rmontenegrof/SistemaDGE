<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Estrategia;
use App\IniciativaEstrategia;
use App\Filters\EstrategiaFilter;
use App\Http\Requests;
use App\Http\Controllers\ApiController;

class EstrategiasController extends ApiController
{
    public function index(EstrategiaFilter $filter)
    {
        $query = Estrategia::with('objetivos.objetivo.unidad')->filter($filter);
        return $this->respondIndex($query);
    }
    
    public function show($id)
    {
        return Estrategia::findOrFail($id)->load('iniciativas.iniciativa');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'activo'        => 'required',
            'estrategia'    => 'required',
        ]);
        $request->merge([
            'ponderacion' => 1,
            'avanceObj'   => 0
        ]);
        $estrategia = Estrategia::create($request->all());
        return $this->respondStore();
    }

    public function update(Request $request, Estrategia $estrategia)
    {
        $this->validate($request, [
            'activo'        => 'required',
            'estrategia'    => 'required',
        ]);
        $estrategia->fill($request->all())->save();
        return $this->respondUpdate();
    }

    public function destroy(Estrategia $estrategia)
    {
        $estrategia->delete();
        return $this->respondDestroy();
    }

    public function asociar(Request $request)
    { 
        $relaciones = IniciativaEstrategia::where('dge_estrategias_id_estrategia', $request->id)->delete();
        foreach ($request->iniciativas as $iniciativa ) {
            IniciativaEstrategia::create([
                "dge_estrategias_id_estrategia" => intval($request->id),
                "dge_iniciativas_id_iniciativa" => intval($iniciativa)
            ]);
        }
        return $this->respondUpdate();
    }

    public function all(){
        return Estrategia::all();
    }
}
