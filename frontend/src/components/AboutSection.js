import React from "react";

import laserImg from '../img/laser-wood-1.jpg';
import { About, Description, Image, Hide } from "../styles";
import {useHistory} from 'react-router-dom';
//Framer Motion
import { motion } from "framer-motion";
import { titleAnim, fade, photoAnim } from "../animation";
import Wave from "./Wave";
import './about-section.styles.scss';

const AboutSection = () => {

  const history = useHistory()
  return (
    <About>
      <Description>
        <motion.div>
          <Hide>
            <motion.h2 variants={titleAnim}>Мы работаем что бы</motion.h2>
          </Hide>
          <Hide>
            <motion.h2 variants={titleAnim}>
              реализовать <span>ваши</span> проекты
            </motion.h2>
          </Hide>
          {/* <Hide>
            <motion.h2 variants={titleAnim}>true.</motion.h2>
          </Hide> */}
        </motion.div>
        <motion.p variants={fade}>
          Мы занимаемся лазерной резкой под заказ. Так же мы можете приобрести товары в нашем интернет-магазине
        </motion.p>
        <motion.button variants={fade} onClick={() => history.push('/contact')}>Контакты</motion.button>
      </Description>
      <Image>
        <motion.img variants={photoAnim} src={laserImg} className='laser-image' alt="guy with a camera" />
      </Image>
      <Wave />
    </About>
  );
};

//Styled Components

export default AboutSection;
