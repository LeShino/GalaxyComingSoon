// import type { HttpContext } from '@adonisjs/core/http'

export default class EmailsController {
    async store ({ request, response }) {
        // Récupère l'email depuis la requête
        const email = request.input('email')

        // Valider l'email
        const validation = await validate({ email }, {
          email: 'required|email|unique:emails,email',
        })

        if (validation.fails()) {
          return response.status(400).send(validation.messages())
        }

        // Créer une nouvelle entrée dans la base de données
        await Email.create({ email })

        return response.status(200).send('Email enregistré avec succès!')
      }
}
