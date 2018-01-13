var selText = "";
        $(".dropdown-menu a").click(function(){
          selText = $(this).text();
          $('.dropdown-toggle').html(selText+' <span class="caret"></span>');
          // console.log(selText);
        });
      
        // When user reports- adds to database(submit)
    $("#report-submit").on("click", function(event){
          event.preventDefault();
             
             var currentDate = new Date();
             //console.log(currentDate);
         // Make a newReport object
          var newReport = {
            date: $("#eventDate").val().trim(),
            time: $("#eventTime").val().trim(),
            duration: $("#eventDuration").val().trim(),
            description: $("#inputDescription").val().trim(),
            state: $("#inputState").val().trim(),
            city: $("#inputCity").val().trim(),
            country: $("#inputCountry").val().trim(),
            zipcode: $("#inputZipCode").val().trim(),
            shape: selText,
            reported: currentDate
          };
          
          $.post("/api/new", newReport);
         // console.log("Date  -" + newReport.date);
          alert("Encounter Reported!!");
          $("#eventDate").val("");
          $("#eventTime").val("");
          $("#eventDuration").val("");
          $("#inputState").val("");
          $("#inputCity").val("");
          $("#inputCountry").val("");
          $("#inputDescription").val("");
          $("#inputZipCode").val("");

    });