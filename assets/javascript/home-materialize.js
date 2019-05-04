$(document).ready(function () {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $('.sidenav').sidenav();
    $("#myModal").modal();
    $('#demo-carousel-auto').carousel();
    setInterval(function () {
        $('#demo-carousel-auto').carousel('next');
    }, 2500);

})