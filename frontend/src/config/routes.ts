import TRoute from '../types/route'
import BlogPage from '../pages/Blog'
import EditPage from '../pages/Edit'
import HomePage from '../pages/Home'
import LoginPage from '../pages/Login'

const authRoutes: TRoute[] = [
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

const blogRoutes: TRoute[] = [
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
      auth: false,
      component: BlogPage,
      name: 'Blog',
   },
]

const mainRoutes: TRoute[] = [
   {
      path: '/',
      exact: true,
      auth: false,
      component: HomePage,
      name: 'Home',
   },
]

const routes: TRoute[] = [...authRoutes, ...blogRoutes, ...mainRoutes]

export default routes
