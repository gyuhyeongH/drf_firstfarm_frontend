function XSSCheck(str, level) {
    if (level == undefined || level == 0) {
      str = str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g, "");
    } else if (level != undefined && level == 1) {
      str = str.replace(/\</g, "&lt;");
      str = str.replace(/\>/g, "&gt;");
    }
    return str;
  }

$(document).ready(function () {
    get_farmer();   
    get_review();
})
function get_star(rate){
    if(rate == 1){
        return "⭐️";
    }else if(rate ==2){
        return "⭐️⭐️";
    }else if(rate ==3){
        return "⭐️⭐️⭐️";
    }else if(rate ==4){
        return "⭐️⭐️⭐️⭐️";
    }else if(rate ==5){
        return "⭐️⭐️⭐️⭐️⭐️";
    }else{
        return 0;
    }
}
function get_farmer() {
    var token = localStorage.getItem("access")
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }
    $.ajax({
        type: "GET",
        url: "https://rbgud.shop/article/farmer/",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Content-type", "application/json");
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: {},
        success: function(response){
            if(response.length>0){ 
                let rank = response[0]['userinfo']['rank']
                let birthday = response[0]['userinfo']['birthday']
                let email = response[0]['userinfo']['email']
                let fullname = response[0]['userinfo']['fullname']
                let location = response[0]['userinfo']['location']
                let prefer = response[0]['userinfo']['prefer']
                let gender = response[0]['userinfo']['gender']
                let introduction = response[0]['userinfo']['introduction']
                let phone_number = response[0]['userinfo']['phone_number']
                let points = response[0]['userinfo']['points']
                let prof_img = response[0]['userinfo']['profile_img']
                if(prof_img == undefined || null){
                    prof_img = 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/05/logoyogo-1-4.jpg';
                }
                let temp_title = `<div class="title"> ${fullname} 여름지기 페이지 😎</div>`;
                $('.title_b').append(temp_title);
    
                let temp_profile = `
                    <div id="plzhide">
                        <img src="${prof_img}" alt="default이미지" srcset="">
                        <p> ✔️ 이름 : ${fullname} <br />
                            ✔️ 성별 : ${gender} <br />
                            📞 연락처 : ${phone_number} <br />
                            @ email : ${email} <br />
                            🎂 birthday : ${birthday} <br />
                            📍 location : ${location} <br />
                            💡 prefer : ${prefer} <br />
                        </p>
                        <a href="signput.html" target="blank">
                        정보 수정
                        </a>
                    </div>
                        `;
                $('#profilebox').append(temp_profile);
 
                let temp_intro =`
                    <div id="desc">
                        <p> 소개글 : ${introduction} 입니다  <br /></p>
                        <p> ${fullname}님은 ${rank} 중 입니다 🌱 <br /></p>
                        <p>다음 랭크까지 ${points}% 모았어요 ! <br /></p>
                    </div>    
                    <div id="percentbar">
                        <div>
                            <div id="pointbar"></div>
                        </div>
                    </div>`;
                $('#intro').append(temp_intro);

                /* 다녀온 공고 */
                for (let i = 0; i < response.length; i++){
                    let article_id = response[i]['articleinfo']['article_id']
                    let farmname = response[i]['articleinfo']['farm_name']
                    let location = response[i]['articleinfo']['location']
                    let title = response[i]['articleinfo']['title']
                    let cost = response[i]['articleinfo']['cost']
                    let desc = response[i]['articleinfo']['desc']
                    let period = response[i]['articleinfo']['period']
                    let img1 = response[i]['articleinfo']['img1']
                    let review_dup = response[i]['reviewinfo']
                    if(img1 == undefined || img1 == null){
                        img1 = 'https://png.pngtree.com/thumb_back/fh260/back_our/20190617/ourmid/pngtree-organic-farm-spring-hui-poster-background-material-image_127030.jpg';
                    }
                    if(review_dup == true){
                        let temp_li = `
                    <li>
                    <div>
                    <!-- Posts -->
                    <div class="posts" style="position: relative;background-image: url(${img1});height: 100vh; background-size: cover;">
                        <div class="content">
                            <h3>${period}일간</span>
                            <h2><a href="articledetail.html">${title}</a></h2>
                        </div>
                        <div class="img-cover" style="padding-top:30px">
                            <p> ✔️ 농장 : ${farmname} <br />
                            ✔️ 위치 : ${location} <br />
                            ✔️ 설명 : ${desc} <br />
                            ✔️ 비용 : ${cost} <br />
                            </p>
                            <div>
                                <a onclick="document.getElementById('article_review_post${article_id}').classList.remove('hide');" title="Button push blue/green" class="button btnPush btnBlueGreen">후기 작성</a>
                                <a onclick="document.getElementById('article_review_post${article_id}').classList.add('hide');" title="Button push blue/green" class="button btnPush btnBlueGreen">작성 취소</a>
                            </div>
                        </div>
                    </div>
                    </div>
                    </li>
                    `;
                    $('.slides').append(temp_li);
                    }else{
                        let temp_li = `
                        <li>
                        <div>
                        <!-- Posts -->
                        <div class="posts" style="position: relative;background-image: url(${img1});height: 100vh; background-size: cover;">
                            <div class="content">
                                <h3>${period}일간</span>
                                <h2><a href="articledetail.html">${title}</a></h2>
                            </div>
                            <div class="img-cover" style="padding-top:30px">
                                <p> ✔️ 농장 : ${farmname} <br />
                                ✔️ 위치 : ${location} <br />
                                ✔️ 설명 : ${desc} <br />
                                ✔️ 비용 : ${cost} <br />
                                </p>
                                <div>
                                    <a title="Button push blue/green" class="button btnPush btnBlueGreen" style="width:100%;">작성한 후기 확인</a>
                                </div>
                            </div>
                        </div>
                        </div>
                        </li>
                        `;
                        $('.slides').append(temp_li);
                    }

                    
                    let temp_post_box = `
                    <div id="article_review_post${article_id}" class="hide">
                        <div class="apply_box">
                        <h3>후기 작성하기</h3>
                        </div>
                        <!-- 리뷰작성 -->
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea" class="form-label"> ✏️ 이번 ${farmname}의 ${title}에서의 경험을 나눠주세요!</label>
                            <textarea class="form-control" id="exampleFormControlTextarea${article_id}" rows="10"></textarea>
                        </div>
                        <!-- 사진 업로드 -->
                        <div class="mb-3">
                            <label for="formFileMultiple" class="form-label">💡 후기 사진은 최대 3장 업로드 가능합니다 </label>
                            <input class="form-control" type="file" id="formFileMultiple" multiple>
                        </div>
                        <!-- 평점 -->
                        <select class="form-select" id="post-select${article_id}" aria-label="rate">
                            <option selected>🌟 이만큼 만족했어요!</option>
                            <option value="1">⭐️</option>
                            <option value="2">⭐️⭐️</option>
                            <option value="3">⭐️⭐️⭐️</option>
                            <option value="4">⭐️⭐️⭐️⭐️</option>
                            <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                        </select>
                        <button id="review_uproad" onclick="post_review(${article_id})">후기 업로드하기</button>
                    </div>
                    `;
                    $('#review_post_box').append(temp_post_box);
                }
            }else{
                let rank = response.rank
                let birthday = response.birthday
                let email = response.email
                let fullname = response.fullname
                let location = response.location
                let prefer = response.prefer
                let gender = response.gender
                let introduction = response.introduction
                let phone_number = response.phone_number
                let points = response.points
                let prof_img = response.profile_img
    
                if(prof_img == undefined || null){
                    prof_img = 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/05/logoyogo-1-4.jpg';
                }
                let temp_title = `<div class="title"> ${fullname} 여름지기 페이지 😎</div>`;
                $('.title_b').append(temp_title);
    
                let temp_profile = `
                    <div id="plzhide">
                        <img src="${prof_img}" alt="default이미지" srcset="">
                        <p> ✔️ 이름 : ${fullname} <br />
                            ✔️ 성별 : ${gender} <br />
                            ✔️ phone_number : ${phone_number} <br />
                            ✔️ email : ${email} <br />
                            🎂 birthday : ${birthday} <br />
                            📍 location : ${location} <br />
                            💡 prefer : ${prefer} <br />
                        </p>
                        <a href="signput.html" target="blank">
                        정보 수정
                        </a>
                    </div>
                        `;
                $('#profilebox').append(temp_profile);

                let temp_intro =`
                    <div id="desc">
                        <p> 소개글 : ${introduction} 입니다  <br /></p>
                        <p> ${fullname}님은 ${rank} 중 입니다 🌱 <br /></p>
                        <p>다음 랭크까지 ${points}% 모았어요 ! <br /></p>
                    </div>    
                    <div id="percentbar">
                        <div>
                            <div id="pointbar"></div>
                        </div>
                    </div>`;
                $('#intro').append(temp_intro);

                let temp_li = `
                    <li>
                    <div>
                        <h1>아직 다녀온 농가가 없어요!</h1>
                    </div>
                    </li>
                    `;
                $('.slides').append(temp_li);
            }
        }
    })
}
function get_review() {
    var token = localStorage.getItem("access")
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }
    $.ajax({
        type: "GET",
        url: "https://rbgud.shop/article/review/",

        beforeSend: function (xhr) {
          xhr.setRequestHeader("Content-type", "application/json");
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: {},
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let article_title = response[i]['articleinfo']['title']
                let period = response[i]['articleinfo']['period']
                let review_id = response[i]['id']
                let rate = response[i]['rate']
                let img1 = response[i]['img1']
                let img2 = response[i]['img2']
                let img3 = response[i]['img3']
                if(img1 == undefined || img1 == null || img2 == undefined || img2 == null || img3 == undefined || img3 == null){
                    img1 = 'https://png.pngtree.com/thumb_back/fh260/back_our/20190617/ourmid/pngtree-organic-farm-spring-hui-poster-background-material-image_127030.jpg';
                    img2 = 'https://png.pngtree.com/thumb_back/fh260/back_our/20190617/ourmid/pngtree-organic-farm-spring-hui-poster-background-material-image_127030.jpg';
                    img3 = 'https://png.pngtree.com/thumb_back/fh260/back_our/20190617/ourmid/pngtree-organic-farm-spring-hui-poster-background-material-image_127030.jpg';
                }
                let content = response[i]['content']
                let created_at = response[i]['created_at'].split('T')[0]
                let updated_at = response[i]['updated_at'].split('T')[0]
                let star = get_star(rate)
    
                let temp_review = `
                <div class ="rv">
                    <header class="major">
                        <span class="date">${period}일간</span>
                        <h2>${article_title}</h2>
                        <p>평가 :  ${star} 점</p>
                    </header>
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to=${i} class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to=${i+1} aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to=${i+2} aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img src="${img1}" class="d-block w-100" alt="first-img">
                        </div>
                        <div class="carousel-item">
                        <img src="${img2}" class="d-block w-100" alt="second-img">
                        </div>
                        <div class="carousel-item">
                        <img src="${img3}" class="d-block w-100" alt="third-img">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="false"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="false"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                    </div>
                    <p> ✔️ 후기 : ${content} <br />
                        ✔️ 업로드 일 : ${created_at} <br />
                        ✔️ 수정 일 : ${updated_at} <br />
                    </p>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        후기 수정
                    </button>
                    <button onclick="delete_review(${review_id})">후기 삭제</button>
                </div>
                    `;
                $('.review_b').append(temp_review);
                let temp_put =`                    
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">후기 수정</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea" class="form-label"> ✏️ 후기를 수정해 주세요!</label>
                                <textarea class="form-control" id="review_content_put" rows="10"></textarea>
                            </div>
                            <!-- 사진 업로드 -->
                            <div class="mb-3">
                                <label for="formFileMultiple" class="form-label">💡 후기 사진은 최대 3장 업로드 가능합니다 </label>
                                <input class="form-control" type="file" id="put_FileMultiple" multiple>
                            </div>
                            <!-- 평점 -->
                            <select class="form-select" id="put-select" aria-label="rate">
                                <option selected>🌟 이만큼 만족했어요!</option>
                                <option value="1">⭐️</option>
                                <option value="2">⭐️⭐️</option>
                                <option value="3">⭐️⭐️⭐️</option>
                                <option value="4">⭐️⭐️⭐️⭐️</option>
                                <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                            </select>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                                <button type="button" class="btn btn-primary" onclick="put_review(${review_id})">후기 수정 하기</button>
                            </div>
                        </div>
                        </div>
                    </div>  
        
            `; 
            $('#review_put_box').append(temp_put);

            }}
    })
}
/* 리뷰 작성 */
function post_review(article_id) {
    var token = localStorage.getItem("access")
    let content = $('#exampleFormControlTextarea'+article_id).val()
    console.log(content)
    let img = $('#formFileMultiple')[0];
    if(img.files.length > 3) {
        alert("사진 업로드는 최대 3개까지 가능합니다");
        return;
    }
    let rate = $('#post-select'+article_id).val()
    const formData = new FormData();
    formData.append("img1", img.files[0]);
    formData.append("img2", img.files[1]);
    formData.append("img3", img.files[2]);
    formData.append("content", XSSCheck(content, 1));
    formData.append("rate", rate);
    console.log(rate)
    $.ajax({
        type: "POST",
        url: "https://rbgud.shop/article/" + article_id + "/farmer",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response["message"] == '리뷰 작성 완료!') {
                window.location.reload();
            }else{
                window.location.reload();
            }
        },
        error: function(){
            alert("댓글과 평가점수는 필수입니다.")
        }
    })
}

function put_review(review_id) {
    var token = localStorage.getItem("access")
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }
    let content = $('#review_content_put').val()
    let img = $('#put_FileMultiple')[0];
    if (img.files.length > 3) {
        alert("사진 업로드는 최대 3개까지 가능합니다");
        return;
    }
    let rate = $('#put-select').val();
    const formData = new FormData();
    formData.append("img1", img.files[0]);
    formData.append("img2", img.files[1]);
    formData.append("img3", img.files[2]);
    formData.append("content", XSSCheck(content, 1));
    formData.append("rate", rate);
    $.ajax({
        type: "PUT",
        url: "https://rbgud.shop/article/farmer/" + review_id,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            window.location.reload();
        },
        error: function (response) {
            console.log(response)
            if(response["message"] == '리뷰 수정 실패!' ){
                alert("리뷰 수정에 실패했습니다");
            }else{
                alert("작성자만 리뷰 수정이 가능합니다");
            }
        }
    })
}

function delete_review(review_id) {
    var token = localStorage.getItem("access")
    $.ajax({
    type: "DELETE",
    url: "https://rbgud.shop/article/farmer/"+review_id,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    data: {},
    success: function(response){
        alert(response["message"])
          if (response["message"] == '리뷰 삭제 완료.') {
              window.location.reload();
          } else {
              window.location.reload();
          }
    }

    })
}

