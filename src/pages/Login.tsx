import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Sprout, Leaf, Calendar, CheckSquare, Sun } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { auth } from "../firebase/config";

import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
     const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");    
        const navigate = useNavigate();
    
        const handleLogin = async (e: React.FormEvent) => {
            e.preventDefault();
            setError("");
    
            if (!email || !password) {
            setError("Please fill in all fields");
            return;
            }
    
            navigate("/my-plants");
          try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
            } catch (err: any) {
              if (err.code === "auth/invalid-credential") {
                setError("Invalid email or password");
              } else if (err.code === "auth/user-not-found") {
                setError("User not found");
              } else if (err.code === "auth/wrong-password") {
                setError("Wrong password");
              } else {
                setError(err.message || "Failed to login");
              }
          }
        };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background">
       <header className="sticky top-0 z-50 w-full">
            <nav className="backdrop-blur-md shadow-sm mx-auto px-6 py-4 bg-white">
                <div className="container mx-auto flex items-center justify-between">
                     <Link to="/my-plants" className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-green">
                        <Sprout className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-lg sm:text-xl text-foreground">Garden Gnome</h1>
                    </Link>
                </div>
            </nav>
        </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                Ihr digitaler Gartenhelfer
              </h2>
              <p className="text-lg text-muted-foreground">
                Behalten Sie alle Ihre Pflanzen im Blick, planen Sie
                Gartenarbeiten und erhalten Sie Erinnerungen für wichtige
                Aufgaben.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-4">
              <Card className="border-primary/20 bg-white">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/30">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Pflanzenverwaltung</h3>
                    <p className="text-sm text-muted-foreground">
                      Verwalten Sie Ihre gesamte Pflanzensammlung an einem Ort
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-white">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/30">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Gartenkalender</h3>
                    <p className="text-sm text-muted-foreground">
                      Planen Sie Schnittzeiten und wichtige Ereignisse
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-white">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/30">
                    <CheckSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Aufgabenliste</h3>
                    <p className="text-sm text-muted-foreground">
                      Nie wieder vergessen, wann gegossen werden muss
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-white">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/30">
                    <Sun className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Wetterinfos</h3>
                    <p className="text-sm text-muted-foreground">
                      Erhalten Sie Hinweise zu Frost und idealen Gartentagen
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="max-w-md mx-auto w-full bg-white">
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    Welcome back
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Melden Sie sich an, um fortzufahren
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ihr@email.de"
                      className="border-muted-outline"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Passwort</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="border-muted-outline"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}

                    <Button
                      type="submit"
                      className="text-center text-sm text-white w-full"
                    >
                      Anmelden
                    </Button>
                </form>

                  <div className="pt-4 border-t border-muted-outline">
                    <p className="text-xs text-muted-foreground text-center">
                      Demo Email: kwidua+garden-gnome.com, Demo Passwort: gardenGnomeDemo
                    </p>
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-muted-outline mt-142 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 Garden Gnome. Ihr persönlicher Gartenassistent.</p>
        </div>
      </footer>
    </div>
  );
}