$(window).load(function () {
    $("#section").removeClass("active");
    $("#cj-scattered").removeClass("cj-scattered");
    var canvas = document.getElementById('cj-loader');
    var context = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 0;
    var innerRadius = 0;
    var gradient;
    var strokeOpacity = 1;
    var fillOpacity = 0.5;
    var fps = 30;
    var now;
    var then = Date.now();
    var interval = 1000 / fps;
    var delta;
    var incrementer = 0.01;
    var whiteR = 255;
    var whiteG = 255;
    var whiteB = 255;
    var dotRadius = 2.5;
    var isPaused = false;
    $("#cj-loader").fadeOut("slow", function () {
        var isPaused = false;
        $(".loader").fadeOut("slow", function () {
            $("#section").addClass("active");
            $("#cj-scattered").addClass("cj-scattered");
            $("#cj-loader").appendTo(".cj-wrapper");
        });
    });
})