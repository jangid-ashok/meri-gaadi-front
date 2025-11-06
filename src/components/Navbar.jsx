import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import LOGO_IMAGE from '../assets/images/logo/meri-gaadi-logo.png';
import MOBILE_LOGO from '../assets/images/logo/mg-logo.svg';

const Navbar = () => {
    const navItems = [
        {label: "Home", path: '/'},
        {label: "Categories", path:'/categories'},
        {label: "Blogs", path:'/blogs'}
    ];

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 10);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    })

    return (
        <header className={`sticky top-0 z-50 w-full rounded-sm transition-all duration-300 ${isScrolled ? 'bg-white shadow-xl': 'bg-transparent'}`}>
            <div className={`max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center ${isScrolled ? 'h-16' : 'h-24'}`}>
                <Link to="/" className="text-2xl font-bold text-gray-800 tracking-wide">
                    {/* Mobile Logo */}
                    <img src={MOBILE_LOGO} className="block sm:hidden w-16 h-auto" />
                    {/* Desktop logo */}
                    <img src={LOGO_IMAGE} className="hidden sm:block w-52 h-auto" />
                </Link>
                <nav className="flex gap-6 items-center text-gray-700 font-medium text-lg">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({isActive}) =>
                                isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600 transition"
                            }>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;