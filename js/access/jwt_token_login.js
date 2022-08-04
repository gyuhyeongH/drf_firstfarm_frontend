$(document).ready(function () {
    const payload = JSON.parse(localStorage.getItem("payload"));
    const exp = payload.exp;
    let curTime = Date.now() / 1000;

    if (curTime > exp) {
        return
    } else if (payload != null) {
        window.location.replace(`https://polite-paprenjak-e2afb5.netlify.app/search_article.html`);
    }
});
