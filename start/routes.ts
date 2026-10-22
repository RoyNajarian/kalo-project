/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home', {}).as('home')

// Pages accessibles uniquement aux visiteurs NON connectés
router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

// Pages accessibles uniquement aux utilisateurs connectés
router
  .group(() => {
    router.on('/dashboard').renderInertia('dashboard', {}).as('dashboard')

    router.get('profile', [controllers.Profile, 'edit'])
    router.post('profile', [controllers.Profile, 'update'])
    router.post('profile/delete', [controllers.Profile, 'destroy'])

    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())