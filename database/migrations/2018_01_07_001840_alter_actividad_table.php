<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterActividadTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dge_actividades', function (Blueprint $table) {
            $table->dropColumn('iniciativa');
            $table->dropColumn('origen');
            $table->dropColumn('medio_verificacion');
            $table->dropColumn('responsable');
            $table->dropColumn('monto_total');
            $table->integer('hito')->unsigned();
            $table->integer('recursos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dge_actividades');
        Schema::create('dge_actividades', function (Blueprint $table) {
            $table->increments('id_actividad');
            $table->string('actividad');
            $table->string('medio_verificacion');
            $table->string('responsable');
            $table->integer('iniciativa')->unsigned();
            $table->integer('unidad_apoyo')->unsigned();
            $table->integer('mes_inicio');
            $table->integer('anho_inicio');
            $table->integer('mes_termino');
            $table->integer('anho_termino');
            $table->string('origen');
            $table->text('detalle_gasto');
            $table->integer('monto_total');
            $table->string('origen_recurso');
            $table->integer('avance')->default(0);
            $table->timestamps();
        });
    }
}
