import React, { Component } from 'react';


class RepoBattle extends Component {
    constructor (props) {
        super(props)
        this.state = {
          victory: null
        }
      }

    handdleClick = () =>{
        let maxRepo = 0;
        let result = '';
        let arrayOfUsersLength = this.props.data.length;

        this.props.data.forEach( user => { 
          let userName = (user.name != null) ? `"${user.login.toLowerCase()} - ${user.name}"` : '(noName)';
          let publicRepo = user.public_repos;

          if(publicRepo == maxRepo){
            result = `Egalitate intre userii: ${result.slice(0,result.length-1).slice(24)} si ${userName}.`
          }
          if (publicRepo > maxRepo){
            maxRepo = publicRepo;
            result =  `Castigator este userul: ${userName}.`
          }
         })

         if(maxRepo == 0 &&  arrayOfUsersLength != 0){
            result = 'Nu a castigat nimeni, toti userii au 0 repos!';
        }

        if(arrayOfUsersLength <= 1){
            result =  'Adaugati cel putin 2 useri pentru a putea face comparatie'
        }

        this.setState({
          victory: result
        })
      }
      
     render(){
        return (
            <div className='repo'>
                <button className = 'button' onClick = {this.handdleClick}>Battle</button> Who has more public repositories ? ==>
                <span> {(this.state.victory != null) && this.state.victory}</span>
            </div>
        );
    }

}
export default RepoBattle;