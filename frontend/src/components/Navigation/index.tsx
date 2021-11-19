import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
   Container,
   Nav,
   Navbar,
   NavbarBrand,
   NavbarText,
   Button,
} from 'reactstrap'
import UserContext, { initialUserState } from '../../contexts/user'

export type TNavigationProps = {}

const Navigation: React.FC<TNavigationProps> = (props) => {
   const { userState, userDispatch } = useContext(UserContext)
   const { user } = userState

   const Logout = () => {
      userDispatch({ type: 'logout', payload: initialUserState })
   }

   return (
      <Navbar color='light' light sticky='top' expand='md'>
         <Container>
            <NavbarBrand tag={Link} to='/'>
               📝
            </NavbarBrand>
            <Nav className='mr-auto' navbar />
            {user._id === '' ? (
               <div>
                  <NavbarText tag={Link} to='/login'>
                     Login
                  </NavbarText>
                  <NavbarText className='mr-2 ml-2'>|</NavbarText>
                  <NavbarText tag={Link} to='/register'>
                     Sign Up
                  </NavbarText>
               </div>
            ) : (
               <div>
                  <Button outline tag={Link} to='/edit'>
                     Post a Blog
                  </Button>
                  <NavbarText className='mr-2 ml-2'>|</NavbarText>
                  <Button outline size='sm' onClick={() => Logout()}>
                     Logout
                  </Button>
               </div>
            )}
         </Container>
      </Navbar>
   )
}

export default Navigation
