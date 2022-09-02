import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
export default class PermissionsController {
  public async index(ctx: HttpContextContract) {
    let permissions: Permission[] = await Permission.query().preload('roles')
    return permissions
  }
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const permission: Permission = await Permission.create(body)
    return permission
  }
  public async show({ params }: HttpContextContract) {
    return Permission.findOrFail(params.id)
  }
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const permission: Permission = await Permission.findOrFail(params.id)
    permission.url = body.url
    permission.method = body.method
    return permission.save()
  }
  public async destroy({ params }: HttpContextContract) {
    const permission: Permission = await Permission.findOrFail(params.id)
    return permission.delete()
  }
}
