import iRoute from '../interfaces/route'
import BlogPage from '../pages/Blog'
import EditPage from '../pages/Edit'
import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'

const authRoutes: iRoute[] = [
   {
      path: '/login',
      exact: true,
      auth: false,
      component: LoginPage,
      name: 'Login',
   },
   {
      path: '/register',
      exact: true,
      auth: false,
      component: LoginPage,
      name: 'Register',
   },
]

const blogRoutes: iRoute[] = [
   {
      path: '/edit',
      exact: true,
      auth: true,
      component: EditPage,
      name: 'Edit',
   },
   {
      path: '/edit/:blogID',
      exact: true,
      auth: true,
      component: EditPage,
      name: 'Edit',
   },
   {
      path: '/blogs/:blogID',
      exact: true,
      auth: true,
      component: BlogPage,
      name: 'Blog',
   },
]

const mainRoutes: iRoute[] = [
   {
      path: '/',
      exact: true,
      auth: true,
      component: HomePage,
      name: 'Home',
   },
]

const routes: iRoute[] = [...authRoutes, ...blogRoutes, ...mainRoutes]

export default routes
