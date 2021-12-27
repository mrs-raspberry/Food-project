import {showModal, closeModal} from "./modal";
import {postForm} from "../services/services";

function forms(formSelector, modalTimerIDSelector) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: "icons/spinner.svg", //путь к картинке
        success: "Спасибо, мы свяжемся с Вами в ближайшее время",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        bindPostForm(item);
    });

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
        showModal(".modal", modalTimerIDSelector);

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
            closeModal(".modal");
        }, 8000);
    }

    /* fetch("http://localhost:3000/menu")//шпора по fetch
        .then(data => data.json())
        .then(res => (console.log(res))) */
}

export default forms;