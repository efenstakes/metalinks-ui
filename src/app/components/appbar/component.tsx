import { useEffect } from 'react'
import Image from 'next/image'

import Blockies from 'react-18-blockies'


import { Button, IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'


// assets
import logoImg from '../../../../public/images/face-small.png'


// models


import './component.scss'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Avatar } from '@/app/models/avatar'
import { useWindowWidth } from '@react-hook/window-size'


type ComponentProps = {
}
const AppbarComponent = ({ }: ComponentProps) => {
    const width = useWindowWidth()
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect({
      onSuccess: ()=> {
      }
    })
  

    // get data from redux

    
    // when a user logs in, get their avatar id, then 
    // fetch their data from the graph api
    useEffect(()=> {
        
    }, [ address ])


    useEffect(()=> {
        // if( avatar ) {
        //     // console.info("appbar --> avatar ", avatar)
        //     return
        // }
        // // console.log("account ", account)
        // if( account ) {
        //     // console.log("getting profile with id ", account)
        //     getMyProfile({
        //         variables: { address: account }
        //     })
        // }
    }, [ ])


    const logOut = ()=> {
        disconnect()
    }


    return (
        <div className='main_appbar appbar_md padded_container_sm row ma_space_btn ca_center'>
            
            <a href='/' className="main_appbar__logo_container row ca_center">
                <Image
                    src={logoImg} 
                    alt="logo"
                    className="main_appbar__logo_container__image fd_10" 
                />
                {
                    width > 768 &&
                        <p className='main_appbar__logo_container__logo text_3 bolder fd_15'>
                            MetaLinks
                        </p>
                }
            </a>
            
            {/* connect wallet if not logged in */}
            {
                !isConnected &&
                    <Button
                        disableElevation 
                        className="fd_16" 
                        onClick={()=> connect()}
                        size='medium'
                        variant='contained'
                        style={{
                            borderRadius: '4rem',
                            textTransform: 'none',
                        }}
                    >
                        Connect
                    </Button>
            }

            {/* show icon & name & logout button*/}
            {
                isConnected &&
                    <div className="row">
                        
                        <AvatarComponent 
                            address={address!} 
                            avatar={null}
                        />

                        {
                            width > 768 &&
                                <IconButton onClick={logOut} className='fd_15' color="primary" aria-label="logout" style={{ marginLeft: '1.2rem', color: '#1e1e1e' }}>
                                    <LogoutIcon />
                                </IconButton>
                        }

                    </div>
            }
            

        </div>
    )
}



type AvatarComponentProps = {
    address: string
    avatar: Avatar | null
}
const AvatarComponent = ({ address, avatar }: AvatarComponentProps)=> {

    if ( avatar ) {
        return (
            <a href='/me' className="main_appbar__right_container row ma_center ca_center">
                <img
                    src={avatar?.avatar} 
                    alt="profile avatar" 
                    className="fd_8 main_appbar__right_container__image" 
                />
                <p className="fd_11 text_6 bold main_appbar__right_container__text">
                    { avatar && avatar?.name?.slice(0, 3) }
                </p>
            </a>
        )
    }
    return (
        <a href='/me' className="main_appbar__right_container row ma_center ca_center">
            <div className="fd_8">
                 <Blockies
                    seed={address}
                    size={20}
                    scale={3}
                    // color="black" {/* normal color; random by default */}
                    // bgColor="#brown" {/* background color; random by default */}
                    // spotColor="#abc" {/* color of the more notable features; random by default */}
                    className="main_appbar__right_container_identicon"
                />
            </div>
            <p className="fd_11 text_6 bold main_appbar__right_container__text">
                { `${ address.slice(address.length-3, address.length) }` }
            </p>
        </a>
    )
}

export default AppbarComponent