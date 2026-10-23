import EnergyService from '#services/energy_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {

  // Afficher l'accueil avec les résultats du calcul
  async show(ctx: HttpContext) {
    const user = ctx.auth.getUserOrFail() // Récupérer l'utilisateur connecté

    // Demander au service de faire les calculs
    // Renvoie les résultats, ou null si le profil n'est pas complet
    const energy = EnergyService.calculateEnergyNeeds(user)

    // Afficher la page dashboard en lui envoyant les résultats
    return ctx.inertia.render('dashboard', { energy })
  }
}