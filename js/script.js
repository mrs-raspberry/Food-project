import tabs from "./modules/tabs";
import modal from "./modules/modal";
import forms from "./modules/forms";
import slider from "./modules/slider";
import calc from "./modules/calc";
import cards from "./modules/cards";
import timer from "./modules/timer";
import {showModal} from "./modules/modal";

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerID = setInterval(() => showModal(".modal", modalTimerID), 15000); //показать модалку через 15 сек после того, как пользователь зашел на сайт
    tabs('.tabcontent', '.tabheader__items', '.tabheader__item', "tabheader__item_active");
    modal("[data-modal]", ".modal", "modalTimerID");
    forms("form", "modalTimerID");
    slider({
        slide: ".offer__slide",
        container: ".offer__slider",//весь эл-т, включая навигацию и номера
        nextArrow: ".offer__slider-next",
        prevArrow: ".offer__slider-prev",
        currentCounter: "#current",
        totalCounter: "#total",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner",
    });
    calc();
    cards();
    timer('.timer', '2021-12-31');
});