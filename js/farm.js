$(document).ready(function(){
    get_farm();
})
function get_farm() {
    // var token = localStorage.getItem("access_token")
    // if (localStorage.getItem("payload") != null) {
    //     const payload = JSON.parse(localStorage.getItem("payload"));
    //     user_id = payload.user_id;
    // }
    $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/article/farm/",
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
        let prof_img= response['profile_img']
        let temp_profile = `
        <img src=${prof_img} alt="default이미지" srcset="">
                <p> ✔️ 이름 : ${fullname} <br />
                    ✔️ 성별 : ${gender} <br />
                    ✔️ phone_number : ${phone_number} <br />
                    ✔️ email : ${email} <br />
                    🎂 birthday : ${birthday} <br />
                    📍 location : ${location} <br />
                    💡 prefer : ${prefer} <br />
                </p>
                <button id="info_put">정보수정</button>`;
        $('#profilebox').append(temp_profile);
        let temp_intro =`
            <div id="desc">
                <div class="title_box" style="width:100%;align:center;"> ${user} 농장 페이지 😎</div>
                <p> 소개글 : ${introduction} 입니다  <br /></p>
                <p> ${fullname}님은 ${rank} 중 입니다 🌱 <br /></p>
                <div id="percentbar">
                    <div></div>
                    <p>${points}%</p>
                </div>
            </div>
        `
        $('#intro').append(temp_intro);
        for (let i = 0; i < response.length; i++){
            // let article_category = response[i]['article_category']
            let article_id = response[i]['id']
            let farmname = response[i]['farmname']
            let location = response[i]['location']
            let title = response[i]['title']
            let cost = response[i]['cost']
            let requirement = response[i]['requirement']
            let period = response[i]['period']
            let img1 = response[i]['img1']
            console.log(img1)
            // let desc = response[i]['desc']
            // let display_article = response[i]['display_article']
            let exposure_end_date = response[i]['exposuer_end_date']
            let created_at = response[i]['created_at']
            // let updated_at = response[i]['updated_at']

            let temp_li = `
            <li style="float: left; margin: 0 100px 0 40px;">
            <!-- Posts -->
                <section class="posts">
                    <article>
                        <header>
                            <span class="date">${created_at} ~ ${exposure_end_date}</span>
                            <h2><a href="articledetail.html">${title}</a></h2>
                        </header>
                        <img src="http://127.0.0.1:8000/${img1}" alt="사용자가 올린 이미지" srcset="">
                        <p> ✔️ 농장 : ${farmname}} <br />
                            ✔️ 비용 : ${cost}} <br />
                            ✔️ 필수 사항 : ${requirement} <br />
                            ✔️ 위치 : ${location} <br />
                            ✔️ 참여 기간 : ${period} <br />
                            ✔️ 공고 마감 : ${exposure_end_date} <br />
                            ✔️ 업로드 일 : ${created_at} <br />
                        </p>
                        <button onclick="get_apply(${article_id})">공고 신청현황 보기</button>
                        <!-- <button onclick="getdetail()"></button> -->
                    </article>
                </section>
            </li>
            `;
            $('.slides').append(temp_li);
        
        }}
    })
}

function get_apply(article_id) {
    // var token = localStorage.getItem("access_token")
    // if (localStorage.getItem("payload") != null) {
    //     const payload = JSON.parse(localStorage.getItem("payload"));
    //     user_id = payload.user_id;
    // }
    document.getElementById('apply_info').classList.remove('hide');
    $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/article/farm/"+article_id,
    // beforeSend: function (xhr) {
    //   xhr.setRequestHeader("Content-type", "application/json");
    //   xhr.setRequestHeader("Authorization", "Bearer " + token);
    // },
    data: {},
    success: function(response){
        $('.review_container').empty();
        for (let i = 0; i < response.length; i++){
            console.log(i)
            let rank = response[i]['rank']
            let email = response[i]['email']
            let fullname = response[i]['fullname']
            let location = response[i]['location']
            let gender = response[i]['gender']
            let age = response[i]['age']
            let phone_number = response[i]['phone_number']
            let accept = response[i]['accept']
            
            let temp_apply = `
            <div class="review_box">
                <div class="review_rate">${rank}</div>
                <div class="review_content">
                    <button class="review_user_button" onclick="location.href='farmer.html'">${fullname}</button>
                </div>
                <div class="review_content">${gender}</div>
                <div class="review_content">${age}</div>
                <div class="review_content">${location}</div>
                <div class="review_content">${phone_number}</div>
                <div class="review_content">${email}</div>
                <div class="review_content">${accept}</div>
            </div>`;
            $('.review_container').append(temp_apply);
        }
    }
    })
}