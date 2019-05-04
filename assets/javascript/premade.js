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

let plansForThisCity = []
let where = sessionStorage['premadeCity']

$('#searchButton').on('click', function() {
    event.preventDefault()
    if ($('#search').val() != "") {
        $('#premadeDiv').empty()
        sessionStorage['premadeCity'] = $('#search').val()
        searchPremade()
    }

})

let image = '',
    title = '',
    description = ''

searchPremade()
function searchPremade() {
    // go into database and grab all plans from selected city
    db.collection('plans').get().then( snapshot => {
        snapshot.docs.forEach( doc => {
            let obj = doc.data()
            let city = obj.plan[2].location
            // console.log('doc id: ' + doc.id)
            
            if (city.toLowerCase() === where.toLowerCase()) {
                let key = doc.id
                let newObj = {...obj.plan}
                plansForThisCity.push(newObj)

                for (let i = 2; i < obj.plan.length; i++) {
                    image = obj.plan[i].img
                    title = obj.plan[0]
                    description = obj.plan[1]
                }

                 // add to premade plans page
                let column = $('<div>')
                                .attr('class', 'mr-auto ml-auto')
                                .appendTo('#premadeDiv')
                let card = $('<div>').
                                attr('class', 'card pre-made-card mb-3 mt-3')
                                .attr('style', 'width: 200px')
                                .appendTo(column)
                let img = $('<img>')
                                .attr('src', image)
                                .attr('style', 'height: 200px; width: 200px')
                                .attr('class', 'card-img-top day-off-image')
                                .appendTo(card)
                let cardTitle = $('<h5>')
                                .attr('class', 'card-text mt-2 mx-auto')
                                .attr('style', "font-size: 16px;")
                                .text(title).appendTo(card)
                let cardDescription = $('<p>')
                                .attr('class', 'card-text')
                                .text(description)
                                .appendTo(card)
                let cardMoreInfo = $('<p>')
                                .attr('class', 'card-text text-muted mx-auto mb-2')
                                .text('More info')
                                .attr('id', 'more-info')
                                .attr('style', 'cursor:pointer;')
                                .attr('data-key', key)
                                .appendTo(card)
    }
        })
    })

    var savekey;
    var plan;

    // more info modal
    $(document).on('click', '#more-info', function() {
        $('#moreDetailBody').empty()
        savekey = $(this).attr('data-key')
        db.collection('plans').doc(savekey).get().then(function(plans) { 
            $.each(plans.data(), function(key, value){ 
                plan = value
                $('#moreDetailModal').modal('show')
                $('#planTitle').html(plan[0])
                $('#planDesc').html(plan[1])
                
                
                for(let i=2; i < value.length; i++) {
                $('<div>')
                    .attr('class', 'location')
                    // .attr()
                    .text(plan[i].name)
                    .appendTo($('#moreDetailBody'))
                $('<div>')
                    .attr('class', 'address text-muted')
                    .html(plan[i].address)
                    .appendTo($('#moreDetailBody'))

    
                } 
                $('<button>')
                .attr('class', 'btn btn-primary')
                .text('save')
                .attr('id','savebutton')
                .attr('data-thiskey', savekey)
                .appendTo($('#moreDetailBody'))  
            })
        })
    })
}

    $('#moreDetailModal').on('click', '#savebutton', function () {
    console.log('working')
    savekey = $(this).attr('data-thiskey')
    // push to database
    let userOn = firebase.auth().currentUser
    let email;

    if (userOn) { // if the user is signed in
            email = userOn.email // grab email for users name

            db.collection('users').doc(email).collection('favs').add({ // save key to user
                key: savekey
            })
        } else { 
            console.log('no')
            $('#logInModal').modal('show') // if not logged in, pull up login modal
        }
    }) 


//====== login ========


//Get elements
const emailTxt = $('#emailTxt')
const passTxt = $('#passTxt')
const btnLogin = $('#btnLogin')
const btnSignUp = $('#btnSignUp')
const btnLogOut = $('#btnLogOut')
const database = firebase.database()

//add login event
btnLogin.on('click', e => {
    const user = emailTxt.val()
    const pass = passTxt.val()
    const auth = firebase.auth();
    // sign in
    const promise = auth.signInWithEmailAndPassword(user, pass);
    promise.catch(e => console.log(e.message))

})
// sign up
btnSignUp.on('click', e => {
    const user = emailTxt.val()
    const pass = passTxt.val()
    const auth = firebase.auth();
    // sign in
    const promise = auth.createUserWithEmailAndPassword(user, pass);
    promise.catch(e => $('.error').text(e.message))
})
//log out
$('#nav').on('click', '#btnLogOut', e => {
    firebase.auth().signOut();
})

$('#nav').on('click', '#btnProfile', e => {
    location.href = "profile.html"
})

$('#nav').on('click', '#btnLoginModal', e => {
    $('#logInModal').modal('show')
})

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser)
        $('#logInModal').modal('hide')
        $('#btnLoginModal').remove()
        $('<button>')
            .attr('class', 'btn btn-link m-2 font-weight-bold')
            .attr('id', 'btnProfile')
            .text('profile')
            .appendTo($('#navBtn'))

        $('<button>')
            .attr('class', 'btn btn-link font-weight-bold')
            .attr('id', 'btnLogOut')
            .text('logout')
            .appendTo($('#navBtn'))

    } else {
        console.log('not logged in')
        $('#btnLogOut').remove()
        $('#btnProfile').remove()
        $('<button>')
            .attr('class', 'btn btn-link font-weight-bold')
            .attr('id', 'btnLoginModal')
            .attr('data-toggle', 'modal')
            .attr('data-target', $('#logInModal'))
            .text('login')
            .appendTo($('#navBtn'))

    }
})
