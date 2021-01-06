<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    private $rules = [
    'name' => 'required|string',
    'password' => 'required|min:8|string',
    'email' => 'required|string|email|max:255|unique:users',

];

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->rules );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $date = Carbon::now();
        $deleteAccount = Carbon::now();

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->next_expiration = $date->addDays(7);
        $user->delete_account = $deleteAccount->addDays(15);
        $user->save();

        if($user->id) {
            return response()->json([
                'access_token' => $user->createToken('auth-api')->accessToken
            ], 200);
        }

        return response()->json(['error' => 'Erro ao cadastrar usuário'], 400);
    }
}
