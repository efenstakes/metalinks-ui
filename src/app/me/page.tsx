"use client"
import { useEffect, useState } from 'react'

import { Button, Drawer, ListItemButton, ListItemText } from '@mui/material'
import { ethers } from 'ethers'


// components


// models



// styles
import './page.scss'


import ABI from '../../../public/MetaLinks.json'
import { useAccount, useContractRead, useContractReads } from 'wagmi'
import NotConnectedComponent from '../components/not_connected/component'
import VSpacerComponent from '../components/v_spacer/v_spacer.component'
import { log } from 'console'
import { Avatar } from '../models/avatar'
import { MetaLink } from '../models/metalink'
import AppbarComponent from '../components/appbar/component'
import ErrorLoadingAvatarComponent from '../components/error_loading_avatar/component'
import { Router } from 'next/router'
import { useRouter } from 'next/navigation'
import ProfileLoadingPage from './loading_state'

import bgImage from '../../../public/images/face-big.png'
import SectionTitleComponent from '../components/section_title/section_title.component'
import NoLinksComponent from '../components/no_links/component'
import FabComponent from '../components/fab/component'
import Link from 'next/link'
import Image from 'next/image'


const CONTRACT_ADDRESS = '0xA6C7382372ca0e8122D052dC61b4f3e45ADd79da'
const MyProfilePage = () => {
    const { address, isConnected } = useAccount()
  
    console.log("isConnected ", isConnected)
    if( !isConnected ) {
        return (
            <div className="page">
                <NotConnectedComponent />
            </div>
        )
    }

    return <MyProfile />
}


const toAvatar = (data: any): Avatar | null => {
    if( !data ) return null

    return {
        name: data[0],
        aka: data[1],
        bio: data[2],
        avatar: data[3],
        bgAvatar: data[4],
        links: data[5].map((n: any)=> n.toString()),
    }
}
const toMetalinks = (data: null | Array<{ status: string, result: Array<any> }>): Array<MetaLink> | null => {
    console.log("toMetalinks data ", data)
    if( !data ) return []


    const hasErrors = data.some((result: { status: string, result: Array<any> })=> result.status != 'success')

    if( hasErrors ) {
        return []
    }

    return data.map(({ result } : { status: string, result: Array<any> })=> {

        return {
            name: result[0],
            aka: result[1],
            bio: result[2],
            avatar: result[3],
            bgAvatar: result[4],
            link: result[5],  
        }
    })
}

const MyProfile = () => {
    const { address, isConnected } = useAccount()
    const router = useRouter()
  
    const { data, isError, isLoading, refetch } = useContractRead({
      address: CONTRACT_ADDRESS,
      abi: ABI.abi,
      functionName: 'getAvatarByAddress',
      args: [ address ],
      enabled: true,
    })


    const buildContracts = (data: any)=> {
        if( !data ) return []
        if( data && data.length < 5 ) return []
        console.log("data.length ", data.length);
        
        return data[5].map((id: any)=> {

            return {
                address: CONTRACT_ADDRESS,
                functionName: 'getMetaLink',
                abi: [
                    {
                        name: 'getMetaLink',
                        inputs: [
                            {
                                internalType: "uint256",
                                name: "_id",
                                type: "uint256"
                            }
                        ],
                        outputs: [
                            {
                                internalType: "string",
                                name: "",
                                type: "string"
                              },
                              {
                                internalType: "string",
                                name: "",
                                type: "string"
                              },
                              {
                                internalType: "string",
                                name: "",
                                type: "string"
                              },
                              {
                                internalType: "string",
                                name: "",
                                type: "string"
                              },
                              {
                                internalType: "string",
                                name: "",
                                type: "string"
                              },
                              {
                                internalType: "string",
                                name: "links",
                                type: "string"
                              }
                        ],
                        stateMutability: 'view',
                        type: 'function',
                    }
                ],
                args: [ BigInt(id) ],
            }
        })
    }

    
    const { data: mData, isError: misError, isLoading: misLoading, refetch: mrefetch } = useContractReads({
        contracts: buildContracts(data),
        enabled: false
    })
    
    console.log("mData ", mData);
      
    console.log("address ", address);
    
    console.log("data ", data);
    

    const getUniverse = ({ link, universe }: MetaLink)=> {
        if( universe ) return universe

        const recognizedUniverses = [
            "facebook", "twitter", "telegram", 
        ]

        if( (new RegExp("twitter")).test(link!) ) {
            return "Twitter"
        } else if ( (new RegExp("facebook")).test(link!) ) {
            return "Facebook"
        } else if ( (new RegExp("telegram")).test(link!) ) {
            return "Telegram"
        } else if ( (new RegExp("tg")).test(link!) ) {
            return "Telegram"
        } else {
            return link
        }
    }
    useEffect(()=> {
        if( data ) {
            console.log("got data ", data);
            mrefetch()
        }
    }, [data])

    // when loading
    if( isLoading ) {
      return (  
        <ProfileLoadingPage />
      )
    }

    // when error occurs
    if( isError ) {
        console.log("no account")
        return (
            <div className='page'>
            
                {/* appbar */}
                <AppbarComponent />
                <VSpacerComponent space={10} />

                <div className="padded_container_lg">
                    <ErrorLoadingAvatarComponent refresh={()=> refetch()} />
                </div>

            </div>
        )
    }

    // no error but no account either
    if( !data && !isError && !isLoading ) {
        console.log("no error but no account either")
        return (
            <div className='page'>
            
                {/* appbar */}
                <AppbarComponent />
                <VSpacerComponent space={10} />

                <div className="padded_container_lg">
                    <ErrorLoadingAvatarComponent 
                        title="No Avatar"
                        text="Avatar was not found. Click the create button to create your MetaLinks avatar."
                        refresh={
                            ()=> {
                                router.push('/avatar/create')
                            }
                        }
                        ctaText="Create My Avatar"
                        hideCta
                    />
                </div>

            </div>
        )
    }

    let avatar: Avatar | null = toAvatar(data)
    let metaLinks: MetaLink[] | null = toMetalinks(mData as Array<any>)
    console.log("metaLinks ", avatar)
    console.log("metaLinks ", metaLinks)
    return (
        <div className='page'>
                    
            {/* appbar */}
            <AppbarComponent />


            {/* avatars */}
            <div className="profile_avatars_container">

                <div 
                    className="profile_avatars_container__avatar_container__big_avatar absolute"
                    // style={{
                    //     backgroundImage: `url(${avatar?.bgAvatar || bgImage })`,
                    // }}
                    style={
                        avatar?.bgAvatar
                            ?
                                {
                                    backgroundImage: `url(${ bgImage })`,
                                }
                            :
                                {
                                    backgroundImage: `url(${avatar?.bgAvatar })`,
                                }
                    }
                />

                <div className="profile_avatars_container__avatar_container absolute row ma_center ca_center">
                    <img 
                        src={ bgImage } 
                        alt="avatar"
                        className="profile_avatars_container__avatar_container__avatar su_3" 
                    />
                </div>

            </div>
            <VSpacerComponent space={1} />

            <div className="column ca_center profile_info_container">

                {/* name */}
                <p className="text_3 bold su_5">
                    { avatar?.name }
                </p>
                <VSpacerComponent space={.5} />

                {/* bio */}
                <p className="text_7 profile_info_container__bio su_7">
                    { avatar?.bio }
                </p>
                <VSpacerComponent space={1.5} />

                {/* meta info */}
                <div className="row ma_evenly ca_center profile_info_container__chips">

                    {/* Links */}
                    <div className="chip_md chip_primary_outlined text_6 su_10">
                        { avatar?.links?.length } Links
                    </div>

                    {/* Universes */}
                    <div className="chip_md chip_primary_outlined text_6 su_11">
                        { avatar?.links?.length } Universes
                    </div>

                </div>
                
            </div>
            <VSpacerComponent space={6} />



            {/* metalinks if any */}
            {  
            (metaLinks || []).length > 0 && 
                <SectionTitleComponent title='My Links' /> 
            }
            <div className="padded_container_lg">

                {
                    metaLinks?.map((metaLink: MetaLink, index: number)=> {

                        return (
                            <Link href={metaLink.link!}>
                                <ListItemButton selected sx={{ marginBottom: '1rem' }}>
                                    <ListItemText primary={getUniverse(metaLink)} />
                                </ListItemButton>
                            </Link>
                        )
                    })
                }
                {
                    metaLinks && metaLinks.length === 0 &&
                        <NoLinksComponent
                            text={`You have not added any MetaLinks yet. Click on the Add Metalink button to start your metaverse discovery.`}
                        />
                }
            </div>
            <VSpacerComponent space={6} />
    
            {/* add link button */}
            <FabComponent
                children={
                    <Button
                        disableElevation
                        className="su_9 primary_button"
                        href='/link/create'
                    >
                        Add a MetaLink
                    </Button>
                }
            />

        </div>
    )
}

export default MyProfilePage
