import AppLayout from '~/layouts/app'
import { usePage } from '@inertiajs/react'
import { Form } from '@adonisjs/inertia/react'
import { useState } from 'react'

// La forme des données du profil qu'on récupère depuis le back
type ProfileUser = {
    fullName: string | null
    email: string
    sex: string | null
    age: number | null
    heightCm: number | null
    weightKg: number | null
    sessionsPerWeek: number | null
    intensity: number | null
}

export default function Profile() {
    // Récupérer l'utilisateur connecté, partagé avec toutes les pages par le middleware Inertia
    const user = usePage().props.user as ProfileUser

    // Le profil est complet si aucun des 6 champs n'est vide
    const isComplete =
        user.sex !== null &&
        user.age !== null &&
        user.heightCm !== null &&
        user.weightKg !== null &&
        user.sessionsPerWeek !== null &&
        user.intensity !== null

    // Si le profil est incomplet, on commence en mode édition, sinon en mode lecture
    const [isEditing, setIsEditing] = useState(!isComplete)

    // Correspondance entre le chiffre de l'intensité et son libellé
    const intensityLabels: Record<number, string> = {1: 'Légère', 2: 'Modérée', 3: 'Intense'}

    return (
    <div className="profile">
      <h1>Mon profil</h1>

      {isEditing ? (
        <Form route="profile.update">
          {({ errors, processing }) => (
            <div className="auth__form">
              <div className="field">
                <span className="field__label">Sexe</span>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="homme"
                    defaultChecked={user.sex === 'homme'}
                  />
                  Homme
                </label>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="femme"
                    defaultChecked={user.sex === 'femme'}
                  />
                  Femme
                </label>
                {errors.sex && <span className="field__error">{errors.sex}</span>}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="age">
                  Âge (ans)
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  className="field__input"
                  defaultValue={user.age ?? ''}
                />
                {errors.age && <span className="field__error">{errors.age}</span>}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="heightCm">
                  Taille (cm)
                </label>
                <input
                  id="heightCm"
                  name="heightCm"
                  type="number"
                  className="field__input"
                  defaultValue={user.heightCm ?? ''}
                />
                {errors.heightCm && <span className="field__error">{errors.heightCm}</span>}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="weightKg">
                  Poids (kg)
                </label>
                <input
                  id="weightKg"
                  name="weightKg"
                  type="number"
                  step="0.1"
                  className="field__input"
                  defaultValue={user.weightKg ?? ''}
                />
                {errors.weightKg && <span className="field__error">{errors.weightKg}</span>}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="sessionsPerWeek">
                  Séances de sport par semaine (0 à 7)
                </label>
                <input
                  id="sessionsPerWeek"
                  name="sessionsPerWeek"
                  type="number"
                  className="field__input"
                  defaultValue={user.sessionsPerWeek ?? ''}
                />
                {errors.sessionsPerWeek && (
                  <span className="field__error">{errors.sessionsPerWeek}</span>
                )}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="intensity">
                  Intensité des séances
                </label>
                <select
                  id="intensity"
                  name="intensity"
                  className="field__input"
                  defaultValue={user.intensity ?? ''}
                >
                  <option value="">Choisir…</option>
                  <option value="1">Légère</option>
                  <option value="2">Modérée</option>
                  <option value="3">Intense</option>
                </select>
                {errors.intensity && <span className="field__error">{errors.intensity}</span>}
              </div>


              <button type="submit" className="btn btn--primary btn--block" disabled={processing}>
                {processing ? 'Enregistrement…' : 'Enregistrer'}
              </button>

              {isComplete && (
                <button
                  type="button"
                  className="btn btn--secondary btn--block"
                  onClick={() => setIsEditing(false)}
                >
                  Annuler
                </button>
              )}
            </div>
          )}
        </Form>
      ) : (
        /* Le résumé du profil */
        <div className="profile__summary">
          <dl>
            <dt>Nom</dt>
            <dd>{user.fullName ?? 'Non renseigné'}</dd>

            <dt>Email</dt>
            <dd>{user.email}</dd>

            <dt>Sexe</dt>
            <dd>{user.sex === 'homme' ? 'Homme' : 'Femme'}</dd>

            <dt>Âge</dt>
            <dd>{user.age} ans</dd>

            <dt>Taille</dt>
            <dd>{user.heightCm} cm</dd>

            <dt>Poids</dt>
            <dd>{user.weightKg} kg</dd>

            <dt>Activité</dt>
            <dd>
              {user.sessionsPerWeek} séance(s) par semaine, intensité{' '}
              {intensityLabels[user.intensity!].toLowerCase()}
            </dd>
          </dl>

          <button
            type="button"
            className="btn btn--primary btn--block"
            onClick={() => setIsEditing(true)}
          >
            Modifier mon profil
          </button>
        </div>
      )}

      <Form route="profile.destroy">
        <button
          type="submit"
          className="btn btn--secondary btn--block"
          onClick={(event) => {
            // Demander confirmation, et annuler l'envoi si l'utilisateur refuse
            if (!confirm('Supprimer définitivement ton compte ?')) {
              event.preventDefault()
            }
          }}
        >
          Supprimer mon compte
        </button>
      </Form>
    </div>
)
}

// Afficher cette page à l'intérieur du layout des pages connectées
Profile.layout = [AppLayout]