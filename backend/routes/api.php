<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::resource('/vehicles', 'api\VehicleController')->except(['create', 'edit']);
Route::get('/vehicles/{vehicle_type}/brand', 'api\VehicleController@brand');
Route::get('/vehicles/{vehicle_type}/{vehicle_brand}/model', 'api\VehicleController@model');
Route::get('/vehicles/{vehicle_brand}/{vehicle_model}/version', 'api\VehicleController@version');

Route::group(['prefix' => 'webservice'], function(){
    Route::post('cep', 'webservice\WebServiceController@cep');
});

