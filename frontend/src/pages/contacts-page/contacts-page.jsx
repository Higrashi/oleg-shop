import React, {useState} from "react";
//Animations
import { motion } from "framer-motion";
import { pageAnimation, titleAnim } from "../../animation";
import {ReactComponent as VkIcon} from '../../assets/icons/vk.svg';
import {ReactComponent as InstagramIcon} from '../../assets/icons/instagram.svg';
import axios from 'axios';
import styled from "styled-components";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {generateCurrentDate} from '../../utils'

import './contacts.styles.scss';

const ContactsPage = () => {

  const [userMessage, setUserMessage] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUserMessage(prevSate => {
      return {
        ...prevSate,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(userMessage.name
      && userMessage.phone
      && userMessage.message) {
        axios.post('https://allcut.space/api/messages', {
          name: userMessage.name,
          email: userMessage.email,
          phone: userMessage.phone,
          message: userMessage.message,
          date: generateCurrentDate()
      }).then(res => {
       
      }).catch((err) => {
        toast.error('Что-то пошло не так!', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      toast.success('Сообщение успешно отправленно!', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
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
   
    
    setUserMessage({
      name: '',
      phone: '',
      email: '',
      message: ''
    })
  }

  return (
    <motion.div
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      style={{ background: "#fff" }}
      className='contacts-page'
    >
      <ToastContainer />
      <div className='contacts-title'>
        <div className='hide-div'>
          <motion.h2 variants={titleAnim}>Контакты</motion.h2>
        </div>
      </div>
      <div>
        <div className='hide-div'>
          <Social variants={titleAnim}>
            <Circle />
          
            <h2>Напишите нам!</h2>
          </Social>
         
          <motion.div variants={titleAnim} className="message-container">
              <form onSubmit={handleSubmit} className='contact-form'>
                <div>
                <label htmlFor="name" className='contact-required'></label> 
                  <input type="text" placeholder="Имя" name='name' value={userMessage.name} onChange={handleChange}/>
                </div>
                  
                  <div className="from-box">
                    
                    <label htmlFor="name" className='contact-required'></label> 
                    <input type="tel" placeholder="Телефон" name='phone' value={userMessage.phone} onChange={handleChange}/>
                    
                  
                    <input type="email" placeholder="Почта" name='email' value={userMessage.email} onChange={handleChange}/>
                  </div>
                  <textarea name="" id="" cols="30" rows="10" placeholder="Сообщение" name='message' value={userMessage.message} onChange={handleChange}></textarea>
                  <div>
                  <input type="submit" value='Отправить' />
                  </div>
                  
              </form>
              <div className='required-span'> <span style={{color: 'red'}}>*</span> - обязательно для заполнения</div>
          </motion.div>
        </div>
        <Hide>
          <Social variants={titleAnim}>
            <Circle />
            <h2>Почта</h2> 
           </Social>
           <h3>albov@inbox.ru</h3>
        </Hide>

        <Hide>
          <Social variants={titleAnim}>
            <Circle />
            <h2>Телефон</h2>
           </Social>
           <h3>+7 926-768-36-77</h3>
        </Hide>

        <Hide>
          <Social variants={titleAnim}>
            <Circle />
            <h2>Адрес</h2>
           </Social>
           <h3>Москва, г. Долгопродный, Советская ул. дом 83, к.2</h3>
        </Hide>


        {/* <Hide>
          <Social variants={titleAnim}>
            <Circle />
            <h2>Социальные сети</h2>
            </Social>
            <div className="icons">
             <VkIcon className='social-icon'/>
             <InstagramIcon className='social-icon'/>
            </div>
        </Hide> */}
      </div>
    </motion.div>
  );
};



const Hide = styled.div`
  overflow: hidden;
`;
const Circle = styled.div`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background: #353535;
`;
const Social = styled(motion.div)`
  display: flex;
  align-items: center;
  
  h3 {
    color: black
  }
  
  h2 {
    margin: 2rem;
    font-size: 3rem;
  }
  @media (max-width: 500px) {
    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1rem;
    }
  }
`;

export default ContactsPage;
