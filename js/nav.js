$(document).ready(function () {
    const payload = JSON.parse(localStorage.getItem("payload"));

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
});

async function handle_enter_mypage() {

    const payload = JSON.parse(localStorage.getItem("payload"));
    const user_category = payload.category;
    console.log(user_category)

    if (user_category == 1) {
        window.location.replace(`https://polite-paprenjak-e2afb5.netlify.app/farm.html`);
    } else {
        window.location.replace(`https://polite-paprenjak-e2afb5.netlify.app/farmer.html`);
    }
}