function SearchResultsView(props) {
    function searchResultBlockCB(dish){
        function searchResultHandlerACB(e){
            props.selectDish(dish);
            window.location.hash = "#/details"
        }

        return (
            <span onClick={searchResultHandlerACB} key={dish.id} class="forsearchResultsView">
                <img onClick={searchResultHandlerACB} src={dish.image} height="100">
                </img>
                <div onClick={searchResultHandlerACB}>
                    {dish.title}
                </div>
            </span>
        )
        }

    return (
        <div class="debug">
            {props.searchResults.map(searchResultBlockCB)}
        </div>
    )
}

export default SearchResultsView