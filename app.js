var topics = ["Teachers", "School", "Students", "Homework", "Middle School", "High School", "Elementary", "Education"];



function renderButtons() {
    $("#buttons-view").empty();
    topics.forEach(function (element) {
        var $but = $("<button>");
        $but.text(element);
        $but.attr("data-name", element);
        $but.addClass("btn btn-primary");
        $("#buttons-view").append($but);
    });
};


function displayGif(topic) {


    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=6JaUGwfaleO0j2FHhpdjYRWk1uu1MfZ0";

   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data);

        var arr = response.data;
        $("#gifs-view").empty();

        arr.forEach(function (element) {
            var theTopic = $("<div>");
            $(theTopic).addClass("col");
            var rating = element.rating.toUpperCase();
            console.log(rating);

            var theRating = $("<h4>");

            $(theRating).text("Rating: " + rating);
            var image = element.images.fixed_width_still.url;
            var theImage = $("<img src=" + image + " alt='Smiley face' >");
            theImage.attr("gif", element.images.fixed_width.url);
            theImage.attr("static", element.images.fixed_width_still.url);
            theImage.attr("item", element.id);
            

            $(theTopic).append(theImage);
            $(theTopic).append(theRating);
            $(theTopic).appendTo("#gifs-view");

        });

    });

};

var alreadyClicked = [];
$(document).on("click", "img", function(){

    if(alreadyClicked.includes($(this).attr("item"))){
        
        $(this).attr("src", $(this).attr("static"));
        alreadyClicked.remove($(this).attr("item"));
        
    }else{
        
        alreadyClicked.push($(this).attr("item"));
        $(this).attr("src", $(this).attr("gif"));

    }
})

$(document).on("click", ".btn", function () {

    var chosenTopic = $(this).attr("data-name");
    displayGif(chosenTopic);

})

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var topic = $("#user-input").val().trim();
    topics.push(topic);    
    renderButtons();
});

renderButtons();