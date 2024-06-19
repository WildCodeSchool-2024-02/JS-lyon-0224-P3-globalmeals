import "./favoris.css";

function Favoris() {
  return (
    <div className="ensemble">
      <h1 className="favorisé">❤️ Vos Menus Favoris</h1>
      <div className="favor">
        <ul className="listMenus">
          <li className="menuList">
            <h2 className="menus-titles1">Europe</h2>
            <p>Menu Italien🇮🇹</p>
          </li>

          <li className="menuList">
            <h2 className="menus-titles2">Afrique</h2>
            <p>Menu Sénégalais🇸🇳</p>
          </li>

          <li className="menuList">
            <h2 className="menus-titles3">Amérique</h2>
            <p>Menu Mexicain🇲🇽</p>
          </li>

          <li className="menuList">
            <h2 className="menus-titles4">Asie</h2>
            <p>Menu Coréen🇰🇷</p>
          </li>

          <li className="menuList">
            <h2 className="menus-titles5">Océanie</h2>
            <p>Menu Calédonien🇳🇨</p>
          </li>
        </ul>
        <img
          className="épiceries"
          src="/src/assets/images/epices.png"
          alt="épices"
        />
      </div>
    </div>
  );
}

export default Favoris;
