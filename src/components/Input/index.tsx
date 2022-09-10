import { InputStyled } from "./styles";

interface FBProps {
  position: string;
  handlerFilter: (filter: string) => void;
}

function Input({position, handlerFilter}: FBProps) {
  return <InputStyled placeholder="Digite a nota desejada" position={position} onChange={(event) => handlerFilter(event.target.value)}></InputStyled>;
}

export default Input;
