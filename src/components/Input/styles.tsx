import styled from "styled-components";

interface PropsFab {
  position: string;
}

export const InputStyled = styled.input<PropsFab>`
  position: absolute;
  ${(props) => (props.position === "left" ? "left: 50px;" : "right: 5px;")}
  top: 5px;
  color: white;

  background: linear-gradient(to top,#dd1818,#00000099);
  color: var(--primary);
  font-size: 15px;
  font-weight: bold;
  color: white;

  width: 250px;
  height: 25px;
  border-radius: 5px;
  border: 0px;

  box-shadow: 2px 4px 4px #0009;
  transition: 0.2s;
  cursor: pointer;

  span {
    font-size: 12px;
  }
`;
