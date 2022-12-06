import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'product_orders'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .decimal('price_date')
    })
  }
}
