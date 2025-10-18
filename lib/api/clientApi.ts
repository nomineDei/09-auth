import type { Note } from "@/types/note";
import { api } from "./api";
import { User } from "@/types/user";

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
}

export interface SessionResponse {
  isAuthenticated: boolean;
  user?: User;
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

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/register", data);
  return res.data;
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/login", data);
  return res.data;
}

export async function logout(): Promise<{ message: string }> {
  const res = await api.post<{ message: string }>("/auth/logout");
  return res.data;
}

export async function checkSession(): Promise<SessionResponse> {
  const res = await api.get<SessionResponse>("/auth/session");
  return res.data;
}

export async function getMe(): Promise<User> {
  const res = await api.get<User>("/users/me");
  return res.data;
}

export async function updateMe(data: { username?: string }): Promise<User> {
  const res = await api.patch<User>("/users/me", data);
  return res.data;
}
