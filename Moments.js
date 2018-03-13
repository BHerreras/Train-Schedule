
var config = {
	apiKey: "AIzaSyCco-Ku6CDgTRUYGoTrtzLLu3W7omECKPQ",
	authDomain: "timesheet-1dca7.firebaseapp.com",
	databaseURL: "https://timesheet-1dca7.firebaseio.com",
	projectId: "timesheet-1dca7",
	storageBucket: "timesheet-1dca7.appspot.com",
	messagingSenderId: "320358286467"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#add-train").on("click", function (event) {
	event.preventDefault();

	var trainName = $("#train-name-input").val().trim();
	var trainDestination = $("#destination-input").val().trim();
	var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
	var trainFreq = $("#frequency-input").val().trim();


	var newTrain = {
		name: trainName,
		destination: trainDestination,
		start: trainStart,
		frequency: trainFreq,
	};


	database.ref().push(newTrain);


	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.start);
	console.log(newTrain.frequency);

	alert("Train successfully added");


	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#start-input").val("");
	$("#frequency-input").val("");

});


database.ref().on("child_added", function (childSnapshot) {
	var child = childSnapshot.val();
	console.log(child.name);
	// Attempt in trying to calculate the next arrival time.     
	var tFrequency = $("#frequency-input");
	// Time is 3:30 AM     
	var firstTime = $("#start-input");
	// First Time (pushed back 1 year to make sure it comes before current time)     
	var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	console.log(firstTimeConverted);
	// Current Time     
	var currentTime = moment();
	console.log(moment(currentTime).format("hh:mm"));
	// Difference between the times     
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log(diffTime);
	// Time apart (remainder)     
	var tRemainder = diffTime % tFrequency;
	console.log(tRemainder);
	// Minute Until Train     
	var tMinutesTillTrain = tFrequency - tRemainder;
	console.log(tMinutesTillTrain);
	// Next Train     
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	console.log(moment(nextTrain).format("hh:mm"));

	var table = $('tbody');
	var row = $('<tr>');

	var nameCol = $('<td>').text(child.name);
	var destinationCol = $('<td>').text(child.destination);
	var startCol = $('<td>').text(child.start);
	var frequencyCol = $('<td>').text(child.frequency);
	var nextCol = $('<td>').text(child.nextTrain);

	// Obtain a reference to the tbody element in the DOM

	// Create and save a reference to new empty table row
	// Append the td elements to the new table row
	row.append(nameCol);
	row.append(destinationCol);
	row.append(startCol);
	row.append(frequencyCol);
	row.append(nextCol);
	// Append the table row to the tbody element
	table.append(row);
});

