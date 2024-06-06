import { Link } from "react-router-dom";
import "./NavbarToggle.css";

export default function NavbarToggle() {
  return (
    <nav>
      <div>
        <ul className="d-flex">
          <li className="nav-item">
            <Link to="/" className="navLink active">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="navLink active">
              Menu
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="navLink active">
              Favoris
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="navLink active">
              Connexion
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
