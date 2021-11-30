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
        modal = document.querySelector(".modal"),
        modalClose = document.querySelector("[data-close]");

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

    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { //закрыть модальное окнопри нажатии вне области самого окна (область вокруг - это div.modal)
        if (e.target == modal) {
            closeModal();
        }
    })
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") { //закрыть модальное окнопри нажатии ESCAPE
            closeModal();
        }
    })

    const modalTimerID = setInterval(showModal, 8000);//показать модалку через 8 сек после того, как пользователь зашел на сайт
    function showModalByScroll() {//показать модалку, если пользователь докрутил до низа страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight /* - 1 */) {//если расстояние прокрученное от верха страницы (window.pageYOffset) + размер видимого окна клиента (docEl.clientHeight) >= всей доине док-та с учетом перемотки (docEl.scrollHeight)
            showModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);

});