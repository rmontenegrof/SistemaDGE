<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\User;
use App\Role;
use App\UsuarioUnidad;
use App\Filters\UserFilter;
use App\Http\Requests;
use App\Http\Controllers\ApiController;

class UsersController extends ApiController
{
    public function index(UserFilter $filter)
    {
        $query = User::with('unidades.unidad')->filter($filter);

        return $this->respondIndex($query);
    }

    public function show($id)
    {

        return User::findOrFail($id)->load('unidades.unidad');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'nombres'     => 'required|max:255',
            'mail'        => 'required|email|max:255|unique:dge_usuario',
            'password'    => 'required|min:6',
            'cargo'       => 'required|max:255',
            'ip'          => 'required',
            'unidades'    => 'required|array',
        ]);

        $request->merge(['activo' => 1]);
        $request->merge(['area' => "Departamento de gestión estratégica"]);
        $user = User::create($request->all());
        foreach ($request->unidades as $unidad ) {
            UsuarioUnidad::create([
                "dge_usuario_id_usuario" => $user->id_usuario,
                "dge_unidad_estrategica_id_unidad_estrategica" => $unidad
            ]);
        }
        return $this->respondStore();
    }

    public function update($id, Request $request)
    {
        $user = User::find($request->id_usuario); 
        $this->validate($request, [
            'name'       => 'sometimes|required|max:255',
            'mail'       => 'sometimes|required|email|max:255|unique:dge_usuario,mail,' . $user->id_usuario . ',id_usuario',
            'password'   => 'sometimes|required|min:6',
            'unidades'   => 'sometimes|required'
        ]); 
        $user->nombres          = $request->nombres;
        $user->apellido_materno = $request->apellido_materno;
        $user->apellido_paterno = $request->apellido_paterno;
        $user->cargo            = $request->cargo;
        $user->mail             = $request->mail;
        $user->usuario          = $request->usuario;
        //Consultar si quiere que se actualice contraseña
        $user->password         = $request->password;
        $relaciones = UsuarioUnidad::where('dge_usuario_id_usuario', $request->id_usuario)->delete();
        foreach ($request->unidades as $unidad) {
            UsuarioUnidad::create([
                "dge_usuario_id_usuario" => intval($user->id_usuario),
                "dge_unidad_estrategica_id_unidad_estrategica" => intval($unidad)
            ]);
        }
        $user->save();
        return $this->respondUpdate();
    }

    public function destroy(User $user)
    {
        $user->delete();
        return $this->respondDestroy();
    }

    public function changePassword(Request $request)
    {
        $this->validate($request, [
            'password' => 'required|confirmed|min:6',
        ]);

        $user = $request->user();
        $user->password = $request->password;
        $user->save();

        return $this->respond([
            'message' => 'Clave actualizada correctamente'
        ]);
    }
}
