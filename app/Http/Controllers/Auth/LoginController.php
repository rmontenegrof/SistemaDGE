<?php

namespace app\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use \Auth;

class LoginController extends Controller
{

    use AuthenticatesUsers;

    protected $redirectTo = '/home';

    protected $username = 'usuario';

    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'usuario' => 'required',
            'password' => 'required'
        ]);

        if (Auth::once($request->except('_token'))) {
            Auth::user()->updateToken()->save();

            return response()->json(['token' => Auth::user()->api_token]);
        }

        return response()->json(['usuario' => ['Credenciales no validas']], 422);
    }
}
