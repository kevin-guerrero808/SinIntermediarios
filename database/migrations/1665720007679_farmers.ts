import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'farmers'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
        
      table.string('url_photo',30)
    })
  }
}
