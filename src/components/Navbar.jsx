import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LOGO_IMAGE from "../assets/images/logo/meri-gaadi-logo.png";
import MOBILE_LOGO from "../assets/images/logo/mg-logo.svg";

const Navbar = () => {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Cars", path: "/cars" },
    { label: "Stories", path: "/blogs" },
    { label: "Brands", path: "/brands" },
    { label: "Categories", path: "/categories" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinkClass = ({ isActive }) => `mg-nav-link${isActive ? " is-active" : ""}`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className={`mg-site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="mg-site-header-inner">
        <Link
          to="/"
          className="mg-site-logo"
          aria-label="Meri Gaadi — Home"
        >
          <img src={MOBILE_LOGO} alt="" className="block h-11 w-auto sm:hidden" />
          <img
            src={LOGO_IMAGE}
            alt="Meri Gaadi"
            className="hidden h-11 w-auto sm:block md:h-14"
          />
        </Link>
        <button
          type="button"
          className={`mg-menu-toggle${isMenuOpen ? " is-open" : ""}`}
          aria-expanded={isMenuOpen}
          aria-controls="mg-primary-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span>{isMenuOpen ? "Close" : "Menu"}</span>
          <span className="mg-menu-icon" aria-hidden="true"><i /><i /></span>
        </button>
        <nav id="mg-primary-navigation" className={`mg-primary-nav${isMenuOpen ? " is-open" : ""}`} aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === "/"} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
