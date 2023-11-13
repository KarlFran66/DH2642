const { initializeApp } = require("firebase/app");
const { getDatabase, ref, get, set, onValue } = require("/src/teacherFirebase.js");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebaseConfig from "./firebaseConfig";
import { getMenuDetails } from "./dishSource";
import { async } from "@firebase/util";
// import { getAnalytics } from "firebase/analytics";

// Initialise firebase app, database, ref
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const PATH = "dinnerModel38";
// const analytics = getAnalytics(app);
// const rf = ref(db, PATH+"/test");
// set(rf,"dummy");

function observerRecap(model) {
    //TODO
    function paramCB(payload) {
        console.log(payload)
    }
    model.addObserver(paramCB)
}

function modelToPersistence(model) {
    // TODO return an object
    let sortDishes = [];
    model.dishes.forEach(element => {
        sortDishes = [...sortDishes, element.id];
    });
    sortDishes = sortDishes.sort((a, b) => a - b);    //sort the IDs
    if (model.currentDish == undefined) model.currentDish = null;

    return [model.numberOfGuests, sortDishes, model.currentDish];
}

function persistenceToModel(persistedData, model) {
    // TODO return a promise
    if (!persistedData) persistedData = [];

    if (persistedData[0]) {
        model.setNumberOfGuests(persistedData[0]);
    }
    else {
        model.setNumberOfGuests(2);
    }
    if (persistedData[2]) model.setCurrentDish(persistedData[2]);
    if (!persistedData[1]) persistedData[1] = [];
    return getMenuDetails(persistedData[1]).then(result => model.dishes = result);
}

function firebaseModelPromise(model) {
    // TODO return a promise chain that
    // 1) retrieves data from firebase using firebase get()
    // 2) saves the data into the model (received as parameter)
    // 3) adds a model observer that calls firebase set() and modelToPersistence()
    // 4) optional: calls firebase onValue() for live update

    function retrievedACB(dataFromFirebase) {
        return persistenceToModel(dataFromFirebase.val(), model);
    }

    function savedACB() {

        // Optional
        function myACB() {
            model.notifyObservers(1) // 1 represents the data is from persistence to model
        }
        function dataChangedACB(data) {
            persistenceToModel(data.val(), model).then(myACB)
        }
        onValue(ref(db, PATH), dataChangedACB);
        // Optional

        function obsACB(payload) {
            if (payload !== 1) set(ref(db, PATH), modelToPersistence(model));
        }

        model.addObserver(obsACB);
        return model;
    }

    return get(ref(db, PATH)).then(retrievedACB).then(savedACB);
}

// async function firebaseModelPromise(model){
//     function obsACB(){
//         set(ref(db, PATH), modelToPersistence(model));
//     }

//     const firebaseSnapshot = await get(ref(db, PATH));
//     await persistenceToModel(firebaseSnapshot.val(), model);
//     model.addObserver(obsACB);
//     return model;
// }


// Remember to uncomment the following line:
export { observerRecap, modelToPersistence, persistenceToModel, firebaseModelPromise };
