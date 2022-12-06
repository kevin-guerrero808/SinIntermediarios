import Bouncer from "@ioc:Adonis/Addons/Bouncer"
import User from "App/Models/User"

export const { policies } = Bouncer.registerPolicies({
    UserPolicy: () => import('App/Policies/UserPolicy'),
    FarmerPolicy: () => import('App/Policies/FarmerPolicy'),
    ConsumerPolicy: () => import('App/Policies/ConsumerPolicy'),
    FarmPolicy: () => import('App/Policies/FarmPolicy'),
    ProductPolicy: () => import('App/Policies/ProductPolicy')   
})