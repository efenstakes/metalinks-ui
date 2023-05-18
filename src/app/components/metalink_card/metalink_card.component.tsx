import clsx from 'clsx'


// models
import { MetaLink } from '../../models/metalink.model'
import VSpacerComponent from '../v_spacer/v_spacer.component'


// styles
import './metalink_card.component.scss'



type ComponentProps = {
  metaLink: MetaLink
  animationIndex: number
}
const MetalinkCardComponent = ({ metaLink, animationIndex }: ComponentProps) => {
  return (
    <div className={
          clsx([
            'metalink_card', 'paper_sm', 'clickable', 'row',
            [`su_${animationIndex}`]
          ])
      }
    >

      {/* image */}
      <div className="metalink_card__image_container">
        <img 
          src={metaLink.avatar} 
          alt="avatar" 
          className="metalink_card__image_container_image" 
        />
      </div>

      {/* content */}
      <div className="metalink_card__content_container column ma_center">

        <div className="metalink_card__content_container__title row ma_space_btn ca_center">

          <p className="text_5 bold">
            { metaLink.name }
          </p>

          <div className="chip metalink_card__content_container__title__chip text_6 bold">
            { metaLink.is_active ? 'Active' : 'Inactive' }
          </div>

        </div>

        <p className="text_7 bold">
            { metaLink.universe }
        </p>
        <VSpacerComponent space={.2} />

        <p className="text_6 clipped_text">
          { metaLink.bio }
        </p>

      </div>
      
    </div>
  )
}

export default MetalinkCardComponent