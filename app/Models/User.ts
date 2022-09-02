import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile';
import Role from './Role';

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
}
