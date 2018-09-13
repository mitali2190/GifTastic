$(document).ready(function () {

  //array of gif search topic
  var topics = ["dog", "cat", "bird", "rabbit", "hamster", "goldfish", "ferret", "turtle", "gerbil", "chicken", "capybara", "serval", "frog"];

  //clears out the btn-div div
  $("#btn-div").empty();

  //looping through an array
  for (var i = 0; i < topics.length; i++) {
      //variable to store
      var a = $("<button>");
      // Adding a class of animal to our button
      a.addClass("animal-topic");
      // Adding a data-attribute
      a.attr("data-name", topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the buttons-view div
      $("#btn-div").append(a);
  }

  //click event of submit button
  $("#add-animal").click(function (event) {

      event.preventDefault();

      //value from text box will save in the variable animal
      var animal = $("#new-animal").val();
      $("#new-animal").val("");

      //text box value added to an array
      topics.push(animal);

      //empty div where button stored to prevent redundancy
      $("#btn-div").empty();

      //looping through an array
      for (var i = 0; i < topics.length; i++) {
          //variable to store
          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("animal-topic");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#btn-div").append(a);
      }
  });

  // Adding click event listen listener to all buttons
  $(document).on("click", "button", function () {

      $("#animal_gif").empty();
      // Grabbing and storing the data-animal property value from the button
      var animal_data = $(this).attr("data-name");
      // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal_data + "&api_key=dc6zaTOxFJmzC&limit=10";
      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
      })
        // After data comes back from the request
        .done(function (response) {
            console.log(queryURL);
            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
                // Creating and storing a div tag
                var animalDiv = $("<div>");

                // Creating a paragraph tag with the topics item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                animalDiv.addClass("gif-style");
                var animalImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.attr("src", results[i].images.downsized_still.url);
                animalImage.attr("data-still", results[i].images.downsized_still.url);
                animalImage.attr("data-animate", results[i].images.downsized.url);
                animalImage.attr("data-state", "still");
                animalImage.addClass("gif_img");

                animalDiv.append(p);
                //append image into the div
                animalDiv.append(animalImage);
                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#animal_gif").prepend(animalDiv);
            }
        });
  });

  $(document).on("click", ".gif_img", function () {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      if (state == "animate") {
          $(this).attr("src", $(this).data("still")); $(this).attr("data-state", "still");
      }
      else {
          $(this).attr("src", $(this).data("animate")); $(this).attr("data-state", "animate");
      }
  });
});