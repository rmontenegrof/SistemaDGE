<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHitosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dge_hitos', function (Blueprint $table) {
            $table->increments('id_hito');
            $table->string('nombre');
            $table->string('responsable');
            $table->text('medios_verificacion');
            $table->text('observacion');
            $table->integer('iniciativa')->unsigned();
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
        Schema::dropIfExists('dge_hitos');
    }
}
