import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Order from "App/Models/Order";
import Product from 'App/Models/Product';
import ProductOrder from 'App/Models/ProductOrder';

export default class OrdersController {
	public async index({ request }: HttpContextContract) {
		return Order.query({}).preload('products');
	}

	public async store({ request }: HttpContextContract) {
		const schemaPayload = schema.create({
			productOrders: schema.array().members(schema.object().members({
				quantity: schema.number(),
				idProduct: schema.number()
			}))
		})
		const payload = await request.validate({ schema: schemaPayload })

		const productOrdersToAttach = {};
		let total: number = 0;
		payload.productOrders.forEach(async (productOrder) => {
			const product: Product = await Product.findByOrFail('id', productOrder.idProduct);
			if (product.quantity >= productOrder.quantity) {
				productOrdersToAttach[productOrder.idProduct] = {
					quantity: productOrder.quantity,
					price: product.price * productOrder.quantity,
					price_date: product.price
				}
				product.quantity -= productOrder.quantity;
				await product.save()
				total += productOrdersToAttach[productOrder.idProduct].price;
			}
			
		})

		const order = await Order.create({total_price: total})

		await order.related('products').attach(productOrdersToAttach);

		return order;
	}

	public async show({params}:HttpContextContract) {
		return (await
		Order.query().where('id',params.id).preload('products'))[0];
	}

	public async update({request, params}:HttpContextContract) {
		const schemaPayload = schema.create({
			productOrders: schema.array().members(schema.object().members({
				quantity: schema.number(),
				idProduct: schema.number()
			}))
		})
		const payload = await request.validate({ schema: schemaPayload })

		const order: Order =  (await
			Order.query().where('id',params.id).preload('products'), (query) => {
				query.pivotColumns(['quantity','price','priceToDate'])
			})[0]

		const productOrdersToAttach = {};
		let total: number = 0;
		payload.productOrders.forEach(async (productOrder) => {
			const product = await Product.findByOrFail('id', productOrder.idProduct);
			if (product.quantity >= productOrder.quantity) {
				productOrdersToAttach[productOrder.idProduct] = {
					quantity: productOrder.quantity,
					price: product.price * productOrder.quantity,
					priceToDate: product.price
				}
				product.quantity -= productOrder.quantity;
				total += productOrdersToAttach[productOrder.idProduct].price;
			}
		})

		order.total_price = total
		await order.save()
		await order.related('products').sync(productOrdersToAttach)

		return order;
	}

	public async destroy({bouncer, params}:HttpContextContract) {
			const order: Order = await Order.findOrFail(params.id)

			return order.delete();
	}
}
