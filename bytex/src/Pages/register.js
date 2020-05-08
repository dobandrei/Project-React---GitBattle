import React, { Component } from 'react';
import './register.css'


class Register extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      pass2: '',
    }
  }

  handdleChange = (e) => {
    const {name,value} = e.target;
    this.setState({
      [name]: value
    })
  }
  
  
  render(){
    return (
      <div id="containerRegister">
        <form id="form">
            <h2>Register</h2>

            <div className="formInput">
                <label> Username</label>
                <input 
                  name ="username" 
                  type="text" 
                  placeholder="  Enter username"
                  onChange = {this.handdleChange}
                  value = {this.state.username}/>
                <small>Error message</small>
            </div>

            <div className="formInput">
                <label>Email</label>
                <input 
                  name ="email" 
                  type="text" 
                  placeholder="  Enter email"
                  onChange = {this.handdleChange}
                  value = {this.state.email}/>
                <small>Error message</small>
            </div>

            <div className="formInput">
                <label>Password</label>
                <input 
                  name ="password" 
                  type="password" 
                  placeholder="  Enter password"
                  onChange = {this.handdleChange}
                  value = {this.state.password}/>
                <small>Error message</small>
            </div>

            <div className="formInput">
                <label>Confirm Password</label>
                <input 
                  name ="pass2" 
                  type="password" 
                  placeholder="  Enter password again"
                  onChange = {this.handdleChange}
                  value = {this.state.pass2}/>
                <small>Error message</small>
            </div>

            <button id="buttonSubmit" type="submit" >Submit</button>
        </form>
      </div>    
    );
  }
}
export default Register;