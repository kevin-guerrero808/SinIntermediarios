import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/admins","AdminsController.index");
  Route.post("/admins","AdminsController.store");
  Route.get("/admins/:id","AdminsController.show");
  Route.put("/admins/:id","AdminsController.update");
  Route.delete("/admins/:id","AdminsController.destroy");
}).middleware(['auth:api','permission'])