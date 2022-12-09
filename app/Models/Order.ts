import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import ProductOrder from './ProductOrder'
import Product from './Product'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public total_price: number

  @manyToMany(() => Product, {
    pivotTable: 'product_orders',
    pivotForeignKey: 'id_order',
    pivotRelatedForeignKey: 'id_product', //Nombre de la segunda clave    //que sirve de pivote en la    relación
    pivotColumns: ['price', 'quantity', 'price_date'] //obtener datos de columnas    adicionales
    })
    public products: ManyToMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
