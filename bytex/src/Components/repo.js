import React, { Component } from 'react';


class RepoBattle extends Component {
    constructor (props) {
        super(props)
        this.state = {
          victory: null
        }
      }

    handdleClick = () =>{
        let max = 0;
        let result = '';

        this.props.data.gitUsers.forEach( user => { 
          if(user.public_repos == max){
            result = `Egalitate intre: ${result.slice(24)} si ${user.login.toLowerCase()}`
            }
        
          if (user.public_repos > max){
            max = user.public_repos;
            result =  `Castigator este userul: ${user.login.toLowerCase()}(${user.name})`
          }
         })

         if(max == 0 && this.props.data.gitUsers.length != 0){
          result = 'Nu a castigat nimeni, toti userii au 0 repos!';
        }

        if(this.props.data.gitUsers.length <= 1){
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