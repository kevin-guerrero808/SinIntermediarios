import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/permissions","PermissionsController.index").middleware(['auth:api','permission'])
    Route.post("/permissions","PermissionsController.store").middleware(['auth:api','permission'])
    Route.get("/permissions/:id","PermissionsController.show").middleware(['auth:api','permission'])
    Route.put("/permissions/:id","PermissionsController.update").middleware(['auth:api','permission'])
    Route.delete("/permissions/:id","PermissionsController.destroy").middleware(['auth:api','permission'])
})