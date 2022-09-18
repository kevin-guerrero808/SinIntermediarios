import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProductFarm extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_farm: number

  @column()
  public id_product: number

  @column()
  public price: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
