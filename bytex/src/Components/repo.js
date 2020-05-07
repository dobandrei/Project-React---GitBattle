import React, { Component } from 'react';


class RepoBattle extends Component {
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
        let maxRepo = 0;
        let result = '';

        this.props.data.forEach( user => { 
          let userName = (user.name != null) ? `"${user.login.toLowerCase()} - ${user.name}"` : '"(noName)"';
          let publicRepo = user.public_repos;
            if(publicRepo == maxRepo){
              result = `${result} and ${userName}`
            }
            if (publicRepo > maxRepo){
              maxRepo = publicRepo;
              result = userName;
            }
        })

            if(maxRepo == 0){
              result = 'Nobody won, all GitHub users have 0 repositories!';
            }
            
          this.setState({
            victory: `Victory for: ${result} with ${maxRepo} reporitories.`
          })
    } 
    render(){
      return (
        <div className='repo'>
          <button className = 'buttonBattle' onClick = {this.handdleClick}>Battle</button> 
            <span>Who has more public repositories ? ==>{(this.state.victory != null) && this.state.victory}</span>
        </div>
      );
    }
}

export default RepoBattle;