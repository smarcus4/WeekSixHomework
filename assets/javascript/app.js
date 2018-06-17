$( document ).ready(function() {

var planes = ["fighter plane", "F-15", "F-16", "F-18", "C-17", "Cessna 172", "Top Gun", "Archer Piper", "P-51"];

function displayPlanes(){

    $("#planeView").empty();
    var plane = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + plane + "&api_key=GTQOuJ3hdVfFGMgkMBosHnCu9sXvkqP6&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
       .done(function(response) {
         var results = response.data;
         console.log(queryURL);
        
        for(var i=0; i<results.length; i++){

            if (results[i].rating !== "r" && results[i].rating !=="pg-13"){
              
                
                var rating = results[i].rating;
                var p= $("<p>").text("Rating: " + rating);
                var planeImage = $("<img>");

                planeImage.attr("src", results[i].images.fixed_height_still.url);
                planeImage.attr("data-still", results[i].images.fixed_height_still.url);
                planeImage.attr("data-animate", results[i].images.fixed_height.url);
                planeImage.attr("data-state", "still");
                planeImage.addClass("planeImage");

         

                $("#planeView").append(p);
                $("#planeView").append(planeImage);
                console.log(this);  

            }

   
                
        }

        $(".planeImage").on("click", function(){

        var state=$(this).attr("data-state");
        console.log("The State of trhe Gif is: " + state);

        if(state=="still"){
            $(this).attr("data-state","animate");
            $(this).attr("src", $(this).attr("data-animate"));
        }else{
            $(this).attr("data-state", "still")
            $(this).attr("src", $(this).attr("data-still"));
        }

        });

       
    });
}

    function renderButtons(){ 

        // Deletes the cartoons prior to adding new cartoons (this is necessary otherwise you will have repeat buttons)
        $('#buttons-view').empty();
    
        // Loops through the array of cartoons
        for (var i = 0; i < planes.length; i++){
    
          // Then dynamicaly generates buttons for each cartoon in the array
    
          // Note the jQUery syntax here... 
            var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
            a.addClass('plane'); // Added a class 
            a.addClass("btn btn-success"); // Added a class 
            a.addClass("btn btn-primary btn-lg");
            a.attr('data-name', planes[i]); // Added a data-attribute
            a.text(planes[i]); // Provided the initial button text
            $('#buttons-view').append(a); // Added the button to the HTML
        }
      }
      $('#addPlane').on('click', function(){

        //clear container
        //$('#cartoonsView').html("");     
    
        // This line of code will grab the input from the textbox
        var planeSearch = $('#plane-input').val().trim();
    
        // The cartoon from the textbox is then added to our array
        planes.push(planeSearch);
        
        // Our array then runs which handles the processing of our cartoon array
        renderButtons();
    
        // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
        return false;
      })
    
      // ========================================================
    
      // Generic function for displaying the cartoonInfo
      $(document).on('click', '.plane', displayPlanes);
    
    
      // ========================================================
    
      // This calls the renderButtons() function
      renderButtons();
      //displaycartoonInfo();
    });