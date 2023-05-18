"use client"
import React from 'react'
import AppbarComponent from '../components/appbar/component'
import WelcomeComponent from './welcome'

const HomePage = () => {
    return (
        <div>

            {/* app bar */}
            <AppbarComponent />

            {/* welcome */}
            <WelcomeComponent />

        </div>
    )
}

export default HomePage
