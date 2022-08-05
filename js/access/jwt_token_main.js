var payload = JSON.parse(localStorage.getItem("payload"));
var curTime = Date.now() / 1000;

$(document).ready(function () {
    if (payload == null) {
        alert("로그인 후 이용 가능합니다.")
        window.location.replace(`https://polite-paprenjak-e2afb5.netlify.app/signin.html`);
    } else {
        const exp = payload.exp;

        if (curTime > exp) {
            alert("토큰이 만료되었습니다. 재로그인 해주세요.")
            window.location.replace(`https://polite-paprenjak-e2afb5.netlify.app/signin.html`);
        }
    }
});

