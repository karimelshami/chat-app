import styled from 'styled-components'

export const Brand = styled.img`
    height:35px;
`
export const Separator =styled.div`
width: 100%;
height: 10px;
background-size: 100%;
background-position: top center;
`
export const SeparatorPart =styled.div`
display: inline-block;
float: left;
width: calc(100% / 12);
height: 100%;
${props=>props.rainbowOne && `background-color: #238647;`}
${props=>props.rainbowTwo && `background-color: #2F9B47;`}
${props=>props.rainbowThree && `background-color: #62B64F;`}
${props=>props.rainbowFour && `background-color: #89CC53;`}
${props=>props.rainbowFive && `background-color: #3DB8AD;`}
${props=>props.rainbowSix && `background-color: #3394D7;`}
${props=>props.rainbowSeven && `background-color: #2872BC;`}
${props=>props.rainbowEight && `background-color: #1D5C84;`}
${props=>props.rainbowNine && `background-color: #993233;`}
${props=>props.rainbowTen && `background-color: #E13030;`}
${props=>props.rainbowEleven && `background-color: #F28825;`}
${props=>props.rainbowTwelve && `background-color: #F5C836;`}



`