<script setup>
import {sortDishes, dishType, menuPrice} from "../utilities.js";

const props = defineProps(["number", "dishes"]);
const emit = defineEmits(["numberChange", "selectDish", "removeDish"]);

function buttonMinusHandlerACB() { emit("numberChange", props.number - 1); }
function buttonPlusHandlerACB() { emit("numberChange", props.number + 1); }
function selectDishHandlerACB(dish) { emit("selectDish", dish); }
function removeDishHandlerACB(dish) { emit("removeDish", dish); }
</script>

<template>
    <div>
        <button @click="buttonMinusHandlerACB" v-bind:disabled="props.number <= 1">-</button>{{props.number}}<button @click="buttonPlusHandlerACB">+</button>

        <table>
            <tbody>
                <tr v-for="d in sortDishes(props.dishes)" v-bind:key="d.id">
                    <td>
                        <button @click="removeDishHandlerACB(d)">x</button>
                    </td>
                    <td>
                        <a href="#/details" @click="selectDishHandlerACB(d)">{{d.title}}</a>
                    </td>
                    <td>
                        {{ dishType(d) }}
                    </td>
                    <td class="align">
                        {{(d.pricePerServing*props.number).toFixed(2)}}
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>Total:</td>
                    <td></td>
                    <td class="align">{{(menuPrice(props.dishes)*props.number).toFixed(2)}}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<!-- <style>
h1 {text-align: right;}
</style> -->
