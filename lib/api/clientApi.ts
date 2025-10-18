import type { Note } from "@/types/note";
import { api } from "./api";

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search?: string;
  tag?: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<NotesResponse> {
  const res = await api.get<NotesResponse>("/notes", { params });

  return res.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);

  return res.data;
};

export async function createNote(noteData: CreateNoteParams): Promise<Note> {
  const res = await api.post<Note>("/notes", noteData);

  return res.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

export async function register(data: { email: string; password: string }) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function login(data: { email: string; password: string }) {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export async function logout() {
  const res = await api.post("/auth/logout");
  return res.data;
}

export async function checkSession() {
  const res = await api.get("/auth/session");
  return res.data;
}

export async function getMe() {
  const res = await api.get("/users/me");
  return res.data;
}

export async function updateMe(data: { username?: string }) {
  const res = await api.patch("/users/me", data);
  return res.data;
}
