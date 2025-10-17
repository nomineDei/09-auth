import css from "./CreateNotes.module.css";
import { NoteForm } from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000/"),
  title: "Create Note — NoteHub",
  description: "Create a new note quickly and easily in NoteHub.",
  openGraph: {
    title: "Create Note — NoteHub",
    description: "Create a new note quickly and easily in NoteHub.",
    url: "http://localhost:3000/notes/action/create",
    images: [
      {
        url: "/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
