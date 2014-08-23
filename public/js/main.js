$(function() {
  var checkbox = $(".checkbox");
  checkbox.click(function(){
      $(this).parent().submit();
  });
   var n = $(".incomplete").length;
   $('#taskCount').html("You have " + n + " tasks");

  function taskCreate(newTask){
    var container = $('<li>');
    var br = $('<br>');
    var title = $('<span.title>').html(newTask.title);
    var notes = $('<span.notes>').html(newTask.notes);
    container.append(title);
    container.append(br);
    container.append(notes);
    $('#taskContainer').append(container);
    console.log("taskCreate working");
  }


  $('#newTask').submit(function(event){
    console.log("Is this working");
      event.preventDefault();
    $.ajax('/tasks', {
        method: "POST",
        data:$('#newTask').serialize(),
        success:taskCreate,
        failure:function(error){
        }
    });
  });
}); 