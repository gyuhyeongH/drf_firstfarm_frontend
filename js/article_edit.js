$(document).ready(function () {
  article_id = window.localStorage.getItem("article_id");
  get_articledetail(article_id);
});

function get_articledetail(article_id) {
  $.ajax({
    type: "GET",
    url: "https://rbgud.shop/article/detail/" + article_id,
    data: {},
    success: function (response) {
      let farm_name = response["farm_name"];
      let title = response["title"];
      let location = response["location"];
      let cost = response["cost"];
      let period = response["period"];
      let requirement = response["requirement"];
      let desc = response["desc"];
      let img1 = response["img1"];
      let img2 = response["img2"];
      let img3 = response["img3"];
      let article_category = response["article_category"];

      let temp_detail_value;

      temp_detail_value = `
        <div class="category_box">
          <div class="category_title">카테고리 선택</div>
          <div class="category_input_box">
              <button class="category_button" id="category1">체험</button>
              <button class="category_button" id="category2">근무</button>
              <input class="category_input" type="text" id="article_category" name="article_category" value="${article_category}">
          </div>
        </div>
        <div class="name_box" id="name">
            <div class="name_title">농장 이름</div>
            <div class="name_input_box">
                <input class="name_input" type="text" id="edit_farm_name" value="${farm_name}">
            </div>
        </div>
        <div class="title_box">
            <div class="title_title">게시글 제목</div>
            <div class="title_input_box">
                <input class="title_input" type="text" id="edit_title" value="${title}">
            </div>
        </div>
        <div class="requirement_box">
            <div class="requirement_title">모집 요건</div>
            <div class="requirement_input_box">
                <input class="requirement_input" type="text" id="edit_requirement" value="${requirement}">
            </div>
        </div>
        <div class="cost_box">
            <div class="cost_title">금액</div>
            <div class="cost_input_box">
                <input class="cost_input" type="text" id="edit_cost" value="${cost}">
            </div>
        </div>
        <div class="period_box">
            <div class="period_title">활동 기간</div>
            <div class="period_input_box">
                <input class="period_input" type="text" id="edit_period" value="${period}">
            </div>
        </div>
        <div class="desc_box">
            <div class="desc_title">세부 내용</div>
            <div class="desc_input_box">
                <input class="desc_input" type="text" id="edit_desc" value="${desc}">
            </div>
        </div>
        <div class="location_box">
            <div class="location_title">위치</div>
            <div class="location_input_box">
                <input class="location_find" type="button" onclick="sample4_execDaumPostcode()"
                    value="주소 찾기"><br>
                <input class="location_road" type="text" id="sample4_roadAddress" value="${location}">
            </div>
        </div>
        <div class="submit_box" id="submit_button">
            <button type="button" class="submit_button" onclick="put_articledetail(${article_id})">수정하기</button>
            <button type="button" class="cancel_button" onclick="history.back()">취소</button>
        </div>
        `;
      $("#value").append(temp_detail_value);
    },
  });
}

function put_articledetail(article_id) {
  var token = localStorage.getItem("access");

  let title = $("#edit_title").val();
  let farm_name = $("#edit_farm_name").val();
  let location = $("#sample4_roadAddress").val();
  let cost = $("#edit_cost").val();
  let period = $("#edit_period").val();
  let requirement = $("#edit_requirement").val();
  let desc = $("#edit_desc").val();
  let img1 = $("#img")[0].files[0];
  let img2 = $("#img2")[0].files[0];
  let img3 = $("#img3 ")[0].files[0];
  let article_category = $("#articlecategory").val();

  let form_data = new FormData();

  form_data.append("img1", img1);
  form_data.append("img2", img2);
  form_data.append("img3", img3);

  $.ajax({
    type: "PUT",
    url: "https://rbgud.shop/article/detail/" + article_id,
    beforeSend: function (xhr) {
      // xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    data: {
      title: title,
      farm_name: farm_name,
      location: location,
      cost: cost,
      period: period,
      requirement: requirement,
      desc: desc,
      article_category: article_category,
    },

    success: function (response) {
      alert("업데이트 완료");
      window.location.replace(`https://hwisu.shop/articledetail.html`);
    },
    error: function (response) {
      alert("게시글 수정 실패!");
      window.location.reload();
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

// 카테고리 선택.
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

  // console.log(event.target.classList);

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
