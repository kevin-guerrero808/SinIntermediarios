import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product';
import User from './User';
import Farm from './Farm';
import Profile from './Profile';

export default class Farmer extends Profile {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Farm,{
    foreignKey: 'id_farmer',
  })
  public farms: HasMany<typeof Farm>
}
