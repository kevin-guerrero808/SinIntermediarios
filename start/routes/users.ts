import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/users","UsersController.index").middleware(['auth:api','permission'])
    Route.post("/users","UsersController.store").middleware(['auth:api','permission'])
    Route.get("/users/:id","UsersController.show").middleware(['auth:api','permission'])
    Route.put("/users/:id","UsersController.update").middleware(['auth:api','permission'])
    Route.delete("/users/:id","UsersController.destroy").middleware(['auth:api','permission'])
})