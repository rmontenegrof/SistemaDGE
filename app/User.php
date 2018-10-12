<?php

namespace App;

use App\Notifications\ResetPassword;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use App\Filters\Filterable;

class User extends Authenticatable
{
    use Notifiable, Filterable;

    protected $table = 'dge_usuario';
    protected $primaryKey = 'id_usuario';
    public $timestamps = false;

    protected $fillable = [
        'activo',
        'accessToken',
        'apellido_materno',
        'apellido_paterno',
        'area',
        'authKey',
        'mail',
        'password',
        'api_token',
        'cargo',
        'telefono',
        'ip',
        'nombres',
        'tipo',
        'ultima_conn',
        'usuario',
        'verification_code',
        'CCC'
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'api_token',
    ];

    public function updateToken()
    {
        $this->attributes['api_token'] = str_random(60);

        return $this;
    }

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPassword($token));
    }

    public function getRememberToken() {
        return $this->attributes['accessToken'];
    }

    public function setRememberToken($value) {
        $this->attributes['accessToken'] = $value;
    }

    public function unidades(){
       return $this->hasMany(UsuarioUnidad::class, 'dge_usuario_id_usuario', 'id_usuario');
    }
}
