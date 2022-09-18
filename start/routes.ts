/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
});
// Roles
Route.get("/roles","RolesController.index");
Route.post("/roles","RolesController.store");
Route.get("/roles/:id","RolesController.show");
Route.put("/roles/:id","RolesController.update");
// Users
Route.get("/users","UsersController.index");
Route.post("/users","UsersController.store");
Route.get("/users/:id","UsersController.show");
Route.put("/users/:id","UsersController.update");
Route.delete("/users/:id","UsersController.destroy");
// Auth
Route.post("/login","AuthController.login");
Route.post("/forgot","AuthController.forgotPassword");
Route.post("/reset","AuthController.resetPassword");
Route.post("/logout","AuthController.logout")
// Farmers
Route.get("/farmers","FarmersController.index");
Route.post("/farmers","FarmersController.store");
Route.get("/farmers/:id","FarmersController.show");
Route.put("/farmers/:id","FarmersController.update");
Route.delete("/farmers/:id","FarmersController.destroy");
// Farms
Route.get("/farms","FarmsController.index");
Route.post("/farms","FarmsController.store");
Route.get("/farms/:id","FarmsController.show");
Route.put("/farms/:id","FarmsController.update");
Route.delete("/farms/:id","FarmsController.destroy");
// Products
Route.get("/products","FarmsController.index");
Route.get("/products/:id","FarmsController.show");
// Products by farmer
Route.get("/farmers/:id_farm/products/","ProductsController.indexByFarmer");
Route.post("/farmers/:id_farm/products/","ProductsController.storeByFarmer");
Route.get("/farmers/:id_farm/products/:id_product","ProductsController.showByFarmer");
Route.put("/farmers/:id_farm/products/:id_product","ProductsController.updateByFarmer");
