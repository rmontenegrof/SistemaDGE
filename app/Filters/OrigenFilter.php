<?php

namespace App\Filters;

class OrigenFilter extends QueryFilter
{
    public function origen($value = null)
    {
        return $this->builder->where('origen', 'like', "%$value%");
    }
}
