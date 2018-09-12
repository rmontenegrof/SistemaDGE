<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterInciativasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dge_iniciativas', function (Blueprint $table) {
            $table->dropColumn('tipo');
            $table->dropColumn('frecuencia');
            $table->dropColumn('fecha_actualizacion');
            $table->dropColumn('ppto');
            $table->integer('presupuesto')->default(0);
            $table->integer('origen_iniciativa')->unsigned();
            $table->integer('monto_total_periodo')->default(0);
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
            $table->string('descripcion_corta');
            $table->string('estado_avance');
            $table->date('fecha_actualizacion');
            $table->string('frecuencia');
            $table->string('observaciones');
            $table->integer('ponderacion');
            $table->integer('ppto');
            $table->string('responsable');
            $table->string('semestre_fin');
            $table->string('semestre_inicio');
            $table->string('unidad_apoyo'); 
        });
    }
}
