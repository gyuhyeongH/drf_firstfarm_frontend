$(document).ready(function(){
    get_farmer();
    get_review();
})
function get_farmer() {
    // var token = localStorage.getItem("access_token")
    // if (localStorage.getItem("payload") != null) {
    //     const payload = JSON.parse(localStorage.getItem("payload"));
    //     user_id = payload.user_id;
    // }
    $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/article/farmer/",
    // beforeSend: function (xhr) {
    //   xhr.setRequestHeader("Content-type", "application/json");
    //   xhr.setRequestHeader("Authorization", "Bearer " + token);
    // },
    data: {},
    success: function(response){
        let user =response['user']
        let rank = response['rank']
        let birthday = response['birthday']
        let email = response['email']
        let fullname = response['fullname']
        let location = response['location']
        let prefer = response['prefer']
        let gender = response['gender']
        let introduction = response['introduction']
        let phone_number = response['phone_number']
        let points = response['points']
        // let prof_img = response['img']
        let temp_title = `<div class="title"> ${user} 농부 페이지 😎</div>`;
        $('.title_b').append(temp_title);

        let temp_profile = `
        <img src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/01/urbanbrush-20200107213951786095.jpg" alt="default이미지" srcset="">
                <p> ✔️ 이름 : ${fullname} <br />
                    ✔️ 성별 : ${gender} <br />
                    ✔️ phone_number : ${phone_number} <br />
                    ✔️ email : ${email} <br />
                    🎂 birthday : ${birthday} <br />
                    📍 location : ${location} <br />
                    💡 prefer : ${prefer} <br />
                </p>
                <button id="info_put" onclick="document.getElementById('put_profile').classList.remove('hide');">정보 수정</button>
                `;
        $('#profilebox').append(temp_profile);
        let temp_put_profile = `
        <div id="put_profile" class="hide">
            <div class="input-group" style="margin-bottom: 20px;display: flex;flex-direction: row;">
                <p style="width:30%">프로필 변경: </p>
                <div class="custom-file" style="width:30%">
                <input type="file" class="custom-file-input" id="inputGroupFile04">
                </div>
            </div>
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-phone_number">phone_number</span>
                </div>
                <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            </div>   
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-email">email</span>
                </div>
                <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            </div>  
            <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-location">location</span>
                </div>
                <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            </div>  
            <button id="info_put" onclick="put_profile(${user})">정보수정</button>
        </div>
        `;
        $('#profilebox').append(temp_put_profile);
        let temp_intro =`
            <div id="desc">
                <p> 소개글 : ${introduction} 입니다  <br /></p>
                <p> ${fullname}님은 ${rank} 중 입니다 🌱 <br /></p>
            </div>    
            <div id="percentbar">
                <div>
                    <div id="pointbar"></div>
                </div>
            </div>
            
        `
        $('#intro').append(temp_intro);
        $('#review_post_box').empty();
        for (let i = 0; i < response.length; i++){
            // let article_category = response[i]['article_category']
            let article_id = response[i]['article_id']
            let farmname = response[i]['farmname']
            let location = response[i]['location']
            let title = response[i]['title']
            let cost = response[i]['cost']
            let desc = response[i]['desc']
            let period = response[i]['period']

            let temp_li = `
            <li>
            <div>
            <!-- Posts -->
            <div class="posts" style="position: relative;
            background-image: url(https://cdn.pixabay.com/photo/2018/07/27/23/55/apple-3566998_960_720.jpg);                                             
            height: 100vh; background-size: cover;">
                <div class="content" style="top:40%">
                    <h3>${period}</span>
                    <h2><a href="articledetail.html">${title}</a></h2>
                </div>
                <div class="img-cover" style="padding-top:30px">
                    <p> ✔️ 농장 : ${farmname}} <br />
                    ✔️ 위치 : ${location} <br />
                    ✔️ 설명 : ${desc} <br />
                    ✔️ 비용 : ${cost}} <br />
                    </p>
                    <div>
                        <a onclick="document.getElementById('review_post_box').classList.remove('hide');" title="Button push blue/green" class="button btnPush btnBlueGreen">후기 작성</a>
                        <a onclick="document.getElementById('review_post_box').classList.add('hide');" title="Button push blue/green" class="button btnPush btnBlueGreen">작성 취소</a>

                    </div>

                </div>
            </div>

            </div>
            </li>
            `;
            $('.slides').append(temp_li);

            let temp_post_box = `
            <div class="apply_box">
            <h3>후기 작성하기</h3>
            </div>
            <!-- 리뷰작성 -->
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"> ✏️ 이번 ${farmname}의 ${title}에서의 경험을 나눠주세요!</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
            </div>
            <!-- 사진 업로드 -->
            <div class="mb-3">
                <label for="formFileMultiple" class="form-label">💡 후기 사진은 최대 3장 업로드 가능합니다 </label>
                <input class="form-control" type="file" id="formFileMultiple" multiple>
            </div>
            <!-- 평점 -->
            <select class="form-select" aria-label="rate">
                <option selected>🌟 이만큼 만족했어요!</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <!-- <option value="1">⭐️</option>
                <option value="2">⭐️⭐️</option>
                <option value="3">⭐️⭐️⭐️</option>
                <option value="4">⭐️⭐️⭐️⭐️</option>
                <option value="5">⭐️⭐️⭐️⭐️⭐️</option> -->
            </select>

            <button id="review_uproad" onclick="post_review(${article_id})">후기 업로드하기</button>
            `
            $('#review_post_box').append(temp_post_box);
        }}
    })
}

/* 리뷰 작성 */
function post_review(article_id) {
    // var token = localStorage.getItem("access_token")

    let content = $('#exampleFormControlTextarea1').val()
    let img = $('#formFileMultiple')[0];
    if(img.files.length === 0){
        alert("사진을 업로드 해주세요");
        return;
    }else if(img.files.length > 3){
        alert("사진 업로드는 최대 3개까지 가능합니다");
        return;
    }
    let rate = $('.form-select').val()
    const formData = new FormData();
    formData.append("img1",img.files[0]);
    formData.append("img2",img.files[1]);
    formData.append("img3",img.files[2]);
    formData.append("content",content);
    formData.append("rate",rate);
    $.ajax({
    type: "POST",
    // url: "http://127.0.0.1:8000/article/1"+"/farmer",
    url: "http://127.0.0.1:8000/article/"+article_id+"/farmer",
    // beforeSend: function (xhr) {
    //   xhr.setRequestHeader("Content-type", "application/json");
    //   xhr.setRequestHeader("Authorization", "Bearer " + token);
    // },
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function(response){
        if (response["result"] == '리뷰 작성 완료!') {
            window.location.reload();
        } else {
            window.location.reload();
        }
        }
    })
}

function get_review() {
    // var token = localStorage.getItem("access_token")
    // if (localStorage.getItem("payload") != null) {
    //     const payload = JSON.parse(localStorage.getItem("payload"));
    //     user_id = payload.user_id;
    // }
    $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/article/review/",
    // beforeSend: function (xhr) {
    //   xhr.setRequestHeader("Content-type", "application/json");
    //   xhr.setRequestHeader("Authorization", "Bearer " + token);
    // },
    data: {},
    success: function(response){
        for (let i = 0; i < response.length; i++){
            let article_title = response[i]['title']
            let period = response[i]['period']
            let review_id = response[i]['id']
            let rate = response[i]['rate']
            let img1 = response[i]['img1']
            let img2 = response[i]['img2']
            let img3 = response[i]['img3']
            let content = response[i]['content']
            let created_at = response[i]['created_at']
            let updated_at = response[i]['updated_at']
            let temp_review =`
            <div>
                <header class="major">
                    <span class="date">${period}</span>
                    <h2>${article_title}</h2>
                    <p>${rate}점</p>
                </header>
                <a href="#" class="image main"><img src="https://previews.123rf.com/images/digidreamgrafix/digidreamgrafix1210/digidreamgrafix121000350/16195590-%EC%82%AC%EA%B3%BC-%EB%86%8D%EC%9E%A5.jpg" alt="default농장이미지" /></a>
                <img src="${img1}" alt=""><img src="${img2}" alt=""><img src="${img3}" alt="">
                <p> ✔️ 후기 : ${content}} <br />
                    ✔️ 업로드 일 : ${created_at} <br />
                    ✔️ 수정 일 : ${updated_at} <br />
                    👉 작성 | "OOO 작성자"
                </p>
                <button onclick="document.getElementById('review_put_box').classList.remove('hide');">후기 수정</button>
                <button onclick="delete_review(${review_id})">후기 삭제</button>
            </div>
                `;
            $('.review_b').append(temp_review);
            let temp_put =`                    
            <div class="apply_box">
            <h3>후기 수정하기</h3>
            </div>
            <!-- 리뷰작성 -->
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"> ✏️ 후기를 수정해 주세요!</label>
                <textarea class="form-control" id="review_content_put" rows="10"></textarea>
            </div>
            <!-- 사진 업로드 -->
            <div class="mb-3">
                <label for="formFileMultiple" class="form-label">💡 후기 사진은 최대 3장 업로드 가능합니다 </label>
                <input class="form-control" type="file" id="put_FileMultiple" multiple>
            </div>
            <!-- 평점 -->
            <select class="form-select put-select" aria-label="rate">
                <option selected>🌟 이만큼 만족했어요!</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <!-- <option value="1">⭐️</option>
                <option value="2">⭐️⭐️</option>
                <option value="3">⭐️⭐️⭐️</option>
                <option value="4">⭐️⭐️⭐️⭐️</option>
                <option value="5">⭐️⭐️⭐️⭐️⭐️</option> -->
            </select>

            <button id="review_uproad" onclick="put_review(${review_id})">후기 수정하기</button>
        `;
        $('#review_put_box').append(temp_put);

        }}

    })
}

function put_review(review_id) {
    // var token = localStorage.getItem("access_token")
    // if (localStorage.getItem("payload") != null) {
    //     const payload = JSON.parse(localStorage.getItem("payload"));
    //     user_id = payload.user_id;
    // }
    let content = $('#review_content_put').val()
    let img = $('#put_FileMultiple')[0];
    if(img.files.length === 0){
        alert("사진을 업로드 해주세요");
        return;
    }else if(img.files.length > 3){
        alert("사진 업로드는 최대 3개까지 가능합니다");
        return;
    }
    let rate = $('.put-select').val();
    const formData = new FormData();
    formData.append("img1",img.files[0]);
    formData.append("img2",img.files[1]);
    formData.append("img3",img.files[2]);
    formData.append("content",content);
    formData.append("rate",rate);
    $.ajax({
    type: "PUT",
    url: "http://127.0.0.1:8000/article/farmer/"+review_id,
    // beforeSend: function (xhr) {
    //   xhr.setRequestHeader("Content-type", "application/json");
    //   xhr.setRequestHeader("Authorization", "Bearer " + token);
    // },
    data: formData,
    contentType: false,
    processData:false,
    beforeSend: function (x) {
        if (x && x.overrideMimeType) {
            x.overrideMimeType("multipart/form-data");
        }
    },
    success: function(response){
        alert("업데이트 완료")
        window.location.reload();
    }

    })
}

function delete_review(review_id) {
    // var token = localStorage.getItem("access_token")
    let user = 3;
    $.ajax({
    type: "DELETE",
    url: "http://127.0.0.1:8000/article/farmer/"+review_id,
    // beforeSend: function (xhr) {
    //   xhr.setRequestHeader("Content-type", "application/json");
    //   xhr.setRequestHeader("Authorization", "Bearer " + token);
    // },
    data: {"user":user},
    contentType: false,
    processData:false,
    beforeSend: function (x) {
        if (x && x.overrideMimeType) {
            x.overrideMimeType("multipart/form-data");
        }
    },
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

function put_profile(user) {
    // var token = localStorage.getItem("access_token")
    // if (localStorage.getItem("payload") != null) {
    //     const payload = JSON.parse(localStorage.getItem("payload"));
    //     user_id = payload.user_id;
    // }
    let img = $('#inputGroupFile04')[0];
    if(img.files.length === 0){
        alert("사진을 업로드 해주세요");
        return;
    }
    let phone_number = $('#inputGroup-phone_number').val()
    let email = $('#inputGroup-email').val()
    let location = $('#inputGroup-location').val()

    const formData = new FormData();
    formData.append("userprofile[img]",img.files[0]);
    formData.append("userprofile[phone_number]",phone_number);
    formData.append("email",email);
    formData.append("userprofile[location]",location);
    $.ajax({
    type: "PUT",
    url: "http://127.0.0.1:8000/user/",
    // beforeSend: function (xhr) {
    //   xhr.setRequestHeader("Content-type", "application/json");
    //   xhr.setRequestHeader("Authorization", "Bearer " + token);
    // },
    data: formData,
    contentType: false,
    processData:false,
    beforeSend: function (x) {
        if (x && x.overrideMimeType) {
            x.overrideMimeType("multipart/form-data");
        }
    },
    success: function(response){
        alert("업데이트 완료")
        window.location.reload();
    }

    })
}