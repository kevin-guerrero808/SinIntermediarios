import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'permission_role'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)

      table.integer('id_role').unsigned().references('roles.id')
      table.integer('id_permission').unsigned().references('permissions.id')
      table.unique(['id_role', 'id_permission'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
