var topics = ["Acura", "Toyota", "Nissan", "Mitsubishi", "Honda"];

function changeState() {

    var state = $(this).attr("data-state");

    if (state === "still") {

        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    } else {

        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

    }

}

function displayGifs() {

    var carTopic = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + carTopic + "&api_key=dc6zaTOxFJmzC&limit=10";

    $("#gif-div").empty();

    $.ajax({

        url: queryURL,
        method: "GET"

    }).done(function(newResponse) {

        var genResults = newResponse.data;

        for (var i = 0; i < genResults.length; i++) {

            var newGif = $("<div>").addClass("new-gif-div");
            var ratingDisplay = $("<p>").html("Rating: " + genResults[i].rating);
            var stillGif = genResults[i].images.fixed_height_still.url;
            var movingGif = genResults[i].images.fixed_height.url;
            var gif = $("<img>").attr("src", stillGif).attr("data-state", "still").attr("data-animate", movingGif).attr("data-still", stillGif).addClass("gif");

            $("#gif-div").append(newGif);
            newGif.append(gif);
            newGif.append(ratingDisplay);

        }

    });

}

function addButton() {

    $("#new-button-div").empty();

    for (var i = 0; i < topics.length; i++) {
        var btn = $("<button>").attr("data-topic", topics[i]).text(topics[i]).addClass("topic-btns btn btn-warning");

        $("#new-button-div").append(btn);
        $("#new-topic-input").val("");

    }

}
addButton();



$("#add-new-topic").on("click", function() {

    event.preventDefault();

    var NewValue = $("#new-topic-input").val();

    topics.push(NewValue);

    if (NewValue !== "") { 

        addButton();
    }

});

$(document).on("click", ".topic-btns", displayGifs);
$(document).on("click", ".gif", changeState);
