import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='flex items-center justify-between bg-slate-200 py-5 wrapper'>
        <NavLink to="/">
            <span className=' rounded-tl-3xl bg-purple-950 px-4 py-1 font-bold md:text-2xl text-xl text-white  ' > SWIFT </span> <span className=' rounded-br-3xl bg-black md:text-2xl text-xl font-bold text-purple-950 py-1 px-4'>CART</span>
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
