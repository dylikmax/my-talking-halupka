export default class LocalStorageController {
    getHoney = () => {
        this.initStorage();

        return +localStorage.getItem("honey");
    }

    getPersonSkin = () => {
        this.initStorage();

        return +localStorage.getItem("personSkin");
    }

    getLocationSkin = () => {
        this.initStorage();

        return +localStorage.getItem("locationSkin");
    }

    getMyPersonSkins = () => {
        this.initStorage();

        return JSON.parse(localStorage.getItem("myPersonSkins"));
    }

    getMyLocationSkins = () => {
        this.initStorage();

        return JSON.parse(localStorage.getItem("myLocationSkins"));
    }

    getAllPersonSkins = () => {
        this.initStorage();

        return JSON.parse(localStorage.getItem("allPersonSkins"));
    }

    getAllLocationSkins = () => {
        this.initStorage();

        return JSON.parse(localStorage.getItem("allLocationSkins"));
    }

    addHoney = (honey) => {
        this.initStorage();

        const currentHoney = this.getHoney();
        localStorage.setItem("honey", currentHoney + honey);
    }

    removeHoney = (honey) => {
        this.initStorage();

        const currentHoney = this.getHoney();
        console.log(currentHoney - honey < 0);
        if (currentHoney - honey < 0) {
            throw new Error("Honey value must be positive")
        }
        localStorage.setItem("honey", currentHoney - honey);
    }

    setPersonSkin = (id) => {
        this.initStorage();

        if (!this.getMyPersonSkins().includes(id)) {
            throw new Error("You doesn`t have this skin")
        }
        localStorage.setItem("personSkin", id);
    }

    setLocationSkin = (id) => {
        this.initStorage();

        if (!this.getMyLocationSkins().includes(id)) {
            throw new Error("You doesn`t have this skin")
        }
        localStorage.setItem("locationSkin", id);
    }

    addPersonSkin = (id) => {
        this.initStorage();

        const currentSkins = this.getMyPersonSkins();
        const allSkins = this.getAllPersonSkins();
        if (currentSkins.includes(id)) {
            throw new Error("You already has this skin")
        }

        if (!allSkins.includes(id)) {
            throw new Error("Invalid skin ID")
        }

        currentSkins.push(id);
        localStorage.setItem("myPersonSkins", JSON.stringify(currentSkins));
    }

    addLocationSkin = (id) => {
        this.initStorage();

        const currentSkins = this.getMyLocationSkins();
        const allSkins = this.getAllLocationSkins();
        if (currentSkins.includes(id)) {
            throw new Error("You already has this skin")
        }

        if (!allSkins.includes(id)) {
            throw new Error("Invalid skin ID")
        }

        currentSkins.push(id);
        localStorage.setItem("myLocationSkins", JSON.stringify(currentSkins));
    }

    getUser = () => {
        this.initStorage();

        return {
            honey: +localStorage.getItem("honey"),
            personSkin: +localStorage.getItem("personSkin"),
            locationSkin: +localStorage.getItem("locationSkin"),
            myPersonSkins: JSON.parse(localStorage.getItem("myPersonSkins")),
            myLocationSkins: JSON.parse(localStorage.getItem("myLocationSkins")),
            allPersonSkins: JSON.parse(localStorage.getItem("allPersonSkins")),
            allLocationSkins: JSON.parse(localStorage.getItem("allLocationSkins")),
        }
    }

    initStorage = () => {
        if (localStorage.getItem("honey") !== null &&
            localStorage.getItem("personSkin") !== null &&
            localStorage.getItem("locationSkin") !== null && 
            localStorage.getItem("myPersonSkins") !== null && 
            localStorage.getItem("myLocationSkins") !== null && 
            localStorage.getItem("allPersonSkins") !== null && 
            localStorage.getItem("allLocationSkins") !== null) 
        return;

        localStorage.setItem("honey", 500);
        localStorage.setItem("personSkin", 0);
        localStorage.setItem("locationSkin", 0);
        localStorage.setItem("myPersonSkins", JSON.stringify([0]));
        localStorage.setItem("myLocationSkins", JSON.stringify([0]));
        localStorage.setItem("allPersonSkins", JSON.stringify([0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]));
        localStorage.setItem("allLocationSkins", JSON.stringify([0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]));
    }
}