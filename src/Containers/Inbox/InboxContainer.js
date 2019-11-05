import React, { Component } from 'react'
import api from '../../API'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Count,
  Text
} from './InboxContainer.style'
export default class InboxContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 0,
      conversations: []
    }
  }
  componentDidMount() {
    if (this.props.location && this.props.location.pathname) {
      console.log(this.props.location.pathname)
      this.getUserIdFromURL(this.props.location.pathname)
    }
  }

  openConversation=(conversationId)=>{
      console.log(conversationId)
      this.props.history.push(`/conversation/id=${conversationId}`)
    }
  getUserIdFromURL(pathName) {
    let index = pathName.indexOf('=') + 1
    if (index) {
      let userId = pathName.substr(index)
      userId = parseInt(userId)
      this.setState({
        userId
      })
      this.getAllConversationsForUser(userId)
    }
  }
  getAllConversationsForUser = userId => {
    api
      .get(`/conversation/user/${userId}`)
      .then(response => {
        if (response && response.data) {
          this.setState({
            conversations: response.data
          })
          console.log(response, 'all conversations for user')
        }
      })
      .catch(error => console.log('error', error))
  }
  render() {
    const { conversations } = this.state
    return (
      <div>
        <Text>
          You Have <Count>{conversations ? conversations.length : ''}</Count>{' '}
          Conversations
        </Text>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Last seen</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>User role</TableCell>
              <TableCell>Number of members</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conversations &&
              conversations.map((conversation, index) => {
                return (
                  <TableRow onClick={()=>this.openConversation(conversation.conversation.conversationId)} key={index}>
                    <TableCell>
                      { (conversation &&
                        conversation.conversation &&
                        conversation.conversation.name ) ?
                         conversation.conversation.name
                        : 'No name Available' }
                    </TableCell>
                    <TableCell>
                      { (conversation &&
                        conversation.conversation &&
                        conversation.conversation.lastseen ) ?
                         conversation.conversation.lastseen
                        : 'Last seen stamp not available' }
                    </TableCell>
                    <TableCell>
                      { (conversation &&
                        conversation.conversation &&
                        conversation.conversation.type &&
                         conversation.conversation.type == 1 ) ?
                         'Personal conversation' :
                         (conversation &&
                            conversation.conversation &&
                            conversation.conversation.type &&
                             conversation.conversation.type == 2 ) ? 
                            'Group conversation' : 'Conversation type not available'
                            }
                    </TableCell>
                    <TableCell>
                      { (conversation &&
                        conversation.conversation &&
                        conversation.conversation.is_owner &&
                         conversation.conversation.is_owner == 1 ) ?
                         'Admin' :
                         (conversation &&
                            conversation.conversation &&
                            conversation.conversation.type &&
                             conversation.conversation.type == 0 ) ? 
                            'Member' : 'User role not available'
                            }
                    </TableCell>
                    <TableCell>{conversation && conversation.users ?conversation.users.length :'No members'}</TableCell>
                    </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </div>
    )
  }
}
