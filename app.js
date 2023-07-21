intervalid = null;
function butt() {
    for (i = 0; i <= 60; i++) {
        $('.extra').append(`<button  class="a${i}" id="btn${i}">${i}</button>`)
        if (i % 2 == 0) {
            $(`#btn${i}`).css({ "position": "absolute" })
            $(`#btn${i}`).css({ "left": 30 * i - 30 })
            $(`#btn${i}`).css({ "margin-top": "0px" })
        }
        else {

            $(`#btn${i}`).css({ "position": "absolute" })
            $(`#btn${i}`).css({ "left": 30 * i - 30 })
            $(`#btn${i}`).css({ "margin-top": "500px" })

        }
    }


}
x = 0;
function deck() {

    if (x % 2 == 0) {
        margintopvalue =parseInt($(`#btn${x}`).css('margin-top'))
        if (margintopvalue == 0) {
            $(`#btn${x}`).animate({'margin-top': '500px'})

        }
        else {

            $(`#btn${x}`).animate({'margin-top':'0px'});
        }
    }
    else {
        margintopvalue = parseInt($(`#btn${x}`).css('margin-top'))
        if (margintopvalue == 500) {


            $(`#btn${x}`).animate({'margin-top':'0px'});


        }
        else {

            $(`#btn${x}`).animate({'margin-top': '500px'})
        }
    }
    x++;



    if (x > 60) {
        x = 0;
    }




}

setInterval(deck, 100)
function demo() {

    if (x % 2 !== 0) {
        margintopvalue = parseInt($(`#btn${x}`).css('margin-top'))
        if (margintopvalue == 0) {
            $(`#btn${x}`).css('margin-top', '500px')

        }
        else {

            $(`#btn${x}`).css('margin-top', 0)
        }
    }
    else {
        margintopvalue =parseInt($(`#btn${x}`).css('margin-top'))
        if (margintopvalue == 500) {


            $(`#btn${x}`).css('margin-top', '0px')


        }
        else {

            $(`#btn${x}`).css('margin-top', '500px')
        }
    }
    x++;



    if (x > 60) {
        x = 0;
    }








}
setInterval(demo ,100)