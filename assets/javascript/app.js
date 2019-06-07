//global variables to set an initial display mode for the user
var niceMode = true;
var ratingMode = false;

//event listener that adds a new button, and ensures it has all of the correct information stored
$("#submit").on("click", function () {
    if ($("#emotionInput").val() != "") {
        var newButton = $("<button>");
        newButton.addClass("btn btn-light border border-black m-2");
        newButton.addClass("apiB");
        newButton.html("<strong>" + $('#emotionInput').val() + "</strong>");
        newButton.attr("data-emotion", $("#emotionInput").val());
        $("#buttons").append(newButton);
    }

})

//more lengthy event listener that deals with the click of a topic button, and then queries the GIPHY API to retrieve relevant info, before appending it according to the mode selected
$(document).on("click", ".apiB", function () {
    var emotion = $(this).attr("data-emotion").toLowerCase();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "t&api_key=wslWpWhssAgYDK6zVXacBDsacT47flr4&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            if (niceMode) {
                $("#imgRow").empty();
                $("#imgRowLower").empty();
            }
            if (ratingMode) {
                for (var i = 0; i < 10; i++) {
                    $("#" + (i + 1)).empty();
                }
            }
            //iterates through the ten returned objects
            for (var i = 0; i < 10; i++) {
                var newImage = $("<img>");
                newImage.addClass("gif");
                newImage.attr("data-still", response.data[i].images.fixed_width_still.url);
                newImage.attr("data-animate", response.data[i].images.fixed_width.url);
                newImage.attr("data-state", "still");
                newImage.attr("src", response.data[i].images.fixed_width_still.url);
                newImage.addClass("border border-black ml-3 mt-3");
                var rating = $("<h6>Rating");
                if (niceMode) {
                    if (i >= 5) {
                        $("#imgRowLower").append(newImage);
                    }
                    else {
                        $("#imgRow").append(newImage);
                    }
                }
                else {
                    $("#" + (i + 1)).append(newImage);
                    $("#" + (i + 1)).append("Rating: " + response.data[i].rating);
                }
            }
        })
})

//additional listener that deals with pausing and unpausing gifs
$(document).on("click", ".gif", function () {
    console.log("This ran");
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//two final listeners that can be selected for a particular mode of display
$("#aesthetic").on("click", function () {
    niceMode = true;
    ratingMode = false;
    for (var i = 0; i < 10; i++) {
        $("#" + (i + 1)).empty();
    }
})

$("#rating").on("click", function () {
    ratingMode = true;
    niceMode = false;
})

