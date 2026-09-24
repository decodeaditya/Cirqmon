import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Navbar = ({ Links }) => {

    return (
        <nav className="flex w-full items-center justify-between py-5 sm:py-7 px-4 sm:px-6">
            <Link to="/">
                <span className="text-xl font-black sm:text-2xl tracking-tighter">
                    <img src={logo} alt="Cirqmon Logo" className="h-10 w-10 mr-2 inline-block" />
                    Cirqmon<span className="text-yellow-400">.</span>
                </span>
            </Link>

            <div className="items-center gap-7 text-sm font-bold md:flex text-white/90">

                {Links.map((link) => (
                        <a key={link.name} href={link.href} className='mr-2 transition duration-300 ease-in-out hover:text-yellow-400 hidden sm:block'>
                            {link.name}
                        </a>
                ))}
                <a
                    href="https://github.com/decodeaditya/Cirqmon/blob/main/README.md"
                    target="_blank"
                    className="border border-white bg-white/10 px-4 py-2 sm:px-5 sm:text-sm rounded-full font-bold hover:text-black hover:border-yellow-400 hover:bg-yellow-300 transition"
                >
                    Read guide
                </a>
            </div>
        </nav>
    )
}

export default Navbar