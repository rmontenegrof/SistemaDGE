<?php

namespace App\Filters;

class UserFilter extends QueryFilter
{
    public function usuario($value = null)
    {
        return $this->builder->where('usuario', 'like', "%$value%");
    }

    public function nombre($value = null)
    {
        return $this->builder->where('nombres', 'like', "%$value%")
                                ->orWhere('apellido_paterno', 'like', "%$value%")
                                ->orWhere('apellido_materno', 'like', "%$value%");
    }

    public function unidad($value = null)
    {
        return $this->builder->whereHas('unidades', function ($q) use ($value) {
            $q->whereHas('unidad', function ($f) use ($value) {
                $f->where('unidad', 'like', "%$value%");
            });
        });
    }
}
