$(function() {
  var checkbox = $(".checkbox");
  checkbox.click(function(){
      $(this).parent().submit();

  
  });

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

$('#deleteButton').submit(function(event){
  console.log("Delete Work?");
  event.preventDefault();
  var URL = $(this).attr("action");
  $.ajax(URL, {
    method: "POST",
    success: deleteTask,
    failure: function(error){
    }
  });

});


//this is done by clicking an icon
function deleteTask(){
      $(this).closest('li').remove();
      // taskCounter();
}



function taskCounter(){
   var n = $(".incomplete").length;
   $('#taskCount').html("You have " + n + " tasks");
  }



 function taskCreate(newTask){
    var container = $('<li>', {
      class: "incomplete",
    });
    var taskFormSchema = {
       action: "/tasks/completed" + newTask._id, 
       method: "POST",
       encytpe: "application/x-www-form-urlencoded"
      };

    var taskForm = $('<form>',taskFormSchema);

    var checkbox = $('<input>', {
        type: "checkbox",
        name: "task", 
        class: "checkbox"
        });

    var deleteFormSchema = {
        id: "deleteButton",
        action: "/tasks/" + newTask._id + "?_method=DELETE",
        method: "POST", 
        enctype:"application/x-www-form-urlencoded"
        };

    var deleteForm = $('<form>', deleteFormSchema);

    var deleteButton = $('<button>', {
        text: "Delete task"
        // type: "submit"
        });
    var title = $('<a>', {
        text: newTask.title,
        href: "/tasks/" + newTask._id
        });
    var notes = $('<a>', {
        text: newTask.notes,
        href: "/tasks/" + newTask._id
        });


    container.append(taskForm);//append form to li
    taskForm.append(checkbox);
    container.append(title);
    container.append(notes);
    container.append(deleteForm);
    deleteForm.append(deleteButton);
    
    $('#taskContainer').prepend(container);
    console.log("taskCreate working");
    // $('#newTask')[0].reset();
    taskCounter();
  } 



//Remove checkbox, use check icon to indicate something complete



  //build in checked/unchecked green/incomplete as a jquery function
  //dynamically get ID route to be href
  //using jquery to dynamically add attributes

//ajax call to update 'checked' state
  //adjust routing do does not redirect but returns json
//on successful submit clear the fields

//update count