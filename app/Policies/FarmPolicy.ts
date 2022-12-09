import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Farm from 'App/Models/Farm'

export default class FarmPolicy extends BasePolicy {
	public async create(user: User) {
		await user.load('farmer')
		return !!user.farmer
	}
	public async update(user: User, farm: Farm) {
		await user.load('farmer')
		return user.farmer.id === farm.id_farmer
	}
	public async delete(user: User, farm: Farm) {
		await user.load('farmer')
		return user.farmer.id === farm.id_farmer
	}
}
