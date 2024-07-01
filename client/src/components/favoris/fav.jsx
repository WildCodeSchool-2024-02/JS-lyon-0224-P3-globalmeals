import "./fav.css";

function Favoris() {
  return (
    <div className="ensemble">
      <h2 className="favorisé">❤️ Vos Menus Favoris</h2>
      <div className="favor">
        <ul className="listMenus">
          <li className="menuList">
            <h2 className="menus-titles1">Europe</h2>
            <p className="détail">Menu Italien🇮🇹</p>
          </li>

          <li className="menuList">
            <h2 className="menus-titles2">Afrique</h2>
            <p className="détail">Menu Sénégalais🇸🇳</p>
          </li>

          <li className="menuList">
            <h2 className="menus-titles3">Amérique</h2>
            <p className="détail">Menu Mexicain🇲🇽</p>
          </li>

          <li className="menuList">
            <h2 className="menus-titles4">Asie</h2>
            <p className="détail">Menu Coréen🇰🇷</p>
          </li>

          <li className="menuList">
            <h2 className="menus-titles5">Océanie</h2>
            <p className="détail">Menu Calédonien🇳🇨</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Favoris;
