import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm'
import Farmer from 'App/Models/Farmer'

export default class FarmsController {
    public async index(ctx: HttpContextContract) {
      let farmers: Farm[] = await Farm.query()
      return farmers
    }
    public async store({ auth, request }: HttpContextContract) {
      const body = request.body()
      const farm: Farm = await Farm.create(body)
      await auth.user?.load('farmer')
      console.log(auth.user);
      await auth.user?.farmer.related('farms').save(farm)
      
      return farm
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
    public async indexByFarmer({ params }: HttpContextContract) {
      const farmer: Farmer[] = await Farmer.query().where('id', params.id_farmer).preload('farms')
      if (!farmer) {
        return {
          error: "Don't found a farmer"
        }
      }
      return farmer[0].farms;
    }
}
