import { api } from "./api";
import type { Note } from "@/types/note";
import type { FetchNotesParams, NotesResponse } from "./clientApi";
import { cookies } from "next/headers";
import { User } from "@/types/user";

export interface SessionResponse {
  success: boolean;
}

export const fetchServerNotes = async (
  params: FetchNotesParams
): Promise<NotesResponse> => {
  const cookieStore = await cookies();
  const { data } = await api.get<NotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get<SessionResponse>(`/auth/session`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return res;
};
