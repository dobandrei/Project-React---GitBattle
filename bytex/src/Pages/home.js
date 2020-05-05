import React, { Component } from 'react';
import RepoBattle from '../Components/repo'
import LocationBattle from '../Components/location'
import AddRemoveUser from '../Components/addUser'

class Home extends Component {
  constructor(){
    
    super()
    this.state = {
      gitUsers: []
    }
  }

callBackFunction = (childData) => {     
  return this.setState({
    gitUsers: childData
  })
}

render() {
  console.log('RenderPARENT',this.state.gitUsers.length)
  return (
    <div className = 'home'>
      <h1>Home</h1>
      
          <AddRemoveUser parentCallBack = {this.callBackFunction}/>
      
      <div className='battle'>
          <RepoBattle data = {this.state}/>
          <LocationBattle data = {this.state.gitUsers}/>
          {//<FollowersBattle/>
          }
          {//<OldesAccountBattle/>
          }
          {//<LastUpdateBattle/>
          }
          
      </div>

      </div>
  );
}
}
export default Home;