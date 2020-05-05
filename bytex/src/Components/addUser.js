import React, { Component } from 'react';

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
        })}})
      .catch(err=>console.log(`${err} - Probleme cu conexiunea dvoastra`))
      
      
  }
  
handdleClickRemove = (e) =>{ 
    let element = e.target.id;
    this.setState(prevState => ({
      gitUsers: prevState.gitUsers.filter((x,index) => index != element),
        })
    ) 
    return this.sendData();
  }

sendData = () => this.props.parentCallBack(this.state.gitUsers)

componentDidUpdate(){
    console.log('updateChild',this.state.gitUsers.length)
    
}
render() {
    
    console.log('renderChild',this.state.gitUsers)
    return (
      <div className = 'addUser'>
          
        <p>Introduce the GitHub users to be compared:</p>
        <input className ='input' value = {this.state.input} onChange = {this.updateInput}/>                 
        <button className = 'button' onClick= {this.addUser} >Add</button>
     
        <ul>
            {this.state.gitUsers.map((user,index)=> 
            <li key={index}>
                {`${user.login.toLowerCase()} ${(user.name != null) ? `- ${user.name}` : '(noName)'}`}
                <button id={index} className ='buttonRemove' onClick={this.handdleClickRemove} >Remove</button>
            </li>)}
        </ul>
        
    
    </div>
    );
  }
  }

  export default AddRemoveUser;