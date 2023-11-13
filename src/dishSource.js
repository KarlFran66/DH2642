import { BASE_URL, API_KEY } from "../src/apiConfig.js";

function myAPICall(apiParams) {
    function treatHTTPResponseACB(response) {
        if (!response.ok) throw new Error("API problem" + response.status);
        return response.json();
    }
    return fetch(BASE_URL + apiParams, {
        method: "GET",
        headers: {
            'X-Mashape-Key': API_KEY,
        }
    }).then(treatHTTPResponseACB);
}

function firstElementACB(array) {
    return array[0];
}

function returnArrayACB(object) {
    return object.results;
}

function getMenuDetails(array) {
    return myAPICall("recipes/informationBulk?ids=" + array.join());
}

function getDishDetails(id) {
    return getMenuDetails([id]).then(firstElementACB);
}

function searchDishes(object) {
    return myAPICall("recipes/complexSearch?" + new URLSearchParams(object)).then(returnArrayACB);
}


export { getMenuDetails, getDishDetails, searchDishes };
