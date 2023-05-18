"use client"
import { ChangeEvent, useEffect, useState } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import clsx from 'clsx'


import { IconButton, FormControlLabel, FormGroup, Switch, CircularProgress, Alert, Button, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

// components
import VSpacerComponent from '../../components/v_spacer/v_spacer.component'
import TextInputComponent from '../../components/inputs/text_input.component'


// models


// services


// actions


// styles
import './page.scss'


import { EXTRA_LG_FULL_WIDTH_INPUT_STYLES, FULL_WIDTH_BUTTON_STYLES } from '../../styles/common.styles'
import { Avatar } from '@/app/models/avatar'
import { useRouter } from 'next/navigation'
import { useAccount, useContractWrite, usePrepareContractWrite, usePrepareSendTransaction, useSendTransaction } from 'wagmi'

import ABI from '../../../../public/MetaLinks.json'
import SuccessComponent from '@/app/components/success/component'


const CONTRACT_ADDRESS = '0xA6C7382372ca0e8122D052dC61b4f3e45ADd79da'
const AddAvatarPage = () => {
    // to programatically navigate 
    const router = useRouter()
    
    const { address, isConnected } = useAccount()
    let width = useWindowWidth()
    
    const initialAvatar: Avatar = {}
    const initialAvatarErrors: Avatar = {}
    const [avatar, setAvatar] = useState<Avatar>(initialAvatar)
    const [avatarErrors, setAvatarErrors] = useState<Avatar>(initialAvatarErrors)
    
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)
    

    const { config, error, isError, isSuccess } = usePrepareContractWrite({
        address: CONTRACT_ADDRESS,
        abi: ABI.abi,
        functionName: 'createAvatar',
        args: [ avatar.name, avatar.aka, avatar.bio, avatar.avatar, avatar.bgAvatar ],
    })
    const { data, write: sendTransaction, status: transactionStatus, isLoading } = useContractWrite(config)
    console.log("error ", error)
    console.log("data ", data)
    console.log("isError ", isError)
    console.log("isSuccess ", isSuccess)
  

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
      setAvatar(()=> {
            return {
                ...avatar, [e.target.name]: e.target.value
            }
        })
    }


    const executeAction = ()=> {
      let hasError = false

      let { name, aka, bio, avatar: avatarUrl, bgAvatar, } = avatar  

      if( !name || name.length === 0 ) {
        hasError = true
        setAvatarErrors((state)=> {
          return { ...state, name: "Name cannot be empty" }
        })
      }
      if( name && name.length < 4 ) {
        hasError = true
        setAvatarErrors((state)=> {
          return { ...state, name: "Name should be atleast 4 characters" }
        })
      }
      
      if( !aka ) aka = ""
      if( !bio ) bio = ""
          
      if( !avatarUrl || avatarUrl.length === 0 ) {
        hasError = true
        setAvatarErrors((state)=> {
          return { ...state, avatar: "Avatar cannot be empty" }
        })
      }
      if( avatarUrl && avatarUrl.length < 5 ) {
        hasError = true
        setAvatarErrors((state)=> {
          return { ...state, avatar: "Avatar should be a valid link" }
        })
      }

      if( !bgAvatar || bgAvatar.length === 0 ) {
        bgAvatar = ""
      }

      if( hasError ) {
        console.log("data error")
        return 
      }

      sendTransaction && sendTransaction()
    }


    // go to my avatar page
    const goToMyAvatar = ()=> router.push("/me")
    


    useEffect(()=> {
        // status: "error" | "idle" | "success" | "loading"
        console.log("transactionStatus ", transactionStatus)

        if( transactionStatus === "success" ) {
            setIsSuccessful(true)
        }
        switch( transactionStatus ) {
            case "error" :
                setHasError(true)
            case "success" :
                setIsSuccessful(true)
            
            default :
                setIsSuccessful(false)
                setHasError(false)
        }
    }, [  transactionStatus ])


    if( transactionStatus === "success" ) {
        return (
          <div className="page">
            <SuccessComponent
              title='MetaLink Added'
              text='Your new avatar has been added successfully.'
              onClickCta={
                ()=> router.push('/me')
              }
              buttonText='View My Profile'
            />
          </div>
        )
      }
    return (
      <div 
          className={
              clsx([
                  'add_avatar',
              ])
          } 
      >

        <VSpacerComponent space={1} />

        <div className='add_avatar__form'>
            {/* title */}
            <p className="su_3 text_4 bold" style={{  marginLeft: '1rem' }}>
            Create Avatar
            </p>
            <VSpacerComponent space={3} />

            {/* name */}
            <TextInputComponent
                name='name'
                id='name'
                onChange={ handleFieldChange }
                autoFocus
                labelText='Enter your name'
                labelWidth={160}
                placeholder='Enter your name'
                errorText={avatarErrors.name}
                wrapperStyles={{
                ...EXTRA_LG_FULL_WIDTH_INPUT_STYLES,
                }}
            />
            <VSpacerComponent space={2} />
            
            {/* aka */}
            <TextInputComponent
                name='aka'
                id='aka'
                onChange={ handleFieldChange }
                autoFocus
                labelText='Enter aka'
                labelWidth={100}
                placeholder='Enter aka'
                errorText={avatarErrors.aka}
                wrapperStyles={{
                ...EXTRA_LG_FULL_WIDTH_INPUT_STYLES,
                }}
            />
            <VSpacerComponent space={2} />
            
            
            {/* bio */}
            <TextInputComponent
                name='bio'
                id='bio'
                onChange={ handleFieldChange }
                autoFocus
                labelText='Enter bio'
                labelWidth={90}
                placeholder='Enter bio'
                errorText={avatarErrors.bio}
                wrapperStyles={{
                ...EXTRA_LG_FULL_WIDTH_INPUT_STYLES,
                }}
                multiline
                rows={5}
            />
            <VSpacerComponent space={2} />
            

            {/* pick avatar */}
            <TextInputComponent
                name='avatar'
                id='avatar'
                onChange={ handleFieldChange }
                autoFocus
                labelText='Enter avatar link'
                labelWidth={150}
                placeholder='Enter your avatar link'
                errorText={avatarErrors.avatar}
                wrapperStyles={{
                ...EXTRA_LG_FULL_WIDTH_INPUT_STYLES,
                }}
            />
            <VSpacerComponent space={2} />

            {/* pick background avatar */}
            <TextInputComponent
                name='bgAvatar'
                id='bgAvatar'
                onChange={ handleFieldChange }
                autoFocus
                labelText='Enter background avatar link'
                labelWidth={270}
                placeholder='Enter your background avatar link'
                errorText={avatarErrors.bgAvatar}
                wrapperStyles={{
                ...EXTRA_LG_FULL_WIDTH_INPUT_STYLES,
                }}
            />
            <VSpacerComponent space={4} />
            
            {/* add button */}
            {
            !isSuccessful &&
                <div className="width_100 row ma_center">
                    <Button
                        variant="contained"
                        color='primary'
                        classes={['primary_button', 'button_lg', 'add_metalink__button']}
                        onClick={executeAction}
                        startIcon={
                            isLoading 
                                ? <CircularProgress size={20} style={{ color: 'black' }} />
                                : <div />
                        }
                        disabled={false}
                        sx={{
                            ...FULL_WIDTH_BUTTON_STYLES,
                            alignSelf: 'center',
                        }}
                        disableElevation
                    >
                        {isLoading ? "Creating Your Avatar" : "Create Avatar"}
                    </Button>
                </div>
            }
        </div>
        {
          isSuccessful &&
            <Alert 
              severity="success"
              onClose={ ()=> setIsSuccessful(false) }
            >
              Your MetaLink avatar has been created, {avatar.name}.
            </Alert>
        }
        { isSuccessful && <VSpacerComponent space={1} /> }
        {
          isSuccessful &&
            <Button
                variant="contained"
                disableElevation
                classes={['primary_button', 'button_lg', 'add_metalink__button']}
                onClick={goToMyAvatar}
                sx={{
                    ...FULL_WIDTH_BUTTON_STYLES,
                    alignSelf: 'center',
                }}
            >
                See My Avatar
            </Button>
        }
        { isError && <VSpacerComponent space={2} /> }
        {
          isError &&
            <Alert 
              severity="error"
              onClose={ ()=> setHasError(false) }
            >
              An error occured while creating your avatar. <br/> Try again {avatar.name}.
            </Alert>
        }
        <VSpacerComponent space={4} />

      </div>
    )
}

export default AddAvatarPage