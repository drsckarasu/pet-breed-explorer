import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-gray-800 text-white fixed w-full top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <p className="text-xl font-bold">Pet Breed Explorer</p>
                    <nav className="bg-gray-800" aria-label="Global">
                        <Link className="block py-2 md:py-0 hover:text-gray-300 transition duration-200" href="/">Home</Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}