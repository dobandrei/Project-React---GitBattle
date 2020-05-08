import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Header from '../Components/header'
import Footer from '../Components/footer'
import Home from '../Pages/home'
import About from '../Pages/about'
import LogIn from '../Pages/logIn'
import Register from '../Pages/register'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faRegistered } from '@fortawesome/free-solid-svg-icons'
import { faFeather } from '@fortawesome/free-solid-svg-icons'

class Layout extends Component {
    constructor (props){
        super(props)
    }
    render() {
     
    return (
        <div className='container'>
            <div>
                <Header />
                
            </div>
            
            <aside className='mainContainer'>
                <Router>
                    <div className = 'routerContent'>
                        <Link to='/'>
                            <FontAwesomeIcon icon={faHome} color='black'/>
                            <span>Home</span>
                        </Link>

                        <Link to='/about'>
                            <FontAwesomeIcon icon={faEye} color='black'/>
                            <span>About</span>
                        </Link>

                        <Link to='/register'>
                            <FontAwesomeIcon icon={faRegistered} color='black'/>
                            <span>Register</span>
                        </Link>

                        <Link to='/logIn'>
                            <FontAwesomeIcon icon={faFeather} color='black'/>
                            <span>Log in</span>
                        </Link>
                    </div>
                    
                    <div className='mainContent'>
                        <Switch>
                            <Route exact path='/'>
                                <Home />
                            </Route>
                            <Route path='/about'>
                                <About />
                            </Route>
                            <Route path='/logIn'>
                                <LogIn />
                            </Route>
                            <Route path='/register'>
                                <Register />
                            </Route>
                        </Switch>
                    </div>    
                </Router> 
            </aside>
            
            <div>
                <Footer />
            </div>
        </div>
    );
  }
}

export default Layout;