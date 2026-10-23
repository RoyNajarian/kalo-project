import vine from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup.
 *
 * The "passwordConfirmation" field is declared explicitly, so that it is part
 * of the request body type shared with the frontend. Otherwise the signup form
 * has no way to know about the errors reported for this field.
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

// Permet de valider les champs du profil utilisateur pour le calcul énergétique
export const profileValidator = vine.create({
  sex: vine.enum(['homme', 'femme']), // Seulement ces deux valeurs
  age: vine.number().withoutDecimals().min(15).max(100), // Entier entre 15 et 100 ans
  heightCm: vine.number().withoutDecimals().min(100).max(250), // Entier entre 100 et 250 cm
  weightKg: vine.number().min(30).max(300), // Décimales autorisées
  sessionsPerWeek: vine.number().withoutDecimals().min(0).max(7), // De 0 à 7 jours
  intensity: vine.number().withoutDecimals().min(1).max(3), // 1, 2 ou 3
})