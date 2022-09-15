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
Route.get("/Users","UsersController.index");
Route.post("/Users","UsersController.store");
Route.get("/Users/:id","UsersController.show");
Route.put("/Users/:id","UsersController.update");
Route.delete("/Users/:id","UsersController.destroy");
Route.post("/login","AuthController.login");
// Auth
Route.post("/forgot","AuthController.forgotPassword");
Route.post("/reset","AuthController.resetPassword");
Route.post("/logout","AuthController.logout")
