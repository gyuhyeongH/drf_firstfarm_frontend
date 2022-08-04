// const backend_base_url = "http://127.0.0.1:8000";
// const backend_base_url = "http://3.35.37.28:8000";
// const frontend_base_url = "http://127.0.0.1:5500";

var payload = JSON.parse(localStorage.getItem("payload"));
var curTime = Date.now() / 1000;

window.onload = async function () {
    if (payload != null) {  
        const user_category = payload.category;
        if (user_category != 2) {
            window.location.replace(`${frontend_base_url}/farm.html`);
        }
    }
    else if (payload == null) {
        alert("로그인 후 이용 가능합니다.")
        window.location.replace(`${frontend_base_url}/signin.html`);
    }
    else {
        const exp = payload.exp;
        if (curTime > exp) {
            alert("토큰이 만료되었습니다. 재로그인 해주세요.")
            window.location.replace(`${frontend_base_url}/signin.html`);
        }
    }
};

// 로그아웃
async function handle_logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
    alert("로그아웃 되었습니다.");
    window.location.replace(`http://127.0.0.1:5500/signin.html`);
    // location.reload()
}