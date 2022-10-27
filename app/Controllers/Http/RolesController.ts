import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
export default class RolesController {
  public async index(ctx: HttpContextContract) {
    let roles: Role[] = await Role.query().preload('permissions')
    return roles
  }
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const role: Role = await Role.create({
      name: body.name
    })
    if (body.permission) {
      role.related('permissions').attach(body.permissions)
    }
    return role
  }
  public async show({ params }: HttpContextContract) {
    return Role.findOrFail(params.id)
  }
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const role: Role = await Role.findOrFail(params.id)
    role.name = body.name
    if (body.permission) {
      role.related('permissions').attach(body.permissions)
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
