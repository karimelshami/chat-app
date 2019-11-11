import React, { Component } from 'react'
import { HelperText, InputContainer, Input, Button ,MessagesContainer,MessageContainer,Text,TimeStamp,LastSeen} from './Conversation.style'
import api from '../../API'

export default class Conversation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      conversationId: 0,
      allMessages: [],
      userId:0,
      lastseen:''
    }
  }

  componentDidMount() {
    if (this.props.location && this.props.location.pathname) {
      console.log(this.props.location.pathname)
      this.getConversationIdFromURL(this.props.location.pathname)
      this.getUserIdFromURL(this.props.location.pathname)
    }
  }

  putLastSeenTimeStamp =()=>{
    let body={
      lastseen:Date.now().toString()
    }
    api.put(`/conversation/${this.state.conversationId}/seen/${this.state.userId}`,body).then(response =>{
      console.log(response,' seen')
      this.setState({
        lastseen:response.data.lastseen
      })
    }).catch(error=>console.log(error,'error'))
  }

  
  getLastSeenTimeStamp =()=>{
    api.get(`/conversation/${this.state.conversationId}/lastseen/${this.state.userId}`).then(response =>{
      console.log(response,'last seen')

    }).catch(error=>console.log(error,'error'))
  }
  getLimitedAmmountOfMessages(conversationId) {
    api
      .get(`/conversation/${conversationId}/message/limited?limit=100000&offset=0`)
      .then(response => {
          this.setState({
              allMessages:response.data,
              message:''
          })
        console.log(response)
      })
      .catch(error => console.log('error', error))
  }
  getAllMessagesAfterSendingAMessage=(lastMessageId)=>{
      api.get(`/conversation/${this.state.conversationId}/new/${lastMessageId}`).then(response=>{
       
          console.log(response)
      }
      ).catch(error=>console.log('error',error))
  }

  getConversationIdFromURL(pathName) {
    let index = pathName.indexOf('=') + 1
    if (index) {
      let conversationId = pathName.substr(index)
      let conversationIdIndex=conversationId.indexOf(',')
      conversationId = conversationId.slice(0,conversationIdIndex)
      conversationId = parseInt(conversationId)
      console.log(conversationId,'conversation Id')
      conversationId = parseInt(conversationId)
      this.setState({
        conversationId
      },()=>this.putLastSeenTimeStamp())
      this.getLimitedAmmountOfMessages(conversationId)
    }

  }
  getUserIdFromURL(pathName){
    console.log(pathName)
    let index = pathName.indexOf(",")+8
    console.log(index)
    if (index) {
      let userId = pathName.substr(index)
      userId = parseInt(userId)
      this.setState({
        userId
      },()=>this.getLastSeenTimeStamp())
    }
  } 
  getMessage = message => {
    this.setState({
      message
    })
  }
  sendMessage = () => {
    let body = {
      message: this.state.message,
      senderId: this.state.conversationId
    }
    api
      .post(`/conversation/${this.state.conversationId}/message/send`, body)
      .then(response => {
        this.setState({
          message: response.data
        })
        // this.getAllMessagesAfterSendingAMessage(response.data.id -1)
        this.getLimitedAmmountOfMessages(this.state.conversationId)
        console.log(response)
      })
      .catch(error => console.log('error', error))
  }

  render() {
    const { allMessages } = this.state
    return (
      <>
        <LastSeen>Last Seen on {this.state.lastseen}</LastSeen>
        <Button onClick={()=>{this.getLimitedAmmountOfMessages(this.state.conversationId)}}>Refresh Conversation</Button>
      <MessagesContainer>
            {allMessages && allMessages.length
            ? allMessages.map((message, index) => {
                return (
                    <MessageContainer key={index}>
                    <Text>{message.message}</Text>
                    <TimeStamp>{message.timestamp}</TimeStamp>
                    </MessageContainer>
                )
                })
            : ''}
    </MessagesContainer>
        <InputContainer>
          <HelperText>Send message to user</HelperText>
          <Input
            onChange={event => this.getMessage(event.target.value)}
            type="text"
            value={this.state.message || ""}
            placeholder=" write your message here..."
          />
          <Button onClick={() => this.sendMessage()}>Send</Button>
        </InputContainer>
      </>
    )
  }
}
