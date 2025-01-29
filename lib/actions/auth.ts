"use server";

import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
  credentials: Pick<AuthCredentials, "email" | "password">,
) => {
  const { email, password } = credentials;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result.error) {
      return { success: false, error: result.error };
    }
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    console.log(error, "sign in error");
    return { success: false, message: "Failed to sign in" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { email, password, fullName, universityId, universityCard } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");
  // check if user exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, message: "User already exists" };
  }

  const hashedPassword = await hash(password, 10); // hash password
  try {
    await db.insert(users).values({
      email,
      password: hashedPassword,
      fullName,
      universityId,
      universityCard,
    });

    await signInWithCredentials({ email, password }); // sign in user
    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error(error, "signup error");
    return { success: false, message: "Failed to create user" };
  }
};
