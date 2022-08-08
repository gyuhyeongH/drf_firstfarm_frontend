$(document).ready(function () {
  let article_id = window.localStorage.getItem("article_id");
  get_articledetail(article_id);
});

function get_articledetail(article_id) {
  var token = localStorage.getItem("access");

  var user = "";
  if (localStorage.getItem("access")) {
    const payload = JSON.parse(localStorage.getItem("payload"));
    user = payload.user_id;
  }

  $.ajax({
    type: "GET",
    url: "https://rbgud.shop/article/detail/" + article_id,
    beforeSend: function (xhr) {
      // xhr.setRequestHeader("Content-type", "application/json");
      if (token) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      }
    },
    data: {},
    success: function (response) {
      let review_length = response["article_review"]["rate"].length;
      for (let i = 0; i < review_length.length; i++) {
        let temp_detail_reviewbox;
        let temp_detail_reviewimg;

        let rate = response["article_review"]["rate"][0];
        let content = response["article_review"]["content"][0];
        let review_user = response["article_review"]["review_user"][0];
        let review_img1 = response["article_review"]["review_img"][0];
        let review_img2 = response["article_review"]["review_img"][1];
        let review_img3 = response["article_review"]["review_img"][2];
        if (rate == 1) {
          rate = "⭐️";
        } else if (rate == 2) {
          rate = "⭐️⭐️";
        } else if (rate == 3) {
          rate = "⭐️⭐️⭐️";
        } else if (rate == 4) {
          rate = "⭐️⭐️⭐️⭐️";
        } else {
          rate = "⭐️⭐️⭐️⭐️⭐️";
        }

        temp_detail_reviewbox = `
        <div class="review_box">
            <div class="review_rate">${rate}</div>
            <div class="review_user">
                <button class="review_user_button">${review_user}</button>
            </div>
            <div class="review_content">${content}</div>
        </div>
        `;
        $("#review_box").append(temp_detail_reviewbox);

        if (review_img1 != undefined) {
          temp_detail_reviewimg1 = `
            <li><img src="${review_img1}" width="300px" height="300px" alt=""></li>
            `;
          $("#reviewimg").append(temp_detail_reviewimg1);
        }

        if (review_img2 != undefined) {
          temp_detail_reviewimg2 = `
            <li><img src="${review_img2}" width="300px" height="300px" alt=""></li>
            `;
          $("#reviewimg").append(temp_detail_reviewimg2);
        }

        if (review_img3 != undefined) {
          temp_detail_reviewimg3 = `
            <li><img src="${review_img3}" width="300px" height="300px" alt=""></li>
            `;
          $("#reviewimg").append(temp_detail_reviewimg3);
        }
      }

      let apply_user = response["apply"];
      let article_user = response["user"];
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

      if (img1 == null) {
        img1 =
          "https://s3.ap-northeast-2.amazonaws.com/firstfarm-media/img/output2_2slvTP3.jpg";
      }

      if (img2 == null) {
        img2 =
          "https://s3.ap-northeast-2.amazonaws.com/firstfarm-media/img/output2_2slvTP3.jpg";
      }

      if (img3 == null) {
        img3 =
          "https://s3.ap-northeast-2.amazonaws.com/firstfarm-media/img/output2_2slvTP3.jpg";
      }

      let article_category = response["article_category"];
      let phone_number = response["phone_number"]["phone_number"];
      let rank = response["rank"]["rank"];

      let temp_detail_titlebox;
      let temp_detail_img;
      let temp_detail_topbox;
      let temp_detail_bottombox;
      let temp_detail_userbutton;
      let temp_detail_farmbutton;

      if (article_category == 1) {
        article_category = "체험";
      } else {
        article_category = "근무";
      }

      if (localStorage.getItem("payload") != null) {
        if (user == article_user) {
          temp_detail_farmbutton = `
          <button class="edit_btn"> <a class="edit_btn_word" href="/article_edit.html">수정하기</a></button>
          <button class="end_btn" onclick="delete_articledetail(${article_id})"> 모집마감</button>
          `;
        } else {
          temp_detail_farmbutton = ``;
        }
      }
      $("#farm_button").append(temp_detail_farmbutton);

      if (localStorage.getItem("payload") != null) {
        if (user == article_user) {
          temp_detail_userbutton = `
          <button class="roadmap_btn"><a class="roadmap_btn_word"
                  href="https://map.kakao.com/link/search/${location}">길찾기</a></button>
        `;
        } else if (apply_user) {
          temp_detail_userbutton = `
          <button class="roadmap_btn"><a class="roadmap_btn_word"
                  href="https://map.kakao.com/link/search/${location}">길찾기</a></button>
          <button class="apply_btn" onclick="delete_article_apply(${article_id})"> 취소하기</button>
        `;
        } else {
          temp_detail_userbutton = `
          <button class="roadmap_btn"><a class="roadmap_btn_word"
                  href="https://map.kakao.com/link/search/${location}">길찾기</a></button>
          <button class="apply_btn" onclick="post_article_apply(${article_id})"> 신청하기</button>
        `;
        }
      }
      $("#user_button").append(temp_detail_userbutton);

      temp_detail_titlebox = `
      <div class="title" >
          ${title}
      </div>
      `;
      $("#title_box").append(temp_detail_titlebox);

      temp_detail_img = `
        <ul class="slides">
            <li><img src="${img1}" width="300" height="300" alt=""></li>
            <li><img src="${img2}" width="300" height="300" alt=""></li>
            <li><img src="${img3}" width="300" height="300" alt=""></li>
        </ul>
        <p class="controller">
            <span class="prev">&lang;</span>
            <span class="next">&rang;</span>
        </p>
        `;
      $("#slideShow").append(temp_detail_img);

      // 게시글 이미지 슬라이드
      const slides = document.querySelector(".slides"); //전체 슬라이드 컨테이너
      const slideImg = document.querySelectorAll(".slides li"); //모든 슬라이드들
      let currentIdx = 0; //현재 슬라이드 index
      const slideCount = slideImg.length; // 슬라이드 개수
      const prev = document.querySelector(".prev"); //이전 버튼
      const next = document.querySelector(".next"); //다음 버튼
      const slideWidth = 300; //한개의 슬라이드 넓이
      const slideMargin = 100; //슬라이드간의 margin 값

      //전체 슬라이드 컨테이너 넓이 설정
      slides.style.width = (slideWidth + slideMargin) * slideCount + "px";

      function moveSlide(num) {
        slides.style.left = -num * 390 + "px";
        currentIdx = num;
      }

      prev.addEventListener("click", function () {
        /*첫 번째 슬라이드로 표시 됐을때는 
        이전 버튼 눌러도 아무런 반응 없게 하기 위해 
        currentIdx !==0일때만 moveSlide 함수 불러옴 */

        if (currentIdx !== 0) moveSlide(currentIdx - 1);
      });

      next.addEventListener("click", function () {
        /* 마지막 슬라이드로 표시 됐을때는 
        다음 버튼 눌러도 아무런 반응 없게 하기 위해
        currentIdx !==slideCount - 1 일때만 
        moveSlide 함수 불러옴 */
        if (currentIdx !== slideCount - 1) {
          moveSlide(currentIdx + 1);
        }
      });

      temp_detail_topbox = `
      <div class="left_name_box">
          <button class="left_name_button">${farm_name}</button>
      </div>
      <div class="left_rate_box">
          <button class="left_rate_button">⭐ ${rank} ⭐</button>
      </div>
      <div class="left_userinfo_box"> ☎️ ${phone_number}</div>
      `;
      $("#top_box").append(temp_detail_topbox);

      temp_detail_bottombox = `
      <div class="right_rank-intro_box">
          <div class="right_rank-intro_title">
              <button class="right_rank-intro_title_button">${article_category}</button>
          </div>
          <div class="right_rank-intro_content">${rank}🍀</div>
      </div>
      <div class="right_period_box">
          <div class="right_period_title">
              <button class="right_period_title_button">활동 기간</button>
          </div>
          <div class="right_period_content">${period}</div>
      </div>
      <div class="right_location_box">
          <div class="right_location_title">
              <button class="right_location_title_button">위치</button>
          </div>
          <div class="right_location_content">${location}</div>
      </div>
      <div class="right_requirement_box">
          <div class="right_requirement_title">
              <button class="right_requirement_title_button">모집 요건</button>
          </div>
          <div class="right_requirement_content">${requirement}</div>
      </div>
      <div class="right_cost_box">
          <div class="right_cost_title">
              <button class="right_cost_title_button">금액</button>
          </div>
          <div class="right_cost_content">${cost}</div>
      </div>
      <div class="right_desc_box">
          <div class="right_desc_title">
              <button class="right_desc_title_button">상세 내용</button>
          </div>
          <div class="right_desc_content">${desc}</div>
      </div>
      `;
      $("#bottom_box").append(temp_detail_bottombox);

      //리뷰 이미지 슬라이드
      var reviewslides = document.querySelector(".reviewslides"),
        reviewslide = document.querySelectorAll(".reviewslides li"),
        reviewcurrentIdx = 0,
        reviewslideCount = reviewslide.length,
        backBtn = document.querySelector(".back"),
        reviewslideWidth = 300,
        reviewslideMargin = 30,
        goBtn = document.querySelector(".go");

      reviewslides.style.width =
        (reviewslideWidth + reviewslideMargin) * reviewslideCount -
        reviewslideMargin +
        "px";

      function reviewmoveSlide(num) {
        reviewslides.style.left = -num * 330 + "px";
        reviewcurrentIdx = num;
      }

      backBtn.addEventListener("click", function () {
        if (reviewcurrentIdx > 0) {
          reviewmoveSlide(reviewcurrentIdx - 1);
        } else {
          reviewmoveSlide(reviewslideCount - 3);
        }
      });

      goBtn.addEventListener("click", function () {
        if (reviewcurrentIdx < reviewslideCount - 3) {
          reviewmoveSlide(reviewcurrentIdx + 1);
        } else {
          reviewmoveSlide(0);
        }
      });
    },
  });
}

function post_article_apply(article_id) {
  var token = localStorage.getItem("access");
  let form_data = new FormData();

  $.ajax({
    type: "POST",
    url: "https://rbgud.shop/article/detail/apply/" + article_id,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    data: form_data,
    cache: false,
    contentType: false,
    processData: false,

    error: function () {
      alert("error");
      window.location.reload();
    },
    success: function () {
      alert("신청이 완료되었습니다.");
      window.location.reload();
    },
  });
}

function delete_article_apply(article_id) {
  var token = localStorage.getItem("access");
  let form_data = new FormData();

  $.ajax({
    type: "DELETE",
    url: "https://rbgud.shop/article/detail/apply/" + article_id,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    data: form_data,
    cache: false,
    contentType: false,
    processData: false,

    error: function () {
      alert("error");
      window.location.reload();
    },
    success: function () {
      alert("신청이 취소되었습니다.");
      window.location.reload();
    },
  });
}

function delete_articledetail(article_id) {
  var token = localStorage.getItem("access");

  $.ajax({
    type: "DELETE",
    url: "https://rbgud.shop/article/detail/" + article_id,
    beforeSend: function (xhr) {
      // xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    data: {},

    error: function () {
      alert("error");
      window.location.reload();
    },
    success: function (response) {
      alert("마감 완료");
      window.location.reload();
    },
  });
}
