import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {motion} from 'framer-motion';
import {connect} from 'react-redux';
import {useWindowDimensions} from '../window-hook/window-dimension-hook';
import {ReactComponent as CartIcon } from '../../assets/icons/shopping-cart.svg'
import MobileNav from '../mobile-nav/mobile-nav.component';
import CartWidget from '../cart-widget/cart-widget.component';
import {countCartItems} from '../../utils'
import './nav.styles.scss';

const Nav = ({cartItems}) => {

    const {pathname} = useLocation();
    const {width} = useWindowDimensions();
   
    return (
        <>
        {
            width > 700 ?
            <nav className='nav'>
         <h1><Link id="logo" to="/"> AllCut</Link></h1>
        
        <ul>
        <li>
            <Link to="/">1. Каталог</Link>
            <motion.div
                transition={{ duration: 0.75 }}
                initial={{ width: "0%" }}
                animate={{ width: pathname === "/" ? "50%" : "0%" }}
                className='motion-line'
            />
            </li>
           
           
            <li>
            <Link to="/about">2. О Нас</Link>
            <motion.div
                transition={{ duration: 0.75 }}
                initial={{ width: "0%" }}
                animate={{ width: pathname === "/about" ? "50%" : "0%" }}
                className='motion-line'
            />
            </li>
          
            <li>
            <Link to="/contact">3. Контакты</Link>
            <motion.div
                transition={{ duration: 0.75 }}
                initial={{ width: "0%" }}
                animate={{ width: pathname === "/contact" ? "50%" : "0%" }}
                className='motion-line'
            />
            </li>
            <li>
                <Link to='/shopping-cart'>
                 <CartIcon className='cart-icon'/>
                 <div className="cart-items-qty">
                     {countCartItems(cartItems)}
                 </div>
                </Link>
                
                <motion.div 
                transition={{ duration: 0.75 }}
                initial={{ width: "0%" }}
                animate={{ width: pathname === "/shopping-cart" ? "60%" : "0%" }}
                className='motion-line'
                />
            </li>
        </ul>
        </nav> :
        <>
        <CartWidget />
        <MobileNav /> 
        </>
         
        
        }
       
        </>
    )
}

const mapStateToProps = (state) => ({
    cartItems: state.shoppingCart.shoppingCart
})

export default connect(mapStateToProps)(Nav);