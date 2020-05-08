import React, { Component } from 'react';
import AddRemoveUser from '../Components/addUser'


class Home extends Component {
  constructor(){
    super()
    this.state = {
      gitUsers: [],
      victory: null
    }
  }

  callBackFunction = (childData) => {     
    return this.setState({
      gitUsers: childData
      
    })
  }

  handdleClickRemove = (e) =>{ 
    let element = e.target.id;
    this.setState(prevState => ({
      gitUsers: prevState.gitUsers.filter((x,index) => index != element),
        })
    ) 
  }

  render() {
    console.log('home',this.state.gitUsers.length)
    return (
      <div className = 'home'>
          <AddRemoveUser data = {this.state.gitUsers} parentCallBack = {this.callBackFunction}/>

          <div className = 'displayUser'>
          
            {this.state.gitUsers.map((user,index)=> 
              
                <div key={index} className= 'gridItem'>
                    <div>
                      <h3>{(user.name != null) ? `${user.name}` : '(noName)'}</h3>
                    </div>
                    <p>{user.login.toLowerCase()}</p>
                    <img src = {user.avatar_url} alt = {user.login}/>
                    <button id={index} className ='buttonRemove' onClick={this.handdleClickRemove} >Remove</button>
                </div>
            )}
        </div>
      </div>
    );
  }
}

export default Home;