'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { databases, Query } from '@/lib/appwrite';

import { UserProfile } from '../types';


const DATABASE_ID = '67f178fe0019346e7ffb';
const COLLECTION_ID = '67f17905003c7d0eee37';

interface UserDataContextProps {
  userData: UserProfile | null;
  setUserData: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  documentId: string | null;
}

const UserDataContext = createContext<UserDataContextProps | null>(null);

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [documentId, setDocumentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      try {
        const res = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.equal('userId', user.$id)]
        );

        if (res.documents.length > 0) {
          const data = res.documents[0];
          setUserData({
            name: data.name,
            age: String(data.age),
            incomeRange: data.incomeRange,
            location: data.location,
            employmentStatus: data.employmentStatus ? 'employed' : 'unemployed',
            veteranStatus: data.veteranStatus,
            disabilityStatus: data.disabilityStatus,
          });
          setDocumentId(data.$id);
        }
      } catch (error) {
        console.error('❌ Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData, documentId }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
