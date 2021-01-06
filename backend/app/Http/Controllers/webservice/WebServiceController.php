<?php

namespace App\Http\Controllers\webservice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Ixudra\Curl\Facades\Curl;

class WebServiceController extends Controller
{
    public function cep(Request $request)
    {
        $cep = str_replace("-", "", $request->cep);
        $response = Curl::to('http://viacep.com.br/ws/'.$cep.'/json/')->get();
        $response = json_decode($response);
        if ($response) {
            $data = (object) [
                'uf' => $response->uf,
                'zipCode' => $request->cep,
                'city' => $response->localidade
            ];
        }

        return json_encode($data);
    }
}
