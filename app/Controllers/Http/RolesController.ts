import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
export default class RolesController {
  public async index(ctx: HttpContextContract) {
    let roles: Role[] = await Role.query().preload('permissions')
    return roles
  }
  public async store({ request }: HttpContextContract) {
    const schemaPayload = schema.create({
      name: schema.string(),
      permissions: schema.array.optional().members(schema.number()),
    })
    const payload = await request.validate({ schema: schemaPayload })
    
    const role: Role = await Role.create({
      name: payload.name
    })
    if (payload.permissions?.length) {
      role.related('permissions').attach(payload.permissions)
    }
    return role
  }
  public async show({ params }: HttpContextContract) {
    return Role.findOrFail(params.id)
  }
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const role: Role = await Role.findOrFail(params.id)
    role.name = body.name ?? role.name
    if (body.permissions?.length) {
      role.related('permissions').sync(body.permissions)
    }
    return await role.save()
  }
  public async destroy({ params }: HttpContextContract) {
    let user = await User.query().where('id_role', params.id)
    if (user.length) {
      return {
        error: 'El rol tiene user asociados',
        user: user,
      }
    } else {
      const role: Role = await Role.findOrFail(params.id)
      return await role.delete()
    }
  }
}
