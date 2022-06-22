import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Login from './pages/Login'
import Home from './pages/Home'

const AnimatedRoutes = () => {

    const location = useLocation()
    
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route exact path='/' element={<Login />} />
                <Route exact path='/home' element={<Home />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes