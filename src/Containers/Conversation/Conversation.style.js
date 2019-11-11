import styled from 'styled-components'

export const TimeStamp =styled.p`
color:#808080;
text-align:right;
`
export const Text =styled.p`
color:#808080;


`

export const HelperText=styled.p`
font-size:18px;
color:#8b8b8b;
`
export const InputContainer=styled.div`
text-align:center;

`
export const Input=styled.input`
width:90%;
margin:auto;
font-size: 14px;
line-height: 50px;
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
export const MessagesContainer=styled.div`
height:70vh;
background-color:#fff;
overflow:auto;
border:solid 1px #f4f7fd;

`
export const MessageContainer=styled.div`
width:95%;
margin:auto;
padding:1px 5px;
background-color:#f4f7fd;
margin:5px;
border-radius: 5px;
min-height:50px;
`
export const LastSeen=styled.p`
color:#808080;

`