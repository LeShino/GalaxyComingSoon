/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/


import RegisterController from '#controllers/authentication/register_controller'
import EmailController from '#controllers/email_controller'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

router.post('/subscribe', [EmailController, 'store']).as('suscribe.store')

router.group(() => {
    router.get('/register', [RegisterController, 'show']).as('register.show')
    router.post('/register', [RegisterController, 'store']).as('register.store')
}).as('auth')
