<?php

namespace App\Filters;

class HitoFilter extends QueryFilter
{
    public function hito($value = null)
    {
        return $this->builder->where('nombre', 'like', "%$value%");
    }

    public function responsable($value = null)
    {
        return $this->builder->where('responsable', 'like', "%$value%");
    }

    public function medio($value = null)
    {
        return $this->builder->where('medios_verificacion', 'like', "%$value%");
    }

    public function iniciativa($value = null)
    {
        return $this->builder->whereHas('iniciativa', function ($q) use ($value) {
            $q->where('descripcion_corta', 'like', "%$value%");
        });
    }
}