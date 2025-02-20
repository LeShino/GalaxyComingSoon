import { registerValidator } from '#validators/auth'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {

  async show({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  async store({ request, response, auth }: HttpContext) {

    const data = await request.validateUsing(registerValidator)
    console.warn(data)
    const user = await User.create(data)

    await auth.use('web').login(user)

    return response.redirect().toPath('/panel')
  }

}