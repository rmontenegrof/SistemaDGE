<?php

namespace App\Filters;

class FocoFilter extends QueryFilter
{
    public function foco($value = null)
    {
        return $this->builder->where('descripcion_foco', 'like', "%$value%");
    }
    public function estado($value = null)
    {
        $value = ($value==2)?0:1;
        return $this->builder->where('activo', $value);
    }
}
