import React ,{useState, useEffect}from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { motion } from "framer-motion";
import {pageAnimation} from '../../animation';
import {addNewItem} from '../../redux/shopping-cart/shopping-cart.actions';
import ImageModal from '../../components/image-modal/image-modal.component';
import Spinner from '../../components/spinner/spinner.component'
import './product-page.styles.scss'
import axios from 'axios';

const ProductPage = ({match, addNewItem}) => {
    const [currentProduct, setCurrentProduct] = useState({});
    const [qty, setQty] = useState(1);
    const [imageModal, setImageModal] = useState({
        active: false,
        src: ''
    })
    const [images, setImages] = useState([])

    useEffect(() => {
      axios.get(`https://allcut.space/api/product/${match.params.id}`).then((resp) => {
         setCurrentProduct(resp.data)
      }).then(() => {
        axios.get(`https://allcut.space/api/image/${match.params.id}`).then((resp) => {
          setImages(resp.data)
        })
      })
    },[])

  const handleAdd = () => {
       if(currentProduct.name){
          addNewItem(currentProduct, qty);
        }
        
        
    }
   const handleQty = (e) => {
     setQty(Number(e.target.value))
    }

    const openImage = (e) => {
      
      setImageModal({
        active: true,
        src: e.target.src
      })
    }
   
    
    
    return (
        <motion.div
        exit="exit"
        variants={pageAnimation}
        initial="hidden"
        animate="show"
        style={{ background: "#fff" }}
        className='product-page'
        >   
             <ImageModal active={imageModal.active}
             src={imageModal.src}
             onClose={() => setImageModal({active: false, src: ''})} />
            
          
            <div className="product-container">
            {currentProduct.main_image ?       
             
                <div className="image-container">
                    <img src={`https://res.cloudinary.com/dmq5fxzth/image/upload/${currentProduct.main_image}.png`}
                    className='product-image' onClick={openImage}
                    alt={currentProduct.name}
                    />
                    <div className='small-images'>
                      {images[1] && 
                        <img className='small-img'
                         src={`https://res.cloudinary.com/dmq5fxzth/image/upload/${images[1].name}.png`}
                         onClick={openImage}
                         alt="" />  
                      }
                    
                    </div>
                </div>
                 : <div className='spinner-view'> <Spinner /></div> }     
              
              {currentProduct.name ?
               <div className="info-container">
                   <h4>{currentProduct.name}</h4>
                    <div className='description-container'>
                        {currentProduct.description}
                         </div>
                        <select name='qty' onChange={handleQty}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                         </select>

                        <span>{currentProduct.price} &#x20bd;</span> 

                      <button onClick={handleAdd}>В корзину</button>    
                </div>
                
                : null }
            </div>
          
        </motion.div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    addNewItem: (item, qty) => dispatch(addNewItem(item, qty))
})

export default connect(null, mapDispatchToProps)(withRouter(ProductPage));