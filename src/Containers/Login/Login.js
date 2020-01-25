import React, { Component } from 'react'
import Lock from '../../Assets/lock.gif'
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
    componentWillMount(){
        let A = [1, 3, 6, 4, 1, 2];
        let sortedA = A.sort()
        console.log(sortedA)
        let i = 0;
        let returnValue;
        while(A.length >= i){
            if((sortedA[i] - sortedA[i+1]) > 1){
                 returnValue =sortedA[i] +1;
                 console.log(returnValue)
                 if(returnValue <= 0){
                     returnValue =1;
                     console.log(returnValue)
                     return 1
                 }
                return returnValue
            }
            i = i+1;
        }
        returnValue = sortedA[sortedA.length-1]+1;
        console.log(returnValue)
        return returnValue;
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
