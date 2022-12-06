import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/products","ProductsController.index")
    Route.get("/products/:id","ProductsController.show")
    Route.get("/farms/:id_farm/products","ProductsController.indexByFarm")
    Route.post("/farms/:id_farm/products","ProductsController.store").middleware(['auth:api','permission'])
    Route.put("/farms/:id_farm/products/:id_product","ProductsController.update").middleware(['auth:api','permission'])
    Route.delete("/farms/:id_farm/products/:id_product","ProductsController.destroy").middleware(['auth:api','permission'])
})