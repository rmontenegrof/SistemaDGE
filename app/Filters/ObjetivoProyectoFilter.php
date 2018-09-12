<?php

namespace App\Filters;

class ObjetivoProyectoFilter extends QueryFilter
{
    public function objetivo($value = null)
    {
        return $this->builder->where('objetivo', 'like', "%$value%");
    }
}
