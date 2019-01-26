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

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.data);

        var arr = response.data;
        $("#gifs-view").empty();

        arr.forEach(function (gif) {
            var theTopic = $("<div>");
            $(theTopic).addClass("col");
            var rating = gif.rating.toUpperCase();
            console.log(rating);

            var theRating = $("<h4>");

            $(theRating).text("Rating: " + rating);
            var image = gif.images.fixed_height_still.url;
            var theImage = $("<img src=" + image + " alt='Smiley face' >");
            console.log(gif.images.fixed_height_still.url);

            

            $(theTopic).append(theImage);
            $(theTopic).append(theRating);
            $(theTopic).appendTo("#gifs-view");

        });

    });

};

$(document).on("click", ".btn", function () {

    var chosenTopic = $(this).attr("data-name");
    displayGif(chosenTopic);

})

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var topic = $("#user-input").val().trim();

    // The movie from the textbox is then added to our array
    topics.push(topic);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

renderButtons();