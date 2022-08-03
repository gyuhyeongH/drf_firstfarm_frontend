// const backend_base_url = "http://127.0.0.1:8000";
const backend_base_url = "http://3.35.37.28:8000";
const frontend_base_url = "http://127.0.0.1:5500";

$(document).ready(function () {
    const payload = JSON.parse(localStorage.getItem("payload"));
    let curTime = Date.now() / 1000;
    const exp = payload.exp;
    const user_category = payload.category;

    if (payload == null) {
        alert("로그인 후 이용 가능합니다.")
        window.location.replace(`${frontend_base_url}/signin.html`);
    } else if (curTime > exp) {
        alert("토큰이 만료되었습니다. 재로그인 해주세요.")
        window.location.replace(`${frontend_base_url}/signin.html`);
    } else if (user_category != 1) {
        window.location.replace(`${frontend_base_url}/farmer.html`);
    }
});