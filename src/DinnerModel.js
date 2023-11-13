import resolvePromise from "./resolvePromise";
import { searchDishes, getDishDetails } from "./dishSource";

/* This is an example of a JavaScript class.
   The Model keeps only abstract data and has no notions of graphics or interaction
*/
class DinnerModel{
    constructor(nrGuests=2, dishArray=[]){
        // other model properties will be initialized here in the coming steps
        this.numberOfGuests= nrGuests;
        this.dishes= dishArray;
        this.searchParams= {};
        this.searchResultsPromiseState= {};
        this.currentDishPromiseState= {};
        this.observerList = []; // observer
    }
    setNumberOfGuests(nr){
        // if() and throw exercise
        
        // TODO throw an Error /* new Error(someMessage) */ if the argument is smaller than 1 or not an integer
        // The error message must be exactly "number of guests not a positive integer"
        // To learn how to check for integer, test at the Developer Tools Console: Number.isInteger(3.14)
        
        // checking if nr is the same added
        if (this.numberOfGuests===nr) return
        if (nr<1||Number.isInteger(nr)===false){
            throw new Error("number of guests not a positive integer");
        }
        // TODO if the argument is a valid number of guests, store it in this.numberOfGuests
        else{
            this.numberOfGuests=nr
        }
        // When this is done, the Unit test "TW1.1 DinnerModel/can set the number of guests" should pass
        // also "number of guests is a positive integer"

        this.notifyObservers({guests: nr})
    }
    addToMenu(dishToAdd){
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the previous value

        // checking if dishToAdd is the in the menu added
        const sameDish = this.dishes.filter(
            function (dish) {
                if (dish.id === dishToAdd.id) return dish
            }
        )
        if (sameDish.length !== 0) return

        this.dishes= [...this.dishes, dishToAdd];

        this.notifyObservers({addedDish: dishToAdd})
    }
    
    removeFromMenu(dishToRemove){
        // callback exercise! Also return keyword exercise
        function hasSameIdCB(dish){
            // TODO return true if the id property of dish is _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
            if (dish.id!==dishToRemove.id){
                return true
            }
            return false
        }

        // if dishToRemove is not in menu, just stop
        const sameDish = this.dishes.filter(
            function (dish) {
                if (dish.id === dishToRemove.id) return dish
            }
        )
        if (sameDish.length === 0) return
        
        this.dishes= this.dishes.filter(hasSameIdCB);

        this.notifyObservers({removedDish: dishToRemove})
        // the test "can remove dishes" should pass
    }
    /* 
       ID of dish currently checked by the user.
       A strict MVC/MVP Model would not keep such data, 
       but we take a more relaxed, "Application state" approach. 
       So we store also abstract data that will influence the application status.
     */
    setCurrentDish(id){
        if (this.currentDish===id) return;
        this.currentDish=id
        // note that we are adding a new object property (currentDish) which was not initialized in the constructor
        // resolvePromise(getDishDetails(id), this.currentDishPromiseState);

        this.notifyObservers({setCurrentDish: id})
    }

    //March tw3 Chuyun
    addObserver(cb){
        this.observerList.push(cb);
    }
    removeObserver(cb){
        this.observerList = this.observerList.filter(
            function (item) {
                if (item !== cb) {
                    return item;
                }
            }
        );
    }
    notifyObservers(payload){
        function invokeObserverCB(ob){ob(payload)};
        this.observerList.forEach(item =>         
        {try{
            invokeObserverCB(item)}
        catch(err){
            console.error(err)};}
        )
    }    

    setSearchQuery(searchText){
        this.searchParams.query=searchText;
    }

    setSearchType(searchType){
        this.searchParams.type=searchType;
    }

    doSearch(searchParams){
        resolvePromise(searchDishes(searchParams), this.searchResultsPromiseState);
    }


}

export default DinnerModel;
