/*변수 선언*/

var id = document.querySelector("#id");

var pw1 = document.querySelector("#pswd1");
var pwMsg = document.querySelector("#alertTxt");
var pwImg1 = document.querySelector("#pswd1_img1");

var error = document.querySelectorAll(".error_next_box");


/*이벤트 핸들러 연결*/

id.addEventListener("focusout", checkInId);
pw1.addEventListener("focusout", checkInPw);

/*콜백 함수*/

function checkInId() {
  var idPattern = /[a-zA-Z0-9_-]{5,20}/;
  if (id.value === "") {
    error[0].innerHTML = "필수 정보입니다.";
    error[0].style.color = "#FF0000";
    error[0].style.display = "block";
    error[0].style.position = "fixed";
  } else if (!idPattern.test(id.value)) {
    error[0].innerHTML = "올바른 형식이 아닙니다.";
    error[0].style.color = "#FF0000";
    error[0].style.display = "block";
    error[0].style.position = "fixed";
  } else {
    error[0].innerHTML = "";
    error[0].style.color = "#08A600";
    error[0].style.display = "none";
  }
}

function checkInPw() {
  var pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
  if (pw1.value === "") {
    error[1].innerHTML = "필수 정보입니다.";
    error[0].style.color = "#FF0000";
    error[1].style.display = "block";
    error[1].style.position = "fixed";
  } else if (!pwPattern.test(pw1.value)) {
    error[1].innerHTML = "올바른 형식이 아닙니다.";
    error[0].style.color = "#FF0000";
    error[1].style.display = "block";
    error[1].style.position = "fixed";
  } else {
    error[1].style.display = "none";
  }
}


$("#login_form").keypress(function (e) {
  if (e.keyCode === 13) {
    handle_signin();
  }
});