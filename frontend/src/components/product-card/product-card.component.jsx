import React from 'react';
import {motion} from 'framer-motion';
import './product-card.styles.scss';
import { fade } from '../../animation';

const ProductCard = ({product}) => {
    return (
        
        <motion.div variants={fade} className='poduct-card-container' id={product.id} >
        <a href={`/shop/${product.id}`} className='product-link'>
        <div className='product-card'>
         {/* <link rel="prefetch" as="image" href={`https://res.cloudinary.com/dmq5fxzth/image/upload/${product.main_image}.png`} /> */}
            <img src={`https://res.cloudinary.com/dmq5fxzth/image/upload/${product.main_image}.png`}
             className='product-img' alt={product.name} />
           
        </div>
        <div className="product-info">
            <h3 style={{color: 'black'}}> {product.name} </h3>
            <span className='product-price'> {product.price} &#x20bd; </span>
        </div>
        </a>
        </motion.div>
        
    )
}

export default ProductCard;