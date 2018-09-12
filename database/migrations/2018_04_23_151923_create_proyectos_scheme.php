<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProyectosScheme extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dge_proyectos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('iniciativa');
            $table->integer('unidad_responsable');
            $table->float('avance');
            $table->integer('estrategia');
            $table->timestamps();
        });

        Schema::create('dge_proyectos_objetivos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('objetivo');
            $table->integer('activo');
            $table->integer('foco');
            $table->timestamps();
        });

        Schema::create('dge_proyectos_estrategias', function (Blueprint $table) {
            $table->increments('id');
            $table->string('estrategia');
            $table->integer('objetivo');
            $table->integer('activo');
            $table->timestamps();
        });

        Schema::create('dge_proyectos_hitos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('hito');
            $table->string('responsable');
            $table->integer('origen');
            $table->integer('proyecto');
            $table->integer('monto_total');
            $table->string('observacion');
            $table->timestamps();
        });

        Schema::create('dge_proyectos_actividades', function (Blueprint $table) {
            $table->increments('id');
            $table->string('actividad');
            $table->integer('hito');
            $table->string('medio_verificacion');
            $table->integer('unidad_apoyo');
            $table->string('fecha_inicio');
            $table->string('fecha_fin');
            $table->integer('recursos');
            $table->string('detalle_gasto');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dge_proyectos');
        Schema::dropIfExists('dge_proyectos_hitos');
        Schema::dropIfExists('dge_proyectos_objetivos');
        Schema::dropIfExists('dge_proyectos_estrategias');
        Schema::dropIfExists('dge_proyectos_actividades');
    }
}
