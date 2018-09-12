<?php

namespace App\Filters;

class HitoProyectoFilter extends QueryFilter
{
    public function hito($value = null)
    {
        return $this->builder->where('hito', 'like', "%$value%");
    }
}
