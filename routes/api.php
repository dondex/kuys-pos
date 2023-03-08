<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MenuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/// private routes ///

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->post('logout', [AuthenticatedSessionController::class, 'destroy']);



//categories
Route::middleware('auth:sanctum')->post('categories/create', [CategoryController::class, 'store']);
Route::middleware('auth:sanctum')->get('categories/{category}', [CategoryController::class, 'show']);
Route::middleware('auth:sanctum')->put('categories/{category}', [CategoryController::class, 'update']);
Route::middleware('auth:sanctum')->delete('categories/{category}', [CategoryController::class, 'destroy']);


//menus
Route::middleware('auth:sanctum')->post('add-menu', [MenuController::class, 'store']);
Route::middleware('auth:sanctum')->delete('menus/{menu}', [MenuController::class, 'destroy']);





///// public routes ////

Route::post('register', [RegisteredUserController::class, 'store']);
Route::post('login', [AuthenticatedSessionController::class, 'store']);


//categories
Route::get('categories', [CategoryController::class, 'index']);

//menus
Route::get('menus', [MenuController::class, 'index']);

//orders
Route::post('/orders', function (Request $request) {
    $order = new App\Models\Order;
    $order->customer_name = $request->input('customer_name');
    $order->customer_email = $request->input('customer_email');
    $order->customer_phone = $request->input('customer_phone');
    $order->total_price = $request->input('total_price');
    $order->status = $request->input('status'); // new line to set the status
    $order->save();

    return response()->json(['message' => 'Order placed successfully.']);
});

Route::get('/orders', function () {
    $orders = App\Models\Order::all();

    return response()->json(['orders' => $orders]);
});
