<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\UnidadEstrategica;
use App\Filters\UnidadFilter;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Auth;

class UnidadesController extends ApiController
{
    public function index(UnidadFilter $filter)
    {
        $query = UnidadEstrategica::filter($filter);
        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'unidad'      => 'required|max:255',
            'mision'      => 'required',
            'vision'      => 'required',
            'id_grupo'    => 'required',
            'estado'      => 'required',
            'CodCC'       => 'required|max:255',
        ]);
        UnidadEstrategica::create($request->all());

        return $this->respondStore();
    }

    public function show( $id)
    {
        return UnidadEstrategica::find($id);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'unidad'      => 'required|max:255',
            'mision'      => 'required',
            'vision'      => 'required',
            'id_grupo'    => 'required',
            'estado'      => 'required',
            'CodCC'       => 'required|max:255',
        ]);
        $unidad = UnidadEstrategica::findOrFail($id);
        $unidad->fill($request->all())->save();
        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $unidad = UnidadEstrategica::findOrFail($id);
        $unidad->delete();
        return $this->respondDestroy();
    }

    public function all()
    {
        $id_usuario = Auth::user()->id_usuario;
        if (Auth::user()->tipo == 3) {
            return UnidadEstrategica::with(['objetivos.foco','objetivos.estrategias.estrategia.iniciativas.iniciativa.hitos.actividades', 'objetivos.estrategias.estrategia.iniciativas.iniciativa.unidad'])->get();
        }
        else {
            return UnidadEstrategica::whereHas('usuarios', function ($w) use ($id_usuario) {
                $w->where('dge_usuario_id_usuario', $id_usuario);
            })->with(['objetivos.foco','objetivos.estrategias.estrategia.iniciativas.iniciativa.hitos.actividades', 'objetivos.estrategias.estrategia.iniciativas.iniciativa.unidad'])->get();
        }
    }

    public function sendEmail(Request $request)
    {   
        $email = "dge@usach.cl";
        $destinatarios = "";
        foreach ($request->destinatarios as $unidad){
            dd($unidad);
            $usuarios = $unidad::findOrFail($unidad)->load('usuarios.usuario')->usuarios;
            foreach ($usuarios as $usuario) {
                if($usuario != null)
                    $destinatarios = $destinatarios.", ".$usuario->mail;
            }
        }
        mail($destinatarios,"'$request->asunto'","
            Comunicado en Sistema de lineamientos estrategicos
            Mensaje: '.$request->mensaje.'
            ","From: $ema");
    }
}