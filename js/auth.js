const backend_base_url = "https://rbgud.shop";
const frontend_base_url = "https://hwisu.shop";

// 카테고리 토글
var category_btn = document.getElementsByClassName("category_btn");
var user_category_value = document.getElementById("category_value")

// 회원가입
async function handle_signup() {
  const username = document.getElementById("id").value
  const password = document.getElementById("pswd1").value
  const email = document.getElementById("email").value

  const yy = document.querySelector("#yy");
  const mm = document.querySelector("#mm");
  const dd = document.querySelector("#dd");

  const input_img = document.getElementById("input_img").files[0]

  const signupData = new FormData();

  if (input_img !== undefined) {
    signupData.append('img', input_img);
  }

  const userprofile = JSON.stringify({
    'fullname': document.getElementById("fullname").value,
    'gender': document.getElementById("gender").value,
    'birthday': (yy.value + "-" + mm.value + "-" + dd.value),
    'age': document.getElementById("age").innerText,
    'phone_number': document.getElementById("phone_number").value,
    'location': document.getElementById("locations").innerText,
    'introduction': document.getElementById("introduction").value,
    'prefer': document.getElementById("prefer").value,
  })

  signupData.append('username', username);
  signupData.append('password', password);
  signupData.append('email', email);
  signupData.append('user_category', user_category_value);
  signupData.append('userprofile', userprofile);
  signupData.append('img', input_img);

  const response = await fetch(`${backend_base_url}/user/`, {
    headers: {
      Accept: "application/json",
    },
    method: "POST",
    body: signupData,
  });

  response_json = await response.json();

  if (response.status == 200) {
    window.location.replace(`${frontend_base_url}/signin.html`);
    alert("회원가입이 정상적으로 완료되었습니다.")
  }
  else if (response_json['username']) {
    alert("사용중인 아이디 입니다.\n 다시 확인해주세요.")
  }
  else if (response_json['email']) {
    alert("사용중인 이메일이거나 이메일 형식이 맞지 않습니다.\n 다시 확인해주세요.")
  }
  else if (response_json['userprofile']) {
    alert("세부사항에 입력되지 않거나 잘못된 정보입니다.\n 다시 확인해주세요.")
  }
  else if (response.status == 400) {
    alert("필수 항목을 입력해주세요.");

  }
}


$('.int').keyup('keyup', function (event) {
  if (event.keyCode === 13) {
    $('#btnJoin').click();
  }

});

// 로그인
async function handle_signin() {
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

  if (response.status == 200) {
    localStorage.setItem("access", response_json.access)
    localStorage.setItem("refresh", response_json.refresh)

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);

    location.reload();
    alert("로그인 완료!")
    localStorage.setItem("payload", jsonPayload);
    window.location.replace(`${frontend_base_url}/index.html`);
  } else {
    alert("아이디 또는 비밀번호를 확인해주세요.");
  }
}
