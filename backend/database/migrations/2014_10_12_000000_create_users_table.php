<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('domain')->nullable();
            $table->string('subdomain')->nullable();
            $table->string('logo')->nullable();
            $table->string('facebook')->nullable();
            $table->string('facebook_page_id')->nullable();
            $table->string('facebook_pixel')->nullable();
            $table->string('google_analytics')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('email_contact')->nullable();
            $table->string('site_title')->nullable();
            $table->longText('site_keywords')->nullable();
            $table->longText('site_description')->nullable();
            $table->integer('plan_id')->nullable();
            $table->dateTime('next_expiration')->nullable();
            $table->dateTime('disable_account')->nullable();
            $table->dateTime('delete_account')->nullable();
            $table->tinyInteger('status')->nullable()->default(1);
            $table->softDeletes();

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
        Schema::dropIfExists('users');
    }
}
