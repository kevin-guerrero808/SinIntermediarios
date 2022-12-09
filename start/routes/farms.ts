import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/farms","FarmsController.index");
    Route.post("/farms","FarmsController.store").middleware(['auth:api','permission']);
    Route.get("/farms/:id","FarmsController.show");
    Route.put("/farms/:id","FarmsController.update").middleware(['auth:api','permission'])
    Route.delete("/farms/:id","FarmsController.destroy").middleware(['auth:api','permission'])
    Route.get("farmer/:id/farms","FarmsController.indexByFarmer");
})