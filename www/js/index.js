//----------- CORDOVA ONLOAD ---------------- //
// Cordova device event listener - will not work in browser
// document.addEventListener("deviceready", initialise, false);

//----------- HTML ONLOAD ---------------- //
// JQuery ready event listener
// $(document).ready(initialise);         // or... $(window).on( "load", readyFn );

//----------- JQM ONLOAD ---------------- //
// JQuery Mobile pageloaded event listener
$(document).on('pageshow', '#pageone', onPageShow);

//----------- BACKENDLESS INIT ---------------- //

var APP_ID = '34EA7ACB-AE7A-2B3D-FF92-8890D3D21F00';
var APP_KEY = '0A22E733-DC85-3BE8-FFA3-829944B27400';
var APP_VER = 'v1';  // NOT USED IN 2017/18 WORKSHEET

//Backendless.initApp(APP_ID, APP_KEY, APP_VER);  // 2016/17 version
Backendless.initApp(APP_ID, APP_KEY);


function onPageShow() {
    console.log("loaded");
    // EVENT LISTENERS HERE
    // Initialise buttons
    $("#addTaskButton").click(onAddTask);
    $("#update").click(runQuery);
    
    //run a query
//	Backendless.Data.of( "Tasks" ).find().then( processResults).catch(error);
    runQuery();

}

function runQuery () {
    
    Backendless.Data.of( "Tasks" ).find().then( processResults).catch(error);
}

function onAddTask() {
		console.log("add task button clicked");
        var tasktext = $("#addTaskText").val();
        
        var newTask = {};
        newTask.Task = tasktext;
    
        Backendless.Data.of("Tasks").save(newTask).then(saved).catch(error);
    
    runQuery();

}

function saved(savedTask) { 
      console.log( "new Contact instance has been saved" + savedTask);
}

function  processResults(tasks) {
    console.log(tasks[1].Task)
    
    //example of getting object created timestamp
    var created = tasks[1].created;
    var date = new Date(created);
    console.log(date)
    
    
    //wipe the list clean
    $('#taskList').empty();
    
    //add each tasks to HTML list
    for (var i = 0; i < tasks.length; i++) { 
        $("#taskList").append("<li>" + tasks[i].Task + "</li>");
    }
    
    //refresh the listview
    $("#taskList").listview('refresh');


}

function error(err) {
    alert(err);
}

