import React,{useState,useEffect} from "react";
//Animations
import { motion } from "framer-motion";
import {pageAnimation} from "../../animation";
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component'
import axios from 'axios'
import {ReactComponent as MenuIcon} from '../../assets/icons/menu.svg'
import './shop-page.styles.scss';

const ShopPage = () => {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [toggleMenu, setToggleMenu] = useState(false)
  
  useEffect(() => {
    axios.get('https://allcut.space/api/products').then((resp) => {
      setProducts(resp.data)
    })
  },[])
  

  useEffect(() => {
    axios.get('https://allcut.space/api/categories').then((resp) => {
      setCategories(resp.data)
    })
  },[])

  const handleClose = (name) => {
    setToggleMenu(!toggleMenu)
    setProducts([])
    if(name === 'все'){
      axios.get('https://allcut.space/api/products').then((resp) => {
       setProducts(resp.data)
      })
    } else {
    axios.post('https://allcut.space/api/filter-products',{
      "name": name
    }).then((resp) => {
      setProducts(resp.data)
    
    })}

  }

  return (
    
    <motion.div
      // className='shop-page'
      style={{ background: "#fff" }}
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
    >
     <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className={`categories-btn`}> <MenuIcon className='menu-icon'/></button> 
   

      <div className={`categories-menu
      ${toggleMenu && 'categories-menu-show'}`}>
   
          <div className='categories-title'>
            <h3 style={{textTransform: 'uppercase'}}>Категории</h3>
            <button className='categories-close-btn'
            onClick={() => setToggleMenu(!toggleMenu)}
            >&#10006;</button>
          </div>
                <ul>
                <li
                    className='categories-li'
                    onClick={() => handleClose('все')}
                    >все</li>
                {categories &&
                  categories.map(item => {
                    return <li id={item.id}
                    key={item.id}
                    className='categories-li'
                    onClick={() => handleClose(item.name)}
                    >{item.name}</li>
                  })
                }
                 
                    </ul>
                  </div>
    
     <div className='shop-page'>
     {
      products[0] ?
      products.map(product => {
        return <ProductCard
        key={product.id}
        product={product}/>
      }) : <Spinner />
    }
     </div>
   </motion.div>
    
  );
};

export default ShopPage;

