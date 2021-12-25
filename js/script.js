window.addEventListener('DOMContentLoaded', () => {
    const tabs = require("./modules/tabs"),
          modal = require("./modules/modal"),
          forms = require("./modules/forms"),
          slider = require("./modules/slider"),
          calc = require("./modules/calc"),
          cards = require("./modules/cards"),
          timer = require("./modules/timer");

    tabs();
    modal();
    forms();
    slider();
    calc();
    cards();
    timer();
});