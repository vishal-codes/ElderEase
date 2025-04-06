"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { auth } from "./firebase"; // Firebase Auth only
import { databases } from "./appwrite"; // Appwrite DB

const DB_ID = "67f178fe0019346e7ffb"; // Replace with your DB ID
const COLLECTION_ID = "67f17905003c7d0eee37"; // Replace with your Collection ID

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          await databases.createDocument(
            DB_ID,
            COLLECTION_ID,
            currentUser.uid,
            {
              uid: currentUser.uid,
              name: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
              createdAt: new Date().toISOString(),
            }
          );
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (error.message.includes("already exists")) {
            console.log("✅ User already exists in Appwrite.");
          } else {
            console.error("❌ Failed to save user to Appwrite:", error);
          }
        }

        router.push("/home");
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { user, login, logout };
}
