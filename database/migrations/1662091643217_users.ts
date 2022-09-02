import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
      .integer('id_rol')
      .unsigned()
      .references('roles.id')
      //.onDelete('CASCADE') // eliminar el usuario si el rol el borrado
    })
  }
}
