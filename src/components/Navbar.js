import { Link } from "react-router-dom";
import "./Navbar.css";

 {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-md bg-white/95 backdrop-blur-sm" : "bg-white"
        }`}
        style={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <NibbleLogo />
            <span className="font-display text-xl font-bold">
              Nibble
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Home", "About us", "Features", "Services", "Contact"].map(
              (item) => (
                <a key={item} href="#" className="nav-link">
                  {item}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <button className="btn-outline">Login</button>
            <button className="btn-green">Get in touch</button>
          </div>
        </div>
      </nav>


export default Navbar;
