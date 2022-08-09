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

// 프로필 이미지 업로드
function getImageFiles(e) {
  const uploadFiles = [];
  const files = e.currentTarget.files;
  const imagePreview = document.querySelector('.box_img');
  const docFrag = new DocumentFragment();

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

  return new_img;
}

const realUpload = document.querySelector('.img_find');
const upload = document.querySelector('.upload');

upload.addEventListener('click', () => realUpload.click());
realUpload.addEventListener('change', getImageFiles);

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

// 카테고리 토글
function handleClick(event) {
  user_category_value = event.target.value;
  // 콘솔창을 보면 둘다 동일한 값이 나온다
  console.log(user_category_value)
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