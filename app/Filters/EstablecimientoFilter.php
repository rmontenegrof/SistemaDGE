<?php

namespace App\Filters;

class EstablecimientoFilter extends QueryFilter
{
    public function name($value = null)
    {
        return $this->builder->where('name', 'like', "%$value%");
    }

    public function code($value = null)
    {
        return $this->builder->where('code', 'like', "%$value%");
    }

    public function comuna($value = null)
    {
        return $this->builder->whereHas('comuna', function ($q) use ($value) {
            $q->where('name', 'like', "%$value%");
        });
    }
}
