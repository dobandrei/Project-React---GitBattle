import React, { Component } from 'react';


class FollowersBattle extends Component {
    constructor (props) {
        super(props)
        this.state = {
          victory: null
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

        this.props.data.forEach( user => { 
          let userName = (user.name != null) ? `"${user.login.toLowerCase()} - ${user.name}"` : '"(noName)"';
          let followers = user.followers;
            if(followers == maxFollowers){
              result = `It's a tie: ${result.slice(0,result.length-1).slice(14)} si ${userName}.`
            }
            if (followers > maxFollowers){
              maxFollowers = followers;
              result =  `The winner is: ${userName} with ${followers} followers.`
            }
        })

            if(maxFollowers == 0){
              result = 'Nobody won, all GitHub users have 0 followers!';
            }
          this.setState({
            victory: result
          })
    } 
    render(){
      return (
        <div className='folowers'>
          <button className = 'buttonBattle' onClick = {this.handdleClick}>Battle</button> 
            <span>Who has the most followers ? 
           {(this.state.victory != null) && this.state.victory}</span>
        </div>
      );
    }
}

export default FollowersBattle;