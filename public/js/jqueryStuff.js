$(function() {
  
  var checkbox = $(".checkbox");
  checkbox.click(function(){
      $(this).parent().submit();
  });
}); 