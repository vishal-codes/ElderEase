// lib/user.ts
import { databases, ID } from './appwrite';

const DB_ID = '67f178fe0019346e7ffb';
const COLLECTION_ID = '67f17905003c7d0eee37';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveUserProfile(userData: any) {
  try {
    const response = await databases.createDocument(
      DB_ID,
      COLLECTION_ID,
      ID.unique(),
      userData
    );
    return response;
  } catch (err) {
    console.error('Failed to save user profile:', err);
    throw err;
  }
}

export async function getUserProfiles() {
  const res = await databases.listDocuments(DB_ID, COLLECTION_ID);
  return res.documents;
}
