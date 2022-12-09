import { DateTime } from 'luxon'
import { BaseModel, column, computed, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Farm from './Farm';
import Order from './Order';

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public image_url: string;

  @column()
  public quantity: number;
  
  @column()
  public unit: string;

  @column()
  public price: number;

  @column()
  public category: string;

  @column()
  public id_farm: number

  @manyToMany(() => Order, {
    pivotTable: 'product_orders',
    pivotForeignKey: 'id_order',
    pivotRelatedForeignKey: 'id_product', //Nombre de la segunda clave    //que sirve de pivote en la    relación
    pivotColumns: ['price', 'quantity', 'price_date'] //obtener datos de columnas    adicionales
  })
  public orders: ManyToMany<typeof Order>

  @computed()
  public get priceOrder() {
    return this.$extras.pivot_price
  }

  @computed()
  public get quantityOrder() {
    return this.$extras.pivot_quantity
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
