import promiseNoData from "../views/promiseNoData.js";
import DetailsView from "../views/detailsView.js";
import { getDishDetails } from "../dishSource.js";
import { reactive, watchEffect } from "vue";
import resolvePromise from "../resolvePromise.js";

const Details = {
    name: "detailsPresenter",
    props: ["model"],
    setup(props) {
        // resolve promise in component state
        const promiseState = reactive({});
        function resolve(promise){
            resolvePromise(promise, promiseState);
        }

        // side effect to resolve promise whenever currentDish changes
        function hasChangedACB(onCleanup){
            if (props.model.currentDish) resolve(getDishDetails(props.model.currentDish));
            onCleanup(function cleanupACB(){});
        }
        watchEffect(hasChangedACB);

        return function renderACB(){
            return (
                promiseNoData(promiseState) ||
                <DetailsView dishData={promiseState.data}
                    guests={props.model.numberOfGuests}
                    isDishInMenu={props.model.dishes.find(isDishInMenuCB)}
                    onAdd={addDishACB}
                />
            );
            function isDishInMenuCB(dish) {
                return dish.id === props.model.currentDish;
            }
        
            function addDishACB(e) {
                props.model.addToMenu(promiseState.data);
            }
        }
    }
}

export default Details

//     function Details(props) {
//     function isDishInMenuCB(dish) {
//         return dish.id === props.model.currentDish;
//     }

//     function addDishACB(e) {
//         props.model.addToMenu(props.model.currentDishPromiseState.data);
//     }

//     return (
//         promiseNoData(props.model.currentDishPromiseState) ||
//         <DetailsView dishData={props.model.currentDishPromiseState.data}
//             guests={props.model.numberOfGuests}
//             isDishInMenu={props.model.dishes.find(isDishInMenuCB)}
//             onAdd={addDishACB}
//         />
//     );
// }

