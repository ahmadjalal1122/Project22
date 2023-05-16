import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <div>
      <main>
        <Header/>
        <Outlet/>
      </main>
    </div>
  )
}

export default Layout
