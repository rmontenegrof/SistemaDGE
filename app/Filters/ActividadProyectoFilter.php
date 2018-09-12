<?php

namespace App\Filters;

class ActividadProyectoFilter extends QueryFilter
{
    public function actividad($value = null)
    {
        return $this->builder->where('actividad', 'like', "%$value%");
    }
}
