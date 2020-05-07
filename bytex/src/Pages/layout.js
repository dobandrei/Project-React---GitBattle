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
            
            <div className='main'>
                <Router>
                    <div className = 'routerContent'>
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About</Link>
                        <Link to='/register'>Register</Link>
                        <Link to='/logIn'>Log in</Link>
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
            </div>
            
            <div>
                <Footer />
            </div>
        </div>
    );
  }
}

export default Layout;