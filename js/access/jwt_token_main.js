<<<<<<< HEAD
const backend_base_url = "https://rbgud.shop";
// const backend_base_url = "http://3.35.37.28:8000";
const frontend_base_url = "https://polite-paprenjak-e2afb5.netlify.app";
=======
// const backend_base_url = "http://127.0.0.1:8000";
// const backend_base_url = "http://3.35.37.28:8000";
// const frontend_base_url = "http://127.0.0.1:5500";
>>>>>>> a2c1a64cc451c20be8ffc37278784ae68e7faaa1


var payload = JSON.parse(localStorage.getItem("payload"));
var curTime = Date.now() / 1000;

$(document).ready(function () {
    if (payload == null) {
        alert("로그인 후 이용 가능합니다.")
        location.replace(`http://127.0.0.1:5500/signin.html`);
    } else {
        const exp = payload.exp;

        if (curTime > exp) {
            alert("토큰이 만료되었습니다. 재로그인 해주세요.")
            window.location.replace(`http://127.0.0.1:5500/signin.html`);
        }
    }
});

