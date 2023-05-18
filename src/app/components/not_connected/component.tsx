"use client"
import Image from 'next/image'
import { Button } from '@mui/material'
import WalletIcon from '@mui/icons-material/Wallet'

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { InjectedConnector } from 'wagmi/connectors/injected'


// component
import VSpacerComponent from "../v_spacer/v_spacer.component"


// assets
import face_img from '../../../../public/images/face-wheat.png'


// styles
import './component.scss'
import { FULL_WIDTH_BUTTON_STYLES } from '@/app/styles/common.styles'


type NotConnectedComponentProps = {
    onAuthenticate?: ()=> void
}
const NotConnectedComponent = ({ onAuthenticate }: NotConnectedComponentProps) => {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect({
      onSuccess: ()=> {
          console.log("disconnected")
          onAuthenticate && onAuthenticate()
      }
    })
  
    

    return (  
        <div className="not_loggedin_container g_bg_ps_1 column ma_center ca_center">

            <Image 
                src={face_img}
                alt="Avatar Image"
                className='not_loggedin_container__image small_indicator_image infinite_bouncing'
            />
            <VSpacerComponent space={1} />

            <p className="su_6 text_2 bold">
                Connect Wallet
            </p>
            <VSpacerComponent space={1} />

            <p className="su_9 text_6 text_center">
                Your wallet is not connected. Connect your wallet to see your profile and create avatar and metalinks. 
            </p>
            <VSpacerComponent space={1.5} />

            <Button
                variant="contained"
                color='primary'
                classes={['primary_button', 'button_lg', 'add_metalink__button']}
                onClick={()=> connect()}
                startIcon={
                    <WalletIcon sx={{ color: 'black' }} />
                }
                disabled={false}
                sx={{
                    ...FULL_WIDTH_BUTTON_STYLES,
                    alignSelf: 'center',
                    backgroundColor: 'snow',
                }}
                disableElevation
            >
                Connect Wallet
            </Button>

        </div>
    )
}

export default NotConnectedComponent