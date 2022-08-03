/*변수 선언*/

var id = document.querySelector("#id");
var email = document.querySelector("#email");

var pw1 = document.querySelector("#pswd1");
var pwMsg = document.querySelector("#alertTxt");
var pwImg1 = document.querySelector("#pswd1_img1");

var pw2 = document.querySelector("#pswd2");
var pwImg2 = document.querySelector("#pswd2_img1");
var pwMsgArea = document.querySelector(".int_pass");

var userName = document.querySelector("#fullname");

var gender = document.querySelector("#gender");

var yy = document.querySelector("#yy");
var mm = document.querySelector("#mm");
var dd = document.querySelector("#dd");

var age = document.querySelector("#age");

var mobile = document.querySelector("#phone_number");

var locations = document.querySelector("#locations");

var introduction = document.querySelector("#introduction");

var prefer = document.querySelector("#prefer");

var error = document.querySelectorAll(".error_next_box");



/*이벤트 핸들러 연결*/

id.addEventListener("focusout", checkId);
email.addEventListener("focusout", isEmailCorrect);
pw1.addEventListener("focusout", checkPw);
pw2.addEventListener("focusout", comparePw);
userName.addEventListener("focusout", checkName);
yy.addEventListener("focusout", isBirthCompleted);
mm.addEventListener("focusout", isBirthCompleted);
dd.addEventListener("focusout", isBirthCompleted);
gender.addEventListener("focusout", function () {
    if (gender.value === "성별") {
      error[5].style.display = "block";
      error[5].style.position = "fixed";
        
    } else {
        error[5].style.display = "none";
    }
});
// locations.addEventListener("focusout", function () {
//     if (locations.value === "지역 선택") {
//         error[8].style.display = "block";
//     } else {
//         error[8].style.display = "none";
//     }
// });
mobile.addEventListener("focusout", checkPhoneNum);
prefer.addEventListener("focusout", checkPrefer);

/*콜백 함수*/

function checkId() {
  var idPattern = /[a-zA-Z0-9_-]{5,20}/;
  if (id.value === "") {
    error[0].innerHTML = "필수 정보입니다.";
    error[0].style.display = "block";
    error[0].style.position = "fixed";
  } else if (!idPattern.test(id.value)) {
    error[0].innerHTML =
      "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
    error[0].style.display = "block";
    error[0].style.position = "fixed";
  } else {
    error[0].innerHTML = "";
    error[0].style.color = "#08A600";
    error[0].style.display = "block";
  }
}

function isEmailCorrect() {
  var emailPattern = /[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/;

  if (email.value === "") {
    error[1].innerHTML = "필수 정보입니다.";
    error[1].style.display = "block";
    error[1].style.position = "fixed";
  } else if (!emailPattern.test(email.value)) {
    error[1].innerHTML = "형식에 맞지 않는 이메일입니다.";
    error[1].style.display = "block";
    error[1].style.position = "fixed";
  } else {
    error[1].style.display = "none";
  }
}

function checkPw() {
  var pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
  if (pw1.value === "") {
    error[2].innerHTML = "필수 정보입니다.";
    error[2].style.display = "block";
    error[2].style.position = "fixed";
  } else if (!pwPattern.test(pw1.value)) {
    error[2].innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
    pwMsg.innerHTML = "사용불가";
    pwMsgArea.style.paddingRight = "93px";
    pwMsgArea.style.color = "#C19287";
    error[2].style.display = "block";
    error[2].style.position = "fixed";

    pwMsg.style.display = "block";
    pwImg1.src = "./img/style_sign_in_up_images/m_icon_not_use.png";
  } else {
    error[2].style.display = "none";
    pwMsg.innerHTML = "안전";
    pwMsg.style.display = "block";
    pwMsg.style.color = "#03c75a";
    pwImg1.src = "./img/style_sign_in_up_images/m_icon_safe.png";
  }
}

function comparePw() {
  if (pw2.value === pw1.value && pw2.value != "") {
    pwImg2.src = "./img/style_sign_in_up_images/m_icon_check_enable.png";
    error[3].style.display = "none";
  } else if (pw2.value !== pw1.value) {
    pwImg2.src = "./img/style_sign_in_up_images/m_icon_check_disable.png";
    error[3].innerHTML = "비밀번호가 일치하지 않습니다.";
    error[3].style.display = "block";
    error[3].style.position = "fixed";
  }

  if (pw2.value === "") {
    error[3].innerHTML = "필수 정보입니다.";
    error[3].style.display = "block";
    error[3].style.position = "fixed";
  }
}

function checkName() {
  var namePattern = /[a-zA-Z가-힣]/;
  if (userName.value === "") {
    error[4].innerHTML = "필수 정보입니다.";
    error[4].style.display = "block";
    error[4].style.position = "fixed";
  } else if (
    !namePattern.test(userName.value) ||
    userName.value.indexOf(" ") > -1
  ) {
    error[4].innerHTML =
      "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)";
    error[4].style.display = "block";
    error[4].style.position = "fixed";
  } else {
    error[4].style.display = "none";
  }
}

function isBirthCompleted() {
  var yearPattern = /[0-9]{4}/;

  if (!yearPattern.test(yy.value)) {
    error[6].innerHTML = "태어난 년도 4자리를 정확하게 입력하세요.";
    error[6].style.display = "block";
    error[6].style.position = "fixed";
  } else {
    isMonthSelected();
  }

  function isMonthSelected() {
    if (mm.value === "월") {
      error[6].innerHTML = "태어난 월을 선택하세요.";
    } else {
      isDateCompleted();
    }
  }

  function isDateCompleted() {
    if (dd.value === "") {
      error[6].innerHTML = "태어난 일(날짜) 2자리를 정확하게 입력하세요.";
    } else {
      isBirthRight();
    }
  }
}

function isBirthRight() {
  var datePattern = /\d{1,2}/;
  if (
    !datePattern.test(dd.value) ||
    Number(dd.value) < 1 ||
    Number(dd.value) > 31
  ) {
    error[6].innerHTML = "생년월일을 다시 확인해주세요.";
  } else {
    checkAge();
  }
}

function checkAge() {
    let today = new Date();  
    let year = today.getFullYear();
  if (Number(yy.value) < 1920) {
    error[6].innerHTML = "생년월일을 다시 확인해주세요.";
    error[6].style.display = "block";
    error[6].style.position = "fixed";
  } else if (Number(yy.value) > 2020) {
    error[6].innerHTML = "셍년월일을 다시 확인해주세요.";
    error[6].style.display = "block";
    error[6].style.position = "fixed";
  } else if (Number(yy.value) > 2005) {
    error[6].innerHTML = "만 14세 미만의 어린이는 보호자 동의가 필요합니다.";
    error[6].style.display = "block";
    error[6].style.position = "fixed";
  } else {
      age.innerHTML = (year - yy.value + 1);
    error[6].style.display = "none";
  }
}

function checkPhoneNum() {
  var isPhoneNum = /([01679]{1})-([0-9]{3,4})-([0-9]{4})/;

  if (mobile.value === "") {
    error[7].innerHTML = "필수 정보입니다.";
    error[7].style.display = "block";
    error[7].style.position = "fixed";
  } else if (!isPhoneNum.test(mobile.value)) {
    error[7].innerHTML = "형식에 맞지 않는 번호입니다.";
    error[7].style.display = "block";
    error[7].style.position = "fixed";
  } else {
    error[7].style.display = "none";
  }
}

function checkPrefer() {
  if (id.value === "") {
    error[8].innerHTML = "필수 정보입니다.";
    error[8].style.display = "block";
    error[8].style.position = "fixed";
  }
}

