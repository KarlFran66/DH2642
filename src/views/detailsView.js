function DetailsView(props) {
    function ingredientsDetailsCB(ingredient) {
        return (
            <div>
                {ingredient.name}: {ingredient.amount} {ingredient.unit}
            </div>
        )
    }

    function addHandlerACB(e){
        props.onAdd();
        window.location.hash="#/search"
    }

    function cancelHandlerACB(e){
        // props.onCancel();
        window.location.hash="#/search"
    }

    return (
        <div>
            {/* dish title */}
            <div class="title">{props.dishData.title}</div>

            {/* buttons */}
            <div class="button">
                <button onClick={addHandlerACB} disabled={props.isDishInMenu}>Add to menu!</button>
                <button onClick={cancelHandlerACB}>Cancel</button>
            </div>

            {/* dish image */}
            <div class="image">
                <img src={props.dishData.image} height="200"></img>

            </div>

            {/* dish price */}
            <div class="textbox">
                <p>
                    Price: {props.dishData.pricePerServing.toFixed(2)} <br />
                    For {props.guests} guests: {(props.guests * props.dishData.pricePerServing).toFixed(2)}
                </p>
            </div>

            {/* ingredients */}
            <div class="textbox">
                {props.dishData.extendedIngredients.map(ingredientsDetailsCB)}
            </div>

            {/* instruction */}
            <div class="textbox">
                {props.dishData.instructions}
            </div>

            {/* link */}
            <div class="text">
                <a href={props.dishData.sourceUrl}>More information</a>
            </div>
        </div>
    )
}

export default DetailsView