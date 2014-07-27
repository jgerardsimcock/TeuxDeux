$(function() {
  var checkbox = $(".checkbox");
  checkbox.click(function(){
      $(this).parent().submit();
  });
   var n = $(".incomplete").length;
   $('#taskCount').html("You have " + n + " tasks");
}); 