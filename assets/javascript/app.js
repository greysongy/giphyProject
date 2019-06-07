$(".apiB").on("click", function () {
    console.log($(this).attr("data-emotion").toLowerCase());
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=cat&api_key=wslWpWhssAgYDK6zVXacBDsacT47flr4&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(response);
            for (var i = 0; i < 10; i++) {
                var newImage = $("<img>");
                newImage.attr("src", response.data[i].images.fixed_width.url);
                newImage.addClass("border border-black ml-3");
                
                    $("#imgRow").append(newImage);
                
            }
        })
})