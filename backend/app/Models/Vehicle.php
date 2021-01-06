<?php

namespace App\Models;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [
        'user_id'
    ];

    protected $casts = [
        'vehicle_features' => Json::class,
        'vehicle_financial' => Json::class
    ];

    public function vehicle_photos()
    {
        return $this
            ->hasMany('App\Models\Vehicle_photo', 'vehicle_id', 'id')
            ->orderBy('order','ASC');
    }
}
