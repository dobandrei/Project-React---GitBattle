import React, { Component } from 'react';

class LogIn extends Component {
  constructor() {
    super()
    this.setState = {
      logged: false
    }
  }
  render() {
    return (
      <div>
        <h1>Log In</h1>
        <button>Log In</button>
      </div>
    )
  }
}
  
export default LogIn;