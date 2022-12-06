import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'admins'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('phone')
      table.string('address')
      table.string('url_photo')
      table
      .integer('id_user')
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      table.string('url_facebook')
      table.string('url_instagram')

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
