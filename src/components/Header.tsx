import { LogOut, Sprout } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Header() {
    const navigationButtons = "px-4 py-2 rounded-md transition-colors bg-primary-green text-white"
    const navigate = useNavigate();

    const [deleteError, setDeleteError] = useState("");
    const [signingOut, setSigningOut] = useState(false);

    const handleSignOut = async () => {
    setSigningOut(true);
    setDeleteError("");

    try {
      await signOut(auth);
      navigate("/login");

    } catch (error: any) {
      setDeleteError(error.message || "Failed to sign out");
      console.error("Error signing out:", error);
      setSigningOut(false);
    } 
     };

    return (
        <header className="sticky top-0 z-50 w-full">
            <nav className="backdrop-blur-md shadow-sm mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                     <Link to="/my-plants" className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-green">
                        <Sprout className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-lg sm:text-xl text-foreground">Garden Gnome</h1>
                    </Link>

                    <div className="flex gap-8">
                    <Link to="/my-plants" className={navigationButtons}>My Plants</Link>
                    <Link to="/calendar" className={navigationButtons}>Calendar</Link>
                    <Link to="/todos" className={navigationButtons}>Todos</Link>
                    <button
                        type="button"
                        disabled={signingOut}
                        className={navigationButtons}
                        onClick={handleSignOut}
                    >
                        {signingOut ? "Signing Out..." : "Sign Out"}
                    </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}