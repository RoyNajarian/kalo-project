import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  fullName: vine.string().nullable(),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})

/**
 * Validator to use when the user updates their profile
 */
export const profileValidator = vine.create({
  sex: vine.enum(['homme', 'femme']), // Seulement ces deux valeurs
  age: vine.number().withoutDecimals().min(15).max(150), // Entier entre 15 et 150 ans
  heightCm: vine.number().withoutDecimals().min(100).max(250), // entier entre 100 et 250 cm
  weightKg: vine.number().min(30).max(300), // décimales autorisées (72,5 kg)
  sessionsPerWeek: vine.number().withoutDecimals().min(0).max(7), // de 0 à 7 jours
  intensity: vine.number().withoutDecimals().min(1).max(3), // 1, 2 ou 3
})
