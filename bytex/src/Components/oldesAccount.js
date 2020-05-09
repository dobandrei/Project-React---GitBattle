import React, { Component } from 'react';

class OldesAccountBattle extends Component {
    constructor (props) {
        super(props)
        this.state = {
          victory: null,
          avatar : '',
          name : ''
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
        let photo = '';
        this.props.data.forEach( user => { 
          let userName = `"${user.login.toLowerCase()}"`;
          let userCreateDate = new Date(user.created_at);
            if (userCreateDate < oldestDate){
                oldestDate = userCreateDate;
                let day = oldestDate.getDate();
                let dayDate = (day in days) ? days[day]:(`${day}th`);
                result =  `The winner is: ${userName}, he created his account on the ${dayDate} of ${months[oldestDate.getMonth()]} ${oldestDate.getFullYear()}.`
                photo = user.avatar_url;
              }
          })       
          this.setState({
            victory: result,
            name: result,
            avatar: photo,
          })
    } 
    render(){
      return (
        <div className='winnerContainer'>
          <button className = 'buttonBattle' onClick = {this.handdleClick}>Battle</button> 
            <span>Who has the oldest account ? 
            </span>
                <div className ='winner'>
                        <img src={this.state.avatar} alt={this.state.name}/>
                    <div>
                        {(this.state.victory != null) && this.state.victory}
                    </div>  
                </div>
            </div>
      );
    }
}

export default OldesAccountBattle;