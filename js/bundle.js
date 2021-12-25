/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc(){
    // Calculator
    const result = document.querySelector(".calculating__result span");

    let sex, height, weight, age, ratio;

    if (localStorage.getItem("sex")){//проверяем есть ли данные по 1 и 3 блокам в локал сторадж, если да, то подставляем их в калькулятор, если нет - дефолтные и сохраняем их в локалсторадж
        sex = localStorage.getItem("sex");
    }else{
        sex = "female";
        localStorage.setItem("sex", "female");
    }

    if (localStorage.getItem("ratio")){
        ratio = localStorage.getItem("ratio");
    }else{
        ratio = 1.375;
        localStorage.setItem("ratio", "1.375");
    }
    
    function setActiveClass (selector, activeClass){//устанавливаем класс активности на ту кнопку, кот сохранена в локально
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem =>{
            elem.classList.remove(activeClass);
            if (elem.getAttribute("id") === localStorage.getItem("sex")){
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")){
                elem.classList.add(activeClass);
            }
        });
    }
    setActiveClass("#gender div", "calculating__choose-item_active");//вызываем Ф для дивов из каждого блока отдельно
    setActiveClass(".calculating__choose_big div", "calculating__choose-item_active");
    
    function calcTotal () {
        if(!sex || !height || !weight || !age || !ratio){//проверяем все ли поля заполнены данными
            result.textContent = "_____";
            return;//не считаем дальше, если условие выполнилось
        }
       
        if (sex === "female"){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);//результат округляем до ближайшего целого числа
        }else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInfo (seletor, activeClass){
        const elements = document.querySelectorAll(`${seletor}`);

        elements.forEach((elem) => {
            elem.addEventListener("click", (event) => {
                if (event.target.getAttribute("data-ratio")){//если кнопка, на кот кликнули содержит дата аттрибут, то это последний блок, берем себе значение этого аттрибута
                    ratio = +event.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", +event.target.getAttribute("data-ratio"));
                }else{//если нет, то это первый блок и мы берем пол
                    sex = event.target.getAttribute("id");
                    localStorage.setItem("sex", event.target.getAttribute("id"));
                }

                elements.forEach(item => {//меняем при клике класс активности
                    item.classList.remove(activeClass);
                });                    
                event.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }
    getStaticInfo("#gender div", "calculating__choose-item_active");//вызываем Ф для дивов из каждого блока отдельно, класс активности одинаковый
    getStaticInfo(".calculating__choose_big div", "calculating__choose-item_active");

    function getDynamicInfo (field) {//Ф для каждого поля ввода
        const inputs = document.querySelectorAll(field);
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                if (input.value.match(/\D/g)){//добавляем проверку, чтобы подсветить поле, где неверно введена информация, т.е содержатся не цифры!
                    input.style.border = "1px solid red";
                }else{
                    input.style.border = "none";
                }

               switch(input.getAttribute("id")) {//проверяем значение id, в каждом кейсе присваиваем значение своей переменную
                    case "height": 
                    height = +input.value;
                    break;

                    case "weight": 
                    weight = +input.value;
                    break;

                    case "age": 
                    age = +input.value;
                    break;
                }
                calcTotal();//для динамического пересчета данных
            });          
        });
    }
    getDynamicInfo("#height");//вызываем Ф для каждого поля
    getDynamicInfo("#weight");
    getDynamicInfo("#age");

}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards(){
    //Используем классы для карточек

    class MenuCard {
        constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transform = 9; //задаем курс валют (статическое значение), В дальнейшем будет использоваться более сложный механизм, курс валюты будет подгружаться из стороннего источника
            this.convertToUHA(); //запускаем тут же Ф по конвертации валюты

        }

        convertToUHA() { //доп.функционал для конвертации цены, данной в долларах в гривны. 
            this.price = this.price * this.transform; //перезаписываем значение price
        }

        render() {
            const element = document.createElement("div");
            if (this.classes.length === 0) { //на случай, если разраб не добавил каких-л классов в ...classes
                this.classes.push("menu__item"); //в нашем случае эл-ту обязательно надо добавить "menu__item" класс, т.к именно в нем прописано поведение эл-в меню на странице, иначе верстка поплывет
            }
            this.classes.forEach(className => element.classList.add(className)); //перебираем все классы, указанные в качестве аргументов во вновьсозданных объектах и каждый присваеваем эл-ту, который вставляем на страницу
            element.innerHTML = `
                <img src=${this.img} alt=${this.altimg}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span></span>${this.price}грн/день</div>  
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not get data from ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource("http://localhost:3000/menu")
        .then(obj => {
            obj.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    //FORMS

    const forms = document.querySelectorAll("form");

    const message = {
        loading: "icons/spinner.svg", //путь к картинке
        success: "Спасибо, мы свяжемся с Вами в ближайшее время",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        bindPostForm(item);
    });

    const postForm = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }, //убрать, если formData
            /* body: dataBody,//вернуть, если formData */
            body: data,
        });

        return await res.json();
    };

    function bindPostForm(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement("afterend", statusMessage);

            const dataBody = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(dataBody.entries())); // JSON.stringify преобразует значение JavaScript в строку JSON

            postForm("http://localhost:3000/requests", json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(alert) {
        const previousModal = document.querySelector(".modal__dialog");

        previousModal.classList.add("hide");
        showModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times</div>
            <div class="modal__title">${alert}</div>
        </div>
        `;
        document.querySelector(".modal").append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            previousModal.classList.add("show");
            previousModal.classList.remove("hide");
            closeModal();
        }, 8000);
    }

    /* fetch("http://localhost:3000/menu")//шпора по fetch
        .then(data => data.json())
        .then(res => (console.log(res))) */
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal(){
    //Modal
    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal");

    function showModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerID); //отменить повторный вызов модельного окна по команде setInterval
    }

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener("click", showModal);
    });

    /* modalClose.addEventListener("click", closeModal);//удалили modalClose, убрали обработчик,тк после отправки формы появится динамически созданное окно с крестиком, на которое этот обработчик не будет срабатывать */
    modal.addEventListener("click", (e) => { //закрыть модальное окнопри нажатии вне области самого окна или на крестик, а область вокруг - это div.modal
        if (e.target == modal || e.target.getAttribute("data-close") == '') {
            closeModal();
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") { //закрыть модальное окнопри нажатии ESCAPE
            closeModal();
        }
    });

    const modalTimerID = setInterval(showModal, 50000); //показать модалку через 8 сек после того, как пользователь зашел на сайт
    function showModalByScroll() { //показать модалку, если пользователь докрутил до низа страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight /* - 1 */ ) { //если расстояние прокрученное от верха страницы (window.pageYOffset) + размер видимого окна клиента (docEl.clientHeight) >= всей доине док-та с учетом перемотки (docEl.scrollHeight)
            showModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider(){
    //SLIDER_difficult variant, but more up-to-date

    const slides = document.querySelectorAll(".offer__slide"),
        slider = document.querySelector(".offer__slider"),//весь эл-т, включая навигацию и номера
        next = document.querySelector(".offer__slider-next"),
        prev = document.querySelector(".offer__slider-prev"),
        current = document.querySelector("#current"),
        total = document.querySelector("#total"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width;//получить примененный к анному эл-ту стиль, а именно его ширину//650px
        
    let slideIndex = 1;//показываем по дефолту номер 1
    let offset = 0;//показываем по дефолту нулевой эл-т из псевдомассива

    slidesField.style.display = "flex";
    slidesField.style.width = 100 * slides.length + "%";//если 4 слайда, то ш=400% от своего родителя
    slidesField.style.transition = "0.5s all";
    slidesWrapper.style.overflow = "hidden";//скрыть то, что не помещается в видимое окно
    slides.forEach(slide => {
        slide.style.width = width;//убедиться, что размер новых картинок не будет превышать размер окна
    });
    slider.style.position = "relative";//для абсолютного позиционрования навигационных точек

    const indicators = document.createElement("ol"),//обертка для точек
        dots = [];//все вновь созданные точки добавляем в данный массив
    indicators.classList.add("carousel-indicators");//добавили еще один файл со стилями, в нем есть точки и обертка для них
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++){//создаем кол-во точек равное кол-ву слайдов
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);//устанавливаем дата аттрибут со значением i+1, кот будет равен slideIndex
        dot.classList.add("dot");
        indicators.append(dot);
        dots.push(dot);//добавляем эл-ты в ранее созданный массив, чтобы навесить класс активности
/*         if (i == 0){
            dot.style.opacity = "1";//по дефолту устанавливаем активной первую кнопку
        } */
    }

    function setSlideIndex () {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
        } else {
            total.textContent = slides.length;
        }

        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
    setSlideIndex();

    function acivateDot () {
        dots.forEach(dot => dot.style.opacity = ".5");//у всех 50% прозрачности
        dots[slideIndex - 1].style.opacity = "1";//100% цвета без прозрачности - показываем активную кнопку
    }
    acivateDot();

    function getDigits (str) {
        return +str.replace(/\D/g, "");//получаем цифры с помощью регулярного выражения вместо метода slice, чтобы оптимизировать код и исключить ошибки в будущем
    }

    next.addEventListener("click", () => {
        if (offset == getDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += getDigits(width);//увеличиваем размер отступа на размер слайда
        }
        slidesField.style.transform = `translateX(-${offset}px)`;//сдвигаем слайдер влево за счет уменьшения офсета в минус
            
        if (slideIndex == slides.length) {//если дошли до последнего в карусели
            slideIndex = 1;//переходим на первый
        } else {
            slideIndex++;
        }
   
        setSlideIndex();
        acivateDot();
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = getDigits(width) * (slides.length - 1);
        } else {
            offset -= getDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;//если в офсете получается отрицательное значение, то тут будет офсет увеличиваться, т.к минус на минус = +
    
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        
        setSlideIndex();
        acivateDot();
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", (event) => {
            const slideTo = event.target.getAttribute("data-slide-to");//получаем значение дата аттрибута 
            slideIndex = slideTo;

            offset = getDigits(width) * (slideTo - 1);//контролируем размер отступа за счет дата аттрибута присвоенного при формировании эл-та
            slidesField.style.transform = `translateX(-${offset}px)`;

            setSlideIndex();
            acivateDot();
        });
    });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    //TABS
    const tabContent = document.querySelectorAll('.tabcontent'),
        tabsWrapper = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item');

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) { //задаем параметр по умолчаю, тогда можно запустить функцию не передавая туда аргументов. i=0 значит, что при загрузке страницы будет активироваться первая вкладка
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');

        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsWrapper.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    //TIMER

    const deadline = 'December 31, 2021';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //общее кол-во мс делим на мс в сутках (8,64e+7), с пом Math.floor() округляем до ближайшего меньшего целого
            hours = Math.floor((t / (1000 * 60 * 60)) % 24), //оператор % - возвращает остаток от деления, например 5 % 2 = 1, то есть здесь мы общее кол-во мс делим на кол-во мс в часах (3,6e+6), получаем общее кол-во часов, далее получаем остаток от деления этого числа на 24, что составляет кол-во часов, кот не смогли составить полные сутки
            minutes = Math.floor((t / 1000 / 60) % 60), //общее кол-во мс делим на мс в минутах и получаем остаток от деления на 60 (минут в часах), т.е те минуты, которые не смогли составить полный час
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            days, //short syntax for 'days': days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = 0;
                hours.innerHTML = 0;
                minutes.innerHTML = 0;
                seconds.innerHTML = 0;
            }
        }
    }
    setClock('.timer ', deadline);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    tabs();
    modal();
    forms();
    slider();
    calc();
    cards();
    timer();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map