import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'permission_rol'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_role').unsigned().references('roles.id').onDelete('CASCADE')
      //Referencia a clave primaria de segunda tabla implicada
      table.integer('id_permission').unsigned().references('permissions.id').onDelete('CASCADE')
      table.unique(['id_role', 'id_permission'])

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
