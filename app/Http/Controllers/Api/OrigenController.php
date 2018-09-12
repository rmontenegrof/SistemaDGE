<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Origen;
use App\Filters\OrigenFilter;
use App\Http\Controllers\ApiController;

class OrigenController extends ApiController
{
    public function index(OrigenFilter $filter)
    {
        $query = Origen::filter($filter);
        return $this->respondIndex($query);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'origen'                => 'required',
        ]);

        origen::create($request->all());
        return $this->respondStore();
    }

    public function show( $id)
    {
        return Origen::find($id);
    }

    public function update(Request $request,  $id)
    {
        $this->validate($request, [
            'origen'                => 'required',
        ]);
        $origen = Origen::find($id);
        $origen->fill($request->all())->save();

        return $this->respondUpdate();
    }

    public function destroy($id)
    {
        $origen = Origen::find($id);
        $origen->delete();
        return $this->respondDestroy();
    }

    public function all()
    {
        return Origen::all();
    }
}