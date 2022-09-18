import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'product_farms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
      .integer('id_farm')
      .unsigned()
      .references('farms.id')
      table
      .integer('id_product')
      .unsigned()
      .references('products.id')

      table.decimal('price').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
