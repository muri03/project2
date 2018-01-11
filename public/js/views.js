// var shapeOfCraft = '';
// $('.dropdown-item').click(function(event) {
//   event.preventDefault(); // Prevents scrolling to top of page
//   shapeOfCraft = $(this).text();   // Get the text value of the thing that was clicked
// })

// var shapeOfCraft= "";
// $(document).on('click','.dropdown-menu li a', function(event){
//   event.preventDefault(); // Prevents scrolling to top of page
//   shapeOfCraft = $('#button').val($(this).html());// Get the text value of the thing that was clicked
// });

// var shapeOfCraft = "";
// $(document).on('click', '#shapeOfCraft .dropdown-menu li a', function() {

//     $('#dropdownMenuLink').val($(this).html());

// }); 

// $('#shapeOfCraft').change(function(){
//   console.log("hi");
// });
// console.log(shapeOfCraft);

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
        //   var newReport = {
           
            
        //   console.log(newReport);
        // });


// // When user reports- adds to database(submit)
// $("#report-submit").on("click", function(event){
//   event.preventDefault();

//   // Make a newReport object
  var newReport = {
    date: $("#eventDate").val().trim(),
    time: $("#eventTime").val().trim(),
    duration: $("#eventDuration").val().trim(),
    state: $("#inputState").val().trim(),
    city: $("#inputCity").val().trim(),
    zipcode: $("#inputZipCode").val().trim(),
    shape: selText
  };

  console.log(newReport);

});
