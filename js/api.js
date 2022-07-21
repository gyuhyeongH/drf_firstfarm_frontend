const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500";

var yy = document.querySelector("#yy");
var mm = document.querySelector("#mm");
var dd = document.querySelector("#dd");


async function handle_signup() {
  const signupData = {
    // 필수 사항
    username: document.getElementById("id").value,
    password: document.getElementById("pswd1").value,
    email: document.getElementById("email").value,
    user_category: 2,
    // 세부 사항
    userprofile: {
      fullname: document.getElementById("fullname").value,
      gender: document.getElementById("gender").value,
      birthday: (yy.value + "-" + mm.value + "-" + dd.value),
      age: document.getElementById("age").innerText,
      phone_number: document.getElementById("phone_number").value,
      location: document.getElementById("locations").value,
      introduction: document.getElementById("introduction").value,
      prefer: document.getElementById("prefer").value,
    }
  };

  const response = await fetch(`${backend_base_url}/user/`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(signupData),
  });

  response_json = await response.json();

  if (response.status == 200) {
    window.location.replace(`${frontend_base_url}/signin.html`);
    alert("회원가입이 정상적으로 완료되었습니다.")
  } else {
    alert(response.status);
  }
}


async function handle_signin() {
  console.log("handle_signin()");

  const signinData = {
    username: document.getElementById("id").value,
    password: document.getElementById("pswd1").value,
  };

  const response = await fetch(`${backend_base_url}/user/api/token/`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(signinData),
  });

  response_json = await response.json();
  console.log(response_json.access);

  if (response.status == 200) {
    localStorage.setItem("access", response_json.access);
    // #localstorage에 access란 변수에 담겨온 access값을 받아와서 저장

    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    localStorage.setItem("payload", jsonPayload);
    window.location.replace(`${frontend_base_url}/home.html`);
  } else {
    // alert(response.status);
    alert("아이디 또는 비밀번호를 잘못 입력했습니다.");
  }
}


async function handle_logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");
  alert("로그아웃 되었습니다.");
  window.location.replace(`${frontend_base_url}/signin.html`);
}
