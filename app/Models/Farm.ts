import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product';

export default class Farm extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public direction: string;

  @column()
  public logo_url: string;

  @column()
  public imagen_url: string;

  @column()
  public description: string;

  @manyToMany(() => Product, {
    pivotTable: 'product_farms', //Nombre tabla pivote
    pivotForeignKey: 'id_farm', //Nombre de la clave que está en esta    entidad
    //pero en la tabla pivote
    pivotRelatedForeignKey: 'id_product', //Nombre de la segunda clave    //que sirve de pivote en la    relación
    //pivotColumns: ['created_at'] //obtener datos de columnas    adicionales
  })
  public products: ManyToMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
