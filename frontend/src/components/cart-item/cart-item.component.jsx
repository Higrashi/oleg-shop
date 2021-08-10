import React from 'react';
import {connect} from 'react-redux';
import {deleteItem} from '../../redux/shopping-cart/shopping-cart.actions';
import './cart-item.styles.scss';

const CartItem = ({item, deleteItem, handleQty}) => {

   
    const handleDelete = (e) => {
        const itemId = e.target.parentNode.id;
        deleteItem(itemId)
    }

    const handleChange = (e) => {
        const qty = e.target.value;
        handleQty(item, qty)
    }
    console.log(item)
    return (
        <div className='cart-item' id={item.id}>
            <div className='img-title-box'>
            
            <img src={`https://res.cloudinary.com/dmq5fxzth/image/upload/${item.main_image}.png`}
            className='cart-image'
            alt={item.name}/>
            
            <span className='cart-name'>{item.name}</span>
            </div>
           
            <select name='qty' onChange={handleChange} value={item.qty}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                </select>
           
            <span>{item.price} &#x20bd;</span>

            <button onClick={handleDelete}>&#10006;</button>

        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    deleteItem: (item) => dispatch(deleteItem(item))
})

export default connect(null, mapDispatchToProps)(CartItem);