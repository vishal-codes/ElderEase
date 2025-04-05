// lib/auth.ts
import { account } from './appwrite';

export async function anonymousLogin() {
  try {
    const session = await account.createAnonymousSession();
    return session;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}
