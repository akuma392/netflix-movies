import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Netflix App</div>
        <div className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/movies" className="text-gray-300 hover:text-white">
            Movies
          </Link>
          <Link href="/genre" className="text-gray-300 hover:text-white">
            Genres
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
