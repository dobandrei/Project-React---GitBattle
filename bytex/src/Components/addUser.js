import React, { Component } from 'react';

class AddRemoveUser extends Component {
    constructor(props){
      super(props)
      this.state = {
        user: '',
        gitUsers: []
        
      }
    }
updateUser = (e) => {
      const value = e.target.value;
      this.setState({
          user: value 
      })
    }

addUser = () => {
    fetch (`https://api.github.com/users/${this.state.user}`)
      .then(res => res.json())
      .then(data => {
        let duplicate = this.state.gitUsers.filter(x => x.id == data.id).length;
        if (data.message != "Not Found" && duplicate == 0){
        this.setState(prevState => ({  
                user : '',
                victoryRepo: null,
                gitUsers: prevState.gitUsers.concat(data),
                
              }))
            this.sendData();
        } 
      if(duplicate > 0) {
        alert('User-ul exista deja in lista!')
        this.setState({
            user : ''
            })  
      }  
      if (data.message == "Not Found"){
        alert('User not found! Try again')
        this.setState({
        user : ''
        })}})
      .catch(err=>console.log(`${err} - Probleme cu conexiunea dvoastra`))
      
      
  }
  
handdleClickRemove = (e) =>{
    
    let element = e.target.id;
   
    this.setState(prevState => ({
      gitUsers: prevState.gitUsers.filter((x,index) => index != element),
        })
    ) 
    
    
  }

sendData = () => this.props.parentCallBack(this.state.gitUsers)


  
   
render() {
    

  
    return (
      <div className = 'addUser'>
          
        <p>Introduce the GitHub users to be compared:</p>
        <input className ='input' value = {this.state.user} onChange = {this.updateUser}/>                 
        <button className = 'button' onClick= {this.addUser} >Add</button>
     
        <ul>
            {this.state.gitUsers.map((x,index)=> 
            <li key={index}>
                {x.login.toLowerCase()}
                <button id={index} className ='buttonRemove' onClick={this.handdleClickRemove} >Remove</button>
            </li>)}
        </ul>
        
    
    </div>
    );
  }
  }
  export default AddRemoveUser;