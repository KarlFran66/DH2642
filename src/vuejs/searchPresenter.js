import promiseNoData from "../views/promiseNoData";
// import resolvePromise from "../resolvePromise";
// import { searchDishes } from "../dishSource";
import SearchResultsView from "../views/searchResultsView";
import SearchFormView from "../views/searchFormView";
import { reactive, onMounted, onUnmounted } from "vue";

const Search = {
    name: "searchPresenter",
    props: ["model"],
    setup(props) {
        // do initial search when the component is born
        function lifeACB() {
            if (!props.model.searchResultsPromiseState.promise) {
                props.model.doSearch({});
            }
        }
        onMounted(lifeACB);
        return function renderACB(props) {
            return (
                <div>
                    {/* Rendering SearchFormView: */}
                    {<SearchFormView dishTypeOptions={["starter", "main course", "dessert"]}
                        onSearchString={searchStringHandlerACB}
                        onSearchDishType={searchDishTypeHandlerACB}
                        onClickSearch={clickSearchHandlerACB} />}

                    {/* Rendering SearchResultsView: */}
                    {promiseNoData(props.model.searchResultsPromiseState) ||
                        <SearchResultsView searchResults={props.model.searchResultsPromiseState.data}
                            selectDish={selectDishACB} />
                    }
                </div>
            );
            function searchStringHandlerACB(text) {
                props.model.setSearchQuery(text);
            }
            function searchDishTypeHandlerACB(dishType) {
                props.model.setSearchType(dishType);
            }
            function clickSearchHandlerACB(e) {
                props.model.doSearch(props.model.searchParams);
            }
            function selectDishACB(dish) {
                props.model.setCurrentDish(dish.id);
            }
        }
    }
}

export default Search

// function Search(props) {
//     function searchStringHandlerACB(text) {
//         props.model.setSearchQuery(text);
//     }

//     function searchDishTypeHandlerACB(dishType) {
//         props.model.setSearchType(dishType);
//     }

//     function clickSearchHandlerACB(e) {
//         props.model.doSearch(props.model.searchParams);
//     }

//     function selectDishACB(dish) {
//         props.model.setCurrentDish(dish.id);
//     }

//     if (!props.model.searchResultsPromiseState.promise) {
//         props.model.doSearch({});
//     }

//     return (
//         <div>
//             {/* Rendering SearchFormView: */}
//             {<SearchFormView dishTypeOptions={["starter", "main course", "dessert"]}
//                 onSearchString={searchStringHandlerACB}
//                 onSearchDishType={searchDishTypeHandlerACB}
//                 onClickSearch={clickSearchHandlerACB} />}

//             {/* Rendering SearchResultsView: */}
//             {promiseNoData(props.model.searchResultsPromiseState) ||
//                 <SearchResultsView searchResults={props.model.searchResultsPromiseState.data}
//                     selectDish={selectDishACB} />
//             }
//         </div>
//     )
// }