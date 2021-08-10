import React from 'react';
import {connect} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {countCartItems} from '../../utils'
import {ReactComponent as CartIcon } from '../../assets/icons/shopping-cart.svg'
import {ReactComponent as CartIconBlack} from '../../assets/icons/shopping-cart-black.svg'
import './cart-widget.styles.scss';

const CartWidget = ({cartItems}) => {

    const location = useLocation()
    
    return (
        <Link to='/shopping-cart' className='cart-widget'>
            {
              location.pathname === '/about' ?<CartIcon className='cart-widget-icon'/>:  
              <CartIconBlack className='cart-widget-icon'/>     
            }
            
                 <div className="cart-widget-items-qty">
                     {countCartItems(cartItems)}
                 </div>
        </Link>
    )
}

const mapStateToProps = (state) => ({
    cartItems: state.shoppingCart.shoppingCart
})

export default connect(mapStateToProps)(CartWidget);


