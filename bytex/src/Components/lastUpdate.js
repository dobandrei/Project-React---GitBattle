import React, { Component } from 'react';

class LastUpdateBattle extends Component {
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
        let photo = [];
        this.props.data.forEach( user => { 
          let userName = `"${user.login.toLowerCase()}"`;
          let userUpdateDate = new Date(user.updated_at);
            if (presentDate - userUpdateDate < lastUpdate || lastUpdate == 0){
                lastUpdate = userUpdateDate;
                result =  userName;
                photo = [user.avatar_url];
            }
        })   
          
          let day = lastUpdate.getDate();
          let dayDate = (day in days) ? days[day]:(`${day}th`);
          let fullDate = `${dayDate} of ${months[lastUpdate.getMonth()]} ${lastUpdate.getFullYear()}`;
          let fullTime =  lastUpdate.toString().slice(16,24);
                this.setState({
                    victory: `The winner is: ${result}, last updated on the ${fullDate} at ${fullTime}.`,
                    name: result,
                    avatar: photo
                })    
    } 
    render(){
      return (
        <div className='winnerContainer'>
          <button className = 'buttonBattle' onClick = {this.handdleClick}>Battle</button> 
            <span>Who updated their account last?</span>
            <div className ='winner'>
                    <div>
                      {this.state.avatar.map((photoLink, index) => 
                        <img src = {photoLink} alt='userPhoto' key = {index}/>
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

export default LastUpdateBattle;