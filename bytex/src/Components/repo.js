import React, { Component } from 'react';


class RepoBattle extends Component {
    constructor (props) {
        super(props)
        this.state = {
          victory: null,
          updated: this.props.data.updated
        }
      }

    handdleClick = () =>{
        let max = 0;
        let result = '';

        this.props.data.gitUsers.forEach( x => { 
          if(x.public_repos == max){
            result = `Egalitate intre: ${result.slice(24)} si ${x.login.toLowerCase()}`
            }
        
          if (x.public_repos > max){
            max = x.public_repos;
            result =  `Castigator este userul: ${x.login.toLowerCase()}`
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