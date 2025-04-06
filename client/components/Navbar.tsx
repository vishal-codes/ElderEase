
"use client";
import { useAuth } from "@/lib/useAuth";
import { usePathname } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

interface NavbarProps {
  onViewInfoClick?: () => void;
  showViewInfo?: boolean;
}

const Navbar = ({ onViewInfoClick, showViewInfo = false }: NavbarProps) => {
  const { user, logout, login } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="w-[95%] mt-4 mx-auto px-6 py-4 backdrop-blur-md bg-white/30 border border-white/40 rounded-4xl shadow-md flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">ElderEase</h1>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            { showViewInfo && (
              <button
                onClick={onViewInfoClick}
                className="bg-green-300 hover:bg-green-300 px-4 py-2 rounded-3xl text-sm cursor-pointer transition"
              >
                <IoMdSettings className="text-2xl" />
              </button>
            )}

            {/* Show user name ONLY on landing/login page */}
            {pathname == "/" && (
              <span className="text-gray-700 text-sm">
                {user.name || user.email}
              </span>
            )}

            <button
              onClick={logout}
              className="bg-red-400 text-white px-4 py-2 rounded-3xl text-sm cursor-pointer"
            >
              <MdLogout className="text-2xl" />
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

