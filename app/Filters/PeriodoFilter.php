<?php

namespace App\Filters;

class PeriodoFilter extends QueryFilter
{
    public function periodo($value = null)
    {
        return $this->builder->where('descripcion', 'like', "%$value%");
    }

    public function estado($value = null)
    {
        $value = ($value==2)?0:1;
        return $this->builder->where('editable', $value);
    }
}
