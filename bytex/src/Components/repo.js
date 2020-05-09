import React, { Component } from 'react';


class RepoBattle extends Component {
    constructor (props) {
        super(props)
        this.state = {
          victory: null,
          avatar : [],
          name : ''
        }
    }

    handdleClick = () =>{
      if(this.props.data.length <= 1){
        return this.setState({
             victory: 'Please add at least 2 GitHub users to compare them!'
         })
      } 
        let maxRepo = 0;
        let result = '';
        let photo = [];

        this.props.data.forEach( user => { 
          let userName = `"${user.login.toLowerCase()}"`;
          let publicRepo = user.public_repos;
            if(publicRepo == maxRepo){
              result = `${result} and ${userName}`
              photo.push(user.avatar_url);
              
            }
            if (publicRepo > maxRepo){
              maxRepo = publicRepo;
              result = userName;
              photo = [user.avatar_url];
              
            }
        })

        if (maxRepo == 0) {
          result = 'Nobody won, all GitHub users have 0 repositories!'; 
          photo = []; 
        } else {
          result = `Victory for: ${result} with ${maxRepo} repositories.`
        }  
            
          this.setState({
            victory: result,
            name: result,
            avatar: photo      
          })
    } 
    render(){      
      return (
        <div className='winnerContainer'>
          <button className = 'buttonBattle' onClick = {this.handdleClick}>Battle</button> 
            <span>Who has more public repositories ?</span>
            <div className ='winner'>
            <div>
              {this.state.avatar.map((user, index) => 
                <img src = {user} alt='userPhoto' key = {index}/>
                )}   
            </div>  
            <div>
                {(this.state.victory != null) && this.state.victory}
            </div>  
        </div>
        </div>
      );
    }
}

export default RepoBattle;