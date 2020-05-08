import React, { Component } from 'react';
import RepoBattle from '../Components/repo'
import LocationBattle from '../Components/location'
import FollowersBattle from '../Components/followers'
import OldesAccountBattle from '../Components/oldesAccount'
import LastUpdateBattle from '../Components/lastUpdate'

class AddRemoveUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      input: '',
      gitUsers: [] 
    }
  }


  updateInput = (e) => {
    const value = e.target.value;
    this.setState({
      input: value ,
      gitUsers: this.props.data
    })
  }

  addUser = () => {
    fetch (`https://api.github.com/users/${this.state.input}`)
      .then(res => res.json())
      .then(data => {
        let duplicate = this.state.gitUsers.filter(user => user.id == data.id).length;
        if (data.message != "Not Found" && duplicate == 0){
          this.setState(prevState => ({  
            input : '',
            victory: null,
            gitUsers: prevState.gitUsers.concat(data),
          }))
          this.sendData();
        } 
        if(duplicate > 0) {
          alert('User-ul exista deja in lista!')
          this.setState({
            input : ''
            })  
        }  
        if (data.message == "Not Found"){
          alert('User not found! Try again')
          this.setState({
              input : ''
          })
        }
      })
      .catch(err=>console.log(`${err} - Probleme cu conexiunea dvoastra`))
  }

  sendData = () => this.props.parentCallBack(this.state.gitUsers)

  render() {
    console.log('addUser',this.state.gitUsers.length)
    return (
    <div className = 'containerAddRemove'>
        <div className = 'addUser'> 
            <p>Introduce the GitHub users to be compared:</p>
            <input 
              type = "text"
              placeholder = "  Add user"
              className ='input' 
              value = {this.state.input} 
              onChange = {this.updateInput}/>  
            <button 
              className = 'buttonAdd' 
              onClick= {this.addUser}>Add
            </button>
        </div>

        <div className='battle'>
          <LocationBattle data = {this.props.data}/>
          <RepoBattle data = {this.props.data}/>
          <FollowersBattle data = {this.props.data}/>
          <OldesAccountBattle data = {this.props.data}/>
          <LastUpdateBattle data = {this.props.data}/>
        </div>
    </div>
    );
  }
}

export default AddRemoveUser;