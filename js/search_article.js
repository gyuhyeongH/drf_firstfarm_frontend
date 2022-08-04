$(document).ready(function () {
    get_article();
    console.log(get_article_button);
    for (let i = 0; i < menu_list.length; i++) {
        get_article_button[i].addEventListener(
            "click",
            () => {
                get_article(menu_list[i]);
            },
            false
        );
    }
});
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

let go_article_detail = document.querySelectorAll(".article");

function get_article(choice) {

    category = document.getElementsByClassName("nav-link active")[0].value;
    if (category == 3) {
        $(".search_box").hide();
    } else {
        $(".search_box").show();
    }
    var token = localStorage.getItem("access");
    console.log(token);
    $.ajax({
        headers: { choice: choice, category: category },
        type: "GET",
        url: "https://rbgud.shop/article/",
        beforeSend: function (xhr) {
            //     xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: {},
        success: function (response) {
            $("#get_article").empty();
            for (let i = 0; i < response.length; i++) {
                // console.log(i);
                let id = response[i]["id"];
                // window.localStorage.setItem("article_id", id);
                console.log(id);
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
        error: function () { $("#get_article").empty(); }
    });
}

function storage_id(id) {
    window.localStorage.setItem("article_id", id);
}
