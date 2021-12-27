function timer(id, deadline) {
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
    setClock(id, deadline);
}

export default timer;