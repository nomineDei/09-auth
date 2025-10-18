import Image from "next/image";
import css from "./ProfilePage.module.css";
import { Metadata } from "next";
import { getServerMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "View and manage your user profile.",
  openGraph: {
    title: "Profile Page | MyApp",
    description: "View and manage your user profile.",
    url: "http://localhost:3000/notes/profile",
    images: [
      {
        url: "/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Profile Preview",
      },
    ],
  },
};

const Profile = async () => {
  const { email, username, avatar } = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={
              avatar ||
              "https://ac.goit.global/fullstack/react/default-avatar.jpg"
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username:{username}</p>
          <p>Email: {email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
