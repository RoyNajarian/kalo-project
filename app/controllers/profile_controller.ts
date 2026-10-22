import { profileValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {

    // Afficher la page du profil
    async edit(ctx: HttpContext) {
        return ctx.inertia.render('profile', {})
    }

    // Enregistrer le profil envoyé par le formulaire
    async update(ctx: HttpContext) {

        // Récupérer l'utilisateur connecté
        const user = ctx.auth.getUserOrFail()

        // Vérifier les données du formulaire avec le validateur
        const data = await ctx.request.validateUsing(profileValidator)

        // Mettre les nouvelles valeurs dans l'utilisateur
        user.sex = data.sex
        user.age = data.age
        user.heightCm = data.heightCm
        user.weightKg = data.weightKg
        user.sessionsPerWeek = data.sessionsPerWeek
        user.intensity = data.intensity

        // Sauvegarder dans la base de données
        await user.save()

        // Afficher un message et retourner au tableau de bord
        ctx.session.flash('success', 'Profil mis à jour')
        return ctx.response.redirect('/dashboard')
    }

    // Supprimer le compte
    async destroy(ctx: HttpContext) {
        const user = ctx.auth.getUserOrFail() // Récupérer l'utilisateur connecté
        await ctx.auth.use('web').logout() // Le déconnecter
        await user.delete() // Supprimer son compte de la base
        return ctx.response.redirect('/') // Retourner à l'accueil
    }
}