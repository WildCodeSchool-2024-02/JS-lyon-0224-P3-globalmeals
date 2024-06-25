import "./Header.css";
import logoImage from "../../assets/images/logo-globalmeals.png";

function Header() {
  return (
    <header>
      <div className="headerContainer">
        <img
          className="headerBackground"
          src={logoImage}
          alt="Logo_globalmeals"
        />
      </div>
    </header>
  );
}

export default Header;
