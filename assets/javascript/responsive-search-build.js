// //on click
// if ($(window).width() < 760) {
//     $('#sidebar').toggle('slow', 'swing', function () {
//         setTimeout(function () {
//             $('#sidebar').toggle('slow', 'swing')
//         }, 1000)
//     })
// }



$(window).resize(function() {
        //on click
    if ($(window).width() < 760) {
        resultsDiv.one('click', '#save', function () {
            console.log('size')
            $('#sidebar').toggle('slow', 'swing', function () {
                setTimeout(function () {
                    $('#sidebar').toggle('slow', 'swing')
                }, 2000)
            })
        })
    }
})

    // } else {
    //     // // otherwise remove it
    //     // obj.removeClass('fixed');

    // }



function stickTop() {
    let obj = $('.sidebar');
    let top = obj.offset().top - parseFloat(obj.css('marginTop').replace(/auto/, 0));

    // $('#sidebar').removeClass('sidebar')
    obj.addClass('sidebar-responsive')
    obj.removeClass('pr-4')

    $(window).scroll(function (event) {
        // what the y position of the scroll is
        var y = $(this).scrollTop();

        // whether that's below the form
        if (y >= top) {
            // if so, ad the fixed class
            obj.addClass('fixed');
        } else {
            // otherwise remove it
            obj.removeClass('fixed');

        }

    });
}
