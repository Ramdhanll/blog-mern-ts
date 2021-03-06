import React, { FC } from 'react'
import { Card, CardBody } from 'reactstrap'
import CenterPiece from '../CenterPiece'

type TLoadingProps = {
   dotType?: string
}

export const Loading: FC<TLoadingProps> = (props) => {
   const { dotType, children } = props
   return (
      <div className='text-center'>
         <div className='stage'>
            <div className={dotType} />
         </div>
         {children}
      </div>
   )
}

Loading.defaultProps = {
   dotType: 'dot-bricks',
}

export type TLoadingComponentProps = {
   card?: boolean
   dotType?: string
}

export const LoadingComponent: FC<TLoadingComponentProps> = (props) => {
   const { card, dotType, children } = props

   if (card) {
      return (
         <CenterPiece>
            <Card>
               <CardBody>
                  <Loading dotType={dotType}>{children}</Loading>
               </CardBody>
            </Card>
         </CenterPiece>
      )
   }

   return <Loading dotType={dotType}>{children}</Loading>
}

LoadingComponent.defaultProps = {
   card: true,
   dotType: 'dot-bricks',
}
