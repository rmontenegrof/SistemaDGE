<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyUnidadTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dge_unidad_estrategica', function (Blueprint $table) {
            $table->dropColumn('Cod_Umayor');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dge_unidad_estrategica');
        Schema::create('dge_unidad_estrategica', function (Blueprint $table) {
            $table->increments('id_unidad_estrategica');
            $table->integer('id_grupo');
            $table->integer('CodCC');
            $table->integer('estado');
            $table->string('unidad');
            $table->string('mision');
            $table->string('vision');
        });
    }
}
