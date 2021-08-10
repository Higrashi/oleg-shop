import React,{useState} from 'react';
import {connect} from 'react-redux';
import {motion} from 'framer-motion';
import {useHistory} from 'react-router-dom';
import {pageAnimation} from '../../animation';
import {countTotalPrice, generateCurrentDate} from '../../utils';
import {clearCart} from '../../redux/shopping-cart/shopping-cart.actions';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import './checkout-page.styles.scss';


const CheckoutPage = ({shoppingCart, clearCart}) => {

    const history = useHistory();
    
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        commentary: ''
    })
    const [checkbox, setCheckbox] = useState({
        type: ''
    })

    const handleInfo = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setUserInfo(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleCheckbox = (e) => {
        if(checkbox.type === e.target.value) {
            setCheckbox({type: ''})
        }else{
           setCheckbox({type: e.target.value})
        }
       
    }

    const sendOrder = () => {
      
        let prodStr = "";
        shoppingCart.map(prod => {
            prodStr += `${prod.qty}x ${prod.name} - ${prod.price}р,` 
        })

        if(userInfo.name && userInfo.phone) {
            axios.post('https://allcut.space/api/orders',{
                name: userInfo.name,
                email: userInfo.email,
                date: generateCurrentDate(),
                phone: userInfo.phone,
                address: userInfo.address,
                payment: checkbox.type === 'card' ?
                'картой':'наличные',
                total_price: countTotalPrice(shoppingCart),
                commentary: userInfo.commentary,
                products: prodStr
            }).then((res) => {
                if(res.status === 201) {
                   history.push('/order-created')
                   clearCart()
                }
            })
        } else {
            toast.error('Пожалуйста, заполните обязательные поля!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
       
        
    }

    

    return (
        <motion.div
        exit="exit"
        variants={pageAnimation}
        initial="hidden"
        animate="show"
        style={{ background: "#fff" }}
        className='checkout-page'
        >
            <ToastContainer />
           <div className="checkout-container">
             <div className="checkout-details">
                <div className='form-group'>
                   <label htmlFor="name" className='required'></label> 
                   <input type="text" id='name' placeholder='Имя' name='name' value={userInfo.name} onChange={handleInfo}/>
                </div>
                
                <div className='form-group'>
                   <input type='email' id="emial" placeholder='Почта' name='email' value={userInfo.email} onChange={handleInfo}/>
                </div>

                  <div className='form-group'>
                   <label htmlFor="phone" className='required'></label> 
                   <input type="tel" id="phone" placeholder='Телефон' name='phone' value={userInfo.phone} onChange={handleInfo}/>
                </div>

                <div className='form-group'>
                   {/* <label htmlFor="address" className='required'></label>  */}
                   <textarea placeholder='Адрес' id="address" name='address' value={userInfo.address} onChange={handleInfo}></textarea>
                </div>

                <div className='form-group'>
                    <textarea placeholder='Комментарий к заказу'
                    id="commentary"
                    name='commentary'
                    rows="5"
                    value={userInfo.commentary} onChange={handleInfo}></textarea>
                </div>    
                
               <div className='required-span'> <span style={{color: 'red'}}>*</span> - обязательно для заполнения</div>
                {/* </form> */}

                    <h3>Оплата</h3>

                    <div className="payment">

                    <div className="payment-item">
                        <input className="custom-checkbox"
                        type="checkbox"
                        id="color-2"
                        name="color-2"
                        value="delivery"
                        onChange={handleCheckbox}
                        disabled={checkbox.type === 'card' && true}
                        />
                         <label for="color-2">Оплата наличными при получении</label>
                        </div>

                        <div className="payment-item">
                        <input className="custom-checkbox"
                        type="checkbox"
                        id="color-1"
                        name="color-1"
                        value="card"
                        onChange={handleCheckbox}
                        disabled={checkbox.type === 'delivery' && true}
                        />
                         <label for="color-1">Перевод на банковскую карту</label>
                        </div>
                   
                        <button onClick={sendOrder}>Отправить</button>
                    </div>


                </div>
               
                <div className="checkout-summary">
                    <div className="summary-box">
                        <h3>Корзина</h3>
                        {shoppingCart.map(item => {
                              return  <div className='summary-item'> <span> {item.qty} x {item.name}</span> {item.price}  &#x20bd; </div>
                            })
                        }
                        <div className="summary-total">Общая сумма: {countTotalPrice(shoppingCart)}  &#x20bd;</div>    
                    </div>
                </div>

                
             </div> 
           
        </motion.div>
    )
}

const mapStateToProps = (state) => ({
    shoppingCart: state.shoppingCart.shoppingCart
})

const mapDispatchToProps = (dispatch) => ({
    clearCart: () => dispatch(clearCart())
})


export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);