import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm'
import Product from 'App/Models/Product'
import ProductFarm from 'App/Models/ProductFarm'

export default class ProductsController {
    public async index(ctx: HttpContextContract) {
      let products: Product[] = await Product.query()
      return products
    }
    public async indexByFarm({ params }: HttpContextContract) {
      const farm = await Farm.query().where('id',params.id_farm).preload('products', (query) => {
        query.pivotColumns(['quantity', 'price'])
      });
      const products = farm[0].products.map(product => {
        return {...product.$attributes,
          quantity: product.$extras.pivot_quantity,
          price: product.$extras.pivot_price
        }
      })
      return products;
    }
    public async storeByFarm({ request, params }: HttpContextContract) {
      const body = request.body()

      // validate that product don't already exit on the farm
      const farms: Farm[] = await Farm.query().where("id", params.id_farm).preload('products')
      const farm = farms[0];

      const productAlreadyExist = farm.products?.find(product => product.name === body.name)
      if (productAlreadyExist) {
        return {
          "status": "error",
          "message": "Product already exist"
        }
      }

      let products: Product[] = await Product.query().where("name", body.name);
      let product = products[0]
      if (product) {
        // add to existing product
        product.quantity = product.quantity + body.quantity;
        await product.save();
        await farm.related('products').attach({
          [product.id]: {
            price: body.price,
            quantity: body.quantity
          }
        })
      } else {
        // add new product
        product = await Product.create({
          name: body.name,
          image_url: body.image_url,
          quantity: body.quantity,
          unit: body.unit,
          category: body.category
        })
        await farm.related('products').attach({
          [product.id]: {
            price: body.price,
            quantity: body.quantity
          }
        })
      }

      return {
        ...product.$attributes,
        price: body.price,
        quantity: body.quantity
      };
    }

    public async showByFarm({ params }: HttpContextContract) {
      const farms: Farm[] = await Farm.query().where("id", params.id_farm)
      const farm = farms[0]
      const products = await farm.related('products')
                      .query()
                      .wherePivot('id_product', params.id_product)
                      .pivotColumns(['quantity', 'price'])
      const product = products[0]

      return {
        ...product.$attributes,
        price: product.$extras.pivot_price,
        quantity: product.$extras.pivot_quantity
      }
    }

    public async updateByFarm({ request, params }: HttpContextContract) {
      const body = request.body()

      // get product
      const farms: Farm[] = await Farm.query().where("id", params.id_farm)
      const farm = farms[0]
      const products = await farm.related('products')
                      .query()
                      .wherePivot('id_product', params.id_product)
                      .pivotColumns(['quantity', 'price'])
      const product = products[0]
      
      // update product
      product.image_url = body.image_url
      product.unit = body.unit
      product.category = body.category
      const addQuantity = body.quantity - product.$extras.pivot_quantity;
      product.quantity = product.quantity + addQuantity;
      await product.save()

      // update product farm
      await farm.related('products').sync({
        [product.id]: {
          price: body.price,
          quantity: body.quantity
        }
      })

      return {
        ...product.$attributes,
        price: body.price,
        quantity: body.quantity
      }
    }
}
