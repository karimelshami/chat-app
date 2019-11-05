import React, { Component } from 'react'
import { HelperText, InputContainer, Input, Button ,MessagesContainer,MessageContainer} from './Conversation.style'
import api from '../../API'

export default class Conversation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      conversationId: 0,
      someMessages: []
    }
  }

  componentDidMount() {
    if (this.props.location && this.props.location.pathname) {
      console.log(this.props.location.pathname)
      this.getConversationIdFromURL(this.props.location.pathname)
    }
  }
  getLimitedAmmountOfMessages(conversationId) {
    api
      .get(`/conversation/${conversationId}/message/limited?limit=10000&offset=3`)
      .then(response => {
          this.setState({
              someMessages:response.data
          })
        console.log(response)
      })
      .catch(error => console.log('error', error))
  }
  getAllMessagesAfterSendingAMessage=(lastMessageId)=>{
      api.get(`/conversation/${this.state.conversationId}/new/${lastMessageId}`).then(response=>{
          this.setState({
            someMessages:response.data
          })
          console.log(response)
      }
      ).catch(error=>console.log('error',error))
  }

  getConversationIdFromURL(pathName) {
    let index = pathName.indexOf('=') + 1
    if (index) {
      let conversationId = pathName.substr(index)
      conversationId = parseInt(conversationId)
      this.setState({
        conversationId
      })
      this.getLimitedAmmountOfMessages(conversationId)
    }
  }

  getMessage = message => {
    console.log(message)
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
          message: response.data,
        })
        this.getAllMessagesAfterSendingAMessage(response.data.id -1)
        console.log(response)
      })
      .catch(error => console.log('error', error))
  }

  render() {
    const { someMessages } = this.state
    return (
      <div>
    <MessagesContainer>
            {someMessages && someMessages.length
            ? someMessages.map((message, index) => {
                return (
                    <MessageContainer key={index}>
                    <p>{message.message}</p>
                    <p>{message.timestamp}</p>
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
            placeholder="  write your message here..."
          />
          <Button onClick={() => this.sendMessage()}>Send</Button>
        </InputContainer>
      </div>
    )
  }
}
