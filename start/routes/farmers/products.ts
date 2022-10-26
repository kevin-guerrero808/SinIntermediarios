import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/farmers/:id_farmer/farms/:id_farm/products/","ProductsController.indexByFarm");
    Route.post("/farmers/:id_farmer/farms/:id_farm/products/","ProductsController.storeByFarm");
    Route.get("/farmers/:id_farmer/farms/:id_farm/products/:id_product","ProductsController.showByFarm");
    Route.put("/farmers/:id_farmer/farms/:id_farm/products/:id_product","ProductsController.updateByFarm");
})