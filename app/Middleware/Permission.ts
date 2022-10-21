import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission';
import Profile from 'App/Models/Profile';
import Role from 'App/Models/Role';

export default class Permiso {
  public async handle({auth, request, response}: HttpContextContract, next: () => Promise<void>) {
    // clean and formatte url and method
    let url = request.url();
    url = url.replace(/^\//,"").replace(/\/$/,"")
    url = url.replace(/\/\d+\//,"/[]/")

    let method = request.method()
    method = method.toLowerCase()

    const role = await Role.findOrFail(auth.user?.id_role)
    await role.load('permissions')
    const permissions  = role.permissions

    if(!(permissions?.length)) {
      throw new AuthenticationException(
        'Unauthorized permissions',
        'E_UNAUTHORIZED_ACCESS'
      )
    }

    let hasAccess = false;    
    permissions.forEach(async permission => {
      // clean and formatte url and method
      const permissionUrl = permission.url.replace(/^\//,"").replace(/\/$/,"")
      const permissionMethod = permission.method.toLowerCase()

      if(permissionMethod === method && permissionUrl === url) {
        hasAccess = true
      }
    })
    
    if (hasAccess) {
      await next()
    } else {
      throw new AuthenticationException(
        'Unauthorized permissions',
        'E_UNAUTHORIZED_ACCESS'
      )
    }
    
  }
}
