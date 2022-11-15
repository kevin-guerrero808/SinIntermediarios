import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Farm from './Farm'

export default class Profile extends BaseModel {
  public static table = 'profiles'

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_user: number

  @column()
  public url_photo: string

  @column()
  public phone: string

  @column()
  public first_name: string;

  @column()
  public last_name: string;

  @column()
  public url_facebook: string

  @column()
  public url_instagram: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Farm,{
    foreignKey: 'id_farmer',
  })
  public farms: HasMany<typeof Farm>
}
