import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Consumer from "App/Models/Consumer"

export default class ConsumersController {
  
  public async index(ctx: HttpContextContract) {
    let consumers: Consumer[] = await Consumer.query().preload('orders')
    return consumers
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
      email: schema.string.optional([
        rules.email()
      ]),
      password: schema.string()
    })

    const payload = await request.validate({ schema: schemaPayload })
    const userPayload = await request.validate({ schema: userSchemaPayload })

    if (auth.user?.consumer) {
      response.badRequest({ error: 'Consumer already confirmed' })
    }
    const consumer: Consumer = await Consumer.create(payload)
    await (auth.user?.merge(userPayload))?.save()
    await auth.user?.related('consumer').save(consumer)
    
    return consumer
  }
  public async show({ bouncer, params }: HttpContextContract) {
    const consumer = await Consumer.findOrFail(params.id)
      
    await bouncer
    .with('ConsumerPolicy')
    .authorize('view', consumer)

    return consumer;
  }
  public async update({ params, bouncer, request }: HttpContextContract) {
    const schemaPayload = schema.create({
      first_name: schema.string.optional(),
      last_name: schema.string.optional(),
      url_photo: schema.string.optional(),
      phone: schema.string.optional(),
      url_facebook: schema.string.optional(),
      url_instagram: schema.string.optional(),
    })
    const payload = await request.validate({ schema: schemaPayload })

    const consumer = await Consumer.findOrFail(params.id)

    await bouncer
    .with('ConsumerPolicy')
    .authorize('update', consumer)

    consumer.merge(payload);
    return consumer.save()
  }
  public async destroy({ params, bouncer }: HttpContextContract) {
    const consumer: Consumer = await Consumer.findOrFail(params.id)

    await bouncer
    .with('ConsumerPolicy')
    .authorize('delete', consumer)

    return consumer.delete()
  }
}
