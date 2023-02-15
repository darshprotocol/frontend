const Countdown = {
    start: function (to, callback) {
        let fnc = function () {
            let from = Date.now()
            let distance = to - from

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            let text = `${days}d : ${hours}h : ${minutes}min`;
            callback(text)

            if (distance < 0) {
                let text = `0d : 0h : 0min`;
                callback(text)
                clearInterval(interval);
            }
        }
        let interval = setInterval(fnc, 10000)
        fnc()
    },
}

export default Countdown