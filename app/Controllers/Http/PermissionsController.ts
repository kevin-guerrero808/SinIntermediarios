import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Permission from 'App/Models/Permission'
export default class PermissionsController {
  public async index(ctx: HttpContextContract) {
    let permissions: Permission[] = await Permission.query()
    return permissions
  }
  public async store({ request }: HttpContextContract) {
    const schemaPayload = schema.create({
      url: schema.string(),
      method: schema.string(),
    })
    const payload = await request.validate({ schema: schemaPayload })

    const permission: Permission = await Permission.create(payload)
    return permission
  }
  public async show({ params }: HttpContextContract) {
    return await Permission.findOrFail(params.id)
  }
  public async update({ params, request }: HttpContextContract) {
    const schemaPayload = schema.create({
      url: schema.string(),
      method: schema.string(),
    })
    const payload = await request.validate({ schema: schemaPayload })
    const permission: Permission = await Permission.findOrFail(params.id)
    permission.merge(payload)
    return await permission.save()
  }
  public async destroy({ params }: HttpContextContract) {
    const permission: Permission = await Permission.findOrFail(params.id)
    return await permission.delete()
  }
}
