import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'farms'

  
  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
      .integer('id_farmer')
      .unsigned()
      .references('farmers.id')
    })
  }
}
