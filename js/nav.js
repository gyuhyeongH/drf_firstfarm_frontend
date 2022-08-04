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
    const payload = JSON.parse(localStorage.getItem("payload"));
    if (payload != null) {
        const user_category = payload.category;
        if (user_category == 1) {
            window.location.replace(`https://polite-paprenjak-e2afb5.netlify.app/farm.html`);
        } else {
            window.location.replace(`https://polite-paprenjak-e2afb5.netlify.app/farmer.html`);
        }
    } else {
        $('#a_mypage').hide();
    }
}