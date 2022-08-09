function post_articledetail() {
  var token = localStorage.getItem("access");

  let article_category = $("#article_category").val();
  let farm_name = $("#farm_name").val();
  let location = $("#sample4_roadAddress").val();
  let title = $("#title").val();
  let cost = $("#cost").val();
  let requirement = $("#requirement").val();
  let period = $("#period").val();
  let desc = $("#desc").val();
  let img1 = $("#img")[0].files[0];
  let img2 = $("#img2")[0].files[0];
  let img3 = $("#img3")[0].files[0];
  let form_data = new FormData();

  form_data.append("article_category", article_category);
  form_data.append("farm_name", farm_name);
  form_data.append("location", location);
  form_data.append("title", title);
  form_data.append("cost", cost);
  form_data.append("requirement", requirement);
  form_data.append("period", period);
  form_data.append("desc", desc);
  form_data.append("img1", img1);
  form_data.append("img2", img2);
  form_data.append("img3", img3);

  $.ajax({
    type: "POST",
    url: "https://rbgud.shop/article/detail/",

    beforeSend: function (xhr) {
      // xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    data: form_data,
    cache: false,
    contentType: false,
    processData: false,

    error: function () {
      alert("error");
      location.reload();
    },
    success: function () {
      alert("게시글이 작성되었습니다.");
      window.location.replace("https://hwisu.shop/search_article.html");
    },
  });
}

function sample4_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var roadAddr = data.roadAddress; // 도로명 주소 변수
      var extraRoadAddr = ""; // 참고 항목 변수

      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraRoadAddr +=
          extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraRoadAddr !== "") {
        extraRoadAddr = " (" + extraRoadAddr + ")";
      }

      // 도로명 주소 정보를 해당 필드에 넣는다.
      document.getElementById("sample4_roadAddress").value = roadAddr;
    },
  }).open();
}

// 카테고리를 선택하는 부분.
$(document).ready(function () {
  $("#category1").click(function () {
    $("input#article_category").val("1");
  });
});

$(document).ready(function () {
  $("#category2").click(function () {
    $("input#article_category").val("2");
  });
});

// 이미지 선택하는 부분.
const reader = new FileReader();
reader.onload = (readerEvent) => {
  document
    .querySelector("#img_section")
    .setAttribute("src", readerEvent.target.result);
  //파일을 읽는 이벤트가 발생하면 img_section의 src 속성을 readerEvent의 결과물로 대체함
};

document.querySelector("#img").addEventListener("change", (changeEvent) => {
  //upload_file 에 이벤트리스너를 장착

  const imgFile = changeEvent.target.files[0];
  reader.readAsDataURL(imgFile);
  //업로드한 이미지의 URL을 reader에 등록
});

const reader2 = new FileReader();
reader2.onload = (readerEvent) => {
  document
    .querySelector("#img_section2")
    .setAttribute("src", readerEvent.target.result);
  //파일을 읽는 이벤트가 발생하면 img_section의 src 속성을 readerEvent의 결과물로 대체함
};

document.querySelector("#img2").addEventListener("change", (changeEvent) => {
  //upload_file 에 이벤트리스너를 장착

  const imgFile = changeEvent.target.files[0];
  reader2.readAsDataURL(imgFile);
  //업로드한 이미지의 URL을 reader에 등록
});

const reader3 = new FileReader();
reader3.onload = (readerEvent) => {
  document
    .querySelector("#img_section3")
    .setAttribute("src", readerEvent.target.result);
  //파일을 읽는 이벤트가 발생하면 img_section의 src 속성을 readerEvent의 결과물로 대체함
};

document.querySelector("#img3").addEventListener("change", (changeEvent) => {
  //upload_file 에 이벤트리스너를 장착

  const imgFile = changeEvent.target.files[0];
  reader3.readAsDataURL(imgFile);
  //업로드한 이미지의 URL을 reader에 등록
});

// 버튼 클릭 확인을 위한 색상 추가하는 부분.
var category_button = document.getElementsByClassName("category_button");

function handleClick(event) {
  // console.log(event.target);
  // console.log(this);
  // 콘솔창을 보면 둘다 동일한 값이 나온다

  if (event.target.classList[1] === "clicked") {
    event.target.classList.remove("clicked");
  } else {
    for (var i = 0; i < category_button.length; i++) {
      category_button[i].classList.remove("clicked");
    }

    event.target.classList.add("clicked");
  }
}

function init() {
  for (var i = 0; i < category_button.length; i++) {
    category_button[i].addEventListener("click", handleClick);
  }
}

init();
