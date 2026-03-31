import { LogOut, Sprout, Menu } from "lucide-react";
import { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const navigate = useNavigate();

    const [deleteErr, setDeleteError] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

      const { user } = useAuth();

    const handleSignOut = async () => {
        setDeleteError("");

        try {
        await signOut(auth);
        navigate("/login");

        } catch (error: any) {
        setDeleteError(error.message || "Failed to sign out");
        console.error("Error signing out:", deleteErr);
        } 
    };

     const isActive = (path: string) => {
        if (path === "/") {
        return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

     const NavLinks = ({ onClick }: { onClick?: () => void }) => (
        <>
        <Link
            to="/"
            onClick={onClick}
            className={`px-4 py-2 rounded-md transition-colors ${
            (isActive("/my-plants") || isActive("/")) && (location.pathname === "/my-plants" || location.pathname === "/")
                ? "bg-primary-green text-white"
                : "text-foreground hover:bg-secondary"
            }`}
        >
            My Plants
        </Link>
        <Link
            to="/calendar"
            onClick={onClick}
            className={`px-4 py-2 rounded-md transition-colors ${
            isActive("/calendar")
                ? "bg-primary-green text-white"
                : "text-foreground hover:bg-secondary"
            }`}
        >
            Calendar
        </Link>
        <Link
            to="/todos"
            onClick={onClick}
            className={`px-4 py-2 rounded-md transition-colors ${
            isActive("/todos")
                ? "bg-primary-green text-white"
                : "text-foreground hover:bg-secondary"
            }`}
        >
            Todos
        </Link>
        </>
    );

    return (
      <header className="sticky top-0 z-50 w-full border-b bg-card border-muted-outline shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-green">
                <Sprout className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl text-foreground">Garden Gnome</h1>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <nav className="flex gap-1 ">
              <NavLinks />
            </nav>
            <div className="flex items-center gap-2 border-l pl-4">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <Button variant="ghost" size="icon" onClick={handleSignOut} title="Abmelden">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full bg-white border-muted-outline">
              <nav className="flex flex-col gap-2 mt-12 m-4">
                <NavLinks onClick={() => setIsMenuOpen(false)} />
                <div className="mt-6 pt-6 border-t border-muted-outline space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Logged in as:</p>
                    <p className="text-sm font-medium truncate">{user?.email}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
  );
}