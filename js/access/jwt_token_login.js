const backend_base_url = "http://127.0.0.1:8000";
// const backend_base_url = "http://3.35.37.28:8000";
const frontend_base_url = "http://127.0.0.1:5500";

$(document).ready(function () {
    const payload = JSON.parse(localStorage.getItem("payload"));
    const exp = payload.exp;
    let curTime = Date.now() / 1000;

    if (curTime > exp) {
        return 
    } else if (payload != null) {
        window.location.replace(`${frontend_base_url}/search_article.html`);
    }
});
