const payload = JSON.parse(localStorage.getItem("payload"));

$(document).ready(function () {
    if (payload == null) {
        $('#a_logout').hide();
        $('#a_mypage').hide();
    }
    else {
        $('#a_login').hide();
        $('#a_signup').hide();
        $('#a_logout').show();
        $('#a_mypage').show();
    }

<<<<<<< HEAD

});

async function handle_enter_mypage() {

=======
    if (payload != null) {
        if (payload.category == 1 ) {
            $('#a_article').show();
        }
        else {
            $('#a_article').hide();
        }
    }
    else {
        $('#a_article').hide();
    }
    
});

async function handle_enter_mypage() {
>>>>>>> c07346a2218a33f17bda29b7a94d15403f652778
    const payload = JSON.parse(localStorage.getItem("payload"));
    if (payload != null) {
        const user_category = payload.category;
        if (user_category == 1) {
            window.location.replace(`https://polite-paprenjak-e2afb5.netlify.app/farm.html`);
        } else {
            window.location.replace(`https://polite-paprenjak-e2afb5.netlify.app/farmer.html`);
        }
    } else {
<<<<<<< HEAD
        window.location.replace(`https://polite-paprenjak-e2afb5.netlify.app/farmer.html`);
=======
        $('#a_mypage').hide();
>>>>>>> c07346a2218a33f17bda29b7a94d15403f652778
    }
}