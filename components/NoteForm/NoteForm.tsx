"use client";

import css from "./NoteForm.module.css";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, CreateNoteParams } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useNoteStore, initialDraft } from "@/lib/store/noteStore";

const validTags: readonly CreateNoteParams["tag"][] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;

export function NoteForm() {
  const [error, setError] = useState<{
    title?: string;
    content?: string;
    tag?: string;
  }>({});

  const { draft, setDraft, clearDraft } = useNoteStore();

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!draft) setDraft(initialDraft);
  }, [draft, setDraft]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const title = formData.get("title")?.toString().trim() || "";
      const content = formData.get("content")?.toString().trim() || "";
      const tagValue = formData.get("tag")?.toString() || "Todo";

      const tag = validTags.includes(tagValue as CreateNoteParams["tag"])
        ? (tagValue as CreateNoteParams["tag"])
        : "Todo";

      await createNote({ title, content, tag });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("title")?.toString().trim() || "";
    const content = formData.get("content")?.toString().trim() || "";
    const tag = formData.get("tag")?.toString() || "";

    const newErrors: typeof error = {};
    if (title.length < 3)
      newErrors.title = "Title must be at least 3 characters";
    if (title.length > 50)
      newErrors.title = "Title must be at most 50 characters";
    if (content.length > 500) newErrors.content = "Max 500 characters";
    if (!validTags.includes(tag as CreateNoteParams["tag"]))
      newErrors.tag = "Invalid tag";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});
    await mutation.mutateAsync(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
        />
        {error.title && <span className={css.error}>{error.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
        />
        {error.content && <span className={css.error}>{error.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
          {validTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {error.tag && <span className={css.error}>{error.tag}</span>}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
