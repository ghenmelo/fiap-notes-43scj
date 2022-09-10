import { useCallback, useContext, useEffect, useState } from "react";
import CardNote from "../../components/CardNote";
import FabButton from "../../components/FabButton";
import FormNote, { FormValueState } from "./FormNote";
import Modal from "../../components/Modal";
import { NotesService } from "../../services/notes/note-service";
import { Note } from "../../services/notes/types";
import { Container } from "./styles";
import { Context } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Input from "../../components/Input";
import PriorityFilterButton from "../../components/PriorityFilterButton";

function Home() {
  const { handleLogout, authenticated } = useContext(Context);
  const [notes, setNotes] = useState<Note[]>([] as Note[]);
  const [notesToShow, setNotesToShow] = useState<Note[]>([] as Note[]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCard, setEditingCard] = useState<Note>({} as Note);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('')
  const [isFilterByPriority, seIsFilterByPriority] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await NotesService.getNotes();

      setNotes(response.data);
      setLoading(false);
    })();
  }, []);

  const createNote = useCallback(
    (payload: FormValueState) => {
      (async () => {
        const response = await NotesService.postNotes(payload);

        setNotes((prevState) => [...prevState, response.data]);

        setShowModal(false);
      })();
    },
    [notes]
  );

  const updateNote = useCallback((card: FormValueState) => {
    (async () => {
      await NotesService.putNotes(card);
      const response = await NotesService.getNotes();

      setNotes([...response.data])
      setIsEditing(false)
      setShowModal(false)
    })();
  }, [editingCard]);

  const deleteNote = useCallback((id: number) => {
    (async () => {
      await NotesService.deleteNote({ id });

      setNotes((prevState) => prevState.filter((note) => note.id !== id));
    })();
  }, []);

  const startEditing = (card : Note) => {
    setEditingCard(card)
    setIsEditing(true)
    setShowModal(true)
  }

  const stopEditing = () => {
    setIsEditing(false)
    setShowModal(false)
  }

  useEffect(() => {
    if (!authenticated) navigate("/");
  }, [authenticated]);

  const cardToShow = () => {
    if (notes && filter) {
      return notes.filter(note => note.text.toLowerCase().includes(filter.toLowerCase()))
    }
    return notes;
  }

  const executaFiltros = (notes: Note[]) => {
    if (notes && filter) {
      notes = notes.filter(note => note.text.toLowerCase().includes(filter.toLowerCase()))
    }

    if(notes && isFilterByPriority) {
      notes = notes.filter(note => note.urgent)
    }

    if (notes) {
      notes.sort((note1: Note, note2: Note) => new Date(note2.date).valueOf() - new Date(note1.date).valueOf())
    }
    
    return notes
  }

  useEffect(() => {
    setNotesToShow(executaFiltros([...notes]))
  }, [notes, filter, isFilterByPriority])

  return (
    <>
      {loading && <Loading />}
      {showModal && (
        <Modal
          title={isEditing ? "Editar Card" : "Novo Card"}
          handleClose={() => stopEditing()}
          style={{ width: "100px" }}
        >
          {isEditing ? <FormNote cardToEdit={editingCard} handleSubmit={(card: FormValueState) => updateNote(card)} /> : <FormNote handleSubmit={createNote}/> }
        </Modal>
      )}
      <Container>
        {notesToShow.map((note) => (
          <CardNote key={note.id} handleDelete={deleteNote} handleUpdate={() => startEditing(note)} note={note}></CardNote>
        ))}
        <FabButton position="left" handleClick={() => setShowModal(true)}>
          +
        </FabButton>

        <Input position="left" handlerFilter={(filtro: string) => setFilter(filtro)}/>

        <PriorityFilterButton position="bottom" handlerFilter={() => seIsFilterByPriority(!isFilterByPriority)}>
          !
        </PriorityFilterButton>
    
        <FabButton position="right" handleClick={handleLogout}>
          <span className="material-icons">logout</span>
        </FabButton>
      </Container>
    </>
  );
}

export default Home;
