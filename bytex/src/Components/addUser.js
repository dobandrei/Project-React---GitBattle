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
      input: value 
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

  handdleClickRemove = (e) =>{ 
    let element = e.target.id;
    this.setState(prevState => ({
      gitUsers: prevState.gitUsers.filter((x,index) => index != element),
        })
    ) 
  this.sendData();
  }

  sendData = () => this.props.parentCallBack(this.state.gitUsers)

  render() {
    console.log(this.state.gitUsers)
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

        <div className = 'removeUser'>
          <ul>
            {this.state.gitUsers.map((user,index)=> 
              <li key={index}>
                  {(user.name != null) ? `${user.login.toLowerCase()} - ${user.name}` : '(noName)'}
                  <button id={index} className ='buttonRemove' onClick={this.handdleClickRemove} >Remove</button>
              </li>)}
          </ul>
        </div>

        <div className='battle'>
          <LocationBattle data = {this.state.gitUsers}/>
          <RepoBattle data = {this.state.gitUsers}/>
          <FollowersBattle data = {this.state.gitUsers}/>
          <OldesAccountBattle data = {this.state.gitUsers}/>
          <LastUpdateBattle data = {this.state.gitUsers}/>
        </div>
    </div>
    );
  }
}

export default AddRemoveUser;