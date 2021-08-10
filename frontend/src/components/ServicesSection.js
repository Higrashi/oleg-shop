import React from "react";
//Import Icons
import clock from "../img/clock.svg";
import diaphragm from "../img/diaphragm.svg";
import money from "../img/money.svg";
import teamwork from "../img/teamwork.svg";
import workshopImg from '../img/workshop-1.jpg'
//Styles
import { About, Description, Image } from "../styles";
import styled from "styled-components";
import { useScroll } from "./useScroll";
import './about-section.styles.scss';

const ServicesSection = () => {
  const [element, controls] = useScroll();
  return (
    <Services
      // variants={scrollReveal}
      animate={controls}
      initial="visible"
      ref={element}
    >
      <Description>
        <h2>
          Высокое <span>качество</span>
        </h2>
        <Cards>
          <Card>
            <div className="icon">
              <img alt="icon" src={clock} />
              <h3>Быстро</h3>
            </div>
            <p>Максимально быстро выполним заказа</p>
          </Card>
          <Card>
            <div className="icon">
              <img alt="icon" src={teamwork} />
              <h3>Удобно</h3>
            </div>
            <p>Всегда подстроимся под ваши пожелания</p>
          </Card>
          <Card>
            <div className="icon">
              <img alt="icon" src={diaphragm} />
              <h3>Идеи</h3>
            </div>
            <p>Поможем реализовать ваши идеи</p>
          </Card>
          <Card>
            <div className="icon">
              <img alt="icon" src={money} />
              <h3>Достпупно</h3>
            </div>
            <p>Наши цены вас приятно удивят</p>
          </Card>
        </Cards>
      </Description>
      <Image>
        <img alt="camera" src={workshopImg} className='laser-image' />
      </Image>
    </Services>
  );
};

const Services = styled(About)`
  h2 {
    padding-bottom: 5rem;
  }
  p {
    width: 70%;
    padding: 2rem 0rem 4rem 0rem;
  }
`;
const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 1300px) {
    justify-content: center;
  }
  
`;
const Card = styled.div`
  flex-basis: 20rem;
  .icon {
    display: flex;
    align-items: center;
    h3 {
      margin-left: 1rem;
      background: white;
      color: black;
      padding: 1rem;
    }
  }
  @media (max-width: 500px) {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

`;

export default ServicesSection;
