function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),//весь эл-т, включая навигацию и номера
        next = document.querySelector(nextArrow),
        prev = document.querySelector(prevArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;//получить примененный к данному эл-ту стиль, а именно его ширину//650px
        
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

export default slider;