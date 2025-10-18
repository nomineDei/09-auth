import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchServerNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface NotePageProps {
  params: Promise<{ slug?: string[] }>;
}

const allowedTags = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;
type AllowedTag = (typeof allowedTags)[number];

function isAllowedTag(tag: string): tag is AllowedTag {
  return (allowedTags as readonly string[]).includes(tag);
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawTag = resolvedParams.slug?.[0];
  const tag = isAllowedTag(rawTag ?? "") ? rawTag : undefined;

  const pageTitle = tag ? `${tag} Notes` : "All Notes";
  const description = tag
    ? `Browse your ${tag.toLowerCase()} notes on NoteHub.`
    : "Browse all your notes on NoteHub.";
  const baseUrl = "http://localhost:3000/";

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: pageTitle,
      description,
      url: `${baseUrl}/notes/filter/${tag || ""}`,
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
}

export default async function NotesPage({ params }: NotePageProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const page = 1;
  const perPage = 12;
  const search = "";

  const rawTag = slug?.[0];
  const tag = allowedTags.includes(rawTag as AllowedTag)
    ? (rawTag as AllowedTag)
    : undefined;

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, perPage, search, tag],
    queryFn: () => fetchServerNotes({ page, perPage, search, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={page} perPage={perPage} tag={tag} />
    </HydrationBoundary>
  );
}
