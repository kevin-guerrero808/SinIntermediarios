import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Profile extends BaseModel {
  public static table = 'profiles'

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_user: number

  @column()
  public cellphone: string

  @column()
  public url_facebook: string

  @column()
  public url_instagram: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
