import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product';
import User from './User';
import Farm from './Farm';

export default class Farmer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public first_name: string;

  @column()
  public last_name: string;

  @column()
  public phone: string;

  @belongsTo(() => User,{
    foreignKey: 'id_user', //Nombre de la clave foránea de la entidad dominante
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Farm,{
    foreignKey: 'id_farmer',
  })
  public farms: HasMany<typeof Farm>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}
