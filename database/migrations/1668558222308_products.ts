import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('unit')
      table.decimal('price')
      table.string('category')
    })
  }
}
