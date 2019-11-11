
import styled from 'styled-components'


export const FormOption=styled.div`

margin:2px;
`
export const Button=styled.button`
display:inline-block;
cursor:pointer;
margin:10px;
box-shadow: 0px 10px 18px -7px #276873;
background:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
background-color:#599bb3;
border-radius:5px;
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
export const Table = styled.table`
  width: 100%;
  margin: auto;
  text-transform: capitalize;
  text-align: center;
  margin-top: 5px;
  border: solid 1px rgb(224, 224, 224);
  border-collapse: collapse;
  font-size: 15px;

`
export const TableHead = styled.thead`
  background-color: #f4f7fd;
  
`

export const TableRow = styled.tr`
border: 1px solid #fff;
&:hover {
    background-color: #f4f7fd;
    cursor:pointer;
}
${props=>props.pagination? `
    display: flex;
    justify-content: center;

` :''}
`
export const TableCell = styled.th`
  font-weight: 500;
  color :${props =>props.transperent ? '#fff' :'#98999b'};
  height: 50px;
  width :${props =>props.width ? props.width :'7.75%' }

  `
  export const TableBody=styled.tbody`


`
export const Count=styled.span`
font-size:18px;
color:red;
`
export const Text=styled.p`
font-size:18px;

`
export const Input=styled.input`
  text-align:center;
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

export const UserName=styled.span`
color:#808080
padding:5px;

`
export const HelperText=styled.p`

color:#808080
text-align:center;
font-size:18px;
`