import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get("/farms","FarmsController.index");
    Route.get("/farms/:id","FarmsController.show");
    Route.put("/farms/:id","FarmsController.update").middleware(['auth:api','permission'])
    Route.delete("/farms/:id","FarmsController.destroy").middleware(['auth:api','permission'])
})