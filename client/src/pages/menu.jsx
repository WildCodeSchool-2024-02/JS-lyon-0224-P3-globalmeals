
import { useLoaderData } from "react-router-dom";

function Menu() {
    const menus = useLoaderData();
   
    return (
        <div>
            {menus.map((menu) => 
                <h1 key={menu.id}>{menu.name}</h1>
            )}
        </div>
    );
}

export default Menu;
