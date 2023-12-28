import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='flex items-center justify-between bg-slate-200 py-2 px-14'>
        <NavLink to="/">
            <img src="./images/logo.png" alt="" />
        </NavLink>

        <Navbar/>
    </div>
  )
}

const MainHeader = styled.header `
padding:0 0.4rem;
height: 10rem;
backgorund-color: ${({theme})=> theme.colors.bg};
display: flex;
justify-items: center;
position:relative;

.logo{
    height:5rem;
}
`

export default Header
