/**
 * @file This script enables resizing 
 */
$( function() {
  $( "#resizable" ).resizable();
} );

/**
 * @desc give our cointainers the possibility to be resizable
 * function taken from: https://stackoverflow.com/questions/26928654/using-jquery-ui-resizable-with-twitter-bootstrap-3-grid-classes/26946937#26946937
*/
$(function() {
  if($('.container-fluid').innerWidth()>902)
  {
    $( "#resizable" ).resizable({ maxWidth: $('.container-fluid').innerWidth()-200 });
  }

  $( window ).resize(function() {
    if($('.container-fluid').innerWidth()<=902){
      $('.col-xs-12').css('width','100%');
      $( "#resizable" ).resizable({ disabled: true });
    }
    else {
      if($("#resizable").innerWidth()===$('.container-fluid').innerWidth())
      {
        $('.col-xs-12').css('width','');
      }
      $( "#resizable" ).resizable({ disabled: false, maxWidth: $('.container-fluid').innerWidth()-200 });
      $('#mirror').css('width', Math.floor($('.container-fluid').innerWidth() - $( "#resizable" ).innerWidth() - 5));
    }
    map.invalidateSize();
  });
});

$( window ).resize(function() {

    if($('.container-fluid').width()<=920){
        $('.col-xs-12').css('width','100%');
        $( "#resizable" ).resizable({ disabled: true });
    }
    else {
        $( "#resizable" ).resizable({ disabled: false });
        if($('.col-xs-12').width()==$('.container-fluid').width())$('.col-xs-12').css('width','50%');
        else {
            $( "#resizable" ).css('width',( $('#resizable').width() / ($('#resizable').width() + $('#mirror').width()) ) * $('.container-fluid').width());
            $('#mirror').css('width', $('.container-fluid').width() - $( "#resizable" ).width() - 20 );
        }
    }
});

