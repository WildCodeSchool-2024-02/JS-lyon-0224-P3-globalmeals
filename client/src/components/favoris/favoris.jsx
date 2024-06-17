import "./favoris.css";

function Favoris() {
  return (
    <div className="ensemble">
      <h1 className="favorisé">❤️VOS MENU FAVORIS</h1>
      <div className="favor">
        <ul className="listMenus">
          <li>
            <div className="cb">
             
              <h2 className="menus-titles1"> Europe</h2>
            </div>
            <p>Menu Italien🇮🇹</p>
          </li>

          <li>
            <div className="cb">
             
              <h2 className="menus-titles2">Afrique</h2>
            </div>
            <p>Menu Sénégalais🇸🇳</p>
          </li>

          <li>
            <div className="cb">
             
              <h2 className="menus-titles3">Amérique</h2>
            </div>
            <p>Menu Mexicain🇲🇽</p>
          </li>

          <li>
            <div className="cb">
            
              <h2 className="menus-titles4">Asie</h2>
            </div>
            <p>Menu Coréen🇰🇷</p>
          </li>

          <li>
            <div className="cb">
             
              <h2 className="menus-titles5">Océanie</h2>
            </div>
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
