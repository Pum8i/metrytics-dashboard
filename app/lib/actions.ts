"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { createUser, getUser } from "./db";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }

    throw error;
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const parsedCredentials = z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
      })
      .safeParse({ email, password });

    if (parsedCredentials.success) {
      const user = await getUser(email);

      if (user.length > 0) {
        return "User already exists";
      } else {
        const newUser = await createUser(email, password);
        if (newUser.length === 0) {
          return "Error Creating User - Please contact your administrator.";
        }
        redirect("/");
      }
    }
    return "Error Creating User";
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    } else if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      "message" in error
    ) {
      // Captures errors such as email address too long.
      console.error(`Registration error ${error.code}: ${error.message}`);
      return `Registration failed: ${error.message} (${error.code})`;
    } else {
      console.error("Unknown Registration error", error);
      return "Registration failed. An unexpected error occurred";
    }
  }
}

export async function logout() {
  console.log("Logging out");
  await signOut({ redirectTo: "/" });
}
