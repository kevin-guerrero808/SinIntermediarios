import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Order from "App/Models/Order";
import Product from 'App/Models/Product';

export default class OrdersController {

	public async index({ request }: HttpContextContract) {
		const order = await Order.query({}).preload('products');

		return order;
	}

	public async store({ request }: HttpContextContract) {
		const schemaPayload = schema.create({
			products: schema.array().members(schema.object().members({
				quantityOrder: schema.number(),
				id: schema.number()
			}))
		})
		const payload = await request.validate({ schema: schemaPayload })

		const productOrdersToAttach = {};
		let total: number = 0;
		payload.products.forEach(async (productOrder) => {
			const product: Product = await Product.findByOrFail('id', productOrder.id);
			if (product.quantity >= productOrder.quantityOrder) {
				productOrdersToAttach[productOrder.id] = {
					quantity: productOrder.quantityOrder,
					price: product.price * productOrder.quantityOrder,
					price_date: product.price
				}
				product.quantity -= productOrder.quantityOrder;
				await product.save()
				total += productOrdersToAttach[productOrder.id].price;
			}
		})

		const order = await Order.create({total_price: total})

		await order.related('products').attach(productOrdersToAttach);
		await order.load('products');

		return order;
	}

	public async show({params}:HttpContextContract) {
		return (await
		Order.query().where('id',params.id).preload('products'))[0];
	}

	public async update({request, params}:HttpContextContract) {
		const schemaPayload = schema.create({
			products: schema.array().members(schema.object().members({
				quantityOrder: schema.number(),
				id: schema.number()
			}))
		})
		const payload = await request.validate({ schema: schemaPayload })

		const order: Order =  (await
			Order.query().where('id',params.id).preload('products'))[0]

		const productOrdersToAttach = {};
		let total: number = 0;
		for(const productOrder of payload.products) {
			const product = await Product.findByOrFail('id', productOrder.id);
			const productOrderSaved = order.products.find(product => product.id === productOrder.id);

			if (productOrderSaved) { // product already saved
				// validate quantity
				const quantityChanged = productOrder.quantityOrder - productOrderSaved?.quantityOrder
				if ((quantityChanged > 0 && product.quantity >= quantityChanged) // there is product to buy
				|| quantityChanged <= 0) { // returning products
					product.quantity -= quantityChanged;

					// if quantity is equal to 0 then remove from order
					if (productOrder.quantityOrder) {
						productOrdersToAttach[productOrder.id] = {
							quantity: productOrder.quantityOrder,
							price: product.price * productOrder.quantityOrder,
							price_date: product.price
						}
						total += productOrdersToAttach[productOrder.id].price;
					}
				}
			} else { // new product to add
				if (product.quantity > productOrder.quantityOrder)
				product.quantity -= productOrder.quantityOrder;
	
				productOrdersToAttach[productOrder.id] = {
					quantity: productOrder.quantityOrder,
					price: product.price * productOrder.quantityOrder,
					price_date: product.price
				}
				total += productOrdersToAttach[productOrder.id].price;
			}
			await product.save()
		}

		order.total_price = total
		await order.save()
		await order.related('products').sync(productOrdersToAttach)
		if (Object.keys(productOrdersToAttach).length === 0) {
			return order.delete()
		} else {
			await order.load('products')
			return order;
		}
	}

	public async destroy({bouncer, params}:HttpContextContract) {
			const order: Order =  (await
				Order.query().where('id',params.id).preload('products'))[0]

			for(const product of order.products) {
				product.quantity += product.quantityOrder
				product.save();
			}
			
			return order.delete();
	}
}
