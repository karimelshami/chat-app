
import styled from 'styled-components'

export const Button=styled.button`
float:right;
cursor:pointer;

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
export const Text=styled.span`
font-size:18px;

`