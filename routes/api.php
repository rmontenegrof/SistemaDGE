<?php

use Illuminate\Http\Request;

Route::group(['middleware' => ['auth:api', 'admin'], 'namespace' => 'Api'], function () {
    Route::resource('users', 'UsersController');
    Route::get('/admin/me', function (Request $request) {
        return $request->user()->load('notifications');
    });
});

Route::group(['middleware' => 'auth:api', 'namespace' => 'Api'], function () {
    Route::get('/me', function (Request $request) {
        return $request->user()->load('notifications');
    });
    Route::post('/markNotificationsAsRead', function (Request $request) {
        $request->user()->unreadNotifications()->update(['read_at' => \Carbon\Carbon::now()]);
    });
    Route::post('changePassword', 'UsersController@changePassword');
    
    //Rutas para procesos de DGE
    Route::resource('unidades', 'UnidadesController');
    Route::resource('periodos', 'PeriodosController');
    Route::resource('focos', 'FocosController');
    Route::resource('iniciativas', 'IniciativasController');
    Route::resource('objetivos', 'ObjetivosController');
    Route::resource('estrategias', 'EstrategiasController');
    Route::resource('actividades', 'ActividadesController');
    Route::resource('unidades_apoyo', 'UnidadesApoyoController');
    Route::resource('origen_iniciativa', 'OrigenController');
    Route::resource('hitos', 'HitosController');
    Route::resource('iniciativas.archivos', 'ArchivosIniciativaController', ['only' => ['index', 'store', 'destroy']]);
    Route::resource('archivos', 'ArchivosController', ['only' => ['index', 'store', 'destroy']]);

    //Panel de Proyectos
    Route::resource('proyectos', 'ProyectosController');
    Route::resource('estrategias_proyectos', 'ProyectosEstrategiasController');
    Route::resource('objetivos_proyectos', 'ProyectosObjetivosController');
    Route::resource('hitos_proyectos', 'ProyectosHitosController');
    Route::resource('actividades_proyectos', 'ProyectosActividadesController');

    Route::get('grupos_all', 'GruposController@all');
    Route::get('unidades_all', 'UnidadesController@all');
    Route::get('objetivos_pei_all', 'ObjetivosController@objetivos_pei');
    Route::get('objetivos_panel_acciones', 'ObjetivosController@objetivos_acciones');
    Route::get('unidades_apoyo_all', 'UnidadesApoyoController@all');
    Route::get('iniciativas_all', 'IniciativasController@all');
    Route::get('origen_iniciativa_all','OrigenController@all');
    Route::get('hitos_all','HitosController@all');
    Route::get('focos_all','FocosController@all');
    Route::get('periodos_all','PeriodosController@all');
    Route::get('estrategias_all', 'EstrategiasController@all');
    Route::get('periodos_all_a', 'PeriodosController@all_a');
    Route::get('objetivos_proyectos_all', 'ProyectosObjetivosController@all');
    Route::get('estrategias_proyectos_all', 'ProyectosEstrategiasController@all');
    Route::get('proyectos_all', 'ProyectosController@all');
    Route::get('hitos_proyectos_all', 'ProyectosHitosController@all');
    Route::get('actividades_proyectos_all', 'ProyectosActividadesController@all');
    

    Route::post('objetivos_asociar', 'ObjetivosController@asociar');
    Route::post('iniciativas_asociar', 'EstrategiasController@asociar');

    Route::post('sendEmail', 'UnidadesController@sendEmail');
});

Route::post('/pdf', function (Request $request) {
    return PDF::loadView('pdf', ['html' => $request->html])->inline();
});
