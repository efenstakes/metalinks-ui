"use client"

import React, { ReactNode } from 'react'

// theme
import { ThemeProvider } from '@mui/material'


import theme from './styles/theme'


import { WagmiConfig, createConfig, configureChains, mainnet, sepolia } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})


const ProvidersComponent = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <WagmiConfig config={config}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </WagmiConfig>
        </div>
    )
}

export default ProvidersComponent
