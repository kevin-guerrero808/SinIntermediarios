import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
      .integer('id_farm')
      .unsigned()
      .references('farms.id')
      .onDelete('CASCADE')
    })
  }
}
