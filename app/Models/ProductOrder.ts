import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProductOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public quantity: number
  
  @column()
  public price: number

  @column()
  public price_date: number
  
  @column()
  public id_Product: number
  
  @column()
  public id_Order: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
