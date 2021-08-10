import React from "react";
//Page Components
import AboutSection from "../../components/AboutSection";
import ServicesSection from "../../components/ServicesSection";
// import FaqSection from "../../components/FaqSection";
import FaqSection from '../../components/faq-section/faq-section.component';
//Animations
import { motion } from "framer-motion";
import { pageAnimation } from "../../animation";
import ScrollTop from "../../components/ScrollTop";
import './about-page.styles.scss';

const AboutUs = () => {
  return (
    <motion.div
      exit="exit"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      className='about-page'
    >
      <AboutSection />
      <ServicesSection />
      <FaqSection />
      <ScrollTop />
    </motion.div>
  );
};

export default AboutUs;