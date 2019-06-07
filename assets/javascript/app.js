var niceMode = true;
var ratingMode = false;

$("#submit").on("click", function () {
    if ($("#emotionInput").val() != "") {
        var newButton = $("<button>");
        newButton.addClass("btn btn-light border border-black m-2");
        newButton.addClass("apiB");
        console.log($(newButton)[0].classList);
        newButton.html("<strong>" + $('#emotionInput').val() + "</strong>");
        newButton.attr("data-emotion", $("#emotionInput").val());
        $("#buttons").append(newButton);
    }

})

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
            console.log(response);
            if (ratingMode) {
                for (var i = 0; i < 10; i++) {
                    $("#" + (i + 1)).empty();
                }
            }
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
                    console.log("#" + (i + 1));
                    $("#" + (i + 1)).append(newImage);
                    $("#" + (i + 1)).append("Rating: " + response.data[i].rating);
                }
            }
            // for(var i = 0; i < 10; i++) {
            //     console.log(response.data[i].rating);
            //     var rating = $("<h6>");
            //     rating.text("Rating: " + response.data[i].rating);
            //     if (i >= 5) {
            //         $("#imgRowLower").append(rating);
            //     }
            //     else {
            //         $("#imgRow").append(rating);
            //     }
            // }
        })
})

$(document).on("click", ".gif", function () {
    console.log("This ran");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

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
    // $("#imgRow").empty();
    // $("#imgRowLower").empty();
})

// $("#submit").on("click", function () {
//     if ($("#emotionInput").val() != "") {
//         var newButton = $("<button>");
//         newButton.addClass("btn btn-light border border-black m-2");
//         newButton.addClass("apiB");
//         newButton.html("<strong>" + $('#emotionInput').val() + "</strong>");
//         newButton.attr("data-emotion", $("#emotionInput").val());
//         $("#buttons").append(newButton);
//     }

// })

