import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // referecne to the primary key
      table
        .integer('id_user')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)

      table.string('celular', 30)
      table.string('url_facebook')
      table.string('url_photo')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
