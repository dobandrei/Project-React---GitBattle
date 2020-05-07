import React, { Component } from 'react';

class OldesAccountBattle extends Component {
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
        let oldestDate = new Date();
        let result = '';

        this.props.data.forEach( user => { 
          let userName = (user.name != null) ? `"${user.login.toLowerCase()} - ${user.name}"` : '"(noName)"';
          let userCreateDate = new Date(user.created_at);
            if (userCreateDate < oldestDate){
                oldestDate = userCreateDate;
                let day = oldestDate.getDate();
                let dayDate = (day in days) ? days[day]:(`${day}th`);
                result =  `The winner is: ${userName}, he created his account on the ${dayDate} of ${months[oldestDate.getMonth()]} ${oldestDate.getFullYear()}.`
            }
          })       
          this.setState({
            victory: result
          })
    } 
    render(){
      return (
        <div className='oldest'>
          <button className = 'buttonBattle' onClick = {this.handdleClick}>Battle</button> 
            <span>Who has the oldest account ? ==>{(this.state.victory != null) && this.state.victory}</span>
        </div>
      );
    }
}

export default OldesAccountBattle;