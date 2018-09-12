<?php

namespace App\Filters;

class ArchivoFilter extends QueryFilter
{
    public function nombre($value = null)
    {
        return $this->builder->where('real_name', 'like', "%$value%");
    }
}
