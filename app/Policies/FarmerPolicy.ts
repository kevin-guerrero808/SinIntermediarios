import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Farmer from 'App/Models/Farmer'

export default class FarmerPolicy extends BasePolicy {
	public async view(user: User, farmer: Farmer) {
		return user.id === farmer.id_user;
	}
	public async update(user: User, farmer: Farmer) {
		return user.id === farmer.id_user;
	}
	public async delete(user: User, farmer: Farmer) {
		return user.id === farmer.id_user;
	}
}
