import "./Header.css";
import logoImage from "../../assets/images/logo-globalmeals.png";

function Header() {
  return (
    <header>
      <div className="header-container">
        <img
          className="header-background"
          src={logoImage}
          alt="Logo_globalmeals"
        />
      </div>
    </header>
  );
}

export default Header;
