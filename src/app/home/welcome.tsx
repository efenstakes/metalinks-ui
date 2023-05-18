"use client"


import { Button } from '@mui/material'
import { useWindowWidth } from '@react-hook/window-size'
import { useAccount, useConnect, useDisconnect,  } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'


// components

import faceBig from '../../../public/images/face-big.png'
// import face_small from '../../public/images/face-small.png'
import VSpacerComponent from '../components/v_spacer/v_spacer.component'


import './welcome.scss'


const FaceBig = '/images/face-big.png'
const FaceSmall = '/images/face-small.png'

const WelcomeComponent = () => {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })

    const width = useWindowWidth()


    const isDesktop = width > 1000
    return (
        <div className='welcome_section padded_container gradial_bg_container column ma_center ca_center'>
            
            {/* underlay */}
            <div className="welcome_section__underlay row ma_around ca_center">
                {
                    isDesktop &&
                        <img 
                            src={FaceSmall} 
                            alt="face_small" 
                            className='welcome_section__underlay__image welcome_section__underlay__small su_7'
                        />
                }
                <img 
                    src={FaceSmall} 
                    alt="face_small" 
                    className='welcome_section__underlay__image welcome_section__underlay__small su_10'
                />
                <img 
                    src={FaceBig} 
                    alt="face_small" 
                    className='welcome_section__underlay__image welcome_section__underlay__big su_12'
                />
                <img 
                    src={FaceSmall} 
                    alt="face_small" 
                    className='welcome_section__underlay__image welcome_section__underlay__small su_15'
                />
                {
                    isDesktop &&
                        <img 
                            src={FaceSmall} 
                            alt="face_small" 
                            className='welcome_section__underlay__image welcome_section__underlay__small su_17'
                        />
                }
            </div>

            {/* info */}
            <div className="welcome_section__info width_100 column ma_center ca_center">

                <p className="title_3 su_18">
                    MetaLinks
                </p>

                <div className="welcome_section__info__text__container">
                    <p className="welcome_section__info__text text_6 su_20">
                        Want to keep your different Metaverse profiles in one 
                        place? MetaLinks is here to help you do that.
                    </p>
                </div>
                <VSpacerComponent space={2} />
 
                {
                    !isConnected &&
                        <Button
                            disableElevation
                            className="su_24" 
                            onClick={()=> connect()}
                            color='primary'
                            size='large'
                            variant='contained'
                            style={{
                                borderRadius: '4rem',
                                textTransform: 'none',
                            }}
                        >
                            Connect Wallet
                        </Button>
                }

            </div>


        </div>
    )
}

export default WelcomeComponent
