// const backend_base_url = "http://127.0.0.1:8000";
const backend_base_url = "https://rbgud.shop";
const frontend_base_url = "https://polite-paprenjak-e2afb5.netlify.app";

$(document).ready(function () {
    get_farm();
})
function add_hide(){
    document.getElementById('plzhide').classList.add('hide');
    document.getElementById('put_profile').classList.remove('hide');
}
function get_farm() {
    var token = localStorage.getItem("access_token")
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }
    $.ajax({
        type: "GET",
        url: "https://rbgud.shop/article/farm/",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Content-type", "application/json");
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: {},
        success: function (response) {
            let user =response[0]['user']
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
            let prof_img= response[0]['userinfo']['profile_img']
            if(prof_img == undefined || null){
                prof_img = 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/05/logoyogo-1-4.jpg';
            }else{
                prof_img = backend_base_url+prof_img
            }
    
            let temp_title = `<div class="title"> ${fullname} 농장주 페이지 😎</div>`;
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
                    <button id="info_put" onclick="add_hide()">정보 수정</button>      
             </div>`;
            $('#profilebox').append(temp_profile);
            let temp_put_profile = `
            <div id="put_profile" class="hide">
                <div class="input-group" style="margin-bottom: 20px;display: flex;flex-direction: row;">
                    <p style="width:30%">프로필 변경: </p>
                    <div class="custom-file" style="width:30%">
                    <input type="file" class="custom-file-input" id="input_img">
                    </div>
                </div>
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                    <span class="input-group-text">위치:</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="locations">
                </div>   
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                    <span class="input-group-text">email</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="email">
                </div>  
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                    <span class="input-group-text">소개:</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="introduction">
                </div>  
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                    <span class="input-group-text" >선호:</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"id="prefer">
                </div>  
                <button id="info_put" onclick="handle_signput(${user})" >정보수정</button>
            </div>
            `;
            $('#profilebox').append(temp_put_profile);
            let temp_intro = `
            <div id="desc">
                <p> 소개글 : ${introduction} 입니다  <br /></p>
                <p> ${fullname}님은 ${rank} 중 입니다 🌱 <br /></p>
                <p>다음 랭크까지 ${points}% 모았어요 ! <br /></p>
            </div>
            <div id="percentbar">
                <div>
                    <div id="pointbar"></div>
                </div>
            </div>
            
        `
            $('#intro').append(temp_intro);
            for (let i = 0; i < response.length; i++) {
                let article_id = response[i]['id']
                let farmname = response[i]['farmname']
                let location = response[i]['location']
                let title = response[i]['title']
                let cost = response[i]['cost']
                let requirement = response[i]['requirement']
                let period = response[i]['period']
                let exposure_end_date = response[i]['exposuer_end_date']
                let created_at = response[i]['created_at']
                let img1 = response[i]['img1']
                if(img1 == undefined || img1 == null){
                    img1 = 'https://png.pngtree.com/thumb_back/fh260/back_our/20190617/ourmid/pngtree-organic-farm-spring-hui-poster-background-material-image_127030.jpg';
                }else{
                    img1 = backend_base_url+img1
                }

                let temp_li = `
            <li>
                <div>
                    <div class="posts" style="position: relative;
                    background-image: url(${img1});                                             
                    height: 100vh; background-size: cover;">
                        <div class="content">
                            <h3>${created_at} ~ ${exposure_end_date}!</h3>
                            <h2><a href=#>${title}</a></h2>
                        </div>
                        <div class="img-cover">
                            <p> ✔️ 농장 : ${farmname} <br />
                            ✔️ 비용 : ${cost} <br />
                            ✔️ 필수 사항 : ${requirement} <br />
                            ✔️ 위치 : ${location} <br />
                            ✔️ 참여 기간 : ${period} 일 동안 참여 <br />
                            ✔️ 공고 마감 : ${exposure_end_date} <br />
                            ✔️ 업로드 일 : ${created_at} <br />
                            </p>
                            <div>                           
                             <a onclick="get_apply(${article_id})" title="Button push blue/green" class="button btnPush btnBlueGreen">신청자 조회</a>
                            </div>
                        </div>
                    </div>
                </div>
            </li>

            `;
                $('.slides').append(temp_li);

            }
        }
    })
}

function get_apply(article_id) {
    var token = localStorage.getItem("access_token")
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }
    document.getElementById('apply_info').classList.remove('hide');
    $.ajax({
        type: "GET",
        url: "https://rbgud.shop/article/farm/" + article_id,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Content-type", "application/json");
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: {},
        success: function (response) {
            $('.review_container').empty();
            for (let i = 0; i < response.length; i++) {
                console.log(i)
                let apply_id = response[i]['user']
                let rank = response[i]['userinfo']['rank']
                let email = response[i]['userinfo']['email']
                let fullname = response[i]['userinfo']['fullname']
                let location = response[i]['userinfo']['location']
                let gender = response[i]['userinfo']['gender']
                let age = response[i]['userinfo']['birthday']
                let phone_number = response[i]['userinfo']['phone_number']
                let accept = response[i]['accept']

                if (accept == true){
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
                        <div class="review_content">
                            수락함!
                            <button onclick="put_apply(${article_id},${apply_id},${accept})">수락 취소</button>
                        </div>
                    </div>`;
                    $('.review_container').append(temp_apply);
                }else{
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
                        <div class="review_content">
                        대기중... 
                        <button onclick="put_apply(${article_id},${apply_id},${accept})">신청 수락</button>
                        </div>
                    </div>`;
                    $('.review_container').append(temp_apply);
                }
            }
        }
    })
}

function put_apply(article_id,apply_id,accept) {
    if(accept==true){
        accept = false
    }else{
        accept = true
    }
    $.ajax({
        type: "PUT",
        url: "http://127.0.0.1:8000/article/farm/"+article_id+"/"+apply_id,
        data: {'accept':accept},
        success: function (response) {
            alert('신청 변경 완료');
            window.location.reload();
            
        }
    })
}

// 사용자 정보 수정하기
async function handle_signput(user_id) {
    // 객체
    const email = document.getElementById("email").value
    const input_img = document.getElementById("input_img").files[0]

    const signputData = new FormData();

    if (input_img !== undefined) {
        console.log(input_img)
        signputData.append('img', input_img);
    }
    
    const userprofile = JSON.stringify({
        'location': document.getElementById("locations").innerText,
        'introduction': document.getElementById("introduction").value,
        'prefer': document.getElementById("prefer").value,
    })

    signputData.append('email', email);
    signputData.append('img', input_img);
    signputData.append('userprofile', userprofile);
    

    const response = await fetch(`${backend_base_url}/user/` + user_id + `/`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
            Accept: "application/json"
        },
        body: signputData,
    });
    response_json = await response.json();

    if (response.status == 200) {
        alert("수정사항이 정상적으로 저장되었습니다.")
        setTimeout(function () {
            window.location.reload();
        }, 100); 

    }
    else if (response_json['email']) {
        alert("사용중인 이메일이거나 이메일 형식이 맞지 않습니다.\n 다시 확인해주세요.")
    }
    else if (response_json['userprofile']) {
        alert("사용중인 전화번호 입니다.\n 다시 확인해주세요.")
    }
    else if (response.status == 400) {
        alert("잘못된 정보입니다. 다시 확인해주세요.");
        console.log(response_json)
    }
}