import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Farmer from "App/Models/Farmer"

export default class FarmersController {
    public async index(ctx: HttpContextContract) {
      let farmers: Farmer[] = await Farmer.query()
      return farmers
    }
    public async store({ request }: HttpContextContract) {
      const body = request.body()
      const farmer: Farmer = await Farmer.create(body)
      return farmer
    }
    public async show({ params }: HttpContextContract) {
      return Farmer.findOrFail(params.id)
    }
    public async update({ params, request }: HttpContextContract) {
      const body = request.body()
      const farmer: Farmer = await Farmer.findOrFail(params.id)
      farmer.first_name = body.first_name;    
      farmer.last_name = body.last_name;   
      farmer.phone = body.phone;   
      return farmer.save()
    }
    public async destroy({ params }: HttpContextContract) {
      const farmer: Farmer = await Farmer.findOrFail(params.id)
      return farmer.delete()
    }
}
