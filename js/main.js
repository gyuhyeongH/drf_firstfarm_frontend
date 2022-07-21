$(document).ready(function () {
    get_article();
})

function get_article(choice) {

    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/article/",
        data: { "choice": choice },

        success: function (response) {
            // for (let i = 0; i < response.length; i++) {
            //     let title = response[i]['title']
            //     let img_url = response[i]['img_url']
            //     let user = response[i]['user']
            //     let article_id = response[i]['id']
            //     let temp_g1;
            // }
        }
    })
}