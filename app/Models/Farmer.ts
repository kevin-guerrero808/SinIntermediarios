import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product';
import User from './User';

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}
