import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'product_farms'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('quantity')
    })
  }
}
