function SearchFormView(props) {
    function searchStringACB(e) {
        props.onSearchString(e.target.value);
    }

    function searchDishTypeACB(e) {
        props.onSearchDishType(e.target.value);
    }

    function selectRowCB(dishType) {
        return (
            <option key={dishType} value={dishType}>{dishType}</option>
        )
    }

    function clickSearchACB(e) {
        props.onClickSearch();
    }

    function backToSummaryACB(){
        window.location.hash="#/summary"
    }

    return (
        <div class="debug">
            <input onChange={searchStringACB}></input>
            <select onChange={searchDishTypeACB}>
                <option value="">
                    Choose:
                </option>
                {props.dishTypeOptions.map(selectRowCB)}
            </select>
            <button onClick={clickSearchACB}>Search!</button>
            <button class="button" onClick={backToSummaryACB}>Back to Summary</button>
        </div>
    )
}

export default SearchFormView;