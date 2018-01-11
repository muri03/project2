

var selText = "";
        $(".dropdown-menu a").click(function(){
          selText = $(this).text();
          $('.dropdown-toggle').html(selText+' <span class="caret"></span>');
          // console.log(selText);
        });
        // When user reports- adds to database(submit)
        $("#report-submit").on("click", function(event){
          event.preventDefault();
         
 // Make a newReport object
  var newReport = {
    date: $("#eventDate").val().trim(),
    time: $("#eventTime").val().trim(),
    duration: $("#eventDuration").val().trim(),
    state: $("#inputState").val().trim(),
    city: $("#inputCity").val().trim(),
    zipcode: $("#inputZipCode").val().trim(),
    shape: selText
  };

 // console.log(newReport);

});
