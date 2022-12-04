import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product';

export default class Farm extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public direction: string | null;

  @column()
  public logo_url: string | null;

  @column()
  public imagen_url: string | null;

  @column()
  public description: string | null;

  @column()
  public id_farmer: number

  @hasMany(() => Product, {
    foreignKey: 'id_farm',
  })
  public products: HasMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
