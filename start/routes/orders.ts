import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/orders","OrdersController.index")
    Route.get("/orders/:id","OrdersController.show")
    Route.post("/orders","OrdersController.store")
    Route.put("/orders/:id","OrdersController.update")
    Route.delete("/orders/:id","OrdersController.destroy")
})