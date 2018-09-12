<?php

namespace App\Filters;

class IniciativaFilter extends QueryFilter
{
    public function iniciativa($value = null)
    {
        return $this->builder->where('descripcion_corta', 'like', "%$value%");
    }
    public function estadoAvance($value = null)
    {
        return $this->builder->where('estado_avance', $value);
    }
    public function estrategia($value = null)
    {
        return $this->builder->whereHas('estrategias', function ($q) use ($value) {
            $q->whereHas('estrategia', function($f) use ($value) {
            	$f->where('estrategia', 'like', "%$value%");
            });
        });
    }
    public function unidad($value = null)
    {
        return $this->builder->whereHas('unidad', function ($q) use ($value) {
            $q->where('unidad_apoyo', 'like', "%$value%");
        });
    }
}
