import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">My Product Website</h1>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about" className="ml-4">About</Link>
          <Link href="/contact" className="ml-4">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
