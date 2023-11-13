import SidebarView from "../views/sidebarView.vue";

export default

function Sidebar(props){
    function changeNumACB(nr){
        props.model.setNumberOfGuests(nr)
    }
    
    function selectDishACB(dish){
        props.model.setCurrentDish(dish.id)
    }
    
    function removeDishACB(dishToRemove){
        props.model.removeFromMenu(dishToRemove)
    }

    return <
        SidebarView number={props.model.numberOfGuests}
        dishes={props.model.dishes}
        onNumberChange={changeNumACB}
        onSelectDish={selectDishACB}
        onRemoveDish={removeDishACB}
    />;
}