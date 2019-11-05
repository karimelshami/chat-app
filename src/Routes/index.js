import React from 'react' 
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from '../Containers/Login/Login'
import Inbox from '../Containers/Inbox/InboxContainer'
import Conversation from '../Containers/Conversation/ConversationContainer'

const Routes =()=> (
    <Router>
        <Route exact path="/" component={Login}/>
        <Route path="/inbox" component ={Inbox}/>
        <Route path ="/conversation" component ={Conversation}/>
    </Router>
)

export default Routes