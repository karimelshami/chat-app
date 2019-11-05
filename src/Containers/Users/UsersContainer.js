import React, { Component } from 'react'

export default class UsersContainer extends Component {

    componentWillMount() {
        fetch('http://assignment.bunq.com/users').then(response =>{
        console.log(response,'resp')
            })
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
