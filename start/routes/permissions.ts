import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/permissions","PermissionsController.index");
    Route.post("/permissions","PermissionsController.store");
    Route.get("/permissions/:id","PermissionsController.show");
    Route.put("/permissions/:id","PermissionsController.update");
    Route.delete("/permissions/:id","PermissionsController.destroy");
})