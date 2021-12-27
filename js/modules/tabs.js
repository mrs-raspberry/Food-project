function tabs(contentSelector, wrapperSelector, tabsHeader, activeClass) {
    const tabContent = document.querySelectorAll(contentSelector),
        tabsWrapper = document.querySelector(wrapperSelector),
        tabs = document.querySelectorAll(tabsHeader);

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) { //задаем параметр по умолчаю, тогда можно запустить функцию не передавая туда аргументов. i=0 значит, что при загрузке страницы будет активироваться первая вкладка
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');

        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsWrapper.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsHeader.slice(1))) {//slice нужен, чтобы убрать точку у селектора '.tabheader__item', кот передается сюда в кач-ве аргумента tabsHeader
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;