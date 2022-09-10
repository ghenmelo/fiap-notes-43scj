import { PriorityFilter } from "./styles";

interface FBProps {
  children: React.ReactNode;
  handlerFilter: () => void;
  position: string
}

function PriorityFilterButton({ children, handlerFilter, position }: FBProps) {
  return <PriorityFilter position={position} onClick={() => handlerFilter()}><p>{children}</p></PriorityFilter>;
}

export default PriorityFilterButton;
