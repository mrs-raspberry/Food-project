'use strict';
window.addEventListener('DOMContentLoaded', () => {
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
        }
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

    //Modal
    const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal");

    function showModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerID);//отменить повторный вызов модельного окна по команде setInterval
    }

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener("click", showModal)
    })

    /* modalClose.addEventListener("click", closeModal);//удалили modalClose, убрали обработчик,тк после отправки формы появится динамически созданное окно с крестиком, на которое этот обработчик не будет срабатывать */
    modal.addEventListener("click", (e) => { //закрыть модальное окнопри нажатии вне области самого окна или на крестик, а область вокруг - это div.modal
        if (e.target == modal || e.target.getAttribute("data-close") == '') {
            closeModal();
        }
    })
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") { //закрыть модальное окнопри нажатии ESCAPE
            closeModal();
        }
    })

    const modalTimerID = setInterval(showModal, 50000);//показать модалку через 8 сек после того, как пользователь зашел на сайт
    function showModalByScroll() {//показать модалку, если пользователь докрутил до низа страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight /* - 1 */) {//если расстояние прокрученное от верха страницы (window.pageYOffset) + размер видимого окна клиента (docEl.clientHeight) >= всей доине док-та с учетом перемотки (docEl.scrollHeight)
            showModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);

    //Используем классы для карточек

    class MenuCard {
        constructor(img, altimg, title, descr, price, parentSelector, ...classes){
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transform = 9;//задаем курс валют (статическое значение), В дальнейшем будет использоваться более сложный механизм, курс валюты будет подгружаться из стороннего источника
            this.convertToUHA ();//запускаем тут же Ф по конвертации валюты

        }

        convertToUHA (){//доп.функционал для конвертации цены, данной в долларах в гривны. 
            this.price = this.price * this.transform;//перезаписываем значение price
        }

        render (){
            const element = document.createElement("div");
            if(this.classes.length === 0){//на случай, если разраб не добавил каких-л классов в ...classes
                this.classes.push("menu__item");//в нашем случае эл-ту обязательно надо добавить "menu__item" класс, т.к именно в нем прописано поведение эл-в меню на странице, иначе верстка поплывет
            }
            this.classes.forEach(className => element.classList.add(className));//перебираем все классы, указанные в качестве аргументов во вновьсозданных объектах и каждый присваеваем эл-ту, который вставляем на страницу
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
        if(!res.ok){
            throw new Error(`Could not get data from ${url}, status: ${res.status}`)
        };

        return await res.json();
    };

    getResource("http://localhost:3000/menu")
    .then(obj => {
        obj.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
        });
    })

    //FORMS

    const forms = document.querySelectorAll("form");

    const message = {
        loading: "icons/spinner.svg",//путь к картинке
        success: "Спасибо, мы свяжемся с Вами в ближайшее время",
        failure: "Что-то пошло не так..."
    }

    forms.forEach(item => {
        bindPostForm(item);
    })

    const postForm = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },//убрать, если formData
            /* body: dataBody,//вернуть, если formData */
            body: data,
        });

        return await res.json();
    };

    function bindPostForm(form){
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

            const json = JSON.stringify(Object.fromEntries(dataBody.entries()));// JSON.stringify преобразует значение JavaScript в строку JSON

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
            })
        });
    }

    function showThanksModal (alert) {
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
    };

    fetch("http://localhost:3000/menu")
    .then(data => data.json())
    .then(res => (console.log(res)))//выведет все, что есть в db.json в меню карточках в виде массива


    //SLIDER

    const slides = document.querySelectorAll(".offer__slide"),
        next = document.querySelector(".offer__slider-next"),
        prev = document.querySelector(".offer__slider-prev"),
        current = document.querySelector("#current"),
        total = document.querySelector("#total");
    let slideIndex = 1;

    showSlide(slideIndex);

    function changeTotalCounter () {
        if (slides.length < 10) {
            total.innerHTML = `0${slides.length}`;
        }else{
            total.innerHTML = slides.length;
        }
    }
    changeTotalCounter();

    function showSlide (n) {
        if (n > slides.length){
            slideIndex = 1;
        }
        if (n < 1){
            slideIndex = slides.length;
        }
        slides.forEach((slide) => slide.style.display = "none");
        slides[slideIndex-1].style.display = "block";

        if (slideIndex < 10) {
            current.innerHTML = `0${slideIndex}`;
        }else{
            current.innerHTML = slideIndex;
        };

    }
    function slidePlus(n) {
        showSlide(slideIndex += n);
    }

    next.addEventListener("click", () => {
        console.log("right");
        slidePlus(1);
    })
    prev.addEventListener("click", () => {
        console.log("left");
        slidePlus(-1);
    })
    
});