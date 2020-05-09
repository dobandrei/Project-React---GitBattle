import React, { Component } from 'react';


class FollowersBattle extends Component {
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
        let maxFollowers = 0;
        let result = '';
        let photo = [];

        this.props.data.forEach( user => { 
          let userName = `"${user.login.toLowerCase()}"`;
          let followers = user.followers;
            if(followers == maxFollowers){
              result = `${result} and ${userName}`;
              photo.push(user.avatar_url);
            }
            if (followers > maxFollowers){
              maxFollowers = followers;
              result =  userName;
              photo = [user.avatar_url];
            }
        })

        if (maxFollowers == 0) {
          result = 'Nobody won, all GitHub users have 0 followers!'; 
          photo = []; 
        } else {
          result = `Victory for: ${result} with ${maxFollowers} followers.`
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
            <span>Who has the most followers ?</span>
            <div className ='winner'>
                    <div className='winnerImg'>
                        {this.state.avatar.map((user, index) => 
                          <img src = {user} alt='userPhoto' key = {index}/>
                          )}   
                    </div>  
                    <div>
                        {(this.state.victory != null) && this.state.victory}
                    </div>  
                </div>
        </div>
      )
    }
}

export default FollowersBattle;