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

  render() {
    return (
      <div className = 'home'>
          <AddRemoveUser parentCallBack = {this.callBackFunction}/>

      </div>
    );
  }
}

export default Home;