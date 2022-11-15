import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Farmer from "App/Models/Farmer"

export default class FarmersController {
    public async index(ctx: HttpContextContract) {
      let farmers: Farmer[] = await Farmer.query().preload('farms')
      return farmers
    }
    public async store({ auth, request, response }: HttpContextContract) {
      const schemaPayload = schema.create({
        first_name: schema.string(),
        last_name: schema.string(),
        url_photo: schema.string.optional(),
        phone: schema.string.optional(),
        url_facebook: schema.string.optional(),
        url_instagram: schema.string.optional(),
      })
      const userSchemaPayload = schema.create({
        name: schema.string.optional(),
        email: schema.string.optional([
          rules.email()
        ]),
        password: schema.string()
      })

      const payload = await request.validate({ schema: schemaPayload })
      const userPayload = await request.validate({ schema: userSchemaPayload })

      if (!auth.user?.farmer) {
        response.badRequest({ error: 'Farmer already confirmed' })
      }
      const farmer: Farmer = await Farmer.create(payload)
      await (auth.user?.merge(userPayload))?.save()
      await auth.user?.related('farmer').save(farmer)
      
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
