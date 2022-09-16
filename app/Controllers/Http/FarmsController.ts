import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm'

export default class FarmsController {
    public async index(ctx: HttpContextContract) {
      let farmers: Farm[] = await Farm.query()
      return farmers
    }
    public async store({ request }: HttpContextContract) {
      const body = request.body()
      const farmer: Farm = await Farm.create(body)
      return farmer
    }
    public async show({ params }: HttpContextContract) {
      return Farm.findOrFail(params.id)
    }
    public async update({ params, request }: HttpContextContract) {
      const body = request.body()
      const farm: Farm = await Farm.findOrFail(params.id)
      farm.name = body.name;    
      farm.direction = body.direction;   
      farm.logo_url = body.logo_url;   
      farm.imagen_url = body.imagen_url;   
      farm.description = body.description;   

      return farm.save()
    }
    public async destroy({ params }: HttpContextContract) {
      const farm: Farm = await Farm.findOrFail(params.id)
      return farm.delete()
    }
}
