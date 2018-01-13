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
      $('#city').children('option:not(:first)').remove();
      if($('select[id=country]').val() === null){
        $('#state').children('option:not(:first)').remove();
        $('#city').children('option:not(:first)').remove();
      } else{
      $.get("/list/" + $('select[id=country]').val(), function(data){
        var option2;
        for (var i = 0; i < data.length; i++){
          if(data[i] === null){
            option2 += '<option value="null">N/A</option>';
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
      $('#city').children('option:not(:first)').remove();
      if($('select[id=state]').val() === "State"){
        $('#city').children('option:not(:first)').remove();
      } else if($('select[id=state]').val() === "null"){
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

    $("Input").click(function(event){
      event.preventDefault();
      $('tbody').children('tr').remove();
      console.log($('select[id=state]').val() + " and " + $('select[id=city]').val() + " and " + $('select[id=country]').val())
        if($('select[id=state]').val() === "null" && $('select[id=city]').val() === "null" && $('select[id=country]').val() != "null"){
          $.get("/findcountry/" + $('select[id=country]').val(), function(data){
            console.log(data);
            for(var i = 0; i < data.length; i++){
              $('tbody').append("<tr id=" + data[i].city + "><td>" + data[i].encounter_date + "</td><td>" + data[i].city + "</td><td>" + data[i].country + "</td><td>" + data[i].duration + " Seconds</td><td>" + data[i].description + "</td></tr>");
            }
          });
        } else if($('select[id=state]').val() != "null" && $('select[id=city]').val() === "null" && $('select[id=country]').val() != "null"){
          console.log("hello");
          $.get("/findstate/" + $('select[id=country]').val() + "/" + $('select[id=state]').val(), function(data){
            for(var i = 0; i < data.length; i++){
              $('tbody').append("<tr id=" + data[i].city + "><td>" + data[i].encounter_date + "</td><td>" + data[i].city + "</td><td>" + data[i].country + "</td><td>" + data[i].duration + " Seconds</td><td>" + data[i].description + "</td></tr>");
            }
          });
        } else if($('select[id=state]').val() === "null" && $('select[id=city]').val() != "null" && $('select[id=country]').val() != "null"){
            $.get("/findcity/" + $('select[id=country]').val() + "/" + $('select[id=city]').val(), function(data){
              for(var i = 0; i < data.length; i++){
                $('tbody').append("<tr id="+ data[i].city +"><td>" + data[i].encounter_date + "</td><td>" + data[i].city + "</td><td>" + data[i].country + "</td><td>" + data[i].duration + " Seconds</td><td>" + data[i].description + "</td></tr>");
              }
            });
          } else {
            $.get("/findcitystate/" + $('select[id=country]').val() + "/" + $('select[id=state]').val() + "/" + $('select[id=city]').val(), function(data){
              for(var i = 0; i < data.length; i++){
                $('tbody').append("<tr id=" + data[i].city + "><td>" + data[i].encounter_date + "</td><td>" + data[i].city + "</td><td>" + data[i].country + "</td><td>" + data[i].duration + " Seconds</td><td>" + data[i].description + "</td></tr>");
              }
            });
          }
      });

    $(document).on('click', 'tr', function(event){
      var city = $(this).attr("id");
      console.log(city);
      //event.preventDefault();
      $("#map").empty();
      $("#map").append('<div class="embed-responsive embed-responsive-16by9" style="height:300px"><iframe id="myFrame" class="embed-responsive-item" src="https://www.google.com/maps/embed/v1/place?q=' + city + ',&zoom=10&key=AIzaSyB7ydrZE1U4_y3TjyeaO2aVyfWzxUnxKuk" allowfullscreen></iframe></div>');
    });

    //$("tr").click(function(event){
      //event.preventDefault();
      //$("#map").empty();
      //$("#map").append('<div class="embed-responsive embed-responsive-16by9" style="height:300px"><iframe    id="myFrame"   class="embed-responsive-item" src="https://www.google.com/maps/embed/v1/place?q=Nevada+Homey+Airport,&zoom=10&key=AIzaSyB7ydrZE1U4_y3TjyeaO2aVyfWzxUnxKuk" allowfullscreen></iframe></div>');
    //})


        /* function to dynamically change the iframe map- still not working line 138 on INDEX.HTML
changeSrc(chicago);
 function changeSrc(myobj) {
 // we grab what the database specifies
 var userLocation = myobj;
  //once submit gets clicked we change the path of the iframe to what the user has typed
 $("#myFrame").attr('src', "https://www.google.com/maps/embed/v1/search?q=" + userLocation + "&key=AIzaSyB7ydrZE1U4_y3TjyeaO2aVyfWzxUnxKuk");
}
*/
});