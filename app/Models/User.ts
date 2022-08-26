import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile';
import Role from './Role';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre:string;

  @column()
  public correo:string;

  @column()
  public contrasena:string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Profile, {
    foreignKey: 'id_User'
  })
  public profile: HasOne<typeof Profile>;

  @belongsTo(() => Role,{
  foreignKey: 'id_rol', //Nombre de la clave foránea de la entidad dominante
  })
  public rol: BelongsTo<typeof Role>
}
