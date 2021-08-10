import React from 'react';
import {motion} from 'framer-motion';
import {pageAnimation} from '../../animation';
import './order-created-page.scss'

const OrderCreatedPage = () => {

    return (
        <motion.div 
        exit="exit"
        variants={pageAnimation}
        initial="hidden"
        animate="show"
        style={{ background: "#fff" }}
        className='order-created-page'  
        >
            <div className="order-created-info">
               <h2>Заказ успешно создан!</h2>
               <h2>Скоро мы свами свяжемся для уточнения деталей</h2>
               <h3>Спасибо что выбрали нас!</h3>
            </div>
           
        </motion.div>
    )
}

export default OrderCreatedPage;