"use server";

import { auth, db } from "@/firebase/admin";
import { setServers } from "dns";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function SignUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User Already Exists",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "User Created Successfully",
    };
  } catch (error) {
    console.log("Error Creating User :", error);

    if (error === "auth/email-already-in-use") {
      return {
        success: false,
        message: "Email alreadty in use",
      };
    }
    return {
      success: false,
      message: "Error Creating User",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function SignIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        status: false,
        message: "User Does Not Exist. Create an Acoount to Continue",
      };
    }
    await setSessionCookie(idToken);
  } catch (error) {
    console.log("Error Logging In :", error);
    return {
      success: false,
      message: "Error Logging In",
    };
  }
}
