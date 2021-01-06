<?php

namespace App\Http\Controllers;

use App\Vehicle_brand;
use App\Vehicle_carcolor;
use App\Vehicle_cubiccms;
use App\Vehicle_doors;
use App\Vehicle_exchange;
use App\Vehicle_features;
use App\Vehicle_financial;
use App\Vehicle_fuel;
use App\Vehicle_gearbox;
use App\Vehicle_model;
use App\Vehicle_motorpower;
use App\Vehicle_regdate;
use App\Vehicle_steering;
use App\Vehicle_type;
use App\Vehicle_version;
use Illuminate\Http\Request;

class DataScrapping extends Controller
{
    public function index($id)
    {
        $this->marcas($id);
        $this->carro();
        $this->moto();
        $this->types();
    }

    public function marcas($id)
    {
        if ($id == 2020){
            $data = json_decode( file_get_contents(public_path("2020.json")));
            $vehicleBrand = $data[1];
        }
        if ($id == 2060){
            $data = json_decode( file_get_contents(public_path("2060.json")));
            $vehicleBrand = $data[0];
        }

        foreach ($vehicleBrand->values_list as $brand){
            $marca = Vehicle_brand::firstOrCreate([
                'label' => $brand->label,
                'value' => $brand->value,
                'vehicle_type_id' => $id
            ]);
            foreach ($brand->values as $model) {
                $modelo = Vehicle_model::firstOrCreate([
                    'brand_id' => $marca->value,
                    'label' => $model->label,
                    'value' => $model->value,
                    'vehicle_type_id' => $id
                ]);
                foreach ($model->values as $version){
                    Vehicle_version::firstOrCreate([
                        'brand_id' => $marca->value,
                        'model_id' => $modelo->value,
                        'label' => $version->label,
                        'value' => $version->value
                    ]);
                }
            }

        }
    }

    public function carro()
    {
        $data = json_decode( file_get_contents(public_path("2020.json")));

        $tables = [
            [
                'data' => $data[2],
                'class' => Vehicle_regdate::class
            ],
            [
                'data' => $data[3],
                'class' => Vehicle_gearbox::class
            ],
            [
                'data' => $data[4],
                'class' => Vehicle_fuel::class
            ],
            [
                'data' => $data[5],
                'class' => Vehicle_steering::class
            ],
            [
                'data' => $data[6],
                'class' => Vehicle_motorpower::class
            ],
            [
                'data' => $data[9],
                'class' => Vehicle_doors::class
            ],
            [
                'data' => $data[12],
                'class' => Vehicle_carcolor::class
            ],
            [
                'data' => $data[14],
                'class' => Vehicle_exchange::class
            ],
            [
                'data' => $data[15],
                'class' => Vehicle_financial::class
            ],
        ];

        foreach ($tables as $item) {
            $item = (object)$item;

            foreach ($item->data->values_list as $value) {
                $valid = $item->class::where('value', $value->value)->first();
                if(empty($valid)){
                    $item->class::create((array) $value);
                }
            }
        }

        foreach ($data[11]->values_list as $features_car){
            $valid = Vehicle_features::where('value', $features_car->value)
                ->where("vehicle_type_id", 2020)
                ->first();
            $features_car->vehicle_type_id = 2020;
            if(empty($valid)){
                Vehicle_features::create((array) $features_car);
            }
        }

    }

    public function moto()
    {
        $data = json_decode( file_get_contents(public_path("2060.json")));

        foreach ($data[3]->values_list as $value){
            $valid = Vehicle_cubiccms::where('value', $value->value)->first();

            if( empty($valid)) {
                Vehicle_cubiccms::create((array) $value);
            }
        }
        foreach ($data[5]->values_list as $features_moto){
            $valid = Vehicle_features::where('value', $features_moto->value)
                ->where("vehicle_type_id", 2060)
                ->first();
            $features_moto->vehicle_type_id = 2060;
            if(empty($valid)){
                Vehicle_features::create((array) $features_moto);
            }
        }

    }

    public function types()
    {
        $data = [
            [
                'label' => 'Carros, vans e utilitários',
                'value' => 2020
            ],
            [
                'label' => 'Motos',
                'value' => 2060
            ],
        ];

        foreach ($data as $item) {
            $valid = Vehicle_type::where('value', $item['value'])->first();

            if (empty($valid)) {
                Vehicle_type::create($item);
            }
        }
    }
}
