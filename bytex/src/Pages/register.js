import React, { Component } from 'react';
import './register.css'

const initialState = {
  username: '',
  usernameErrorMessage: '',
  usernameError: false,
  usernameSuccess: false,

  gitUser: '',
  gitUserErrorMessage: '',
  gitUserError: false,
  gitUserSuccess: false,

  email: '',
  emailErrorMessage: '',
  emailError: false,
  emailSuccess: false,

  password: '',
  passwordErrorMessage: '',
  passwordError: false,
  passwordSuccess: false,

  pass2: '',
  pass2ErrorMessage: '',
  pass2Error: false,
  pass2Success: false
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
  
  checkLength = (inputValue, min, max) => {
    if (inputValue.trim().length < min) {
      
      return `Must type at least ${min} characters`;
    } else if (inputValue.trim().length > max){
     
      return `Must type max ${max} characters`;
    } else {
      
      return '';
    }
}

  checkEmail = email => {
    const regexConditions = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexConditions.test(String(email).toLowerCase())) {
          return 'Email is not valid';
    }
  };

  checkPasswordsMatch = (password1, password2) => {
    if (password1 !== password2) {
        return `Passwords do not match!`;
    };
  }

  validate = (input,message) => {
      let errorMessage = '';

       if (!this.state[`${input}`]) {
        errorMessage = 'Field requiered';
      } else {
        errorMessage = message;
      }
      if (errorMessage ) {
        this.setState({[`${input}ErrorMessage`]: errorMessage, [`${input}Error`]: true, [`${input}Success`]: false})
        return false;
      } else {
      this.setState({[`${input}ErrorMessage`]: errorMessage,[`${input}Success`]: true, [`${input}Error`]: false})
      return true;
     }
  }

  handdleSubmit = (event) => {
    
    event.preventDefault();
    
    const isUsernameValid = this.validate('username',this.checkLength(this.state.username,8,15));
    const isGitUserValid = this.validate('gitUser',this.checkLength(this.state.gitUser,1,15));
    const isEmailValid = this.validate('email',this.checkEmail(this.state.email));
    const isPasswordValid = this.validate('password',this.checkLength(this.state.password,6,10));
    const isPass2SameWithPass1 = this.validate('pass2',this.checkPasswordsMatch(this.state.password,this.state.pass2));

    if (isUsernameValid && isEmailValid && isPasswordValid && isPass2SameWithPass1) {
      this.setState(initialState);
    }
  }
  
  render(){
    return (
      <div id="containerRegister">
      
        <form id="form"
          onSubmit={this.handdleSubmit}>
            <h2>Register</h2>

            <div 
            id ="formInput" 
            className = {this.state.usernameError ? 'error': this.state.usernameSuccess ? 'success' : undefined}>
                <label> Username</label>
                
                <input 
                   name ="username" 
                  type="text" 
                  placeholder="  Enter username"
                  onChange = {this.handdleChange}
                  value = {this.state.username}/>
                <small >
                  {this.state.usernameErrorMessage}
                </small>
                </div>

                <div 
            id ="formInput" 
            className = {this.state.gitUserError ? 'error': this.state.gitUserSuccess ? 'success' : undefined}>
                <label> GitHub username</label>
                
                <input 
                   name ="gitUser" 
                  type="text" 
                  placeholder="  Enter GitHub username "
                  onChange = {this.handdleChange}
                  value = {this.state.gitUser}/>
                <small >
                  {this.state.gitUserErrorMessage}
                </small>
                </div>

            <div 
            id ="formInput" 
            className = {this.state.emailError ? 'error' : (this.state.emailSuccess) ? 'success' : undefined}
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
                  {this.state.emailErrorMessage}
                </small>
            </div>

            <div 
            id ="formInput" 
            className = {this.state.passwordError ? 'error' : (this.state.passwordSuccess) ? 'success' : undefined}
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
                  {this.state.passwordErrorMessage}
                </small>
            </div>

            <div 
            id ="formInput" 
            className = {this.state.pass2Error ? 'error' : (this.state.pass2Success) ? 'success' : undefined}
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
                  {this.state.pass2ErrorMessage}
                </small>
            </div>

            <button id="buttonSubmit" type="submit" >Submit</button>
        </form>
      </div>    
    );
  }
}
export default Register;