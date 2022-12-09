import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Farm from 'App/Models/Farm'
import Farmer from 'App/Models/Farmer'

export default class FarmsController {
    public async index(ctx: HttpContextContract) {
      let farmers: Farm[] = await Farm.query()
      return farmers
    }
    public async store({ auth, bouncer, request }: HttpContextContract) {
      const schemaPayload = schema.create({
        name: schema.string(),
        description: schema.string.optional(),
        direction: schema.string(),
        logo_url: schema.string.optional(),
        imagen_url: schema.string.optional()
      })
      const payload = await request.validate({ schema: schemaPayload })

      await bouncer
      .with('FarmPolicy')
      .authorize('create')

      const farm: Farm = await Farm.create(payload)

      await auth.user!.load('farmer')
      await auth.user!.farmer.related('farms').save(farm)
      
      return farm
    }
    public async show({ params }: HttpContextContract) {
      return Farm.findOrFail(params.id)
    }
    public async update({ params, bouncer, request }: HttpContextContract) {
      const schemaPayload = schema.create({
        name: schema.string.optional(),
        description: schema.string.nullableAndOptional(),
        direction: schema.string.optional(),
        logo_url: schema.string.nullableAndOptional(),
        imagen_url: schema.string.nullableAndOptional()
      })
      const payload = await request.validate({ schema: schemaPayload })
      
      const farm: Farm = await Farm.findOrFail(params.id)
      
      await bouncer
      .with('FarmPolicy')
      .authorize('update', farm)

      farm.merge(payload)

      return farm.save()
    }
    public async destroy({ params, bouncer }: HttpContextContract) {
      const farm: Farm = await Farm.findOrFail(params.id)

      await bouncer
      .with('FarmPolicy')
      .authorize('delete', farm)

      return farm.delete()
    }
    public async indexByFarmer({ params }: HttpContextContract) {
      const farmer: Farmer = (await Farmer.query().where('id', params.id).preload('farms'))[0]
      if (!farmer) {
        return {
          error: "Don't found a farmer"
        }
      }
      return farmer.farms;
    }
}
