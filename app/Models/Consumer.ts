import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile';
import Order from './Order';

export default class Consumer extends Profile {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Order,{
    foreignKey: 'id_consumer',
  })
  public orders: HasMany<typeof Order>
}
