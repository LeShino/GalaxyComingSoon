/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/


import LoginController from '#controllers/auth/login_controller'
import LogoutController from '#controllers/auth/logout_controller'
import RegisterController from '#controllers/auth/register_controller'
import EmailController from '#controllers/email_controller'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

router.post('/subscribe', [EmailController, 'store']).as('suscribe.store')

router.group(() => {
    router.get('/register', [RegisterController, 'show']).as('register.show')
    router.post('/register', [RegisterController, 'store']).as('register.store')

    router.get('/login', [LoginController, 'show']).as('login.show')
    router.post('/login', [LoginController, 'store']).as('login.store')

    router.post('/logout', [LogoutController, 'handle']).as('logout')
}).as('auth')

// router.on('/panel').render('pages/admin/accueil')
router.get('/panel', async (ctx) => {
    await ctx.auth.check
    return ctx.view.render('pages/admin/panel')
})

