import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get("/consumers","ConsumersController.index");
  Route.post("/consumers","ConsumersController.store");
  Route.get("/consumers/:id","ConsumersController.show");
  Route.put("/consumers/:id","ConsumersController.update");
  Route.delete("/consumers/:id","ConsumersController.destroy");
}).middleware(['auth:api'])