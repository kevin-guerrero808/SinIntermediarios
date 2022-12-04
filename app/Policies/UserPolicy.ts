import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
    public async before(user: User | null) {
      if (user && user.role.name === roles.ADMIN) {
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
