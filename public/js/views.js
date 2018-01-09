// When user reports- adds to database(submit)
$("#report-submit").on("click", function(event){
  event.preventDefault();

  // Make a newReport object
  var newReport = {
    country: $("#inputCountry").val().trim(),
    state: $("#inputState").val().trim(),
    city: $("#inputCity").val().trim(),
    zipcode: $("#inputZipCode").val().trim(),
  };

  console.log(newReport);

});
