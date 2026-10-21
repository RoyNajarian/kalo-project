// Moule des 6 données du profil dont les calculs ont besoin
type ProfileData = {
  sex : string | null // 'homme' ou 'femme'
  age : number | null
  heightCm : number | null
  weightKg : number | null
  sessionsPerWeek : number | null // séances par semaine, de 0 à 7
  intensity : number | null // 1 légère, 2 modérée, 3 intense
}

// Moule de l'objet renvoyé par calculateEnergyNeeds() 
export type EnergyResult = {
  bmr : number // métabolisme de base, en kcal/jour
  activityScore : number // séances × intensité, de 0 à 21
  activityFactor : number // coefficient d'activité (1,2 à 1,9)
  activityLabel : string
  dailyMaintenance : number // maintien calorique par jour, en kcal
  weeklyMaintenance : number // maintien calorique par semaine, en kcal
}

// Tableau des coefficients d'activité selon le score (séances × intensité)
const ACTIVITY_LEVELS = [
  { maxScore: 0, factor: 1.2, label: 'Sédentaire' },
  { maxScore: 3, factor: 1.375, label: 'Légèrement actif' },
  { maxScore: 9, factor: 1.55, label: 'Modérément actif' },
  { maxScore: 15, factor: 1.725, label: 'Très actif' },
  { maxScore: 21, factor: 1.9, label: 'Extrêmement actif' },
]

// Regroupe toute la logique du calcul énergétique
export default class EnergyService {

    // Vérifie que les 6 champs du profil sont remplis
    static isProfileComplete(profile: ProfileData): boolean {
        return profile.sex !== null && profile.age !== null && profile.heightCm !== null && profile.weightKg !== null && profile.sessionsPerWeek !== null && profile.intensity !== null;
    }

    // Calcule le métabolisme de base avec la formule de Mifflin-St Jeor
    static basalMetabolicRate(sex: string, weightKg: number, heightCm: number, age: number): number {
        const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
        return sex === 'homme' ? base + 5 : base - 161; // On ajuste selon le sexe
    }

    // Trouve le niveau d'activité qui correspond au score
    static activityLevel(score :number) {
        for (const level of ACTIVITY_LEVELS) {
            if (score <= level.maxScore) {
                return level;
            }
        }
        return ACTIVITY_LEVELS[ACTIVITY_LEVELS.length - 1]; // Si score > 21, on prend le dernier niveau
    }

    // Calcule tous les résultats, ou renvoie null si le profil est incomplet
    static calculateEnergyNeeds(profile: ProfileData): EnergyResult | null {
        if (!this.isProfileComplete(profile)) {
            return null;
        }

        // Calcul du métabolisme de base
        const bmr = this.basalMetabolicRate(profile.sex!, profile.weightKg!, profile.heightCm!, profile.age!)

        // Calcul du score d'activité
        const activityScore = profile.sessionsPerWeek! * profile.intensity!

        // On appelle la fonction qui renvoie le niveau d'activité correspondant au score
        const level = this.activityLevel(activityScore)

        // On calcule le maintien 
        const dailyMaintenance = bmr * level.factor

        return {
            bmr: Math.round(bmr),
            activityScore,
            activityFactor: level.factor,
            activityLabel: level.label,
            dailyMaintenance: Math.round(dailyMaintenance),
            weeklyMaintenance: Math.round(dailyMaintenance * 7),
        }
    }
}