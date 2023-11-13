import {sortDishes, dishType, menuPrice} from "../utilities.js";

function SidebarView(props){
    function buttonMinusHandlerACB(e){
        props.onNumberChange(props.number-1);
    }

    function buttonPlusHandlerACB(e){
        props.onNumberChange(props.number+1);
    }
    
    return(
        <div class="debug">
            <button disabled={props.number<=1} onClick={buttonMinusHandlerACB}>-</button>
            {props.number}
            <button onClick={buttonPlusHandlerACB}>+</button>

            <table>
                <tbody>
                    {sortDishes(props.dishes).map(dishTableRowCB)}
                <tr>
                    <td></td>
                    <td>Total:</td>
                    <td></td>
                    <td class="align">{(menuPrice(props.dishes)*props.number).toFixed(2)}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );

    function dishTableRowCB(dish){
        function selectDishHandlerACB(e){
            props.onSelectDish(dish);
            window.location.hash = "#/details"
            e.preventDefault()
        }
    
        function removeDishHandlerACB(e){
            props.onRemoveDish(dish);
        }

        return(
            <tr key={dish.id}>
                <td>
                    <button onClick={removeDishHandlerACB}>x</button>
                </td>
                <td>
                    <a href="#" onClick={selectDishHandlerACB}>
                        {dish.title}
                    </a>
                </td>
                <td>
                    {dishType(dish)}
                </td>
                <td class="align">
                    {(dish.pricePerServing*props.number).toFixed(2)}
                </td>
            </tr>
        );
    }
}

export default SidebarView