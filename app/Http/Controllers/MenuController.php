<?php

namespace App\Http\Controllers;

use App\Http\Resources\MenuResource;
use App\Models\Category;
use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'file' => 'required | image',
            'price' => 'required',
            'category_id' => 'required'
        ]);

        $title = $request->title;
        $category_id = $request->category_id;

        if (!Menu::count()) {
            $menuId = 1;
        } else {
            $menuId = Menu::latest()->first()->id + 1;
        }

        $price = $request->input('price');
        $imagePath = 'storage/' . $request->file('file')->store('postsImages', 'public');

        // create and save post
        $menu = new Menu();
        $menu->title = $title;
        $menu->category_id = $category_id;
        $menu->price = $price;
        $menu->imagePath = $imagePath;
        $menu->save();
    }
    public function index()
    {
        return MenuResource::collection(Menu::all());
    }
    public function destroy(Menu $menu)
    {
        return $menu->delete();
    }
}
