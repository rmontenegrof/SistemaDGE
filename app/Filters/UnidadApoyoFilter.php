<?php

namespace App\Filters;

class UnidadApoyoFilter extends QueryFilter
{
    public function unidad($value = null)
    {
        return $this->builder->where('unidad_apoyo', 'ilike', "%$value%");
    }
}
