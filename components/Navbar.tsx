import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="flex justify-around text-lg py-4">
            <ul className="flex space-x-4">
                <li className="">
                    <Link href="/">
                        <p className="no-underline">Home</p>
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        <p className="no-underline">About</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;