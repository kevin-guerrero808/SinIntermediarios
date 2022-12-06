import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Consumer from 'App/Models/Consumer'

export default class ConsumerPolicy extends BasePolicy {
	public async view(user: User, consumer: Consumer) {
		return user.id === consumer.id_user;
	}
	public async update(user: User, consumer: Consumer) {
		return user.id === consumer.id_user;
	}
	public async delete(user: User, consumer: Consumer) {
		return user.id === consumer.id_user;
	}
}
