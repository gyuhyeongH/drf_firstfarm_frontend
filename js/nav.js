
$(document).ready(function () {
    const payload = JSON.parse(localStorage.getItem("payload"));
    $('#a_article').hide();
    if (payload == null) {
        $('#a_logout').hide();
        $('#a_mypage').hide();
    }
    else {
        $('#a_login').hide();
        $('#a_signup').hide();
        $('#a_logout').show();
        $('#a_mypage').show();
        if (payload.category == 1) {
            $('#a_article').show();
        }
    }
});

async function handle_enter_mypage() {
    const payload = JSON.parse(localStorage.getItem("payload"));
    if (payload != null) {
        if (payload.category == 1) {
            window.location.replace(`https://hwisu.shop/farm.html`);
        } else {
            window.location.replace(`https://hwisu.shop/farmer.html`);
        }
    }
}

window.onload = () => {
    const payload = JSON.parse(localStorage.getItem("payload"));
    if (payload) {
        if (payload.exp > (Date.now() / 1000)) {
            // 아직 access 토큰의 인가 유효시간이 남은 경우
        } else {
            // 인증 시간이 지났기 때문에 다시 refreshToken으로 다시 요청을 해야 한다.
            const requestRefreshToken = async (url) => {
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "refresh": localStorage.getItem("refresh")
                    })
                }
                );
                return response.json();
            };

            // 다시 인증 받은 accessToken을 localStorage에 저장하자.
            requestRefreshToken(`https://rbgud.shop/user/api/token/refresh/`).then((data) => {
                // 새롭게 발급 받은 accessToken을 localStorage에 저장
                const accessToken = data.access;
                const refreshToken = data.refresh;
                localStorage.setItem("access", accessToken);

                const base64Url = data.access.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                localStorage.setItem("payload", jsonPayload);
                localStorage.setItem("refresh", refreshToken);
            });
        }
    } else {
    };
};

// 로그아웃
async function handle_logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
    alert("로그아웃 되었습니다.");
    window.location.replace(`https://hwisu.shop/index.html`);
}