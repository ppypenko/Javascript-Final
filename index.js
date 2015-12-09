$(document).ready(function () {
    // animate example
    $("#content1").on("click", function () {
        $(this).animate({
            backgroundColor: "#40A",
            width: 500,
            height: 100
        }, 1000);
    });

    // slider example
    $("#slider").slider({
        min: 0,
        max: 255,
        value: 50,
        slide: function (event, ui) {
            console.log(ui.value);
            $("#content2").css({
                width: ui.value,
                height: ui.value
            });
        }
    });

    // accordion example
    $("#content3").accordion();

    // datepicker example
    $("#content4").datepicker();

    // draggable example
    $("#content5").draggable();

    $("#content6").on("click", function () {
        $(this).hide("explode", {
            pieces: 128
        }, 2000);
    });
});