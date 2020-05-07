import React, { Component } from 'react';

class LastUpdateBattle extends Component {
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
        const days = {
            1 : '1st',
            21 : '21st',
            31 : '31st',
            2 : '2nd',
            22 : '22nd',
            3 : '3rd',
            23 : '23rd'
        }
        const months = {
            1 : 'January',
            2 : 'February',
            3 : 'March',
            4 : 'April',
            5 : 'May',
            6 : 'June',
            7 : 'July',
            8 : 'August',
            9 : 'September',
            10 : 'Octomber',
            11 : 'November',
            12 : 'December',
        }
        let presentDate = new Date();
        let lastUpdate = 0;
        let result = '';

        this.props.data.forEach( user => { 
          let userName = (user.name != null) ? `"${user.login.toLowerCase()} - ${user.name}"` : '"(noName)"';
          let userUpdateDate = new Date(user.updated_at);
            if (presentDate - userUpdateDate < lastUpdate || lastUpdate == 0){
                lastUpdate = userUpdateDate;
                result =  userName;
            }
        })   
          
          let day = lastUpdate.getDate();
          let dayDate = (day in days) ? days[day]:(`${day}th`);
          let fullDate = `${dayDate} of ${months[lastUpdate.getMonth()]} ${lastUpdate.getFullYear()}`;
          let fullTime =  lastUpdate.toString().slice(16,24);
                this.setState({
                    victory: `The winner is: ${result}, he last updated his account on the ${fullDate} ${fullTime}.`
                })    
    } 
    render(){
      return (
        <div className='update'>
          <button className = 'buttonBattle' onClick = {this.handdleClick}>Battle</button> 
            <span>Who updated their account last? ==>{(this.state.victory != null) && this.state.victory}</span>
        </div>
      );
    }
}

export default LastUpdateBattle;