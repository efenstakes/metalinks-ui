"use client"
import Image from 'next/image';

import { Button } from '@mui/material'


// components
import VSpacerComponent from "../v_spacer/v_spacer.component"


// assets
import face_img from '../../../../public/images/face-wheat.png'


// styles
import './component.scss'
import { FULL_WIDTH_BUTTON_STYLES } from '@/app/styles/common.styles'


type SuccessComponentProps = {
    title?: string
    text?: string
    onClickCta?: ()=> void
    buttonText?: string
}
const SuccessComponent = ({ title, text, onClickCta, buttonText }: SuccessComponentProps) => {

    

    return (  
        <div className="success_container g_bg_ps_1 column ma_center ca_center">

            <Image 
                src={face_img}
                alt="Avatar Image"
                className='not_loggedin_container__image small_indicator_image infinite_bouncing'
            />
            <VSpacerComponent space={1} />

            <p className="su_6 text_2 bold">
                { title }
            </p>
            <VSpacerComponent space={1} />

            <p className="su_9 text_6 text_center">
                { text } 
            </p>
            <VSpacerComponent space={1.5} />

            <Button
                variant="contained"
                color='primary'
                classes={['primary_button', 'button_lg', 'add_metalink__button']}
                onClick={onClickCta}
                disabled={false}
                sx={{
                    ...FULL_WIDTH_BUTTON_STYLES,
                    alignSelf: 'center',
                }}
                disableElevation
            >
                { buttonText }
            </Button>

        </div>
    )
}

export default SuccessComponent