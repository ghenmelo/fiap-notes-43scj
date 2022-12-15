import { FormValueState } from "../../pages/Home/FormNote";
import { api } from "../api";
import { Note } from "./types";

export const NotesService = {
  getNotes: () => api.get<Note[]>("/"),
  postNotes: (payload: FormValueState) => api.post<Note>("/", payload),
  deleteNote: (payload: { id: number }) => api.delete(`/${payload.id}`),
  putNotes: (payload: FormValueState) => api.put<Note>(`/${payload.id}`, payload),
};
