const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500";

var yy = document.querySelector("#yy");
var mm = document.querySelector("#mm");
var dd = document.querySelector("#dd");

console.log(yy);
console.log(mm);
console.log(dd);

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
    alert("정상 회원가입 되었습니다.")
  } else {
    alert(response.status);
  }
}

async function handle_signin() {
  console.log("handle login");

  const loginData = {
    username: document.getElementById("nameinput").value,
    password: document.getElementById("pwinput").value,
  };

  const response = await fetch(`${backend_base_url}/user/api/token/`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(loginData),
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

    // #jwt사이트에서 바꿔주는 것처럼 우리가 토큰값을 알기 쉽게 꺼내올 수 있도록 하는 로직

    localStorage.setItem("payload", jsonPayload);
    // #위에서 받아온 payload를 다시 로컬스토리지에 payload라는 이름으로 저장한다.
    window.location.replace(`${frontend_base_url}/index.html`);
  } else {
    alert(response.status);
  }
}

async function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");
  alert("로그아웃되었습니다.");
  window.location.replace(`${frontend_base_url}/login.html`);
}

async function gomypage() {
  window.location.replace(`${frontend_base_url}/mypage.html`);
}

async function run() {
  document.getElementById("srt").value =
    document.getElementById("drop-down").value;
  // const test = document.getElementById("srt").value
  // console.log(test)
}
