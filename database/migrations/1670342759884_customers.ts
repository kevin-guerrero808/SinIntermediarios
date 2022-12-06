import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'consumers'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('phone_number', 'phone')
      table.string('url_facebook')
      table.string('url_instagram')
    })
  }
}
