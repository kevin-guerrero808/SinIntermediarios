import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'farmers'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
      .integer('id_user')
      .alter()
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
    })
  }
}
