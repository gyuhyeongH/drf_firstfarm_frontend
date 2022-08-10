// const backend_base_url = "https://rbgud.shop";
// const frontend_base_url = "https://hwisu.shop";
const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500";

// 회원가입
async function handle_signup() {
  const username = document.getElementById("id").value
  const password = document.getElementById("pswd1").value
  const email = document.getElementById("email").value
  let category_btn = document.getElementsByClassName("category_btn clicked")[0]
  if (category_btn) {
    category_btn = category_btn.value
  }

  const yy = document.querySelector("#yy");
  const mm = document.querySelector("#mm");
  const dd = document.querySelector("#dd");

  const input_img = document.getElementById("input_img").files[0]

  const fullname = document.getElementById("fullname").value
  const gender = document.getElementById("gender").value
  const birthday = (yy.value + "-" + mm.value + "-" + dd.value)
  const age = document.getElementById("age").innerText
  const phone_number = document.getElementById("phone_number").value
  const locations = document.getElementById("locations").innerText
  const introduction = document.getElementById("introduction").value
  const prefer = document.getElementById("prefer").value

  // // 카테고리 검증
  // catePatternCheck(category_btn);
  // // 아이디 검증
  // idPatternCheck(username);
  // // 비밀번호 검증
  // pwPatternCheck(password);
  // console.log(pwPatternCheck(password))

  // formData 입력
  const signupData = new FormData();

  if (input_img !== undefined) {
    console.log(input_img)
    signupData.append('img', input_img);
  }

  const userprofile = JSON.stringify({
    'fullname': fullname,
    'gender': gender,
    'birthday': birthday,
    'age': age,
    'phone_number': phone_number,
    'location': locations,
    'introduction': introduction,
    'prefer': prefer,
  })
  
  // const userprofile = JSON.stringify({
  //   'fullname': XSSCheck(fullname),
  //   'gender': XSSCheck(gender),
  //   'birthday': birthday,
  //   'age': age,
  //   'phone_number': XSSCheck(phone_number),
  //   'location': XSSCheck(locations),
  //   'introduction': XSSCheck(introduction, 1),
  //   'prefer': XSSCheck(prefer),
  // })

  signupData.append('username', username);
  signupData.append('password', password);
  signupData.append('email', email);
  signupData.append('user_category', category_btn);
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
    console.log(response_json)
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
  console.log(response_json.access);

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

function XSSCheck(str, level) {
  if (level == undefined || level == 0) {
    str = str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g, "");
  } else if (level != undefined && level == 1) {
    str = str.replace(/\</g, "&lt;");
    str = str.replace(/\>/g, "&gt;");
  }
  return str;
}


// 아이디 검증
function idPatternCheck(username) {
  const idPattern = /[a-zA-Z0-9]{5,20}/;
  
  if (!idPattern.test(username)) {
    alert("5~20자의 영문 소문자, 숫자만 사용 가능합니다.")
    var offset = $('#category_value').offset();
    $('html').animate({ scrollTop: offset.top }, 600);
    return
  }
  return username
};

// 패스워드 검증
function pwPatternCheck(password) {
  const pwPattern = /[~()_+|<>?:{}]/;

  if (pwPattern.test(password)) {
    alert("비밀번호 형식이 맞지 않습니다.")
    var offset = $('#email').offset();
    $('html').animate({ scrollTop: offset.top }, 600);
    return
  } else if (password === "") {
    alert("필수 정보입니다.")
    var offset = $('#email').offset();
    $('html').animate({ scrollTop: offset.top }, 600);
    return
  }
  return password
};

// 카테고리 검증
function catePatternCheck(category_btn) {
  if (category_btn === undefined) {
    alert("필수 정보입니다.")
    var offset = $('#header_2').offset();
    $('html').animate({ scrollTop: offset.top }, 600);
  }
  return category_btn
};