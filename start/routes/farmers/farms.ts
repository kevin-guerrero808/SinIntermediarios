import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/farmers/:id_farmer/farms/","FarmsController.indexByFarmer")
    Route.post("/farmers/:id_farmer/farms/","FarmsController.store")
    Route.get("/farmers/:id_farmer/farms/:id_farm","FarmsController.showByFarmer")
    Route.put("/farmers/:id_farmer/farms/:id_farm","FarmsController.updateByFarmer")
}).middleware(['auth:api'])