import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Product from 'App/Models/Product'
import Farm from 'App/Models/Farm'
import { roles } from 'App/enums/roles'

export default class ProductPolicy extends BasePolicy {
	public async before(user: User) {
		await user.load('role')
		if (user!.role.name !== roles.FARMER) {
			return true
		}
	}
	public async create(user: User, farm: Farm) {
		await user.load('farmer')
		await user.farmer.load('farms')
		if (user.farmer.farms.some(farmItem => farmItem.id_farmer === farm.id_farmer)) {
		  return true
		}
	}
	public async update(user: User, product: Product) {
		await user.load('farmer')
		await user.farmer.load('farms')
		console.log(user.farmer.farms);
		if (user.farmer.farms.some(farmItem => farmItem.id === product.id_farm)) {
		  return true
		}
	}
	public async delete(user: User, product: Product) {
		if (user.farmer.farms.some(farmItem => farmItem.products.some(productItem => productItem.id === product.id_farm))) {
		  return true
		}
	}
}
