import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('sex', ['homme', 'femme']).nullable()
      table.integer('age').nullable()
      table.integer('height_cm').nullable()
      table.float('weight_kg').nullable()
      table.integer('sessions_per_week').nullable()
      table.integer('intensity').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('sex', 'age', 'height_cm', 'weight_kg', 'sessions_per_week', 'intensity')
    })
  }
}