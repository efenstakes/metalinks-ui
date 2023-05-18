import clsx from 'clsx'


import { Skeleton } from '@mui/material'

import './loading_metalink_card.component.scss'


type ComponentProps = {
    animationIndex: number
  }
const LoadingMetalinkCardComponent = ({ animationIndex }: ComponentProps) => {
  return (
    <div 
        className={
            clsx({
                'loading_metalink_card': true,
                [`su_${animationIndex*1.5+20}`]: false,
            })
        }
    >
      <Skeleton variant="rectangular" width="100%" height="100%" className='loading_metalink_card__loader' />
    </div>
  )
}

export default LoadingMetalinkCardComponent