console.log('working')

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBHLLHSID8XnKBEARSlZ2xsp9kHrNXjRgo",
    authDomain: "onedayoff-2291e.firebaseapp.com",
    databaseURL: "https://onedayoff-2291e.firebaseio.com",
    projectId: "onedayoff-2291e",
    storageBucket: "onedayoff-2291e.appspot.com",
    messagingSenderId: "1096725822270"
};
firebase.initializeApp(config);
const db = firebase.firestore()
const database = firebase.database()

var user = firebase.auth().currentUser

var yourDaysOff = $('#yourDaysOff'),
    favDaysOff = $('#favDaysOff');




firebase.auth().onAuthStateChanged(user => {
    if(user) {
        console.log(user.email)

        db.collection('users').doc(user.email).collection('keys').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let find = doc.data()
                console.log(find.key)

                db.collection('plans').doc(find.key).get().then(function(plans) {
                    
                    $.each(plans.data(), function(key, value){
                    let plan = value
                    console.log(plan)

                    $('<div>')
                        .attr('class', 'card ml-1 d-inline float-left self-made-card')
                        .attr('style', 'width: 130px; height: 250px;')
                        .attr('id', find.key)
                        .appendTo($('#yourDaysOff'))
                    $('<img>')
                        .attr('class', 'card-img-top img-fluid')
                        .attr('style', "height: 130px; width: 150px;")
                        .attr('src', plan[2].img)
                        .appendTo($('#' + find.key))
                    $('<div>')
                        .attr('class', 'card-body')
                        .attr('id', 'body-' + find.key)
                        .appendTo($('#' + find.key))
                    $('<h5>')
                        .attr('class', 'card-title')
                        .attr('style', "font-size: 16px;")
                        .text(plan[0])
                        .appendTo($('#body-' + find.key))
                    $('<p>')
                        .attr('class', 'card-text text-muted')
                        .attr('style', "font-size: 12px;")
                        .text('more info..')
                        .attr('data-key', find.key)
                        .appendTo($('#body-' + find.key))

                        yourDaysOff.on('click', 'p', function() {
                            console.log('working')
                            console.log($(this).attr('data-key'))
                            
                            
                
                        })
                    })
                })
            })    
        })

        console.log(user.email)

        db.collection('users').doc(user.email).collection('favs').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let find = doc.data()
                console.log(find.key)

                db.collection('plans').doc(find.key).get().then(function(plans) {
                    
                    $.each(plans.data(), function(key, value){
                    let plan = value
                    console.log(plan)

                    $('<div>')
                        .attr('class', 'card ml-1 d-inline float-left self-made-card')
                        .attr('style', 'width: 130px; height: 250px;')
                        .attr('id', find.key)
                        .appendTo($('#favDaysOff'))
                    $('<img>')
                        .attr('class', 'card-img-top img-fluid')
                        .attr('style', "height: 130px; width: 150px;")
                        .attr('src', plan[2].img)
                        .appendTo($('#' + find.key))
                    $('<div>')
                        .attr('class', 'card-body')
                        .attr('id', 'body-' + find.key)
                        .appendTo($('#' + find.key))
                    $('<h5>')
                        .attr('class', 'card-title')
                        .attr('style', "font-size: 16px;")
                        .text(plan[0])
                        .appendTo($('#body-' + find.key))
                    $('<p>')
                        .attr('class', 'card-text text-muted')
                        .attr('style', "font-size: 12px;")
                        .text('more info..')
                        .attr('data-key', find.key)
                        .appendTo($('#body-' + find.key))

                        yourDaysOff.on('click', 'p', function() {
                            console.log('working')
                            console.log($(this).attr('data-key'))                                 
                
                        })
                    })
                })
            })    
        })
        
    }else{
        console.log('not logged in')
    }
})

yourDaysOff.on('click', 'p', function() {
        $('.location').remove()
        $('.address').remove()
        $('#planDesc').empty()
        $('#planTitle').empty()


    console.log('working')
    console.log($(this).attr('data-key'))                    

    db.collection('plans').doc($(this).attr('data-key')).get().then(function(plans) { 
        $.each(plans.data(), function(key, value){ 
            let plan = value
            $('#moreDetailModal').modal('show')
            $('#planTitle').html(plan[0])
            $('#planDesc').html(plan[1])
            console.log(plan)
            
            
            for(let i=2; i < value.length; i++) {
            $('<div>')
                .attr('class', 'location')
                // .attr()
                .text(plan[i].name)
                .appendTo($('#moreDetailBody'))
            $('<div>')
                .attr('class', 'address text-muted m-2')
                .html(plan[i].address)
                .appendTo($('#moreDetailBody'))

            }   
        })
    })
})    