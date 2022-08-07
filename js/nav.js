
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
    if (payload != null) {
        const user_category = payload.category;
        if (user_category == 1) {
            window.location.replace(`https://polite-paprenjak-e2afb5.netlify.app/farm.html`);
        } else {
            window.location.replace(`https://polite-paprenjak-e2afb5.netlify.app/farmer.html`);
        }
    }
}

window.onload = () => {
    const payload = JSON.parse(localStorage.getItem("payload"));

    // 여기에 try 를 넣으면 어떠한가?
    try {
        // 아직 access 토큰의 인가 유효시간이 남은 경우
        if (payload.exp > (Date.now() / 1000)) {
        } else {
            // 인증 시간이 지났기 때문에 다시 refreshToken으로 다시 요청을 해야 한다.
            const requestRefreshToken = async (url) => {
                console.log(url)
                console.log(payload.refresh)
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "refresh": localStorage.getItem("refresh_token")
                    })
                }
                );
                return response.json();
            };


            // 다시 인증 받은 accessToken을 localStorage에 저장하자.
            requestRefreshToken(`${backend_base_url}/user/api/token/refresh/`).then((data) => {
                // 새롭게 발급 받은 accessToken을 localStorage에 저장
                const accessToken = data.access;
                const refreshToken = data.refresh;
                localStorage.setItem("access_token", accessToken);

                const base64Url = data.access.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                localStorage.setItem("payload", jsonPayload);
                localStorage.setItem("refresh_token", refreshToken);
                console.log("성공!! : " + accessToken);
            });
            }
    }
    catch {
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