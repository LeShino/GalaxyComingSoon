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

router.on('/').render('pages/home')
router.post('/subscribe', [SubscribersController, 'store']).as('subscribe.store')
router.get('/admin/subscribers', [SubscribersController, 'index'])


router.get('/admin/login', 'AdminController.loginShow')
router.post('/admin/login', 'AdminController.login')
router.get('/admin/dashboard', 'AdminController.dashboard').middleware('auth')
