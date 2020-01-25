import React from 'react'
// import Logo from '../../Assets/bunq.svg'
import {
    Brand,
    Separator,
    SeparatorPart
}from './Header.style'
const Header=()=>{
    return(
        <>
        {/* <Brand src={Logo} alt='brand'/> */}
        <Separator>
            <SeparatorPart rainbowOne/>
            <SeparatorPart rainbowTwo/>
            <SeparatorPart rainbowThree/>
            <SeparatorPart rainbowFour/>
            <SeparatorPart rainbowFive/>
            <SeparatorPart rainbowSix/>
            <SeparatorPart rainbowSeven/>
            <SeparatorPart rainbowEight/>
            <SeparatorPart rainbowNine/>
            <SeparatorPart rainbowTen/>
            <SeparatorPart rainbowEleven/>
            <SeparatorPart rainbowTwelve/>
        </Separator>
        </>
    )
}
export default Header