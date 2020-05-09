import React, { Component } from 'react';
import './register.css'


const initialState = {
  username: '',
  email: '',
  password: '',
  pass2: '',
  usernameError: '',
  emailError: '',
  passwordError: '',
  pass2Error: '',
  error: false,
  success: false
}

class Register extends Component {
  constructor(){
    super()
    this.state = initialState;
  }

  handdleChange = (event) => {
    const {name,value} = event.target;
    this.setState({
      [name]: value
    })
  }
  showError = (message) => {
    this.setState({error : true});
    return message;
    };
    
   showSucces = () => {
    this.setState({success : true});
  };

  checkLength = (value, min = 6, max) => {
    
    if (value.trim().length < min) {
      return this.showError(`${value.name} must have at least ${min} characters`);
    } else if (value.trim().length >= max){
      return this.showError(`${value.name} must have max ${max} characters`);
    } else {
      this.setState({error : false});
      return this.showSucces();
    }
}
  validate = () => {
      let usernameError = '';
      let emailError = '';
      let passwordError = '';
      let pass2Error = '';

      //const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.state.username) {
        usernameError = 'Field requiered';
      } else {
        usernameError = this.checkLength(this.state.username,7,15)
      }

      if (!this.state.email) {
        emailError = `Field requiered`;
      }

      if (!this.state.password) {
        passwordError = `Field requiered`;
      }

      if (!this.state.pass2) {
        pass2Error = `Field requiered`;
      }

      if (usernameError || emailError || passwordError || pass2Error) {
        this.setState({usernameError,emailError,passwordError, pass2Error,error: true})
        return false;
      }
      return true;
  }

  handdleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState(initialState);
    }
  }
  
  render(){
    return (
      <div 
        className = {(this.state.error) && 'error'}
        id="containerRegister">
{console.log(this.state)}
        <form id="form"
          onSubmit={this.handdleSubmit}>
            <h2>Register</h2>

            <div 
            id ="formInput" 
            className = {(this.state.error) ? 'error' : (this.state.success) && 'success'}
            >
                <label> Username</label>
                <input 
                   name ="username" 
                  type="text" 
                  placeholder="  Enter username"
                  onChange = {this.handdleChange}
                  value = {this.state.username}/>
                <small >
                  {this.state.usernameError}
                </small>
            </div>

            <div 
            id ="formInput" 
            className = {(this.state.error) ? 'error' : (this.state.success) && 'success'}
            >
                <label>Email</label>
                <input 
                  id ="formInputEmail"
                  name ="email" 
                  type="text" 
                  placeholder="  Enter email"
                  onChange = {this.handdleChange}
                  value = {this.state.email}/>
                <small >
                  {this.state.emailError}
                </small>
            </div>

            <div 
            id ="formInput" 
            className = {(this.state.error) ? 'error' : (this.state.success) && 'success'}
            >
                <label>Password</label>
                <input 
                  id ="formInputPassword"
                  name ="password" 
                  type="password" 
                  placeholder="  Enter password"
                  onChange = {this.handdleChange}
                  value = {this.state.password}/>
                <small >
                  {this.state.passwordError}
                </small>
            </div>

            <div 
            id ="formInput" 
            className = {(this.state.error) ? 'error' : (this.state.success) && 'success'}
            >
                <label>Confirm Password</label>
                <input 
                  id ="formInputPass2"
                  name ="pass2" 
                  type="password" 
                  placeholder="  Enter password again"
                  onChange = {this.handdleChange}
                  value = {this.state.pass2}/>
                <small>
                  {this.state.pass2Error}
                </small>
            </div>

            <button id="buttonSubmit" type="submit" >Submit</button>
        </form>
      </div>    
    );
  }
}
export default Register;