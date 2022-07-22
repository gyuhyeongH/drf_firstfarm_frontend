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


function sample4_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var roadAddr = data.roadAddress; // 도로명 주소 변수
      var extraRoadAddr = ''; // 참고 항목 변수
      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraRoadAddr !== '') {
        extraRoadAddr = ' (' + extraRoadAddr + ')';
      }
      // 도로명 주소 정보를 해당 필드에 넣는다.
      document.getElementById("sample4_roadAddress").value = roadAddr;
      roadAddr.innerHTML = document.querySelector("#sample4_roadAddress");;
    }
  }).open();
}
