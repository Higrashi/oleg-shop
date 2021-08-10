import React from "react";
import styled from "styled-components";
import { About } from "../../styles";
import Toggle from "../Toggle";
import { AnimateSharedLayout } from "framer-motion";
import {Link} from 'react-router-dom';
import { useScroll } from "../useScroll";
import { scrollReveal } from "../../animation";
import './faq-section.styles.scss';

const FaqSection = () => {
  const [element, controls] = useScroll();
  return (
    <Faq
      variants={scrollReveal}
      ref={element}
      animate={controls}
      initial="hidden"
    >
      <h2>
       Вопросы <span>FAQ</span>
      </h2>
      <AnimateSharedLayout>
        <Toggle title="Как оформить заказ?">
          <div className="answer">
            <p>Выбирите понравившийся товар и формите заказ. Мы с вами свяжемся и уточним все детали</p>
            <p>
            Если вы хотите оформить индивидульный заказ по вашей задумке то смело <Link to='/contact' className='faq-link'>пишите нам!</Link> 
            </p>
          </div>
        </Toggle>
        <Toggle title="Часы работы">
          <div className="answer">
            <p>
              Мы работаем каждый день
            </p>
          </div>
        </Toggle>
        <Toggle title="Способы оплаты">
          <div className="answer">
            <p>В данный момент мы принимаем оплату:</p>
            <p>1 - наличными при получении</p>
            <p>2 - переводом на банковскую карту (или сбербанк онлайн)</p>
          </div>
        </Toggle>
        <Toggle title="Какие товары мы продаем">
          <div className="answer">
            <p>Мы продаем изделия сделанные с помощью лазерного станка.
              Вы можете купить товары представленные в каталоге а также
              заказать индивидуальную резку </p>
           </div>
        </Toggle>
      </AnimateSharedLayout>
    </Faq>
  );
};

const Faq = styled(About)`
  display: block;
  span {
    display: block;
  }
  h2 {
    padding-bottom: 2rem;
    font-weight: lighter;
  }
  .faq-line {
    background: #cccccc;
    height: 0.2rem;
    margin: 2rem 0rem;
    width: 100%;
  }
  .question {
    padding: 3rem 0rem;
    cursor: pointer;
  }
  .answer {
    padding: 2rem 0rem;
    p {
      padding: 1rem 0rem;
    }
  }
`;

export default FaqSection;
