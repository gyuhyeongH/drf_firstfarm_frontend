const backend_base_url = "http://3.35.37.28:8000/";
const frontend_base_url = "https://rbgud.shop";



// 카테고리 토글
var category_btn = document.getElementsByClassName("category_btn");
var user_category_value = document.getElementById("category_value")

// 회원가입
async function handle_signup() {
  const username = document.getElementById("id").value
  const password = document.getElementById("pswd1").value
  const email = document.getElementById("email").value
  // const user_category_value = document.getElementById("category_value").value

  const yy = document.querySelector("#yy");
  const mm = document.querySelector("#mm");
  const dd = document.querySelector("#dd");

  const input_img = document.getElementById("input_img").files[0]

  const signupData = new FormData();

  if (input_img !== undefined) {
    console.log(input_img)
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
    alert("사용중인 전화번호 입니다.\n 다시 확인해주세요.")
  }
  else if (response.status == 400) {
    alert("필수 항목을 입력해주세요.");
    console.log(response_json)
  }
}


// 로그인
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
    window.location.replace(`${frontend_base_url}/search_article.html`);
  } else {
    // alert(response.status);
    alert("아이디 또는 비밀번호를 확인해주세요.");
  }
}


// nav 로그아웃 활성화/비활성화
window.onload = async function checkLogin() {
  var payload = localStorage.getItem("payload")
  var parsed_payload = await JSON.parse(payload)

  const username = document.getElementById("username")
  const loginoutButton = document.getElementById("loginout")

  if (parsed_payload) {
    username.innerText = parsed_payload.fullname
    loginoutButton.innerText = "로그아웃"
    loginoutButton.setAttribute("onclick", "handle_logout()")
  }
  else {
    console.log(loginoutButton)
    username.innerText = "로그인해주세요"
    loginoutButton.innerText = "로그인"
    loginoutButton.setAttribute("onclick", "location.href='/signin.html'")
  }
}


// 로그아웃
async function handle_logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");
  alert("로그아웃 되었습니다.");
  // window.location.replace(`${frontend_base_url}/signin.html`);
  location.reload()
}


// 지역 주소 지정
function serch_loaction() {
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
      // document.getElementById("locations").value = roadAddr;

      var location_result = document.querySelector("#locations");
      location_result.innerHTML = roadAddr;
    }
  }).open();
}

// 프로필 이미지 업로드
function getImageFiles(e) {
  const uploadFiles = [];
  const files = e.currentTarget.files;
  const imagePreview = document.querySelector('.box_img');
  const docFrag = new DocumentFragment();

  // console.log(files)

  if ([...files].length >= 2) {
    alert('이미지는 1개만 업로드가 가능합니다.');
    return;
  }

  // 파일 타입 검사
  [...files].forEach(file => {
    if (!file.type.match("image/.*")) {
      alert('이미지 파일만 업로드가 가능합니다.');
      return
    }

    // 파일 갯수 검사
    if ([...files].length < 2) {
      uploadFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = createElement(e, file);
        imagePreview.appendChild(preview);
      };
      reader.readAsDataURL(file);
    }
  });
}

function createElement(e, file) {
  var new_img = document.querySelector('#default_img');
  new_img.setAttribute('src', e.target.result);
  new_img.setAttribute('data-file', file.name);

  // console.log(new_img)

  return new_img;
}

const realUpload = document.querySelector('.img_find');
const upload = document.querySelector('.upload');

upload.addEventListener('click', () => realUpload.click());
realUpload.addEventListener('change', getImageFiles);


// 카테고리 토글
function handleClick(event) {
  user_category_value = event.target.value;

  console.log(event.target);
  // console.log(this);
  // 콘솔창을 보면 둘다 동일한 값이 나온다

  // console.log(event.target.classList);

  if (event.target.classList[1] === "clicked") {
    event.target.classList.remove("clicked");
  } else {
    for (var i = 0; i < category_btn.length; i++) {
      category_btn[i].classList.remove("clicked");
    }

    event.target.classList.add("clicked");
  }
}

function init() {
  for (var i = 0; i < category_btn.length; i++) {
    category_btn[i].addEventListener("click", handleClick);
  }
}

init();