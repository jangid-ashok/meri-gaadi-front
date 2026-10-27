import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mg-site-footer">
      <div className="mg-site-footer-inner">
        <div className="mg-site-footer-brand">
          <p className="mg-footer-name">Meri Gaadi<span aria-hidden="true">.</span></p>
          <p>Real cars. Honest advice. Stories for the road ahead.</p>
        </div>
        <nav className="mg-footer-nav" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/brands">Brands</Link>
          <Link to="/blogs">Stories</Link>
          <Link to="/categories">Categories</Link>
        </nav>
        <p className="mg-footer-copyright">© {new Date().getFullYear()} Meri Gaadi. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
