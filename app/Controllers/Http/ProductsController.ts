import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Farm from 'App/Models/Farm'
import Product from 'App/Models/Product'
import ProductFarm from 'App/Models/ProductFarm'

export default class ProductsController {
    public async index({ request }: HttpContextContract) {
      const queryParameters = request.qs()
      let products;
      if (Object.keys(queryParameters).length > 0) {
        if (queryParameters.name) {
          products = await Product.query().where('name', queryParameters.name)
        }
      } else {
        products = await Product.query()
      }
      return products
    }
    public async show({ params }: HttpContextContract) {
      const product: Product = (await Product.query().where("id", params.id_product))[0]

      return product
    }
    public async indexByFarm({ params }: HttpContextContract) {
      const farm = (await Farm.query().where('id',params.id_farm).preload('products'))[0];
      return farm.products;
    }
    public async store({ request, params, bouncer }: HttpContextContract) {
      const schemaPayload = schema.create({
        name: schema.string(),
        image_url: schema.string.optional(),
        quantity: schema.number(),
        unit: schema.string(),
        price: schema.number(),
        category: schema.string.optional()
      })
      const payload = await request.validate({ schema: schemaPayload })

      // validate that product don't already exit on the farm
      const farms: Farm[] = await Farm.query().where("id", params.id_farm).preload('products')
      const farm = farms[0];

      await bouncer
      .with('ProductPolicy')
      .authorize('create', farm)

      const productAlreadyExist = farm.products?.find(product => product.name === payload.name)
      if (productAlreadyExist) {
        return {
          "status": "error",
          "message": "Product already exist"
        }
      }

      const product = await farm.related('products').create(payload);

      return product;
    }
    public async update({ request, params, bouncer }: HttpContextContract) {
      const schemaPayload = schema.create({
        name: schema.string.optional(),
        image_url: schema.string.optional(),
        quantity: schema.number.optional(),
        unit: schema.string.optional(),
        price: schema.number.optional(),
        category: schema.string.optional()
      })
      const payload = await request.validate({ schema: schemaPayload })

      // get product
      const product: Product = (await Product.query().where("id", params.id_product))[0]

      await bouncer
      .with('ProductPolicy')
      .authorize('update', product)

      product.merge(payload)

      return product.save()
    }
    public async destroy({ params, bouncer }: HttpContextContract) {
      const product: Product = (await Product.query().where("id", params.id_product))[0]

      await bouncer
      .with('ProductPolicy')
      .authorize('delete', product)

      return product.delete()
    }
}
