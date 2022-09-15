import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class ApiToken extends BaseModel {
  public static table = 'api_tokens'

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_usuario: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public token: string

  @belongsTo(() => User,{
    localKey: 'id_user',
  })
  public role: BelongsTo<typeof User>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
