import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavbarToggle.css";

export default function NavbarToggle() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="navLink active" to="/" onClick={closeDropdown}>
            Accueil
          </Link>
        </li>
        <li className="nav-item dropdown">
          <div
            className="dropdown-toggle navLink"
            id="navbarDropdown"
            role="button"
            onClick={toggleDropdown}
            onKeyDown={(e) => {
              if (e.key === "Enter") toggleDropdown();
            }}
            tabIndex={0}
          >
            Menus
          </div>
          <ul
            className={`dropdown-menu navDropdownMenu ${dropdownOpen ? "show" : ""}`}
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link
                className="navDropdown"
                to="/europe"
                onClick={closeDropdown}
              >
                Europe
              </Link>
            </li>
            <li>
              <Link className="navDropdown" to="/menu" onClick={closeDropdown}>
                Afrique
              </Link>
            </li>
            <li>
              <Link
                className="navDropdown"
                to="/amerique"
                onClick={closeDropdown}
              >
                Amérique
              </Link>
            </li>
            <li>
              <Link className="navDropdown" to="/asie" onClick={closeDropdown}>
                Asie
              </Link>
            </li>
            <li>
              <Link
                className="navDropdown"
                to="/oceanie"
                onClick={closeDropdown}
              >
                Océanie
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="/" className="navLink active" onClick={closeDropdown}>
            Favoris
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="navLink active" onClick={closeDropdown}>
            Connexion
          </Link>
        </li>
      </ul>
    </nav>
  );
}
