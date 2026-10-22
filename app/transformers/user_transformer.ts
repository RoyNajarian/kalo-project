import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

// Permet l'envoie des données de l'utilisateur connecté vers le frontend
export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'fullName',
      'email',
      'createdAt',
      'updatedAt',
      'initials',
      'sex',
      'age',
      'heightCm',
      'weightKg',
      'sessionsPerWeek',
      'intensity',
    ])
  }
}
