<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class UserController extends Controller
{
    /**
     * @OA\Get(
     * path="/api/users",
     * summary="Пользователь",
     * tags={"Users"},
     * security={{"sanctum":{}}},
     * @OA\Response(response=200, description="OK")
     * )
     */
    public function index(Request $request)
    {
        return new UserResource($request->user());
    }
}
