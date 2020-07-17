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
                <a href="https://www.facebook.com/" target="_blank"><img src={logoF} width="30px" heigt="30px"/></a>
                <a href="https://twitter.com" target="_blank"><img src={logoT} width="30px" heigt="30px"/></a>
                <a href="https://linkedin.com/" target="_blank"><img src={logoL} width="30px" heigt="30px"/></a>
            </div>
    </div>
  );
}

export default Footer;