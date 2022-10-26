import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class Permiso {
  public async handle({auth, request, response}: HttpContextContract, next: () => Promise<void>) {
    // get id, clean and formatte url and method
    let url = request.url();
    url = url.replace(/^\//,"").replace(/\/$/,"")
    const urlId = url.match(/^\w+\/(\d+)/)
    url = url.replace(/\/\d+\//,"/[]/")

    let method = request.method()
    method = method.toLowerCase()

    const role = await Role.findOrFail(auth.user?.id_role)
    await role.load('permissions')
    const permissions  = role.permissions

    // validate if the user url is the same to the authorized user
    // if(!urlId || !urlId[1] || urlId[1] || auth.user !== auth.user .farmer.id.toString()) {
    //   this.throwUnauthorizedAccess()
    // }

    if(!(permissions?.length)) {
      this.throwUnauthorizedAccess()
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
      this.throwUnauthorizedAccess()
    }
  }

  private throwUnauthorizedAccess() {
    throw new AuthenticationException(
      'Unauthorized permissions',
      'E_UNAUTHORIZED_ACCESS'
    )
  }
}
