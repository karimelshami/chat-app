import React, { Component } from 'react'
import Modal from '../../Components/Modal/Modal'
import api from '../../API'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Count,
  Text,
  Button,
  Input,
  UserName,
  FormOption,
  HelperText
} from './InboxContainer.style'
export default class InboxContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 0,
      conversations: [],
      userName:'',
      openCreateGroupChatModal:false,
      openCreatePersonalChatModal:false,
      allUsers:[],
      selectedUsers:[],
      groupName:''
    }
  }
  componentDidMount() {
    if (this.props.location && this.props.location.pathname) {
      console.log(this.props.location.pathname)
      this.getUserIdFromURL(this.props.location.pathname)
    }
    this.getAllUsers()
  }

  

  getAllUsers=()=>{
    api.get('/users').then(response=>{
      console.log(response.data)
      this.setState({
        allUsers :response.data
      })
    }).catch(error=>console.log(error,'error'))
  }
  onUserCheck=(userId)=>{
   console.log(userId,'checked')
   let users = this.state.selectedUsers;
   users.push(userId)
   console.log(users.join())
   setTimeout(() => {
    this.setState({
      selectedUsers: users
    });}, 300);
 
  }
  handleGroupNameChange=(groupName)=>{
    setTimeout(() => {
      this.setState({
        groupName
      })    }, 300);
  
  }
  createGroupConversationModalContent=()=>{
    const {allUsers}=this.state
    return(
    <div>
      <HelperText>Create a group conversation</HelperText>
      <Input type='text' onChange={(event)=>this.handleGroupNameChange(event.target.value)} placeholder='group name' />
      {allUsers && allUsers.map((user,index)=>{
        return(
          <FormOption key={index}>
          <Input onClick={(event)=>this.onUserCheck(event.target.value)} type="checkbox" value={user.id}/>
          <UserName>{user.name}</UserName>
          </FormOption>
        )
      })}
      <Button onClick={()=>this.createGroup()}>Create Group Conversation</Button>

    </div>)
  }

  createPersonalConversationModalContent=()=>{

    const {allUsers}=this.state
    return(
    <div>
      <HelperText>Create a Personal conversation</HelperText>
      {allUsers && allUsers.map((user,index)=>{
        return(
          <FormOption key={index}>
          <Input onClick={(event)=>this.onUserCheck(event.target.value)} type="checkbox" value={user.id}/>
          <UserName>{user.name}</UserName>
          </FormOption>
        )
      })}
      <Button onClick={()=>this.createPersonalConversation()}>Create Personal Conversation</Button>

    </div>)

  }

  createPersonalConversation=()=>{
    let body ={
      users :this.state.selectedUsers.join()
    }
    api.post('/conversation/personal',body).then(response=>{
      this.setState({
        openCreatePersonalChatModal:false,
      })
      this.getAllConversationsForUser(this.state.userId)

      console.log(response)
    }).catch(error=>console.log(error,'error'))
  }

  createGroup=()=>{
    let body ={
      name:this.state.groupName,
      users :this.state.selectedUsers.join()
    }
    api.post('/conversation/group',body).then(response=>{
      this.setState({
        openCreateGroupChatModal:false,
      })
  this.getAllConversationsForUser(this.state.userId)
      
      console.log(response)
    }).catch(error=>console.log(error,'error'))
  }
  
  closeCreateGroupChatModal=()=>{
    this.setState({
      openCreateGroupChatModal:false
    })
  }
  closeCreatePersonalChatModal=()=>{
    this.setState({
      openCreatePersonalChatModal:false
    })
  }

  getUserDetails(userId){
    api.get(`/user/${userId}`).then(response=>{
      console.log(response.data)
      this.setState({
        userName :response.data.name
      })
    })
  }

  openConversation=(conversationId)=>{
      console.log(conversationId)
      this.props.history.push(`/conversation/id=${conversationId},userId=${this.state.userId}`)
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
      this.getUserDetails(userId)

    }
  }
  getAllConversationsForUser = userId => {
    api
      .get(`/conversation/user/${userId}`)
      .then(response => {
        if (response && response.data) {

          this.setState({
            conversations: response.data.reverse()
          })
          console.log(response, 'all conversations for user')
        }
      })
      .catch(error => console.log('error', error))
  }

  createGroupChatModal=()=>{
    console.log('open create group modal')
    this.setState({
      openCreateGroupChatModal:true
    })
  }
  createPersonalChatModal=()=>{
    console.log('open personal group modal')
    this.setState({
      openCreatePersonalChatModal:true
    })
  }
  render() {
    const { conversations ,userName,openCreateGroupChatModal,openCreatePersonalChatModal} = this.state
    return (
      <div>
        <Button onClick={()=>this.createGroupChatModal()}>Create a group Chat</Button>
        <Button onClick={()=>this.createPersonalChatModal()}>Create a personal Chat</Button>

        <Text>
          Hey {userName},You Have <Count>{conversations ? conversations.length : ''}</Count>{' '}
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
        <Modal
        closeModal={this.closeCreateGroupChatModal} 
        closed={openCreateGroupChatModal}
        modalContent={this.createGroupConversationModalContent()}
        />
        <Modal
        closeModal={this.closeCreatePersonalChatModal} 
        closed={openCreatePersonalChatModal}
        modalContent={this.createPersonalConversationModalContent()}
        />
      </div>
    )
  }
}
