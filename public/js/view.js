$(document).ready(function(){
   $.get("/api/", function(data){
    var option;
    for (var i = 0; i < data.length; i++){
      option += '<option value="' + data[i] + '">' + data[i] + '</option>';
    }
    $("#country").append(option);
   });

    $("#country").change(function(){
      $('#state').children('option:not(:first)').remove();
      if($('select[id=country]').val() === null){
        $('#state').children('option:not(:first)').remove();
        $('#city').children('option:not(:first)').remove();
      } else{
      $.get("/list/" + $('select[id=country]').val(), function(data){
        var option2;
        for (var i = 0; i < data.length; i++){
          if(data[i] === null){
            option2 += '<option value="N/A">N/A</option>';
          }else{
            option2 += '<option value="' + data[i] + '">' + data[i] + '</option>';
          }
        }
        $('#state').children('option:not(:first)').remove();
        $('#state').append(option2)
      });
      }
    });

    $("#state").change(function(){
      if($('select[id=state]').val() === "State"){
        $('#city').children('option:not(:first)').remove();
      } else if($('select[id=state]').val() === "N/A"){
        $.get("/list2/" + $('select[id=country]').val(), function(data){
        var option3;
        for (var i = 0; i < data.length; i++){
          option3 += '<option value="' + data[i] + '">' + data[i] + '</option>';
        }
        $('#city').children('option:not(:first)').remove();
        $('#city').append(option3)
      });
      } else {
      $.get("/list/" + $('select[id=country]').val() + "/" + $('select[id=state]').val(), function(data){
        var option3;
        for (var i = 0; i < data.length; i++){
          option3 += '<option value="' + data[i] + '">' + data[i] + '</option>';
        }
        $('#city').children('option:not(:first)').remove();
        $('#city').append(option3)
      });
    }
    });


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
});