

function post_articledetail() {
    var token = localStorage.getItem("access");

    let article_category = $('#article_category').val()
    let farm_name = $('#farm_name').val()
    let location = $('#sample4_roadAddress').val()
    let title = $('#title').val()
    let cost = $('#cost').val()
    let requirement = $('#requirement').val()
    let period = $('#period').val()
    let desc = $('#desc').val()
    let img1 = $('#img')[0].files[0]
    let img2 = $('#img')[0].files[1]
    let img3 = $('#img')[0].files[2]
    let form_data = new FormData()

    form_data.append("user", user)
    form_data.append("article_category", article_category)
    form_data.append("farm_name", farm_name)
    form_data.append("location", location)
    form_data.append("title", title)
    form_data.append("cost", cost)
    form_data.append("requirement", requirement)
    form_data.append("period", period)
    form_data.append("desc", desc)
    form_data.append("img1", img1)
    form_data.append("img2", img2)
    form_data.append("img3", img3)


    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/article/detail/",
        data: form_data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", "JWT " + token);
        },
        cache: false,
        contentType: false,
        processData: false,

        error: function () {
            alert("error")
            window.location.reload();
        },
        success: function () {
            alert("게시글이 작성되었습니다.")
            window.location.reload();
        }
    });
}



