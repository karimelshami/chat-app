import React, { Component } from 'react'
import { HelperText, InputContainer, Input, Button ,MessagesContainer,MessageContainer} from './Conversation.style'
import api from '../../API'

export default class Conversation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      conversationId: 0,
      allMessages: []
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
      conversationId = parseInt(conversationId)
      this.setState({
        conversationId
      })
      this.getLimitedAmmountOfMessages(conversationId)
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
      <div>
    <MessagesContainer>
            {allMessages && allMessages.length
            ? allMessages.map((message, index) => {
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
            value={this.state.message || ""}
            placeholder=" write your message here..."
          />
          <Button onClick={() => this.sendMessage()}>Send</Button>
        </InputContainer>
      </div>
    )
  }
}
