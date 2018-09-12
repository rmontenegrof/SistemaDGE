<?php

namespace App\Filters;

class ProyectoFilter extends QueryFilter
{
    public function iniciativa($value = null)
    {
        return $this->builder->where('iniciativa', 'like', "%$value%");
    }
}
