import React, { useState } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FiPlus, FiMinus } from "react-icons/fi";

import { data } from "./data.js";

const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  background: #fff;
`;

const Container = styled.div`
  position: absolute;
  top: 30%;
  box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);
`;

const Wrap = styled.div`
  background: #272727;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: center;
  cursor: pointer;

  h1 {
    padding: 2rem;
    font-size: 1rem;
    font-family: montserrat;
  }

  span {
    margin-right: 1.5rem;
  }
`;

const DropDown = styled.div`
  background: #1c1c1c;
  color: #00ffb9;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) =>
    props.hideBottomBorder ? "none" : "1px solid #00ffb9"};
  border-top: 1px solid #00ffb9;

  p {
    font-size: 1rem;
    font-family: montserrat;
  }
`;

const Accordion = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (idx) => {
    if (selected === idx) {
      return setSelected(null);
    }

    setSelected(idx);
  };

  return (
    <IconContext.Provider value={{ color: "#00FFB9", size: "25px" }}>
      <AccordionSection>
        <Container>
          {data.map((item, idx) => {
            return (
              <React.Fragment>
                <Wrap key={idx} onClick={() => toggle(idx)}>
                  <h1>{item.question}</h1>
                  <span>{selected === idx ? <FiMinus /> : <FiPlus />}</span>
                </Wrap>
                {selected === idx && (
                  <DropDown hideBottomBorder={idx === data.length - 1}>
                    <p>{item.answer}</p>
                  </DropDown>
                )}
              </React.Fragment>
            );
          })}
        </Container>
      </AccordionSection>
    </IconContext.Provider>
  );
};

export default Accordion;
