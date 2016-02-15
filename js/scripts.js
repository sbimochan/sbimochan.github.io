$(document).ready(function(){
    
    $("#section-worksgrid").delegate('.item a', 'mouseover mouseleave', function(e){
        if (e.type == 'mouseover') {
            var img = $(this).find('img').attr('rel');
            $(this).find('span').css("background", "url('images/"+ img +"')").css("background-size", "cover").css("background-repeat", "no-repeat");
            
        } else {
            $(this).find('span').css("background", "none");
        }
        return false;
    });
});
