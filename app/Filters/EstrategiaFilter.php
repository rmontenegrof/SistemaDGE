<?php

namespace App\Filters;

class EstrategiaFilter extends QueryFilter
{
    public function estrategia($value = null)
    {
        return $this->builder->where('estrategia', 'like', "%$value%");
    }

    public function objetivo($value = null)
    {
        return $this->builder->whereHas('objetivos', function ($w) use ($value) {
            $w->whereHas('objetivo', function($q) use ($value) {
                $q->where('objetivo', 'like', "%$value%");
            });
        });
    }

    public function unidad($value = null)
    {
        return $this->builder->whereHas('objetivos', function ($w) use ($value) {
            $w->whereHas('objetivo', function($q) use ($value) {
                $q->whereHas('unidad', function ($f) use ($value) {
                    $f->where('unidad', 'like', "%$value%");
                });
            });
        });
    }

    public function estado($value = null)
    {
        $value = ($value==2)?0:1;
        return $this->builder->where('activo', $value);
    }
}
