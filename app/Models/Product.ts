import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Farm from './Farm';

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
  public category: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Farm, {
    pivotTable: 'product_farms', //Nombre tabla pivote
    pivotForeignKey: 'id_product',
    pivotRelatedForeignKey:'id_farm',
    pivotColumns: ['price'] //obtener datos de columnas  adicionales
  })
  public farms: ManyToMany<typeof Farm>
}
