import React, { Component } from 'react';

class LocationBattle extends Component {
    constructor(){
        super()
        this.state = {
            key : 'bb878a0c5d444082a393bb575f80a34f',
            victory : null,
            lat : 0,
            lon : 0,
            avatar : [],
            name : '',
            loading: false
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
        if(this.props.data.length <= 1){
            return this.setState({
                 victory: 'Please add at least 2 GitHub users to compare them!'
             })
         } 
        let minimDistance = 0;
        let result =''; 
        this.setState({loading:true})
        let photo = [];
        this.props.data.forEach(user => {
            if (user.location != null) {
                let userLocation = user.location.includes(',') ? user.location.slice(0,user.location.indexOf(',')) : user.location;
                let userName = `"${user.login.toLowerCase()}"`;
                
                
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
                        photo = [user.avatar_url];
                    }

                    
                    this.setState({
                        victory: `The GitHub user ${result} is the closest to you, at ${minimDistance} km distance.`,
                        name: result,
                        avatar: photo,
                        loading: false
                    })
                })
                .catch(err => console.log(err))         
            }
        })
    }
    render(){
        const displayWinner = this.state.loading ? "Loading ..." : 
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
        return (
            <div className='winnerContainer'>
                <button className = 'buttonBattle' onClick = {this.handdleClick}>Battle</button>
                <span>Which GitHub user is closer to you ? </span>
                {displayWinner}    
            </div>
        )
    }
}

export default LocationBattle;