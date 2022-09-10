import styled from "styled-components";

interface PropsFab {
  position: string;
}

export const PriorityFilter = styled.button<PropsFab>`
  position: absolute;
  ${(props) => (props.position === "bottom" ? "bottom: 5px;" : "top: 5px;")}
  left: 5px;
  color: white;

  background: linear-gradient(to top,#dd1818,#00000099);
  color: var(--primary);
  font-size: 25px;
  font-weight: bold;

  width: 30px;
  height: 30px;
  border-radius: 25px;
  border: 0px;

  box-shadow: 2px 4px 4px #0009;
  transition: 0.2s;
  cursor: pointer;

  :hover {
    font-weight: normal;
    color: var(--white);
    background-color: #ed145b;
    box-shadow: 2px 10px 10px #0009;
    ${(props) => (props.position === "bottom" ? "transform: scale(2) translateX(5px) translateY(-5px);" : "transform: scale(2) translateX(-5px) translateY(5px);")}
  }

  span {
    font-size: 12px;
  }
`;
