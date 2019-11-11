import React from 'react'
import Routes from './Routes'
import Header from './Components/Header/Header'
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    font-family: 'Notable', sans-serif;
  }
`

function App() {
  return (<>
    <Header/>
   <Routes />
   <GlobalStyles />

  </>)
}

export default App
