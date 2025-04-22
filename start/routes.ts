/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/



import router from '@adonisjs/core/services/router'
import SubscribersController from '#controllers/subscribers_controller'

//Front Office
router.on('/').render('pages/frontoffice/home')
router.post('/subscribe', [SubscribersController, 'store']).as('subscribe.store')

//Authentification
router.get('/login', async (ctx) => {
    return ctx.view.render('pages/backoffice/login')
})
// router.on('/login').render('pages/backoffice/login')

//Back Office
router.on('/dashboard').render('pages/backoffice/dashboard')
//router.get('/admin/dashboard', 'AdminController.dashboard').middleware('auth_middleware')
