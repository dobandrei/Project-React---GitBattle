import React from 'react';
import logoF from '../Images/logo-facebook.png' 
import logoT from '../Images/logo-twitter.png' 
import logoL from '../Images/logo-linkedIn.png' 

function Footer() {
  return (
    <div className='footer'>
            <div>
                <p >Copywrite &copy; 2020 Dobircianu Ovidiu-Andrei</p>
            </div>

            <div>
                <a href="#"><img src={logoF} width="30px" heigt="30px"/></a>
                <a href="#"><img src={logoT} width="30px" heigt="30px"/></a>
                <a href="#"><img src={logoL} width="30px" heigt="30px"/></a>
            </div>
    </div>
  );
}

export default Footer;