import React from "react"
import "../styles/style.css"

import {connect} from 'react-redux'
import{increment,decrement} from '../actions/counterActions'
import {addUser} from '../Actions/userActions'

class Content extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            firstName : '',
            lastName : '',
            location : ''
        }
    }

    updateFirstName = (event) => {
        const value = event.target.value;
        this.setState({
            firstName : value
        })
    }

    updateLastName = (event) => {
        const value = event.target.value;
        this.setState({
            lastName : value
        })
    }

    updateLocation = (event) => {
        const value = event.target.value;
        this.setState({
            location : value
        })
    }

    addUser = () => {
        const userDetails = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            location : this.state.location
        }
        this.setState({
            firstName : '',
            lastName : '',
            location : ''
        })
        this.props.addUserDispatcher(userDetails);
    }
    render(){
        const listOfUsers = this.props.users.usersList;
        
        const counter = this.props.counter;
        const increment = this.props.increment;
        const decrement = this.props.decrement;

        return (
            <div className = "content">
                <div>
                    
                    
                    <p>Nume</p>
                    <input value = {this.state.firstName} onChange = {this.updateFirstName} />
                    <p>Prenume</p>
                    <input value = {this.state.lastName} onChange = {this.updateLastName} />
                    <p>Locatie</p>
                    <input value = {this.state.location} onChange = {this.updateLocation} />
                    <br/>
                    <button onClick= {this.addUser}>Add</button>
                    <p>Nr de useri inscrisi: {this.props.users.usersList.length}</p>
                    {this.renderUsers(listOfUsers)}
                </div>

                <div>
                    <p>.......................................................................................................................................................</p>
                    <p>NUMARATOARE</p>
                    <p>{counter}</p>

                    <button onClick = {increment}>
                        +
                    </button>

                    <button onClick = {decrement}>
                        -
                    </button>
                </div>          
            </div>
        )
    }


renderUsers = users => {
    const listOfUsers = users.map((user,index) => {
        return <p key ={index}> {user.firstName} {user.lastName} {user.location}</p>
    })
    return listOfUsers;
    }
}
const mapStateToProps = (state) => {
    return {
        counter: state.counter,
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment : () => dispatch(increment()),
        decrement : () => dispatch(decrement()),    
        addUserDispatcher: (user) => dispatch(addUser())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Content)