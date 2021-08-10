import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import './mobile-nav.styles.scss';

const MobileNav = () => {
    
    const [navToggle, setNavToggle] = useState(false);
    const location = useLocation();
    const handleClick = () => {
          setNavToggle(!navToggle);  
    }

    
    
    return (
        
        
        <div className='nav-mobile-container' onClick={handleClick}>
        
            <button className="open-menu-btn" style={location.pathname === '/about' ? {color: 'white'} : {color: 'black'} } > menu</button>
            
            <nav className={`nav-mobile ${navToggle && 'nav-mobile-show'}`}>
                <button className={location.pathname === '/' && 'homepage-style'}>&#10006;</button>

                    
               
                <ul>
                <li><Link to="/about">О Нас</Link></li>
                <li><Link to="/">Каталог</Link></li>
                <li><Link to="/contact">Контакты</Link></li>
                <li><Link to="/shopping-cart">Корзина</Link></li>
                    </ul>
             
            </nav>
            
           
            </div>
            
    )
}

export default MobileNav;
