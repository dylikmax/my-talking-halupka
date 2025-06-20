import { useState } from "react";
import LocalStorageController from "../../local-storage-controller";
import "./ShopPage.css"
import ShopSection from "../../components/shop-section/ShopSection";
import PERSON_SKINS from "../../data/person-skins";
import LOCATION_SKINS from "../../data/location-skins";
import Honey from "../../components/honey/Honey";
import { NavLink } from "react-router-dom";

function ShopPage() {
    const lsc = new LocalStorageController();
    const [user, setUser] = useState(lsc.getUser());
    const [isWarn, setIsWarn] = useState(false);

    const handleChangeSkin = (skin) => (e) => {
        
        if (skin.type === "location") {
            setUser({...user, locationSkin: skin.id})
            lsc.setLocationSkin(skin.id);
            return;
        }

        setUser({...user, personSkin: skin.id})
        lsc.setPersonSkin(skin.id);
    }

    const handleBuy = (skin) => (e) => {
        try {
            lsc.removeHoney(skin.cost)
            
            console.log(skin);
            if (skin.type === "location") {
                setUser({...user, myLocationSkins: user.myLocationSkins.concat(skin.id), honey: lsc.getHoney()})
                lsc.addLocationSkin(skin.id);
                return;
            }

            setUser({...user, myPersonSkins: user.myPersonSkins.concat(skin.id), honey: lsc.getHoney()})
            lsc.addPersonSkin(skin.id);
        } catch (error) {
            console.log(error);
            
            setIsWarn(true);
        }
    }

    const handleHideWarn = () => {
        setIsWarn(false);
    }

    return <div className="shop-container">
        <div className="shop-wrapper">
            <div className="shop-top">
                <h1>Магазин</h1>
                <NavLink to="/" className="root-nav">
                    <img src="svg/home-icon.svg" className="root-icon"/>
                </NavLink>
            </div>
            <Honey count={user.honey}/>
            <ShopSection
                name="Персонажи"
                allProducts={PERSON_SKINS}
                myProducts={user.myPersonSkins}
                onChange={handleChangeSkin}
                onBuy={handleBuy}
                activeId={user.personSkin}
            />
            <ShopSection
                name="Локации"
                allProducts={LOCATION_SKINS}
                myProducts={user.myLocationSkins}
                onChange={handleChangeSkin}
                onBuy={handleBuy}
                activeId={user.locationSkin}
            />
            <div className={`shop-warning ${isWarn ? "warn-active" : "warn-nonactive"}`}>
                Недостаточно средств
                <button onClick={handleHideWarn} className="btn">пон</button>
            </div>
        </div>
    </div>
}

export default ShopPage;