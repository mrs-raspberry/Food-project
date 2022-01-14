import {getResource} from "../services/services";

function cards(){
    class MenuCard {
        constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transform = 75; //задаем курс валют (статическое значение), В дальнейшем будет использоваться более сложный механизм, курс валюты будет подгружаться из стороннего источника
            this.convertToUHA(); //запускаем тут же Ф по конвертации валюты

        }

        convertToUHA() { //доп.функционал для конвертации цены, данной в долларах в гривны. 
            return this.price = this.price * this.transform; //перезаписываем значение price
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
                    <div class="menu__item-total"><span></span>${this.price}руб/день</div>  
            `;
            this.parent.append(element);
        }
    }

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

export default cards;