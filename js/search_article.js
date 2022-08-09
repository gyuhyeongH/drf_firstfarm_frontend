$(document).ready(function () {
    get_article();
});



let menu_recommend = document.getElementsByClassName("nav-link")[3];
if (localStorage.getItem("access")) {
    menu_recommend.style.visibility = "visible";
} else {
    menu_recommend.style.visibility = "hidden";
}

const firstTabEl = document.querySelector("#myTab li:first-child button");
const firstTab = new bootstrap.Tab(firstTabEl);

firstTab.show();

let get_article_button = document.querySelectorAll(".onclick");
let menu_list = [
    "",
    "",
    "",
    "",
    "",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
];

for (let i = 0; i < menu_list.length; i++) {
    get_article_button[i].addEventListener(
        "click",
        () => {
            get_article(menu_list[i]);
        },
        false
    );
}

function get_article(choice) {
    category = document.getElementsByClassName("nav-link active")[0].value;
    if (category == 3) {
        $(".search_box").hide();
    } else {
        $(".search_box").show();
    }

    var token = localStorage.getItem("access");
    $.ajax({
        headers: { choice: choice, category: category },
        type: "GET",
        url: "https://rbgud.shop/article/",
        beforeSend: function (xhr) {
            if (localStorage.getItem("access")) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },
        data: {},
        success: function (response) {
            $("#get_article").empty();
            if (response.length == 0) {
                let temp_article = '<p>검색 결과 없음</p>'
                $("#get_article").append(temp_article);
            }
            let responsed = response.reverse();
            for (let i = 0; i < responsed.length; i++) {
                let id = response[i]["id"];
                let title = response[i]["title"];
                let location = response[i]["location"];
                let cost = response[i]["cost"];
                let exposure_end_date = response[i]["exposure_end_date"].substr(0, 10);
                let updated_at = response[i]["updated_at"].substr(0, 10);
                let temp_article = `<a href="articledetail.html" onclick="storage_id(${id})" class="article_link">
                    <div class="articles">
                    <div class="contents">
                        ${location}
                    </div>
                    <div class="contents">
                    ${title}
                    </div>
                    <div class="contents">
                    ${cost}
                    </div>
                    <div class="contents">
                    ${exposure_end_date}
                    </div>
                    <div class="contents">
                    ${updated_at}
                    </div>
                </div></a>`;

                $("#get_article").append(temp_article);
            }
        },
        error: function () {
            $("#get_article").empty();
            let temp_article = '<p>검색 결과 없음</p>'
            $("#get_article").append(temp_article);
        }
    });
}


function storage_id(article_id) {
    window.localStorage.setItem("article_id", article_id);
}



function search_articles() {
    let search_text = $("#search_text").val();
    if (search_text == '') {
        return false;
    }
    $.ajax({
        type: "GET",
        url: "https://rbgud.shop/article/search",
        data: { 'search_text': search_text },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (response) {
            $("#get_article").empty();
            if (response.length == 0) {
                let temp_article = '<p>검색 결과 없음</p>'
                $("#get_article").append(temp_article);
            }
            let responsed = response.reverse();
            for (let i = 0; i < responsed.length; i++) {
                let id = response[i]["id"];
                let title = response[i]["title"];
                let location = response[i]["location"];
                let cost = response[i]["cost"];
                let exposure_end_date = response[i]["exposure_end_date"].substr(0, 10);
                let updated_at = response[i]["updated_at"].substr(0, 10);
                let temp_article = `<a href="articledetail.html" onclick="storage_id(${id})" class="article_link">
                    <div class="articles">
                    <div class="contents">
                        ${location}
                    </div>
                    <div class="contents">
                    ${title}
                    </div>
                    <div class="contents">
                    ${cost}
                    </div>
                    <div class="contents">
                    ${exposure_end_date}
                    </div>
                    <div class="contents">
                    ${updated_at}
                    </div>
                </div></a>`;

                $("#get_article").append(temp_article);
            }
        },
        error: function () {
            $("#get_article").empty();
            let temp_article = '<p>검색 결과 없음</p>'
            $("#get_article").append(temp_article);
        }
    });
}
