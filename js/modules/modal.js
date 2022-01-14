function showModal(modalWindowSelector, modalTimerIDSelector) {
    const modal = document.querySelector(modalWindowSelector);

    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";

    if (modalTimerIDSelector) {
        clearInterval(modalTimerIDSelector);
        console.log(modalTimerIDSelector);
    } //отменить показ модалки setInterval, кот прописан в гл файле, если пользователь уже сам его открывал 
}

function closeModal(modalWindowSelector) {
    const modal = document.querySelector(modalWindowSelector);

    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

function modal(TriggerSelector, modalWindowSelector, modalTimerIDSelector) {
    //Modal
    const modalTrigger = document.querySelectorAll(TriggerSelector),
        modal = document.querySelector(modalWindowSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener("click", () => showModal(modalWindowSelector, modalTimerIDSelector));
    });

    /* modalClose.addEventListener("click", closeModal);//удалили modalClose, убрали обработчик,тк после отправки формы появится динамически созданное окно с крестиком, на которое этот обработчик не будет срабатывать */
    modal.addEventListener("click", (e) => { //закрыть модальное окнопри нажатии вне области самого окна или на крестик, а область вокруг - это div.modal
        if (e.target == modal || e.target.getAttribute("data-close") == '') {
            closeModal(modalWindowSelector);
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") { //закрыть модальное окнопри нажатии ESCAPE
            closeModal(modalWindowSelector);
        }
    });

    function showModalByScroll() { //показать модалку, если пользователь докрутил до низа страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight /* - 1 */ ) { //если расстояние прокрученное от верха страницы (window.pageYOffset) + размер видимого окна клиента (docEl.clientHeight) >= всей доине док-та с учетом перемотки (docEl.scrollHeight)
            showModal(modalWindowSelector, modalTimerIDSelector);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export {
    showModal
};
export {
    closeModal
};