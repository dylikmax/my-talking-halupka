import { useState } from "react";
import LocalStorageController from "../../local-storage-controller";
import "./RootPage.css"
import Honey from "../../components/honey/Honey";
import { NavLink } from "react-router-dom";

function RootPage() {
    const lsc = new LocalStorageController();
    const [user, setUser] = useState(lsc.getUser());

    return <div className="root-container" style={{ backgroundImage: `url(/png/location-skins/skin-${user.locationSkin}.png)` }}>
        <div className="root-wrapper">
            <Honey
                count={user.honey}
            />
            <div className="root-buttons">
                <NavLink to="shop" className="root-nav">
                    <img src="svg/shop-icon.svg" className="root-icon"/>
                </NavLink>
                <NavLink to="games" className="root-nav">
                    <img src="svg/game-icon.svg" className="root-icon"/>
                </NavLink>
            </div>
            <img src={`png/person-skins/skin-${user.personSkin}.png`} className="root-person"/>
        </div>
    </div>
}

export default RootPage;