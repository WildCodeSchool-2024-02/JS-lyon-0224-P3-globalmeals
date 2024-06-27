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
          <Link className="nav-link active" to="/" onClick={closeDropdown}>
            Accueil
          </Link>
        </li>
        <li className="nav-item dropdown">
          <div
            className="dropdown-toggle nav-link"
            id="navbar-dropdown"
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
            className={`dropdown-menu ${dropdownOpen === true ? "show" : ""}`}
            aria-labelledby="navbar-dropdown"
          >
            <li>
              <Link
                className="nav-dropdown"
                to="/menuPage/europe"
                onClick={closeDropdown}
              >
                Europe
              </Link>
            </li>
            <li>
              <Link
                className="nav-dropdown"
                to="/menuPage/afrique"
                onClick={closeDropdown}
              >
                Afrique
              </Link>
            </li>
            <li>
              <Link
                className="nav-dropdown"
                to="/menuPage/amerique"
                onClick={closeDropdown}
              >
                Amérique
              </Link>
            </li>
            <li>
              <Link
                className="nav-dropdown"
                to="/menuPage/asie"
                onClick={closeDropdown}
              >
                Asie
              </Link>
            </li>
            <li>
              <Link
                className="nav-dropdown"
                to="/menuPage/oceanie"
                onClick={closeDropdown}
              >
                Océanie
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link
            to="/favoris"
            className="nav-link active"
            onClick={closeDropdown}
          >
            Favoris
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/connexion"
            className="nav-link active"
            onClick={closeDropdown}
          >
            Connexion
          </Link>
        </li>
      </ul>
    </nav>
  );
}
