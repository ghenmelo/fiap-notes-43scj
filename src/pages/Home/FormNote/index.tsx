import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useCallback,
  useState,
} from "react";
import Button from "../../../components/Button";
import Checkbox from "../../../components/Checkbox";
import { Note } from "../../../services/notes/types";
import { Form } from "./styles";

export interface FormValueState {
  text: string;
  urgent?: boolean;
  id?: number;
}

interface FormNoteProps {
  handleSubmit: (payload: FormValueState) => void;
  cardToEdit?: Note;
}

function FormNote({ handleSubmit, cardToEdit }: FormNoteProps) {
  const [formValues, setFormValues] = useState<FormValueState>({
    text: cardToEdit && cardToEdit.text ? cardToEdit.text : "",
    urgent: cardToEdit && cardToEdit.urgent,
    id: cardToEdit && cardToEdit.id
  });

  const handleChangeUrgent = useCallback(() => {
    setFormValues((prevState) => ({ ...prevState, urgent: !prevState.urgent }));
  }, [setFormValues]);

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setFormValues({ ...formValues, text: event.target.value });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(formValues);
  };

  return (
    <Form onSubmit={onSubmit}>
      <textarea
        value={formValues.text}
        onChange={handleInput}
        autoFocus
        placeholder="Insira o texto da nota"
      />
      <Checkbox
        checked={formValues.urgent || false}
        handleChange={handleChangeUrgent}
        label="Urgente?"
      />
      <Button handleClick={() => {}}>Salvar</Button>
    </Form>
  );
}

export default FormNote;
