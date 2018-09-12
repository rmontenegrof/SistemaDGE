<?php

namespace App\Filters;

class UnidadFilter extends QueryFilter
{
    public function unidad($value = null)
    {
        return $this->builder->where('unidad', 'like', "%$value%");
    }
    public function estado($value = null)
    {
        $value = ($value==2)?0:1;
        return $this->builder->where('estado', $value);
    }
}
