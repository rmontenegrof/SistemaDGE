<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\ActividadProyectos;
use App\Filters\ActividadProyectoFilter;
use App\Http\Controllers\ApiController;

class ProyectosActividadesController extends ApiController
{
    public function index(ActividadProyectoFilter $filter)
    {
        $query = ActividadProyectos::with('hito', 'unidad')->filter($filter);
        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'actividad'           => 'required|max:255',    
	        'hito'                => 'required', 
	    	'medio_verificacion'  => 'required|max:255',
	    	'unidad_apoyo'        => 'required',
	    	'fecha_inicio'        => 'required|max:255',
	    	'fecha_fin'           => 'required|max:255',
	    	'recursos'            => 'required',
	    	'detalle_gasto'       => 'required|max:255',
        ]);

        ActividadProyectos::create($request->all());
        return $this->respondStore();
    }

    public function show( $id)
    {
        return ActividadProyectos::find($id);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'actividad'           => 'required|max:255',    
            'hito'                => 'required', 
            'medio_verificacion'  => 'required|max:255',
            'unidad_apoyo'        => 'required',
            'fecha_inicio'        => 'required|max:255',
            'fecha_fin'           => 'required|max:255',
            'recursos'            => 'required',
            'detalle_gasto'       => 'required|max:255',
        ]);
        $hito = ActividadProyectos::find($id);
        $hito->fill($request->all())->save();
        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $hito = ActividadProyectos::find($id);
        $hito->delete();
        return $this->respondDestroy();
    }
}		