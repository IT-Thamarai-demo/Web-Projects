function chessboard() {

     evennumberisblack = false;

    for (i = 0; i <= 63; i++) {
        color = 'black';
        currentElement = i;
        reminder = currentElement % 2;

        if (evennumberisblack == true) {
            if (reminder == 0) {
                color = 'black';
            }
            else {
                color = 'white';
            }
        }
        else {
            if (reminder == 0) {
                color = 'white';
            }
            else {
                color = 'black';
            }
        }
        if (i == 7) {
            evennumberisblack = true;
        }
        if (i == 15) {
            evennumberisblack = false;
        }
        if (i == 23) {
            evennumberisblack = true;
        }
        if (i == 31) {
            evennumberisblack = false;
        }
        if (i == 39) {
            evennumberisblack = true;
        }
        if (i == 47) {
            evennumberisblack = false;
        }
        if (i == 55) {
            evennumberisblack = true;
        }


        $('.board').append(`<button style="background-color:${color}">${currentElement}</button> `)

        if (i == 7) {
            $(".board").append(`<br>`);
        }
        if (i == 15) {
            $(".board").append(`<br>`);
        }
        if (i == 23) {
            $(".board").append(`<br>`);
        }
        if (i == 31) {
            $(".board").append(`<br>`);
        }
        if (i == 39) {
            $(".board").append(`<br>`);
        }
        if (i == 47) {
            $(".board").append(`<br>`);
        }
        if (i == 55) {
            $(".board").append(`<br>`);
        }

    }
}