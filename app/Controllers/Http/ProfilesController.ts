import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermissionRole from 'App/Models/PermissionRole'

export default class PermisosRolesController {
  public async index(ctx: HttpContextContract) {
    let permissionsRoles: PermissionRole[] = await PermissionRole.query()
    return permissionsRoles
  }
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const permissionRole: PermissionRole = await PermissionRole.create(body)
    return permissionRole
  }
  public async show({ params }: HttpContextContract) {
    return PermissionRole.findOrFail(params.id)
  }
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const permissionRole: PermissionRole = await PermissionRole.findOrFail(params.id)
    permissionRole.id_role = body.id_role
    permissionRole.id_permission = body.id_permission
    return permissionRole.save()
  }
  public async destroy({ params }: HttpContextContract) {
    const permissionRole: PermissionRole = await PermissionRole.findOrFail(params.id)
    return permissionRole.delete()
  }
}
