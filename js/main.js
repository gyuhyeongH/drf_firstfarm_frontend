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
    console.log(category)
    console.log(choice)
    $.ajax({
        headers: { "choice": choice, "category": category },
        type: "GET",
        url: "http://127.0.0.1:8000/article/",
        data: {},
        success: function (response) {
            console.log(response)
            for (let i = 0; i < response.length; i++) {
                let title = response[i]['title']
                let img_url = response[i]['img_url']
                let user = response[i]['user']
                let article_id = response[i]['id']
                let temp_g1;
            }
        }
    })
}