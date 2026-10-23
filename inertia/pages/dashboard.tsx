import AppLayout from '~/layouts/app'
import { Link } from '@adonisjs/inertia/react'

// La forme des résultats envoyés par le contrôleur (identique à EnergyResult dans le service)
type EnergyResult = {
  bmr: number
  activityScore: number
  activityFactor: number
  activityLabel: string
  dailyMaintenance: number
  weeklyMaintenance: number
}

// La page reçoit "energy" en prop : les résultats, ou null si le profil est incomplet
export default function Dashboard({ energy }: { energy: EnergyResult | null }) {
  if (!energy) {
    return (
      <div className="dashboard">
        <h1>Bienvenue sur Kalo</h1>
        <Link route="profile.edit" className="btn btn--primary">Compléter mon profil</Link>
      </div>
    )
  }

  // Profil complet : on affiche les résultats
  return (
    <div className="dashboard">
      <h1>Tes besoins énergétiques</h1>

      <div className="dashboard__card">
        <p>Maintien calorique par jour</p>
        <strong>{energy.dailyMaintenance.toLocaleString('fr-FR')} kcal</strong>
      </div>

      <div className="dashboard__card">
        <p>Maintien calorique par semaine</p>
        <strong>{energy.weeklyMaintenance.toLocaleString('fr-FR')} kcal</strong>
      </div>

      <div className="dashboard__card">
        <p>Métabolisme de base</p>
        <strong>{energy.bmr.toLocaleString('fr-FR')} kcal</strong>
      </div>

      <div className="dashboard__card">
        <p>Niveau d'activité</p>
        <strong>{energy.activityLabel}</strong>
      </div>

      <Link route="profile.edit" className="btn btn--secondary">Voir mon profil</Link>
    </div>
  )
}

// Afficher cette page à l'intérieur du layout des pages connectées
Dashboard.layout = [AppLayout]