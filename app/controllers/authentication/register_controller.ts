import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {

  async show({ view }: HttpContext) {
    return view.render('pages/authentication/register')
  }

  async store({}: HttpContext) {}

}