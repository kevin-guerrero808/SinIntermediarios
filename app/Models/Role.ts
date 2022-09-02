import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Permission from './Permission'

export default class Role extends BaseModel {
  public static table = 'roles'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => User,{
    foreignKey: 'id_role' //Nombre clave propagada de la entidad actual a la dominada
  })
  public users: HasMany<typeof User>

  @manyToMany(() => Permission, {
    pivotTable: 'permission_rol', //Nombre tabla pivote
    pivotForeignKey: 'id_role', //Nombre de la clave que está en esta    entidad
    //pero en la tabla pivote
    pivotRelatedForeignKey: 'id_permission', //Nombre de la segunda clave    //que sirve de pivote en la    relación
    //pivotColumns: ['created_at'] //obtener datos de columnas    adicionales
    })
    public permissions: ManyToMany<typeof Permission>
}
