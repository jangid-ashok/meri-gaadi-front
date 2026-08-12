import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LOGO_IMAGE from "../assets/images/logo/meri-gaadi-logo.png";
import MOBILE_LOGO from "../assets/images/logo/mg-logo.svg";

const Navbar = () => {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/categories" },
    { label: "Blogs", path: "/blogs" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const atTopOnHome = pathname === "/" && !isScrolled;

  const navLinkClass = ({ isActive }) =>
    [
      "rounded-md px-2 py-1 text-base font-medium transition outline-none",
      "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      isActive ? "font-semibold text-blue-600" : "text-slate-700 hover:text-blue-600",
    ].join(" ");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerSurface = isScrolled
    ? "border-slate-200/80 bg-white shadow-sm"
    : atTopOnHome
      ? "border-slate-200/70 bg-white/92 shadow-sm"
      : "border-transparent bg-transparent";

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full border-b transition-[background-color,box-shadow,border-color] duration-200",
        headerSurface,
      ].join(" ")}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 sm:h-20">
        <Link
          to="/"
          className="shrink-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          aria-label="Meri Gaadi — Home"
        >
          <img src={MOBILE_LOGO} alt="" className="block h-11 w-auto sm:hidden" />
          <img
            src={LOGO_IMAGE}
            alt="Meri Gaadi"
            className="hidden h-11 w-auto sm:block md:h-14"
          />
        </Link>
        <nav className="flex items-center gap-4 sm:gap-8" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
