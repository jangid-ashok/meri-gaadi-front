import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold text-slate-900">Meri Gaadi</p>
          <p className="mt-1 max-w-md text-sm text-slate-600">
            Reviews, EV coverage, and buying guides with an editorial layout built for reading.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
          <Link to="/" className="transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">
            Home
          </Link>
          <Link to="/blogs" className="transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">
            Blogs
          </Link>
          <Link to="/categories" className="transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">
            Categories
          </Link>
        </nav>
        <p className="text-xs text-slate-500 lg:text-right">
          © {new Date().getFullYear()} Meri Gaadi. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
