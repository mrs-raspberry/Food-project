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

export default calc;