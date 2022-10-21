import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/farms","FarmsController.index");
    Route.post("/farms","FarmsController.store");
    Route.get("/farms/:id","FarmsController.show");
    Route.put("/farms/:id","FarmsController.update");
    Route.delete("/farms/:id","FarmsController.destroy");
    Route.get("/farmers/:id_farmer/farms/","FarmsController.indexByFarmer");
})