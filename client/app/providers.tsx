// app/providers.tsx
'use client';

import { UserDataProvider } from './context/UserDataContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <UserDataProvider>{children}</UserDataProvider>;
}
