<?php

namespace App\Filters;

class ObjetivoFilter extends QueryFilter
{
    public function objetivo($value = null)
    {
        return $this->builder->where('objetivo', 'like', "%$value%");
    }
    public function estado($value = null)
    {
        $value = ($value==2)?0:1;
        return $this->builder->where('activo', $value);
    }
    public function unidad($value = null)
    {
        return $this->builder->whereHas('unidad', function ($q) use ($value) {
            $q->where('unidad', 'like', "%$value%");
        });
    }
}
