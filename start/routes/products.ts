import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/products","ProductsController.index");
    Route.get("/products/:id","ProductsController.show");
    Route.get("/farmers/:id_farm/products/","ProductsController.indexByFarm");
    Route.post("/farmers/:id_farm/products/","ProductsController.storeByFarm");
    Route.get("/farmers/:id_farm/products/:id_product","ProductsController.showByFarm");
    Route.put("/farmers/:id_farm/products/:id_product","ProductsController.updateByFarm");
}).middleware('auth:api')
.middleware('permission')