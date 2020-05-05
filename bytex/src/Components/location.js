import React, { Component } from 'react';

class LocationBattle extends Component {
    constructor(){
        super()
        this.state = {
            victory : null,
            lat1 : 0,
            lng1 : 0
        }
    }
    
    componentDidMount(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
             this.setState({       
            lat1 : position.coords.latitude,
            lng1 : position.coords.longitude
        })
      }
    )
  }
}    

    distance = (lat1, lon1, lat2, lon2) =>{
        let radlat1 = Math.PI * lat1/180
        let radlat2 = Math.PI * lat2/180
        let theta = lon1-lon2
        let radtheta = Math.PI * theta/180
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        
        if (dist > 1) {
            dist = 1;
            }
            
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        dist = dist * 1.609344 
        
        return parseInt(dist)
    }

     

    handdleClick= () =>{
        let key = 'bb878a0c5d444082a393bb575f80a34f';
        let minimDistance = 0;
        let result ='';
        let name = '';
        this.props.data.forEach(user => {
            if (user.location != null) {
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${user.location.includes(',') ? user.location.slice(0,user.location.indexOf(',')) : user.location}&key=${key}`)
            .then (res => res.json())
            .then (data => {
                let coord = data.results[0].geometry;
                
                let userDistance = this.distance(this.state.lat1,this.state.lng1,coord.lat,coord.lng);

                if (userDistance < minimDistance || minimDistance == 0) {
                    minimDistance = userDistance;
                    result = user.login;
                    name = user.name;
                }

                if (userDistance == minimDistance) {
                    result = user.login;
                    name = user.name;
                }
               console.log(user.login,user.name,userDistance)

               this.setState({
                victory: `User-ul ${result} ${(name != null) ? `- ${name}` : '(noName)'} este cel mai aproape, la doar ${minimDistance} km`,
                })
                }
            )
            .catch(err => console.log(err))         
        }
    })
}
    
    

     render(){
         
        return (
            <div className='location'>
                <button className = 'button' onClick = {this.handdleClick}>Battle</button> Who is closer to you ? ==>
                <p> {(this.state.victory != null) && this.state.victory}</p>

            </div>
        )
    }

}
export default LocationBattle;