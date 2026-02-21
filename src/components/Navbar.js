import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">ClimateRisk AI</h2>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/riskmap">Risk Map</Link>
        <Link to="/forecast">Forecast</Link>
        <Link to="/mitigation">Mitigation</Link>
        <Link to="/locality">Locality</Link>
        <Link to="/chatbot">Chatbot</Link>
      </div>
    </nav>
  );
}

export default Navbar;