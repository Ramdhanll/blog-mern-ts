import React, { FC } from 'react'
import { Container } from 'reactstrap'

export interface ICenterPieceProps {}

export const CenterPiece: FC<ICenterPieceProps> = (props) => {
   const { children } = props

   return (
      <Container fluid className='p-0'>
         <Container
            className='d-flex justify-content-center'
            style={{
               position: 'absolute',
               left: '50%',
               top: '50%',
               transform: 'translate(-50%, -50%)',
               WebkitTransform: 'translate(-50%, -50%)',
            }}
         >
            {children}
         </Container>
      </Container>
   )
}

export default CenterPiece
