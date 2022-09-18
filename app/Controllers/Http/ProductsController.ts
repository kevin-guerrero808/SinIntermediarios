import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm'
import Product from 'App/Models/Product'
import ProductFarm from 'App/Models/ProductFarm'

export default class ProductsController {
    public async index(ctx: HttpContextContract) {
      let products: Product[] = await Product.query()
      return products
    }
    public async show({ params }: HttpContextContract) {
      return Product.findOrFail(params.id)
    }
    public async indexByFarmer({ params }: HttpContextContract) {
      const farm = await Farm.query().where('id',params.id_farm).preload('products');
      return farm[0].products;
    }
    public async storeByFarmer({ request, params }: HttpContextContract) {
      const body = request.body()
      let product: Product = await Product.query().where("name", body.name)[0];
      if (product) {
        product.quantity = product.quantity + body.quantity;
      } else {
        const productMap = {
            name: body.name,
            image_url: body.image_url,
            quantity: body.quantity,
            unit: body.unit,
            category: body.category
        }
        product = await Product.create(productMap)
        await ProductFarm.create({
            id_farm: params.id_farm,
            id_product: product.id,
            price: body.price
        })
      }

      return product;
    }
    public async showByFarmer({ params }: HttpContextContract) {
        const farm = await Farm.query().where('id',params.id_farm).preload('products');
        const product = farm[0].products.find(product => product.id === params.id_product);
        return product;
    }
    public async updateByFarmer({ params }: HttpContextContract) {
      const product: ProductFarm = await ProductFarm.findOrFail(params.id_farm, params.id_product)
      return product
    }
}
