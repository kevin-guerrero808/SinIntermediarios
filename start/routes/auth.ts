import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post("/login","AuthController.login");
    Route.post("/forgot","AuthController.forgotPassword");
    Route.post("/reset","AuthController.resetPassword");
    Route.post("/logout","AuthController.logout")
})