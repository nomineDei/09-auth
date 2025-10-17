import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000/"),
  title: "Page Not Found — NoteHub",
  description: "The page you are looking for does not exist on NoteHub.",
  openGraph: {
    title: "Page Not Found — NoteHub",
    description: "The page you are looking for does not exist on NoteHub.",
    url: "http://localhost:3000/not-found",
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

const NotFoundPage = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
