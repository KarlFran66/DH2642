import { createRouter, createWebHashHistory, RouterView } from "vue-router";
import { reactive, KeepAlive, onMounted } from "vue";
import DinnerModel from "../DinnerModel";
import Search from "./searchPresenter.js";
import Details from "./detailsPresenter.js";
import Summary from "./summaryPresenter.js";
import Sidebar from "./sidebarPresenter.js";
import "../firebaseModel.js";
import { firebaseModelPromise } from "../firebaseModel.js";
import promiseNoData from "../views/promiseNoData";
import resolvePromise from "../resolvePromise";

const myModel = reactive(new DinnerModel());
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: <Search model={myModel} />,
        },
        {
            path: "/search",
            component: <Search model={myModel} />,
        },
        {
            path: "/details",
            component: <Details model={myModel} />
        },
        {
            path: "/summary",
            component: <Summary model={myModel} />
        },
    ],
});

const VueRoot = {
    setup() {
        const myPromiseState = reactive({});
        // resolve firebaseModelPromise when the application is born
        function lifeACB() {
                resolvePromise(firebaseModelPromise(myModel), myPromiseState)
        }
        onMounted(lifeACB);

        return function VueRootRender() {
            return (
                promiseNoData(myPromiseState)||
                <div class="flexParent">
                    <div class="sideBar"><Sidebar model={myModel} /></div>
                    <div class="mainContent"><RouterView></RouterView></div>
                </div>)
        };
    },
}

export { router, VueRoot }