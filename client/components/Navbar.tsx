// 'use client';

// import { useState, useEffect } from 'react';
// import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
// import { useRouter } from 'next/navigation';
// import { app } from '@/lib/firebase'; // your firebase config
// // import { FcGoogle } from "react-icons/fc";
// import { FaGoogle } from "react-icons/fa";

// const Navbar = () => {
//   const auth = getAuth(app);
//   const provider = new GoogleAuthProvider();
//   const router = useRouter();

//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);

//       if (currentUser) {
//         router.push('/home'); // Go to home if logged in
//       } else {
//         router.push('/'); // Go to login if logged out
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const login = async () => {
//     try {
//       await signInWithPopup(auth, provider);
//       // `onAuthStateChanged` will handle redirect and state update
//     } catch (err) {
//       console.error('Login failed:', err);
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       // `onAuthStateChanged` will handle redirect and state update
//     } catch (err) {
//       console.error('Logout failed:', err);
//     }
//   };

//   return (
//     <nav className="w-[95%] mx-auto mt-4 px-6 py-4 backdrop-blur-md bg-white/30 border border-white/40 rounded-4xl shadow-md flex items-center justify-between">

//       <h1 className="text-xl font-bold">ElderEase</h1>
//       <div>
//         {user ? (
//           <div className="flex items-center gap-4">
//             <span className="text-gray-700">{user.displayName || user.email}</span>
//             <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
//               Logout
//             </button>
//           </div>
//         ) : (
//             <button
//             onClick={login}
//             className="bg-purple-400 text-white px-4 py-2 rounded-3xl w-full flex items-center justify-center gap-2 text-base font-semibold">
//             <FaGoogle className="text-lg" />
//             <span>Login</span>
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

'use client';

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { app } from '@/lib/firebase';
import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface NavbarProps {
  onViewInfoClick?: () => void;
  showViewInfo?: boolean;
}

const Navbar = ({ onViewInfoClick, showViewInfo = false }: NavbarProps) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) router.push('/');
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="w-[95%] mt-4 mx-auto px-6 py-4 backdrop-blur-md bg-white/30 border border-white/40 rounded-4xl shadow-md flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">ElderEase</h1>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            {pathname === '/home' && showViewInfo && (
              <button
                onClick={onViewInfoClick}
                className="bg-green-200 hover:bg-green-300 px-4 py-2 rounded-3xl text-sm cursor-pointer transition"
              >
                View Info
              </button>
            )}

            {/* Show user name ONLY on landing/login page */}
            {pathname == '/' && (
              <span className="text-gray-700 text-sm">{user.displayName || user.email}</span>
            )}

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-3xl text-sm cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={login}
            className="bg-purple-400 text-white px-4 py-2 rounded-3xl flex items-center justify-center gap-2 text-base font-semibold cursor-pointer"
          >
            <FaGoogle className="text-lg" />
            <span>Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
