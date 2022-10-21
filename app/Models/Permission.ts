import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

export default class Permission extends BaseModel {
  public static table = 'permissions'
  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  @column()
  public method: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Role, {
    pivotTable: 'permission_rol', //Nombre tabla pivote
    pivotForeignKey: 'id_permission',
    pivotRelatedForeignKey:'id_role'
    //pivotColumns: ['nombre-columna'] //obtener datos de columnas  adicionales
  })
  public roles: ManyToMany<typeof Role>
}
