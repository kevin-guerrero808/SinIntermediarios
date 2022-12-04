import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/products","ProductsController.index")
    Route.get("/products/:id","ProductsController.show")
    Route.get("/farmers/:id_farm/products","ProductsController.indexByFarm")
    Route.post("/farmers/:id_farm/products","ProductsController.store").middleware(['auth:api','permission'])
    Route.put("/farmers/:id_farm/products/:id_product","ProductsController.update").middleware(['auth:api','permission'])
    Route.delete("/farmers/:id_farm/products/:id_product","ProductsController.destroy").middleware(['auth:api','permission'])
})