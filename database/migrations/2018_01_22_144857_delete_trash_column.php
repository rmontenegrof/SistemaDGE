<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteTrashColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dge_usuario', function (Blueprint $table) {
            $table->dropColumn('authKey');
            $table->dropColumn('accessToken');
            $table->dropColumn('verification_code');
            $table->dropColumn('ultima_conn');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dge_usuario');
    }
}
