$(document).ready(function () {
    get_article();
    console.log(get_article_button)
    for (let i = 0; i < menu_list.length; i++) {
        get_article_button[i].addEventListener('click', () => { get_article(menu_list[i]); }, false);
    }
})
const firstTabEl = document.querySelector('#myTab li:first-child button')
const firstTab = new bootstrap.Tab(firstTabEl)

firstTab.show()

let get_article_button = document.querySelectorAll('.onclick')
let menu_list = ['', '', '', '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']




function get_article(choice) {
    category = document.getElementsByClassName('nav-link active')[0].value
    $.ajax({
        headers: { "choice": choice, "category": category },
        type: "GET",
        url: "http://127.0.0.1:8000/article/",
        data: {},
        success: function (response) {
            $('#get_article').empty();
            for (let i = 0; i < response.length; i++) {
                console.log(i)
                let title = response[i]['title']
                let location = response[i]['location']
                let cost = response[i]['cost']
                let exposure_end_date = response[i]['exposure_end_date'].substr(0, 10)
                let updated_at = response[i]['updated_at'].substr(0, 10)
                let temp_article = `<div class="articles">
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
            </div>`
                $('#get_article').append(temp_article);

            }
        }
    })
}