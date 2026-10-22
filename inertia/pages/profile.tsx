import AppLayout from '~/layouts/app'
import { usePage } from '@inertiajs/react'
import { Form } from '@adonisjs/inertia/react'

// La forme des données du profil qu'on récupère depuis le back
type ProfileUser = {
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

    return (
        <div className="profile">
        <h1>Mon profil</h1>
        <p>Ces informations servent à calculer tes besoins énergétiques.</p>

        {/* Formulaire du profil : envoyé à la route profile.update */}
        <Form route="profile.update">
            {({ errors, processing }) => (
            <div className="auth__form">
                {/* Sexe : deux boutons radio */}
                <div className="field">
                <span className="field__label">Sexe</span>
                <label>
                    <input type="radio" name="sex" value="homme" defaultChecked={user.sex === 'homme'} />
                    Homme
                </label>
                <label>
                    <input type="radio" name="sex" value="femme" defaultChecked={user.sex === 'femme'} />
                    Femme
                </label>
                {errors.sex && <span className="field__error">{errors.sex}</span>}
                </div>

                {/* Âge */}
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

                {/* Taille */}
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

                {/* Poids */}
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

                {/* Séances par semaine */}
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

                {/* Intensité : une liste déroulante */}
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
            </div>
            )}
        </Form>

        {/* Suppression du compte : un deuxième formulaire, envoyé à la route profile.destroy */}
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