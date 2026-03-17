import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full">
            <nav className="backdrop-blur-md shadow-sm mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <button className="">
                                      {/* <Sprout className="h-6 w-6 text-primary-foreground" /> */}

                        Garden Gnome
                    </button>

                    <div className="flex gap-8">
                    <Link to="/my-plants">My Plants</Link>
                    <Link to="/calendar">Calendar</Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}