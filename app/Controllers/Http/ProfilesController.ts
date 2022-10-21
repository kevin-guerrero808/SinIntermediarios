import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermissionRole from 'App/Models/PermissionRole'
import Profile from 'App/Models/Profile'

export default class PermisosRolesController {
  public async index(ctx: HttpContextContract) {
    let profiles: Profile[] = await Profile.query()
    return profiles
  }
  public async store({ auth, request }: HttpContextContract) {
    const body = request.body()
    const profile: Profile = await Profile.create(body)
    await auth.user?.related('farmer').save(profile)
  }
  public async show({ params }: HttpContextContract) {
    return Profile.findOrFail(params.id)
  }
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const profile: Profile = await Profile.findOrFail(params.id)
    profile.url_photo = body.url_photo ?? profile.url_photo
    profile.phone = body.phone ?? profile.phone
    profile.url_facebook = body.url_facebook ?? profile.url_facebook
    profile.url_instagram = body.url_instagram ?? profile.url_instagram
    profile.first_name = body.last_name ?? profile.first_name

    return profile.save()
  }
  public async destroy({ params }: HttpContextContract) {
    const profile: Profile = await Profile.findOrFail(params.id)
    return profile.delete()
  }
}
