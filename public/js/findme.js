$('#findme').click(function(){
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log('your position is', position.coords);

    $.ajax({
      data: position.coords,
      dataType: 'json',
      method: 'post',
      url: '/geocode',
      success: function(response){
        console.log(response);
      }
    });

  });
});
