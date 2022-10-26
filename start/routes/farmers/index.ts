import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/farmers","FarmersController.index");
    Route.post("/farmers","FarmersController.store");
    Route.get("/farmers/:id","FarmersController.show");
    Route.put("/farmers/:id","FarmersController.update");
    Route.delete("/farmers/:id","FarmersController.destroy");

}).middleware('auth:api')

import './farms'
import './products'