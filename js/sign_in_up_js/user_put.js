function XSSCheck(str, level) {
    if (level == undefined || level == 0) {
      str = str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g, "");
    } else if (level != undefined && level == 1) {
      str = str.replace(/\</g, "&lt;");
      str = str.replace(/\>/g, "&gt;");
    }
    return str;
  }
// 사용자 정보 수정하기
async function handle_signput() {
    var token = localStorage.getItem("access")
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }

    const input_img = document.getElementById("input_img").files[0]
    const location = document.getElementById("locations").innerText
    const introduction = document.getElementById("introduction").value
    const prefer = document.getElementById("prefer").value

    const signputData = new FormData();

    signputData.append('img', input_img);
    signputData.append("location", XSSCheck(location, 1));
    signputData.append("introduction", XSSCheck(introduction, 1));
    signputData.append("prefer", XSSCheck(prefer, 1));
    
    $.ajax({
        type: "PUT",
        url: "https://rbgud.shop/article/farmer/" + review_id,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: signputData,
        cache: false,
        contentType: false,
        processData: false,
        success: function () {
            const payload = JSON.parse(localStorage.getItem("payload"));
            alert("수정사항이 정상적으로 저장되었습니다.")
            if (payload != null) {
                const user_category = payload.category;
                if (user_category == 1) {
                    window.location.replace(`https://hwisu.shop/farm.html`);
                } else {
                    window.location.replace(`https://hwisu.shop/farmer.html`);
                }
            }
        },
        error:function(){
            alert("수정 실패")
        }
    })
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

    if ([...files].length > 1) {
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


