import styled from 'styled-components'

export const ImageContainer=styled.div`
display:flex;
justify-content:center;

`
export const Image =styled.img`
height:350px;
`
export const Container =styled.div`
width:100%;
background-color :#e96361;
height:90vh;
`

export const HelperText=styled.p`
font-size:18px;
color:#fff;
 `
export const InputContainer=styled.div`
text-align:center;

`
export const Input=styled.input`
  text-align:center;
  margin:auto;
  font-size: 14px;
  line-height: 50px;
  border: none;
  border-radius: 5px;
  &:placeholder{
    color: #B0BEC5;
  }

  &:focus{
    outline: none;
  }
`

export const Button=styled.button`
margin: 0 5px;
box-shadow: 0px 10px 18px -7px #276873;
background:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
background-color:#599bb3;
border-radius:5px;
display:inline-block;
cursor:pointer;
color:#ffffff;
font-size:16px;
font-weight:bold;
padding:15px;
text-decoration:none;
text-shadow:0px 1px 0px #3d768a;
border:none;


&:hover{
    background:linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
	background-color:#408c99;
}
&:active{
    position:relative;
	top:1px;
}

`
