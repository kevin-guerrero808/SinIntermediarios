import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/roles","RolesController.index")//.middleware(['auth:api','permission']);
    Route.post("/roles","RolesController.store").middleware(['auth:api','permission']);
    Route.get("/roles/:id","RolesController.show").middleware(['auth:api','permission']);
    Route.put("/roles/:id","RolesController.update").middleware(['auth:api','permission']);
    Route.delete("/roles/:id","RolesController.destroy").middleware(['auth:api','permission']);
})