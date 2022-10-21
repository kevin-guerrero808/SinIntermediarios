import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/users","UsersController.index").middleware('auth:api')
    Route.post("/users","UsersController.store")
    Route.get("/users/:id","UsersController.show").middleware('auth:api')
    Route.put("/users/:id","UsersController.update").middleware('auth:api')
    Route.delete("/users/:id","UsersController.destroy").middleware('auth:api')
})