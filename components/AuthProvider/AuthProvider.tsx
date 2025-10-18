"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuth((state) => state.setUser);
  const clearAuth = useAuth((state) => state.clearAuth);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((c) => c.startsWith("accessToken="))
          ?.split("=")[1];

        if (!token) {
          clearAuth();
          return;
        }

        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          const user = await getMe();
          if (user) {
            setUser(user);
          } else {
            clearAuth();
          }
        } else {
          clearAuth();
        }
      } catch (err) {
        console.error("Auth error:", err);
        clearAuth();
      }
    };
    fetchAuth();
  }, [clearAuth, setUser]);

  return children;
};

export default AuthProvider;
