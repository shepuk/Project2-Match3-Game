/*jslint browser: true*/

let timer = setInterval(updateTimer, 1000);
let countdown = 5;

function updateTimer() {
    countdown = countdown - 1;
    if (countdown >= 0) {
        $(".countdown").html(countdown);
    } else {
        $(".countdown").html("0");
        window.location.replace("https://shepuk.github.io/Project2-Match3-Game/index.html");
    }
}