function doDate() {
    var str = "";
    var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var now = new Date();
    var h = now.getHours();
    if (h == 13) {
        h = 1;
    } else if (h == 14) {
        h = 2;
    } else if (h == 15) {
        h = 3;
    } else if (h == 16) {
        h = 4;
    } else if (h == 17) {
        h = 5;
    } else if (h == 18) {
        h = 6;
    } else if (h == 19) {
        h = 7;
    } else if (h == 20) {
        h = 8;
    } else if (h == 21) {
        h = 9;
    } else if (h == 22) {
        h = 10;
    } else if (h == 23) {
        h = 11;
    }
    str += days[now.getDay()] + "<br />" + months[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear() + "<br />" + h + ":" + now.getMinutes() + ":" + now.getSeconds();
    document.getElementById("date").innerHTML = str;
}

setInterval(doDate, 1000);