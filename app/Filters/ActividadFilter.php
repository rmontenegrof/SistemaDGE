<?php

namespace App\Filters;

class ActividadFilter extends QueryFilter
{
    public function actividad($value = null)
    {
        return $this->builder->where('actividad', 'like', "%$value%");
    }
    public function iniciativa($value = null)
    {
        return $this->builder->whereHas('hito', function ($w) use ($value) {
            $w->whereHas('iniciativa', function($q) use ($value) {
                $q->where('descripcion_corta', 'like', "%$value%");
            });
        });
    }
    public function responsable($value = null)
    {
        return $this->builder->where('responsable', 'like', "%$value%");
    }
    public function origen($value = null)
    {
        return $this->builder->where('origen_recurso', 'like', "%$value%");
    }
}
