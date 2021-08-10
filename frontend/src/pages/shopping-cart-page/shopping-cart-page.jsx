import React from 'react';
import {motion} from 'framer-motion';
import {pageAnimation} from '../../animation';
import {connect} from 'react-redux';
import {countTotalPrice} from '../../utils';
import {useHistory} from 'react-router-dom';
import CartItem from '../../components/cart-item/cart-item.component';
import {updateQty, clearCart, deleteItem} from '../../redux/shopping-cart/shopping-cart.actions' 
import './shopping-cart.styles.scss';

const ShoppingCartPage = ({shoppingCart, updateQty, clearCart}) => {
  
  const history = useHistory();
  
  const handleQty = (item, qty) => {
       updateQty(item, qty)
      }

    const goToCheckout = () => {
      if(shoppingCart[0]){
        history.push('/checkout')
      }
    }  


    return (
        <motion.div
        exit="exit"
        variants={pageAnimation}
        initial="hidden"
        animate="show"
        style={{ background: "#fff" }}
        className='shopping-cart-page'>

          <div className='cart-items-container'>
              <button className='clear-button' onClick={() => clearCart()}>Очистить корзину</button>
          {
                shoppingCart[0] ?
                <div>
                   {shoppingCart.map(item => {
                    return  <CartItem item={item} handleQty={handleQty} />
                   })}
                </div> :
                <h2>Ваша корзина пуста</h2>
            }
              </div>  

              <div className="total-container">
                <span> Общая сумма:</span> <span> {countTotalPrice(shoppingCart)}  &#x20bd;</span>
                </div>
                <button className='checkout-btn' onClick={goToCheckout}>Оформить заказ</button> 
             
        </motion.div>
    )
}

const mapStateToProps = (state) => ({
    shoppingCart: state.shoppingCart.shoppingCart
})

const mapDispatchToProps = (dispatch) => ({
    updateQty: (item,qty) => dispatch(updateQty(item, qty)),
    clearCart: () => dispatch(clearCart()),
    deleteItem: (item) => dispatch(deleteItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartPage);