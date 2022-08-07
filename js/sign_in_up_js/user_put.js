const backend_base_2_url = "https://rbgud.shop";
const frontend_base_2_url = "https://polite-paprenjak-e2afb5.netlify.app";

// 사용자 정보 가져오기
window.onload = async function loadUserProfile() {
    userdata = await getUser()
    console.log(userdata)

    document.getElementById("email").value = userdata.email
    const userprofile_img = document.querySelector("#default_img")
    userprofile_img.setAttribute("src", `${backend_base_2_url}${userdata.userprofile.img}`)
    userprofile_img.setAttribute("class", " int_img")
    document.getElementById("locations").innerText = userdata.userprofile.location
    document.getElementById("introduction").value = userdata.userprofile.introduction
    document.getElementById("prefer").value = userdata.userprofile.prefer
}

// 사용자 정보 수정하기
async function handle_signput() {
    // 객체
    const password = document.getElementById("pswd1").value
    const password_2 = document.getElementById("pswd2").value
    const email = document.getElementById("email").value
    const input_img = document.getElementById("input_img").files[0]

    const location = document.getElementById("locations").innerText
    const introduction = document.getElementById("introduction").value
    const prefer = document.getElementById("prefer").value

    // if (password_2 == "" || password !== password_2) {
    //     return alert("비밀번호를 확인해주세요.")
    // }

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
    
    // signputData.append("userprofile[location]", location);
    // signputData.append("userprofile[introduction]", introduction);
    // signputData.append("userprofile[prefer]", prefer);

    signputData.append('password', password);
    signputData.append('email', email);
    signputData.append('img', input_img);
    signputData.append('userprofile', userprofile);
    
    // 유저 고유 번호
    user = await getUser()
    const user_id = user.id

    const response = await fetch(`${backend_base_2_url}/user/` + user_id + `/`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
            Accept: "application/json"
        },
        body: signputData,
    });
    response_json = await response.json();

    if (response.status == 200) {
        // window.location.replace(`${frontend_base_2_url}/signin.html`);
        alert("수정사항이 정상적으로 저장되었습니다.")
        setTimeout(function () {
            location.reload();
        }, 100); 
        // location.reload();
        // location.reload(true);
        // window.location = self.location;
        // window.reload()
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


// 유저 데이터 불러오기
async function getUser() {
    const response = await fetch(`${backend_base_2_url}/user/`, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
            Accept: "application/json"
        }
    }
    )
    response_json = await response.json()
    return response_json
}


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


// 프로필 이미지 업로드
function getImageFiles(e) {
    const uploadFiles = [];
    const files = e.currentTarget.files;
    const imagePreview = document.querySelector('.box_img');
    const docFrag = new DocumentFragment();

    // console.log(files)

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

    // console.log(new_img)

    return new_img;
}

const realUpload = document.querySelector('.img_find');
const upload = document.querySelector('.upload');

upload.addEventListener('click', () => realUpload.click());
realUpload.addEventListener('change', getImageFiles);