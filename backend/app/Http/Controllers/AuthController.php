<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *   path="/api/auth/register",
     *   tags={"Auth"},
     *   summary="Регистрация пользователя",
     *   @OA\RequestBody(
     *     required=true,
     *     @OA\JsonContent(
     *       required={"name","email","password"},
     *       @OA\Property(property="name", type="string", example="Иван Петрович"),
     *       @OA\Property(property="email", type="string", format="email", example="john@mail.ru"),
     *       @OA\Property(property="password", type="string", format="password", example="123123")
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Успешная регистрация",
     *     @OA\JsonContent(
     *       @OA\Property(property="token", type="string", example="1|abcdef...")
     *     )
     *   ),
     *   @OA\Response(response=422, description="Валидационная ошибка")
     * )
     */
    public function register(Request $request)
    {
        $data = $request->validate([
            'email' => ['required','email','unique:users,email'],
            'password' => ['required','string','min:6'],
        ], [
            'email.unique' => 'Такой email уже зарегистрирован.',
        ]);


        $user = User::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);


        $token = $user->createToken('auth')->plainTextToken;
        return response()->json(['token' => $token], 200);
    }


    /**
     * @OA\Post(
     *   path="/api/auth/login",
     *   tags={"Auth"},
     *   summary="Авторизация",
     *   @OA\RequestBody(
     *     required=true,
     *     @OA\JsonContent(
     *       required={"email","password"},
     *       @OA\Property(property="email", type="string", format="email", example="john@mail.ru"),
     *       @OA\Property(property="password", type="string", format="password", example="123123")
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="OK",
     *     @OA\JsonContent(
     *       @OA\Property(property="token", type="string", example="1|abcdef...")
     *     )
     *   ),
     *   @OA\Response(response=401, description="Неверные креды")
     * )
     */
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required','email'],
            'password' => ['required','string'],
        ]);


        $user = User::where('email', $data['email'])->first();
        if (!$user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages(['email' => 'Неверные логин или пароль']);
        }


        $token = $user->createToken('auth')->plainTextToken;
        return response()->json(['token' => $token]);
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
