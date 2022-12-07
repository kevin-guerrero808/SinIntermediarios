import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { roles } from 'App/enums/roles'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async before(user: User | null) {
    await user?.load('role')
    if (user!.role.name === roles.ADMIN) {
      return true
    }
  }
  public async view(user: User, userFound: User) {
    return user.id === userFound.id
  }
  public async update(user: User, userFound: User) {
    return user.id === userFound.id
  }
  public async delete(user: User, userFound: User) {
    return user.id === userFound.id
  }
}
