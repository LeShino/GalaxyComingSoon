import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'subscribers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Clé primaire auto-incrémentée
      table.string('email').notNullable().unique() // Email obligatoire et unique
      table.timestamp('created_at').notNullable().defaultTo(this.now()) // Date d'inscription
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
