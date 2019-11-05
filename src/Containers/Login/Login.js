import React, { Component } from 'react'
import Lock from '../../Assets/lock.png'
import {
    Image,
    Container,
    HelperText,
    ImageContainer,
    InputContainer,
    Input,
    Button
} from './Login.style'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            userId : 0
        }
    }
    getUserId=(userId)=>{
        console.log(userId)
        this.setState({userId})
    }
    setUserIdQueryParamater=()=>{
        this.props.history.push(`/inbox/id=${this.state.userId}`)

    }
    render() {
        return (
            <Container>
                <ImageContainer>
                    <Image src={Lock} alt='lock'/>
                </ImageContainer>
                <InputContainer>
                <HelperText>Please Enter Your User Id To Accses Chat App</HelperText>
                <Input onChange ={(event)=>this.getUserId(event.target.value)} type='number' placeholder='user id'/>
                <Button disabled={this.state.userId ?false : true} onClick={()=>this.setUserIdQueryParamater()}>Login</Button>
                </InputContainer>
            </Container>
        )
    }
}
