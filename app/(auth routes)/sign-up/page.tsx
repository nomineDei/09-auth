"use client";

import { useRouter } from "next/navigation";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import css from "./SignUpPage.module.css";
import { useAuth } from "@/lib/store/authStore";
import { useState } from "react";

const SignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();
  const router = useRouter();

  const handleAction = async (formData: FormData) => {
    const payload = Object.fromEntries(formData) as unknown as RegisterRequest;

    try {
      const user = await register(payload);
      setUser(user);
      router.replace("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed");
      }
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleAction}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
