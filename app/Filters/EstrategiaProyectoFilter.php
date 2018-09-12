<?php

namespace App\Filters;

class EstrategiaProyectoFilter extends QueryFilter
{
    public function estrategia($value = null)
    {
        return $this->builder->where('estrategia', 'like', "%$value%");
    }
}
