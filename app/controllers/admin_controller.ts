import { HttpContext } from '@adonisjs/core/http'
import Subscriber from '#models/subscriber'

export default class AdminController {
  async loginShow({ view }: HttpContext) {
    return view.render('admin/login')
  }

  async login({ request, response, session }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])

    // Authentification simple (à remplacer par une vraie auth)
    if (username === 'admin' && password === 'password') {
      session.put('isAdmin', true)
      return response.redirect('/admin/dashboard')
    }

    return response.redirect().back().withErrors({ error: 'Identifiants incorrects' })
  }

  async dashboard({ view, session, response }: HttpContext) {
    if (!session.get('isAdmin')) {
      return response.redirect('/admin/login')
    }

    const subscribers = await Subscriber.all()
    return view.render('admin/dashboard', { subscribers })
  }
}
