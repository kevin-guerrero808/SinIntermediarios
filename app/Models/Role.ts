import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Permission from './Permission'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => User,{
    foreignKey: 'id_rol' //Nombre clave propagada de la entidad actual a la dominada
  })
  public usuarios: HasMany<typeof User>

  @manyToMany(() => Permission, {
    pivotTable: 'permiso_rol', //Nombre tabla pivote
    pivotForeignKey: 'id_rol', //Nombre de la clave que está en esta    entidad
    //pero en la tabla pivote
    pivotRelatedForeignKey: 'id_permiso', //Nombre de la segunda clave    //que sirve de pivote en la    relación
    //pivotColumns: ['created_at'] //obtener datos de columnas    adicionales
    })
    public permisos: ManyToMany<typeof Permission>
}
