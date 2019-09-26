$(document).ready(function () {
    //declaring inital array of topics which is tv shows
    let topics = ["The Office", "Riverdale", "The Ranch", "Stranger Things", "The Simpsons", "Criminal Minds", "Rugrats"];

    //loop to go through array and append buttons
    for (let i = 0; i < topics.length; i++) {
        let buttons = $("<button value='" + topics[i] + "'>" + topics[i] + "</button>")
        buttons.appendTo("#topics");
    }

    $("button").on("click", function () {
        let tvShow = $(this).attr("data-tvShow");
        let searchStr = encodeURI($(this).val());
        let queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=f0j6tZXu8gyQYNHWKYatmQHRLfu96jlO&q=" + searchStr + "&limit=10&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(queryURL);

            console.log(response);

            let results = response.data;

            for (let i = 0; i < results.length; i++) {

                let tvShowDiv = $("<div>");
                let p = $("<p>").text("Rating: " + results[i].rating);

                let tvShowImage = $("<img>");
                tvShowImage.attr("src", results[i].images.fixed_height.url);

                tvShowDiv.append(p);
                tvShowDiv.append(tvShowImage);

               $("#gifs-appear-here").prepend(tvShowDiv);

            }
        })
    })

    $(".gif").on("click", function() {
        let state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })

    ,function renderButtons() {
        $("#tvShowButtons").empty();

    }

        $("#addTvShow").on("click", function(event){
            event.preventDefault();

            let topic = $("#tvShow-input").val().trim();
            topics.push(topic);
            $("form").trigger("reset")
            renderButtons();
        });
    });

   

    


    

   


