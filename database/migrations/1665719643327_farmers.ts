import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'farmers'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('id_user')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE') // eliminar el perfil si el usuario es eliminado
        
      table.string('url_facebook',30)
      table.string('url_instagram',30)
    })
  }
}
