import { FormValueState } from "../../pages/Home/FormNote";
import { Note } from "../../services/notes/types";
import { formatDate } from "../../services/utils";
import { Container, SpanDelete, SpanEdit, SpanAlert } from "./styles";

interface NoteProps {
  note: Note;
  handleDelete: (id: number) => void;
  handleUpdate: () => void
}

function CardNote({ note, handleDelete, handleUpdate }: NoteProps) {
  return (
    <>
      <Container>
        <p>{formatDate(new Date(note?.date))}</p>
        <p>{note.text}</p>
        {note.urgent && (
          <SpanAlert className="material-icons" id="priority">
            priority_high
          </SpanAlert>
        )}
          <SpanEdit className="material-icons" onClick={() => handleUpdate()}>
            {" "}
            edit{" "}
          </SpanEdit>
          <SpanDelete className="material-icons" onClick={() => handleDelete(note.id)}>
            {" "}
            delete_forever{" "}
          </SpanDelete>
      </Container>
    </>
  );
}

export default CardNote;
