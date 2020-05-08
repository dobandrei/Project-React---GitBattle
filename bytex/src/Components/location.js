import React, { Component } from 'react';

class LocationBattle extends Component {
    constructor(){
        super()
        this.state = {
            key : 'bb878a0c5d444082a393bb575f80a34f',
            victory : null,
            lat : 0,
            lon : 0,
            avatar : '',
            name : ''
        }
    }
    
    componentDidMount(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({       
                    lat : position.coords.latitude,
                    lon : position.coords.longitude
                })
            })
        }
    }    

    distance = ({lat1, lon1, lat2, lon2}) => {
        let radlat1 = Math.PI * lat1/180;
        let radlat2 = Math.PI * lat2/180;
        let theta = lon1-lon2;
        let radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        
        (dist > 1) && (dist = 1)    
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI * 60 * 1.1515 * 1.609344 ;

        return parseInt(dist)
    }

    handdleClick= () =>{
        let minimDistance = 0;
        let result =''; 
        

        this.props.data.forEach(user => {
            if (user.location != null) {
                let userLocation = user.location.includes(',') ? user.location.slice(0,user.location.indexOf(',')) : user.location;
                let userName = `"${user.login.toLowerCase()}"`;
                let photo = user.avatar_url;
                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${userLocation}&key=${this.state.key}`)
                .then (res => res.json())
                .then (data => {
                    
                    let coord = data.results[0].geometry;
                    let userDistance = this.distance({
                                        lat1: this.state.lat,
                                        lon1: this.state.lon,
                                        lat2: coord.lat,
                                        lon2: coord.lng
                                    });
                    if (userDistance < minimDistance || minimDistance == 0) {
                        minimDistance = userDistance;
                        result = userName;
                        photo = user.avatar_url;
                    }
                    if (userDistance == minimDistance) {
                        result = userName;
                        photo = user.avatar_url;
                    }
                    this.setState({
                        victory: `The GitHub user ${result} is the closest to you, at ${minimDistance} km distance.`,
                        name: result,
                        avatar: photo != null && photo,
                    })
                })
                .catch(err => console.log(err))         
            }
        })
    }
    render(){
        
        return (
            <div className='winnerContainer'>
                <button className = 'buttonBattle' onClick = {this.handdleClick}>Battle</button>
                <span>Which GitHub user is closer to you ? </span>
                <div className ='winner'>
                        <img src={this.state.avatar} alt={this.state.name}/>
                    <div>
                        {(this.state.victory != null) && this.state.victory}
                    </div>  
                </div>
            </div>
        )
    }
}

export default LocationBattle;