import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, BelongsTo, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile';
import Role from './Role';
import ApiToken from './ApiToken';
import { Hash } from '@ioc:Adonis/';

export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name:string;

  @column()
  public email:string;

  @column()
  public password:string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Colocar este atributo de manera obligatoria
  @column()
  public id_role:number

  @hasOne(() => Profile, {
    foreignKey: 'id_user'
  })
  public profile: HasOne<typeof Profile>;

  @belongsTo(() => Role,{
    foreignKey: 'id_role', //Nombre de la clave foránea de la entidad dominante
  })
  public role: BelongsTo<typeof Role>

  @hasMany(() => ApiToken,{
    foreignKey: 'id_user',
  })
  public users: HasMany<typeof ApiToken>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

}
