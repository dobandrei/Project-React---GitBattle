import React, { Component } from 'react';

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: '',
      gitUsers : [],
      gitUsersDetails:[],
      victory: null
    }
  }

  updateUser = (event) => {
    const value = event.target.value;
    this.setState({
        user : value,
        
    })
}

addUser = () => {
  fetch (`https://api.github.com/users/${this.state.user}`)
    .then(res => res.json())
    .then(data => {
      if (data.message != "Not Found"){
      this.setState(prevState => ({
              gitUsers : prevState.gitUsers.concat(this.state.user),
              user : '',
              victory: null,
              gitUsersDetails: prevState.gitUsersDetails.concat(data)
      }))
    } else {
      alert('UserName not found!')
      this.setState({
      user : ''
      })
    }
  })

    .catch(err=>console.log(`${err} - Probleme cu conexiunea dvoastra`))
}
handdleClickRemove = (event) =>{
  this.setState(prevState => ({
    gitUsersDetails: prevState.gitUsersDetails.filter((x,index) => index != event.key),
    gitUsers: prevState.gitUsers.filter((x,index) => index != event.key)
  }))
}

handdleClickRepo = () =>{
  let max = 0;
  this.state.gitUsersDetails.forEach( x => { 
    if(x.public_repos == max){
      this.setState(prevState => ({
        victory : `Egalitate intre : ${prevState.victory} si ${x.login}`
      }))}
    
    if (x.public_repos > max){
      max = x.public_repos;
      this.setState({
        victory : x.login
      })
      
    }

   })
  if(max == 0){
    this.setState({
      victory : 'Nu a castigat nimeni, toti userii au 0 repos!'
    })
  }
  
}


render() {
  return (
    <div className = 'home'>
      <h1>Home</h1>
      <p>Introduceti userii GitHub pentru a putea fi comparati:</p>
      <input className ='input' value = {this.state.user} onChange = {this.updateUser}/> 
                        
      <button className = 'button' onClick= {this.addUser}>Add</button>
      
      <ul>
      {this.state.gitUsers.map((x,index)=> <li key={index}>{x}<button className ='buttonRemove' onClick={this.handdleClickRemove} key={index}>Remove</button></li>)}
      </ul>
      {console.log(this.state.gitUsersDetails)}
      <div className='battle'>
          <button className = 'button' onClick = {this.handdleClickRepo}>Battle</button> Who has more public repositories ?
            <p className='repo'> {(this.state.victory != null) && this.state.victory}</p>
          <button className = 'button'>Battle</button> Who is closer to my location ?
            <p className='location'></p>
          <button className = 'button'>Battle</button> Who has the most fallowers ?
            <p className='fallowers'></p>
          <button className = 'button'>Battle</button>  Who has the oldest account ?
            <p className='oldest'></p>
          <button className = 'button'>Battle</button> Who updated last ?
            <p className='update'></p>
      </div>

      </div>
  );
}
}
export default Home;