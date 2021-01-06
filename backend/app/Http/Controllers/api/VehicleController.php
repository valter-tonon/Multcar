<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
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
use Illuminate\Support\Facades\Auth;

class VehicleController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next){
           $this->user = Auth::user();
           return $next($request);
        });
    }

    private function getData()
    {
        return [
            'vehicle_types' => Vehicle_type::all(),
            'regdate' => Vehicle_regdate::orderBy('label','ASC')->get(),
            'gearbox' => Vehicle_gearbox::all(),
            'fuel' => Vehicle_fuel::all(),
            'steering' => Vehicle_steering::all(),
            'motorpower' => Vehicle_motorpower::all(),
            'doors' => Vehicle_doors::all(),
            'features' => Vehicle_features::all(),
            'carcolor' => Vehicle_carcolor::all(),
            'exchange' => Vehicle_exchange::all(),
            'financial' => Vehicle_financial::all(),
            'cubiccms' => Vehicle_cubiccms::all()
        ];
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Vehicle::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $vehicle = Vehicle::with('vehicle_photos')
            ->firstOrCreate([
                'user_id' => $this->user->id,
                'status' => 0
            ]);
        return array_merge(['vehicle' => $vehicle], $this->getData());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function show(Vehicle $vehicle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function edit(Vehicle $vehicle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vehicle $vehicle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vehicle $vehicle)
    {
        //
    }

    public function brand($veiculoTipo)
    {
        $vehicle_brand = Vehicle_brand::where('vehicle_type_id',$veiculoTipo)->get();
        return compact('vehicle_brand');
    }

    public function model($veiculoTipo, $marca)
    {
        $vehicle_model = Vehicle_model::where('vehicle_type_id', $veiculoTipo)
            ->where('brand_id', $marca)
            ->orderBy('label')
            ->get();
        return compact('vehicle_model');
    }

    public function version($marca, $modelo)
    {
        $vehicle_version = Vehicle_version::where('brand_id' , $marca)
            ->where('model_id', $modelo)
            ->orderBy('label')
            ->get();
        return compact('vehicle_version');
    }
}
