$(document).ready(function () {
    //declaring inital array of topics which is tv shows
    let topics = ["The Office", "Riverdale", "The Ranch", "Stranger Things", "The Simpsons", "Criminal Minds", "Rugrats"];

    //loop to go through array and append buttons
    for (let i = 0; i < topics.length; i++) {
        let buttons = $(`<button value="${topics[i]}">${topics[i]}</button>`);

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
                tvShowImage.attr("src", results[i].images.fixed_height_still.url);
                tvShowImage.attr("class", "gif");
                tvShowImage.attr("data-still", results[i].images.fixed_height_still.url);
                tvShowImage.attr("data-animate", results[i].images.fixed_height.url);
                tvShowImage.attr("data-state", "still");


                tvShowDiv.append(p);
                tvShowDiv.append(tvShowImage);

               $("#gifs-appear-here").prepend(tvShowDiv);

               

            }
        })
    })

    $(document).on("click", ".gif", function() {
        let state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })





        $(document).on("click", ".btn", function(event){
            event.preventDefault();

            let input = $("#tvShow-input").val().trim();
            topics.push(input);
            $(`<button value="${topics[i]}">${topics[i]}</button>`);

            buttons.appendTo("#topics");
            
        });
    });

   

    


    

   


