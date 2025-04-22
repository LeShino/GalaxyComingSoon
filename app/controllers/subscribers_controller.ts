import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import Subscriber from '#models/subscriber'


export default class SubscribersController {


  /**
   * Enregistre un nouvel email dans la base de données
   */
  async store({ request, response }: HttpContext) {
    // Récupérer l'email envoyé dans la requête HTTP
    const email = request.input('email')

    // Vérifier que l'email est bien présent
    if (!email) {
      return response.badRequest({ message: 'Email is required' })
    }

    // Vérifier format email très simple (regex rapide)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return response.badRequest({ message: 'Invalid email format' })
    }

    // Vérifier si l'email existe déjà
    const existingSubscriber = await Subscriber.query().where('email', email).first()
    if (existingSubscriber) {
      return response.conflict({ message: 'This email is already subscribed' })
    }

    try {
      // Créer une nouvelle instance du modèle Subscriber
      const subscriber = new Subscriber()

      // Assigner l'email reçu à l'objet subscriber
      subscriber.email = email

      // Enregistrer dans la base de données
      await subscriber.save()

      // Retourner un message de succès (HTTP 201 Created)
      return response.created({ message: 'Thank you for subscribing!' })

    } catch (error) {
      console.error(error) // Loguer l'erreur côté serveur pour debug si besoin

      // En cas d'erreur (ex: email déjà existant - violation de contrainte unique)
      return response.conflict({ message: 'This email is already registered.' })
    }
  }

  /**
   * Récupère tous les abonnés de la base de données
   */
  async index({ response }: HttpContext) {
    try {
      // Récupérer tous les enregistrements de la table subscribers
      const subscribers = await Subscriber.all()
      // Retourner la liste des abonnés sous forme de JSON
      return response.ok(subscribers)
    } catch (error) {
      console.error(error) // Log l'erreur côté serveur
      return response.internalServerError({ message: 'Unable to fetch subscribers.' })
    }
  }
}
