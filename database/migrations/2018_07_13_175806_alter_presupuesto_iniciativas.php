<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterPresupuestoIniciativas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dge_iniciativas', function (Blueprint $table) {
            $table->string('presupuesto')->change();
            $table->text('descripcion_corta')->change();
            $table->text('descripcion')->change();
            $table->text('observaciones')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dge_iniciativas');
        Schema::table('dge_iniciativas', function (Blueprint $table) {
            $table->integer('activo');
            $table->integer('anho_fin');
            $table->integer('anho_inicio');
            $table->integer('avance')->default(0);
            $table->text('descripcion');
            $table->text('descripcion_corta');
            $table->string('estado_avance');
            $table->text('observaciones');
            $table->integer('ponderacion');
            $table->string('responsable');
            $table->string('semestre_fin');
            $table->string('semestre_inicio');
            $table->integer('unidad_apoyo'); 
            $table->string('presupuesto');
            $table->integer('origen_iniciativa');
            $table->string('monto_total_periodo');
        });
    }
}
