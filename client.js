

$(function(){

  $(".android-fab").click(function(){
    var body = $("html, body, .android-content");
    var pos = $(".videoFrame").offset().top
    body.stop().animate({scrollTop:pos}, '500', 'swing', function() {

    });
  })


  window.setTimeout(function(){

      var delta = $(".mdl-layout__header-row").height()
      $(".videoFrame").height($(window).height()-delta)
      $(".videoFrame").width($(window).width())

  },1000);
})
