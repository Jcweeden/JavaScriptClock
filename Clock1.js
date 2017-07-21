window.onload= function (){

var paperSizeX = 490;
var paperSizeY = 280;

var posX = 125;	//x position of clockface
var posY = 125; //y position of clockface
var clockSize = 100;

var timerCountOn = false;
var timerCountValue = 0;

var paper = new Raphael( 0, 0, paperSizeX, paperSizeY);
var backGround = paper.rect(0, 0, paperSizeX, paperSizeY);
backGround.attr({ fill: "rgb(245,237,172)"});

var digitalBoxBG = paper.rect(posX-56,posY+109,111.5,28,3);
	digitalBoxBG.attr({ fill: "gray"});
var digitalBox = paper.rect(posX-52,posY+110,104,25,3);
	digitalBox.attr({ fill: "white"});


var timeDisplay = paper.text(posX,posY+122, "time");
timeDisplay.attr({ "font-size": 16, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});

var alarmOn = false;
var alarmRinging = false;
var alarmSetHour = 0;
var alarmSetMinute = 0;
var alarmSetSecond = 0;

var changeTimeOn =false;
var flagsDisplayed = false;

var secondsTick = 6;	//degrees rotation of second hand
var minutesTick = 0.06;	//degrees rotation of minutes hand
var hoursTick = 30;		//degrees rotation of hours hand

var timeZoneValue = 0;

/* watch face*/
var faceBG = paper.circle(posX,posY,clockSize+6);
faceBG.attr({ fill: "gray"});
var face = paper.circle(posX,posY,clockSize);
face.attr({ fill: "white"});



var dayDisplay = paper.text(posX+42,posY+25, "");
var dateDisplay = paper.text(posX+32,posY+5, "");
var monthDisplay = paper.text(posX+54,posY+5, "");
var yearDisplay = paper.text(posX+42,posY+15, "");



/* seconds hand*/
var seconds = paper.rect(posX-1.5,posY,3,clockSize-10, 2.5);
seconds.attr({ fill: "black"});
seconds.linecap = "round";

/* minutes hand*/
var minutes = paper.rect(posX-3,posY,4,clockSize-15, 3);
minutes.attr({ fill: "black"});

/* hours hand*/
var hours = paper.rect(posX-3.5,posY,7,clockSize-50, 3);
hours.attr({ fill: "black"});

var handHolder = paper.circle(posX ,posY,(clockSize/20));
handHolder.attr({ fill: "white"});

/*ALARM*/

var alarmStartButton = paper.rect(296 ,150,104,25,3);
	alarmStartButton.attr({ fill: "green"});
var alarmStartButtonText = paper.text(345, 162.5, "Turn On");

var alarmHour = paper.rect(277.5 ,100,40,25);
	alarmHour.attr({ fill: "white"});
var alarmHourText = paper.text(297.5, 112.5, "00");
	alarmHourText.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});

var alarmhourUpButton = paper.path("M287.5,98,307.5,98,297.5,82z");
	alarmhourUpButton.attr({ fill: "green"});

var alarmhourDownButton = paper.path("M287.5,128,307.5,128,297.5,142z");
	alarmhourDownButton.attr({ fill: "red"});

var alarmColon1 = paper.text(322.5, 112.5, ":");
	alarmColon1.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});

var alarmMinutes = paper.rect(327.5,100,40,25);
	alarmMinutes.attr({ fill: "white"});
var alarmMinutesText = paper.text(347.5, 112.5, "00");
	alarmMinutesText.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});

var alarmminutesUpButton = paper.path("M337.5,98,357.5,98,347.5,82z");
	alarmminutesUpButton.attr({ fill: "green"});

var alarmminutesDownButton = paper.path("M337.5,128,357.5,128,347.5,142z");
	alarmminutesDownButton.attr({ fill: "red"});

var alarmColon2 = paper.text(372.5, 112.5, ":");
	alarmColon2.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});


var alarmSeconds = paper.rect(377.5 ,100,40,25);
	alarmSeconds.attr({ fill: "white"});
var alarmSecondsText = paper.text(397.5, 112.5, "00");
	alarmSecondsText.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});


var alarmsecondsUpButton = paper.path("M387.5,98,407.5,98,397.5,82z");
	alarmsecondsUpButton.attr({ fill: "green"});

var alarmsecondsDownButton = paper.path("M387.5,128,407.5,128,397.5,142z");
	alarmsecondsDownButton.attr({ fill: "red"});


var alarmGroup = paper.set().push(alarmStartButton,alarmStartButtonText,alarmHour,alarmHourText,alarmhourUpButton,alarmhourDownButton,alarmColon1,alarmMinutes,alarmMinutesText,alarmminutesUpButton,alarmminutesDownButton,alarmColon2,alarmSeconds,alarmSecondsText,alarmsecondsUpButton,alarmsecondsDownButton);

alarmStartButton.click(function () {	
if (alarmStartButtonText.attr("text") == "Turn On") {	//when button is green and STARTing timer
	alarmOn = true;
	alarmStartButtonText.attr({text: "Turn Off"});
	alarmStartButton.attr({fill: "red"});

	alarmhourUpButton.attr({ fill: "gray"});
	alarmhourDownButton.attr({ fill: "gray"});
	alarmminutesUpButton.attr({ fill: "gray"});
	alarmminutesDownButton.attr({ fill: "gray"});
	alarmsecondsUpButton.attr({ fill: "gray"});
	alarmsecondsDownButton.attr({ fill: "gray"});
}
else if (alarmStartButtonText.attr("text") == "Turn Off") {	//when button is green and STARTing timer
	alarmOn = false;
	//alarmRinging = false;
	alarmStartButtonText.attr({text: "Turn On"});
	alarmStartButton.attr({fill: "green"});

	alarmHour.attr({ fill: "white"});
	alarmMinutes.attr({ fill: "white"});
	alarmSeconds.attr({ fill: "white"});

	alarmhourUpButton.attr({ fill: "green"});
	alarmhourDownButton.attr({ fill: "red"});
	alarmminutesUpButton.attr({ fill: "green"});
	alarmminutesDownButton.attr({ fill: "red"});
	alarmsecondsUpButton.attr({ fill: "green"});
	alarmsecondsDownButton.attr({ fill: "red"});
}
});

alarmStartButtonText.click(function () {	
if (alarmStartButtonText.attr("text") == "Turn On") {	//when button is green and STARTing timer
	alarmOn = true;
	alarmStartButtonText.attr({text: "Turn Off"});
	alarmStartButton.attr({fill: "red"});

	alarmhourUpButton.attr({ fill: "gray"});
	alarmhourDownButton.attr({ fill: "gray"});
	alarmminutesUpButton.attr({ fill: "gray"});
	alarmminutesDownButton.attr({ fill: "gray"});
	alarmsecondsUpButton.attr({ fill: "gray"});
	alarmsecondsDownButton.attr({ fill: "gray"});
}
else if (alarmStartButtonText.attr("text") == "Turn Off") {	//when button is green and STARTing timer
	alarmOn = false;
	//alarmRinging = false;
	alarmStartButtonText.attr({text: "Turn On"});
	alarmStartButton.attr({fill: "green"});

	alarmHour.attr({ fill: "white"});
	alarmMinutes.attr({ fill: "white"});
	alarmSeconds.attr({ fill: "white"});

	alarmhourUpButton.attr({ fill: "green"});
	alarmhourDownButton.attr({ fill: "red"});
	alarmminutesUpButton.attr({ fill: "green"});
	alarmminutesDownButton.attr({ fill: "red"});
	alarmsecondsUpButton.attr({ fill: "green"});
	alarmsecondsDownButton.attr({ fill: "red"});
}
});

/*alarm hours*/
alarmhourUpButton.click(function () {
if (alarmStartButtonText.attr('text') === 'Turn On') {
	if (alarmSetHour < 23) {	//add hour if below 99
		alarmSetHour++;
		alarmHourText.attr({ "text": checkTime(alarmSetHour)});
	}
	else if (alarmSetHour == 23) {
		alarmSetHour = 0;
		alarmHourText.attr({ "text": checkTime(alarmSetHour)});
	}
}
});
alarmhourDownButton.click(function () {
if (alarmStartButtonText.attr('text') === 'Turn On') {
	if (alarmSetHour > 0) {	//add hour if below 99
		alarmSetHour--;
		alarmHourText.attr({ "text": checkTime(alarmSetHour)});
	}
	else if (alarmSetHour == 0) {
		alarmSetHour = 23;
		alarmHourText.attr({ "text": checkTime(alarmSetHour)});
	}
}
});



/*alarm minutes*/
alarmminutesUpButton.click(function () {
if (alarmStartButtonText.attr('text') === 'Turn On') {
	if (alarmSetMinute < 59) {	//add hour if below 99
		alarmSetMinute++;
		alarmMinutesText.attr({ "text": checkTime(alarmSetMinute)});
	}
	else if (alarmSetMinute == 59) {
		alarmSetMinute = 0;
		alarmMinutesText.attr({ "text": checkTime(alarmSetMinute)});
	}
}
});

alarmminutesDownButton.click(function () {
if (alarmStartButtonText.attr('text') === 'Turn On') {
	if (alarmSetMinute > 0) {	//add hour if below 99
		alarmSetMinute--;
		alarmMinutesText.attr({ "text": checkTime(alarmSetMinute)});
	}
	else if (alarmSetMinute == 0) {
		alarmSetMinute = 59;
		alarmMinutesText.attr({ "text": checkTime(alarmSetMinute)});
	}
}
});

/*alarm seconds*/
alarmsecondsUpButton.click(function () {
if (alarmStartButtonText.attr('text') === 'Turn On') {
	if (alarmSetSecond < 59) {	//add hour if below 99
		alarmSetSecond++;
		alarmSecondsText.attr({ "text": checkTime(alarmSetSecond)});
	}
	else if (alarmSetSecond == 59) {
		alarmSetSecond = 0;
		alarmSecondsText.attr({ "text": checkTime(alarmSetSecond)});
	}
}
});

alarmsecondsDownButton.click(function () {
if (alarmStartButtonText.attr('text') === 'Turn On') {
	if (alarmSetSecond > 0) {	//add hour if below 99
		alarmSetSecond--;
		alarmSecondsText.attr({ "text": checkTime(alarmSetSecond)});
	}
	else if (alarmSetSecond == 0) {
		alarmSetSecond = 59;
		alarmSecondsText.attr({ "text": checkTime(alarmSetSecond)});
	}
}
});


/*TIMEZONES*/

var timerNeg5Button = paper.rect(245.5 ,65,220,35,3);
	timerNeg5Button.attr({ fill: "white"});
var timerNeg5ButtonText = paper.text(380.5, 82.5, "GMT - 5: Peru");
	timerNeg5ButtonText.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});
var peru = {graphic: paper.image("peru.svg", 247.5, 67, 60, 30), name: "Peru", timezone: +6 };	

var timerNeg4Button = paper.rect(245.5 ,105,220,35,3);
	timerNeg4Button.attr({ fill: "white"});
var timerNeg4ButtonText = paper.text(380.5, 122.5, "GMT - 4: Bolivia");
	timerNeg4ButtonText.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});
var bolivia = {graphic: paper.image("bolivia.svg", 247.5, 107, 60, 30), name: "bolivia", timezone: +6 };	

var timer0Button = paper.rect(245.5 ,145,220,35,3);
	timer0Button.attr({ fill: "white"});
var timer0Buttontext = paper.text(380.5, 162.5, "GMT + 0: Britain");
	timer0Buttontext.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});
var britain = {graphic: paper.image("british.svg", 247.5, 147, 60, 30), name: "Britain - London", timezone: 0 };
	timer0Button.attr({ fill: "green"});


var timer1Button = paper.rect(245.5 ,185,220,35,3);
	timer1Button.attr({ fill: "white"});
var timer1Buttontext = paper.text(380.5, 202.5, "GMT + 1: France");
	timer1Buttontext.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});
var france = {graphic: paper.image("france.svg", 247.5, 187, 60, 30), name: "France - Paris", timezone: +1 };	

var timer6Button = paper.rect(245.5 ,225,220,35,3);
	timer6Button.attr({ fill: "white"});
var timer6Buttontext = paper.text(380.5, 242.5, "GMT + 6 : Cambodia");
	timer6Buttontext.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});
var cambodia = {graphic: paper.image("cambodia.svg", 247.5, 227, 60, 30), name: "Cambodia", timezone: +6 };	

var timezonesGroup = paper.set().push(timerNeg5Button,timerNeg5ButtonText,peru,timerNeg4Button,timerNeg4ButtonText,bolivia,timer0Button,timer0Buttontext,britain,timer1Button,timer1Buttontext,france,timer6Button,timer6Buttontext,cambodia);

timerNeg5Button.click(function () {	/*PERU -5*/
	timeZoneValue = -5;	

	timerNeg5Button.attr({ fill: "green"});
	timerNeg4Button.attr({ fill: "white"});
	timer0Button.attr({ fill: "white"});
	timer1Button.attr({ fill: "white"});
	timer6Button.attr({ fill: "white"});
});

timerNeg5ButtonText.click(function () {	/*PERU -5*/
	timeZoneValue = -5;	

	timerNeg5Button.attr({ fill: "green"});
	timerNeg4Button.attr({ fill: "white"});
	timer0Button.attr({ fill: "white"});
	timer1Button.attr({ fill: "white"});
	timer6Button.attr({ fill: "white"});
});

timerNeg4Button.click(function () {	/*Bolivia -4*/
	timeZoneValue = -4;	

	timerNeg5Button.attr({ fill: "white"});
	timerNeg4Button.attr({ fill: "green"});
	timer0Button.attr({ fill: "white"});
	timer1Button.attr({ fill: "white"});
	timer6Button.attr({ fill: "white"});
});

timerNeg4ButtonText.click(function () {	/*Bolivia -4*/
	timeZoneValue = -4;	

	timerNeg5Button.attr({ fill: "white"});
	timerNeg4Button.attr({ fill: "green"});
	timer0Button.attr({ fill: "white"});
	timer1Button.attr({ fill: "white"});
	timer6Button.attr({ fill: "white"});
});

timer0Button.click(function () {	/*Britain 0*/
	timeZoneValue = 0;	

	timerNeg5Button.attr({ fill: "white"});
	timerNeg4Button.attr({ fill: "white"});
	timer0Button.attr({ fill: "green"});
	timer1Button.attr({ fill: "white"});
	timer6Button.attr({ fill: "white"});
});

timer0Buttontext.click(function () {	/*Britain 0*/
	timeZoneValue = 0;	

	timerNeg5Button.attr({ fill: "white"});
	timerNeg4Button.attr({ fill: "white"});
	timer0Button.attr({ fill: "green"});
	timer1Button.attr({ fill: "white"});
	timer6Button.attr({ fill: "white"});
});

timer1Button.click(function () {	/*France 1*/
	timeZoneValue = 1;	

	timerNeg5Button.attr({ fill: "white"});
	timerNeg4Button.attr({ fill: "white"});
	timer0Button.attr({ fill: "white"});
	timer1Button.attr({ fill: "green"});
	timer6Button.attr({ fill: "white"});
});

timer1Buttontext.click(function () {	/*France 1*/
	timeZoneValue = 1;	

	timerNeg5Button.attr({ fill: "white"});
	timerNeg4Button.attr({ fill: "white"});
	timer0Button.attr({ fill: "white"});
	timer1Button.attr({ fill: "green"});
	timer6Button.attr({ fill: "white"});
});

timer6Button.click(function () {	/*Cambodia 6*/
	timeZoneValue = 6;	

	timerNeg5Button.attr({ fill: "white"});
	timerNeg4Button.attr({ fill: "white"});
	timer0Button.attr({ fill: "white"});
	timer1Button.attr({ fill: "white"});
	timer6Button.attr({ fill: "green"});
});

timer6Buttontext.click(function () {	/*Cambodia 6*/
	timeZoneValue = 6;	

	timerNeg5Button.attr({ fill: "white"});
	timerNeg4Button.attr({ fill: "white"});
	timer0Button.attr({ fill: "white"});
	timer1Button.attr({ fill: "white"});
	timer6Button.attr({ fill: "green"});
});

/*STOPWATCH*/

var timerCountDisplay = paper.text(347.5, 67, "00:00.00");	//textfield value is set in
	timerCountDisplay.attr({ "font-size": 16, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});
var currentLapDisplay = paper.text(347.5, 87, "00:00.00");
	currentLapDisplay.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});



var timerButton = paper.rect(267.5 ,105,50,25,3);
	timerButton.attr({ fill: "green"});
var timerButtontext = paper.text(292.5, 117.5, "Start");

var timerPauseButton = paper.rect(322.5 ,105,50,25,3);
	timerPauseButton.attr({ fill: "gray"});
var timerPauseButtontext = paper.text(347.5, 117.5, "Pause");

var timerLapButton = paper.rect(377.5 ,105,50,25,3);
	timerLapButton.attr({ fill: "gray"});
var timerLapButtontext = paper.text(402.5, 117.5, "Lap");

var timerLapBox = paper.rect(255.5 ,135, 188,125,3);
	timerLapBox.attr({ fill: "white"});

//List of stopwatch instances
var stopwatchLaps = [];	//contains each lap
var lapsCounter = [];
var lapTimeTotal = [];
var lastLapTimerValue = 0;
var currentLapTimer = 0;
currentLapValue = 0;
var totalLaps = 0;

var stopwatchGroup = paper.set().push(timerLapBox, timerButton, timerButtontext, timerPauseButton, timerPauseButtontext, timerLapButton,timerLapButtontext, timerCountDisplay, currentLapDisplay);


//Generate stopwatch
// function genStopWatch(time, pos_x, pos_y){	//when lap is pressed
// 	var stopWatch = new Object();		    //create stopwatch
// 	stopWatch.time = time;				    //new stopwatch holds same time
// 	stopWatch.textField = paper.text(pos_x, pos_y, "" + time);
// 	stopwatchLaps.push(stopWatch);		    //adds to array
// 	lastLapTimerValue = timerCountValue;

// 	stopwatchLaps[stopwatchLaps.length-1].textField.attr({x:375, y:80 + offset, text:timerCountValue-lastLapTimerValue}); 

// }

// function updateStopwatches(){
// 	if(timerCountOn){
// 		if (stopwatchLaps.length > 6) {			//if six laps already exist remove 
// 			stopwatchLaps[0].textField.attr({text: ""}); //clear text
// 			stopwatchLaps.splice(0,1); 			//and remove from array
// 		}
// 		var offset = 80;
// 		for(var i = 0; i < stopwatchLaps.length; i++){	//for each lap
// 			// if(i == stopwatchLaps.length - 1){			//if last lap added
// 			// 	stopwatchLaps[i].time += 1;				//add
// 			// };
// 			//stopwatchLaps[i].time
// 			offset += 20;
// 		};
// 	};
// 	setTimeout(function(){updateStopwatches();}, 1000);
// };

// updateStopwatches();
//094837569739430578378594856



timerButton.click(function () {	/*START*/
if (timerButtontext.attr('text') === 'Start' ) {	//when button is green and STARTing timer
	timerButtontext.attr({text: "Reset"});			//change button into reset timer
	timerButton.attr({ fill: "red"});

	timerPauseButton.attr({ fill: "yellow"});		//activate pause button
	timerLapButton.attr({ fill: "green"});			//activate lap button

	//start timer counting
	timerCountOn = true;	
}	/*RESET*/
else if (timerButtontext.attr('text') === 'Reset' ) {//when pressing to STOP the timer
	timerButtontext.attr({text: "Start"});				//change button to start timer
	timerButton.attr({ fill: "green"});
	
	timerPauseButtontext.attr({text: "Pause"});
	timerPauseButton.attr({ fill: "gray"});				//deactiviate the pause button
	timerLapButton.attr({ fill: "gray"});			//deactivate lap button

	//reset timer to zero
	timerCountOn = false;
	timerCountValue = 0;	//off
	currentLapValue = 0;
	timerCountDisplay.attr({'text': convertTimeToFormat(0)});

	totalLaps=0;
	lastLapTimerValue =0;
	currentLapDisplay.attr({'text': convertTimeToFormat(currentLapValue)});

	timerCountValue =0;

	for (var i = 0; i < stopwatchLaps.length; i++) {
		stopwatchLaps[i].attr({text: ""});  //clear text
	}
		stopwatchLaps.splice(0,stopwatchLaps.length); 			//and remove from array

	for (var i = 0; i < lapsCounter.length; i++) {
		lapsCounter[i].attr({text: ""});  //clear text
	}
		lapsCounter.splice(0,lapsCounter.length); 			//and remove from array

	for (var i = 0; i < lapTimeTotal.length; i++) {
		lapTimeTotal[i].attr({text: ""});  //clear text
	}
		lapTimeTotal.splice(0,lapTimeTotal.length); 			//and remove from array
};
});

timerButtontext.click(function () {	/*START*/
if (timerButtontext.attr('text') === 'Start' ) {	//when button is green and STARTing timer
	timerButtontext.attr({text: "Reset"});			//change button into reset timer
	timerButton.attr({ fill: "red"});

	timerPauseButton.attr({ fill: "yellow"});		//activate pause button
	timerLapButton.attr({ fill: "green"});			//activate lap button

	//start timer counting
	timerCountOn = true;	
}	/*RESET*/
else if (timerButtontext.attr('text') === 'Reset' ) {//when pressing to STOP the timer
	timerButtontext.attr({text: "Start"});				//change button to start timer
	timerButton.attr({ fill: "green"});
	
	timerPauseButtontext.attr({text: "Pause"});
	timerPauseButton.attr({ fill: "gray"});				//deactiviate the pause button
	timerLapButton.attr({ fill: "gray"});			//deactivate lap button

	//reset timer to zero
	timerCountOn = false;
	timerCountValue = 0;	//off
	currentLapValue = 0;
	timerCountDisplay.attr({'text': convertTimeToFormat(0)});

	totalLaps=0;
	lastLapTimerValue =0;
	currentLapDisplay.attr({'text': convertTimeToFormat(currentLapValue)});

	timerCountValue =0;

	for (var i = 0; i < stopwatchLaps.length; i++) {
		stopwatchLaps[i].attr({text: ""});  //clear text
	}
		stopwatchLaps.splice(0,stopwatchLaps.length); 			//and remove from array

	for (var i = 0; i < lapsCounter.length; i++) {
		lapsCounter[i].attr({text: ""});  //clear text
	}
		lapsCounter.splice(0,lapsCounter.length); 			//and remove from array

	for (var i = 0; i < lapTimeTotal.length; i++) {
		lapTimeTotal[i].attr({text: ""});  //clear text
	}
		lapTimeTotal.splice(0,lapTimeTotal.length); 			//and remove from array
};
});

	/*PAUSE*/
timerPauseButton.click(function () {

if (timerButtontext.attr('text') === 'Reset' &&  timerPauseButtontext.attr('text') === 'Pause') {	//only pressable when the time has started
	timerPauseButtontext.attr({text: "Resume"});
	timerPauseButton.attr({ fill: "green"});
	timerLapButton.attr({ fill: "red"});			//deactivate lap button
	
	//code to pause timer
	timerCountOn = false;

}   /*RESUME*/
else if (timerButtontext.attr('text') === 'Reset' && timerPauseButtontext.attr('text') === 'Resume')  {	//when pressing stop
	timerPauseButtontext.attr({text: "Pause"});
	timerPauseButton.attr({ fill: "yellow"});
	timerCountOn = true;

	timerLapButton.attr({ fill: "green"});			//activate lap button
}
});

timerPauseButtontext.click(function () {

if (timerButtontext.attr('text') === 'Reset' &&  timerPauseButtontext.attr('text') === 'Pause') {	//only pressable when the time has started
	timerPauseButtontext.attr({text: "Resume"});
	timerPauseButton.attr({ fill: "green"});
	timerLapButton.attr({ fill: "red"});			//deactivate lap button
	
	//code to pause timer
	timerCountOn = false;

}   /*RESUME*/
else if (timerButtontext.attr('text') === 'Reset' && timerPauseButtontext.attr('text') === 'Resume')  {	//when pressing stop
	timerPauseButtontext.attr({text: "Pause"});
	timerPauseButton.attr({ fill: "yellow"});
	timerCountOn = true;

	timerLapButton.attr({ fill: "green"});			//activate lap button
}
});


offset = 20;


	/*LAP*/
timerLapButton.click(function () {
if (timerButtontext.attr('text') === 'Reset' &&  timerPauseButtontext.attr('text') === 'Pause') {	//only pressable when the time has started
		//genStopWatch(0,'350','80', true);
		if (stopwatchLaps.length > 5) {			//if six laps already exist remove 
			stopwatchLaps[0].attr({text: ""});  //clear text
			stopwatchLaps.splice(0,1); 			//and remove from array

			lapsCounter[0].attr({text: ""});  //clear text
			lapsCounter.splice(0,1); 			//and remove from array

			lapTimeTotal[0].attr({text: ""});
			lapTimeTotal.splice(0,1); 			//and remove from array
		}
		stopwatchLaps.push(pap = paper.text(402.5, 150 + (offset * (totalLaps % 6)), convertTimeToFormat(timerCountValue-lastLapTimerValue)));
		lapsCounter.push(pap = paper.text(292.5, 150 + (offset * (totalLaps % 6)), totalLaps+1));

		lapTimeTotal.push(pap = paper.text(347.5, 150 + (offset * (totalLaps %6)), convertTimeToFormat(timerCountValue)));

		//stopwatchLaps[stopwatchLaps.length-1].textField.attr({x:375, y:80 + offset, text:timerCountValue-lastLapTimerValue}); 
		lastLapTimerValue = timerCountValue;
		totalLaps++;
		currentLapValue = 0; //reset lap value
}   
});

timerLapButtontext.click(function () {
if (timerButtontext.attr('text') === 'Reset' &&  timerPauseButtontext.attr('text') === 'Pause') {	//only pressable when the time has started
		//genStopWatch(0,'350','80', true);
		if (stopwatchLaps.length > 5) {			//if six laps already exist remove 
			stopwatchLaps[0].attr({text: ""});  //clear text
			stopwatchLaps.splice(0,1); 			//and remove from array

			lapsCounter[0].attr({text: ""});  //clear text
			lapsCounter.splice(0,1); 			//and remove from array

			lapTimeTotal[0].attr({text: ""});
			lapTimeTotal.splice(0,1); 			//and remove from array
		}
		stopwatchLaps.push(pap = paper.text(402.5, 150 + (offset * (totalLaps % 6)), convertTimeToFormat(timerCountValue-lastLapTimerValue)));
		lapsCounter.push(pap = paper.text(292.5, 150 + (offset * (totalLaps % 6)), totalLaps+1));

		lapTimeTotal.push(pap = paper.text(347.5, 150 + (offset * (totalLaps %6)), convertTimeToFormat(timerCountValue)));

		//stopwatchLaps[stopwatchLaps.length-1].textField.attr({x:375, y:80 + offset, text:timerCountValue-lastLapTimerValue}); 
		lastLapTimerValue = timerCountValue;
		totalLaps++;
		currentLapValue = 0; //reset lap value
}   
});

/*TIMER*/

var timeOn = false;	//true when timer is
var timerHoursValue = 0;
var timerMinutesValue = 0;
var timerSecondsValue = 0;

hoursSetAtTimerStart = 0;		//variables to save timer set to
minutesSetAtTimerStart = 0;
secondsSetAtTimerStart = 0;

var countdownMs = 0;

var timerStartButton = paper.rect(296 ,150,50,25,3);
	timerStartButton.attr({ fill: "green"});
var timerStartButtonText = paper.text(321, 162.5, "Start");

var timePauseButton = paper.rect(350 ,150,50,25,3);
	timePauseButton.attr({ fill: "gray"});
var timePauseButtonText = paper.text(375, 162.5, "Pause");

var timerHour = paper.rect(277.5 ,100,40,25);
	timerHour.attr({ fill: "white"});
var timerHourText = paper.text(297.5, 112.5, "00");
	timerHourText.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});

var hourUpButton = paper.path("M287.5,98,307.5,98,297.5,82z");
	hourUpButton.attr({ fill: "green"});

var hourDownButton = paper.path("M287.5,128,307.5,128,297.5,142z");
	hourDownButton.attr({ fill: "red"});

var timerColon1 = paper.text(322.5, 112.5, ":");
	timerColon1.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});

var timerMinutes = paper.rect(327.5,100,40,25);
	timerMinutes.attr({ fill: "white"});
var timerMinutesText = paper.text(347.5, 112.5, "00");
	timerMinutesText.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});

var minutesUpButton = paper.path("M337.5,98,357.5,98,347.5,82z");
	minutesUpButton.attr({ fill: "green"});

var minutesDownButton = paper.path("M337.5,128,357.5,128,347.5,142z");
	minutesDownButton.attr({ fill: "red"});

var timerColon2 = paper.text(372.5, 112.5, ":");
	timerColon2.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});

var timerSeconds = paper.rect(377.5 ,100,40,25);
	timerSeconds.attr({ fill: "white"});
var timerSecondsText = paper.text(397.5, 112.5, "00");
	timerSecondsText.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});

var secondsUpButton = paper.path("M387.5,98,407.5,98,397.5,82z");
	secondsUpButton.attr({ fill: "green"});

var secondsDownButton = paper.path("M387.5,128,407.5,128,397.5,142z");
	secondsDownButton.attr({ fill: "red"});

var timerGroup = paper.set().push(timerStartButton, timerStartButtonText, timePauseButton, timePauseButtonText, timerHour, timerHourText, timerMinutes, timerMinutesText, timerSeconds, timerSecondsText,
	timerColon1,timerColon2, hourUpButton, hourDownButton, minutesUpButton, minutesDownButton, secondsUpButton, secondsDownButton);


timerStartButton.click(function () {	/*START*/

if (timerStartButtonText.attr('text') === 'Start' && ( timerHoursValue != 0 || timerMinutesValue != 0 || timerSecondsValue != 0)) {	//when button is green and STARTing timer
	timerStartButtonText.attr({text: "Reset"});			//change button into reset timer
	timerStartButton.attr({ fill: "red"});

	timePauseButton.attr({ fill: "yellow"});		//activate pause button

	//deactivate timer buttons
	hourUpButton.attr({ fill: "gray"});
	hourDownButton.attr({ fill: "gray"});
	minutesUpButton.attr({ fill: "gray"});
	minutesDownButton.attr({ fill: "gray"});
	secondsUpButton.attr({ fill: "gray"});
	secondsDownButton.attr({ fill: "gray"});

	//save numbers timer was set to
	hoursSetAtTimerStart = timerHoursValue;
	minutesSetAtTimerStart = timerMinutesValue;
	secondsSetAtTimerStart = timerSecondsValue;

	countdownMs = (timerHoursValue*360000) + (timerMinutesValue*6000) + (timerSecondsValue*100);

	//start timer counting
	timeOn = true;	
}
		/*RESET*/
else if (timerStartButtonText.attr('text') === 'Reset' ) {//when pressing to STOP the timer
	timeOn = false;	
	countdownMs = 0;

	timerStartButtonText.attr({text: "Start"});				//change button to start timer
	timerStartButton.attr({ fill: "green"});
	
	timePauseButtonText.attr({text: "Pause"});
	timePauseButton.attr({ fill: "gray"});				//deactiviate the pause button

	//reactivate timer buttons & reset time to before timer started
	hourUpButton.attr({ fill: "green"});
	hourDownButton.attr({ fill: "red"});
	timerHoursValue = hoursSetAtTimerStart;
	timerHourText.attr({ "text": checkTime(hoursSetAtTimerStart)});

	timerHour.attr({ fill: "white"});
	timerMinutes.attr({ fill: "white"});
	timerSeconds.attr({ fill: "white"});

	minutesUpButton.attr({ fill: "green"});
	minutesDownButton.attr({ fill: "red"});
	timerMinutesValue = minutesSetAtTimerStart;
	timerMinutesText.attr({ "text": checkTime(minutesSetAtTimerStart)});

	secondsUpButton.attr({ fill: "green"});
	secondsDownButton.attr({ fill: "red"});
	timerSecondsValue = secondsSetAtTimerStart;
	timerSecondsText.attr({ "text": checkTime(secondsSetAtTimerStart)});
};
});

timerStartButtonText.click(function () {	/*START*/

if (timerStartButtonText.attr('text') === 'Start' && ( timerHoursValue != 0 || timerMinutesValue != 0 || timerSecondsValue != 0)) {	//when button is green and STARTing timer
	timerStartButtonText.attr({text: "Reset"});			//change button into reset timer
	timerStartButton.attr({ fill: "red"});

	timePauseButton.attr({ fill: "yellow"});		//activate pause button

	//deactivate timer buttons
	hourUpButton.attr({ fill: "gray"});
	hourDownButton.attr({ fill: "gray"});
	minutesUpButton.attr({ fill: "gray"});
	minutesDownButton.attr({ fill: "gray"});
	secondsUpButton.attr({ fill: "gray"});
	secondsDownButton.attr({ fill: "gray"});

	//save numbers timer was set to
	hoursSetAtTimerStart = timerHoursValue;
	minutesSetAtTimerStart = timerMinutesValue;
	secondsSetAtTimerStart = timerSecondsValue;

	countdownMs = (timerHoursValue*360000) + (timerMinutesValue*6000) + (timerSecondsValue*100);

	//start timer counting
	timeOn = true;	
}
		/*RESET*/
else if (timerStartButtonText.attr('text') === 'Reset' ) {//when pressing to STOP the timer
	timeOn = false;	
	countdownMs = 0;

	timerStartButtonText.attr({text: "Start"});				//change button to start timer
	timerStartButton.attr({ fill: "green"});
	
	timePauseButtonText.attr({text: "Pause"});
	timePauseButton.attr({ fill: "gray"});				//deactiviate the pause button

	//reactivate timer buttons & reset time to before timer started
	hourUpButton.attr({ fill: "green"});
	hourDownButton.attr({ fill: "red"});
	timerHoursValue = hoursSetAtTimerStart;
	timerHourText.attr({ "text": checkTime(hoursSetAtTimerStart)});

	timerHour.attr({ fill: "white"});
	timerMinutes.attr({ fill: "white"});
	timerSeconds.attr({ fill: "white"});

	minutesUpButton.attr({ fill: "green"});
	minutesDownButton.attr({ fill: "red"});
	timerMinutesValue = minutesSetAtTimerStart;
	timerMinutesText.attr({ "text": checkTime(minutesSetAtTimerStart)});

	secondsUpButton.attr({ fill: "green"});
	secondsDownButton.attr({ fill: "red"});
	timerSecondsValue = secondsSetAtTimerStart;
	timerSecondsText.attr({ "text": checkTime(secondsSetAtTimerStart)});
};
});

timePauseButton.click(function () {	/*PAUSE*/
if (timerStartButtonText.attr('text') === 'Reset' && timeOn == true) {	//when button is green and STARTing timer
	
	timePauseButtonText.attr({text: "Resume"});			//change button into reset timer
	timePauseButton.attr({fill: "green"});
	timeOn = false;	
}
		/*RESUME*/
else if (timerStartButtonText.attr('text') === 'Reset' ) {//when pressing to STOP the timer
	
	timePauseButtonText.attr({text: "Pause"});			//change button into reset timer
	timePauseButton.attr({ fill: "yellow"});
	timeOn = true;	
};
});

timePauseButtonText.click(function () {	/*PAUSE*/
if (timerStartButtonText.attr('text') === 'Reset' && timeOn == true) {	//when button is green and STARTing timer
	
	timePauseButtonText.attr({text: "Resume"});			//change button into reset timer
	timePauseButton.attr({fill: "green"});
	timeOn = false;	
}
		/*RESUME*/
else if (timerStartButtonText.attr('text') === 'Reset' ) {//when pressing to STOP the timer
	
	timePauseButtonText.attr({text: "Pause"});			//change button into reset timer
	timePauseButton.attr({ fill: "yellow"});
	timeOn = true;	
};
});

hourUpButton.click(function () {
if (timerStartButtonText.attr('text') === 'Start') {
	if (timerHoursValue < 99) {	//add hour if below 99
		timerHoursValue++;
		timerHourText.attr({ "text": checkTime(timerHoursValue)});
	}
	else if (timerHoursValue == 99) {
		timerHoursValue = 0;
		timerHourText.attr({ "text": checkTime(timerHoursValue)});
	}
}
});

hourDownButton.click(function () {
if (timerStartButtonText.attr('text') === 'Start') {
	if (timerHoursValue > 0) {	//add hour if below 99
		timerHoursValue--;
		timerHourText.attr({ "text": checkTime(timerHoursValue)});
	}
	else if (timerHoursValue == 0) {
		timerHoursValue = 99;
		timerHourText.attr({ "text": checkTime(timerHoursValue)});
	}
}

});

minutesUpButton.click(function () {
if (timerStartButtonText.attr('text') === 'Start') {
	if (timerMinutesValue < 59) {	//add hour if below 99
		timerMinutesValue++;
		timerMinutesText.attr({ "text": checkTime(timerMinutesValue)});
	}
	else if (timerMinutesValue == 59) {
		timerMinutesValue = 0;
		timerMinutesText.attr({ "text": checkTime(timerMinutesValue)});
	}
}
});

minutesDownButton.click(function () {
if (timerStartButtonText.attr('text') === 'Start') {
	if (timerMinutesValue > 0) {	//add hour if below 99
		timerMinutesValue--;
		timerMinutesText.attr({ "text": checkTime(timerMinutesValue)});
	}
	else if (timerMinutesValue == 0) {
		timerMinutesValue = 59;
		timerMinutesText.attr({ "text": checkTime(timerMinutesValue)});
	}
}
});

secondsUpButton.click(function () {
if (timerStartButtonText.attr('text') === 'Start') {
	if (timerSecondsValue < 59) {	//add hour if below 99
		timerSecondsValue++;
		timerSecondsText.attr({ "text": checkTime(timerSecondsValue)});
	}
	else if (timerSecondsValue == 59) {	//add hour if below 99
		timerSecondsValue = 0;
		timerSecondsText.attr({ "text": checkTime(timerSecondsValue)});
	}
}
});

secondsDownButton.click(function () {
if (timerStartButtonText.attr('text') === 'Start') {
	if (timerSecondsValue > 0) {	//add sec if below 59
		timerSecondsValue--;
		timerSecondsText.attr({ "text": checkTime(timerSecondsValue)});
	}
	else if (timerSecondsValue == 0) {
		timerSecondsValue = 59;
		timerSecondsText.attr({ "text": checkTime(timerSecondsValue)});
	}
}
});

/*BUTTONS*/

var alarmOpenButton = paper.rect(220,20,60,25,3);
	alarmOpenButton.attr({ fill: "white"});
var alarmOpenButtonText = paper.text(250, 32.5, "Alarm");
	alarmOpenButtonText.attr({ "font-size": 9, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});


var timezonesOpenButton = paper.rect(285,20,60,25,3);
	timezonesOpenButton.attr({ fill: "white"});
var timezonesOpenButtonText = paper.text(315, 32.5, "Time Zones");
	timezonesOpenButtonText.attr({ "font-size": 9, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});


var stopwatchOpenButton = paper.rect(350,20,60,25,3);
	stopwatchOpenButton.attr({ fill: "white"});
var stopwatchOpenButtonText = paper.text(380, 32.5, "Stopwatch");
	stopwatchOpenButtonText.attr({ "font-size": 9, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});


var timerOpenButton = paper.rect(415,20,60,25,3);
	timerOpenButton.attr({ fill: "white"});
var timerOpenButtonText = paper.text(445, 32.5, "Timer");
	timerOpenButtonText.attr({ "font-size": 9, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});

var changeTimeButton = paper.rect(4,225,60,45,3);
	changeTimeButton.attr({ fill: "white"});
var changeTimeButtonText = paper.text(34, 247.5, "Change\nTime");
	changeTimeButtonText.attr({ "font-size": 9, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});


changeTimeButton.click(function () {
	hideTimezones();
	hideStopwatch();
	hideTimer();
	hideAlarm();

	unhideChangeTime();

	alarmOpenButton.attr({ fill: "white"});
	stopwatchOpenButton.attr({ fill: "white"});
	timerOpenButton.attr({ fill: "white"});
	timezonesOpenButton.attr({ fill: "white"});
	changeTimeButton.attr({ fill: "green"});
});

changeTimeButtonText.click(function () {
	hideTimezones();
	hideStopwatch();
	hideTimer();
	hideAlarm();

	unhideChangeTime();

	alarmOpenButton.attr({ fill: "white"});
	stopwatchOpenButton.attr({ fill: "white"});
	timerOpenButton.attr({ fill: "white"});
	timezonesOpenButton.attr({ fill: "white"});
	changeTimeButton.attr({ fill: "green"});
});

alarmOpenButton.click(function () {
	hideTimezones();
	hideStopwatch();
	hideTimer();
	hideChangeTime();

	unhideAlarm();

	alarmOpenButton.attr({ fill: "green"});
	stopwatchOpenButton.attr({ fill: "white"});
	timerOpenButton.attr({ fill: "white"});
	timezonesOpenButton.attr({ fill: "white"});
	changeTimeButton.attr({ fill: "white"});

});

alarmOpenButtonText.click(function () {
	hideTimezones();
	hideStopwatch();
	hideTimer();
	hideChangeTime();

	unhideAlarm();

	alarmOpenButton.attr({ fill: "green"});
	stopwatchOpenButton.attr({ fill: "white"});
	timerOpenButton.attr({ fill: "white"});
	timezonesOpenButton.attr({ fill: "white"});
	changeTimeButton.attr({ fill: "white"});

});


timezonesOpenButton.click(function () {
	hideAlarm();
	hideStopwatch();
	hideTimer();
	hideChangeTime();

	unhideTimezones();

	timezonesOpenButton.attr({ fill: "green"});
	alarmOpenButton.attr({ fill: "white"});
	stopwatchOpenButton.attr({ fill: "white"});
	timerOpenButton.attr({ fill: "white"});
	changeTimeButton.attr({ fill: "white"});

});

timezonesOpenButtonText.click(function () {
	hideAlarm();
	hideStopwatch();
	hideTimer();
	hideChangeTime();

	unhideTimezones();

	timezonesOpenButton.attr({ fill: "green"});
	alarmOpenButton.attr({ fill: "white"});
	stopwatchOpenButton.attr({ fill: "white"});
	timerOpenButton.attr({ fill: "white"});
	changeTimeButton.attr({ fill: "white"});

});

stopwatchOpenButton.click(function () {
	hideTimezones();
	hideAlarm();
	hideTimer();
	hideChangeTime();

	unhideStopwatch();

	timezonesOpenButton.attr({ fill: "white"});
	alarmOpenButton.attr({ fill: "white"});
	stopwatchOpenButton.attr({ fill: "green"});
	timerOpenButton.attr({ fill: "white"});
	changeTimeButton.attr({ fill: "white"});
});

stopwatchOpenButtonText.click(function () {
	hideTimezones();
	hideAlarm();
	hideTimer();
	hideChangeTime();

	unhideStopwatch();

	timezonesOpenButton.attr({ fill: "white"});
	alarmOpenButton.attr({ fill: "white"});
	stopwatchOpenButton.attr({ fill: "green"});
	timerOpenButton.attr({ fill: "white"});
	changeTimeButton.attr({ fill: "white"});
});

timerOpenButton.click(function () {
	hideTimezones();
	hideStopwatch();
	hideAlarm();
	hideChangeTime();

	unhideTimer();

	timezonesOpenButton.attr({ fill: "white"});
	alarmOpenButton.attr({ fill: "white"});
	stopwatchOpenButton.attr({ fill: "white"});
	timerOpenButton.attr({ fill: "green"});
	changeTimeButton.attr({ fill: "white"});
});

timerOpenButtonText.click(function () {
	hideTimezones();
	hideStopwatch();
	hideAlarm();
	hideChangeTime();

	unhideTimer();

	timezonesOpenButton.attr({ fill: "white"});
	alarmOpenButton.attr({ fill: "white"});
	stopwatchOpenButton.attr({ fill: "white"});
	timerOpenButton.attr({ fill: "green"});
	changeTimeButton.attr({ fill: "white"});
});

/*FUNCTIONS*/

function convertTimeToFormat(timeToConvert) {

//hours
if (timeToConvert >= 360000) {
var hours = Math.floor(timeToConvert/360000);
}
else {hours =+ "00";}

//minute
if (timeToConvert-(hours*360000)>= 6000) {
var minutes = Math.floor((timeToConvert -(hours*360000)) /6000);
}
else {var minutes =+ "00";}

//seconds
if ((timeToConvert-((hours*360000) + (minutes*6000))) >= 100) {
var seconds = Math.floor((timeToConvert-((hours*360000) + (minutes*6000))) /100);
}
else {var seconds =+ "00";}

//ms
var ms = timeToConvert-((hours*360000) + (minutes*6000) + (seconds*100));

if (hours > 0) {
var convertedTime = checkTime(hours)+ ":"+ checkTime(minutes) + ":"+ checkTime(seconds) + ":"+checkTime(ms);
}
else { 
var convertedTime = checkTime(minutes) + ":"+ checkTime(seconds) + "."+checkTime(ms);
}

	return convertedTime;
}

function getHours(ms) {
if (ms >= 360000) {
	return Math.floor(ms/360000);
}
else {return 0;}
}

function getMinutes(ms, hours) {
	if (hours >= 1) {
		ms = ms - (hours*360000);
	}

	if (ms > 0) {
		return Math.floor(ms/6000);
	}
		else {return 0;}
}

function getSeconds(ms, hours, minutes) {
	if (hours >= 1) {
		ms = ms - (hours*360000);
	}

	if (minutes >= 1) {
		ms = ms - (minutes*6000);
	}

	if (ms > 0) {
		return Math.floor(ms/100);
	}
		else {return 0;}
}

function writeHours() {
	var angle;
	
		for (num = 1; num < 13; num++){
			angle = Math.PI/6 * (num - 3);

			var numbers = paper.text(posX + Math.cos(angle)*(posX/1.44), posY + Math.sin(angle)*(posY)/1.44, num);
			numbers.attr({ "font-size": 16, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});
		}
}


function checkTime(i) {
    if (i < 10) {
    	i = "0" + i
    }
    return i;
}


/*CHANGE TIME*/

var changeTimeHoursVal = 0;
var changeTimeMinutesVal = 0;
var changeTimeSecondsVal = 0;

var changeTimeStartButton = paper.rect(296 ,150,50,25,3);
	changeTimeStartButton.attr({ fill: "green"});
var changeTimeStartButtonText = paper.text(321, 162.5, "Set");

var changeTimePauseButton = paper.rect(350 ,150,50,25,3);
	changeTimePauseButton.attr({ fill: "yellow"});
var changeTimePauseButtonText = paper.text(375, 162.5, "Reset");

var changeTimeHour = paper.rect(277.5 ,100,40,25);
	changeTimeHour.attr({ fill: "white"});
var changeTimeHourText = paper.text(297.5, 112.5, "00");
	changeTimeHourText.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});

var changeTimeHourUpButton = paper.path("M287.5,98,307.5,98,297.5,82z");
	changeTimeHourUpButton.attr({ fill: "green"});

var changeTimeHourDownButton = paper.path("M287.5,128,307.5,128,297.5,142z");
	changeTimeHourDownButton.attr({ fill: "red"});

var changeTimeColon1 = paper.text(322.5, 112.5, ":");
	changeTimeColon1.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});

var changeTimeMinutes = paper.rect(327.5,100,40,25);
	changeTimeMinutes.attr({ fill: "white"});
var changeTimeMinutesText = paper.text(347.5, 112.5, "00");
	changeTimeMinutesText.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});

var changeTimeMinutesUpButton = paper.path("M337.5,98,357.5,98,347.5,82z");
	changeTimeMinutesUpButton.attr({ fill: "green"});

var changeTimeMinutesDownButton = paper.path("M337.5,128,357.5,128,347.5,142z");
	changeTimeMinutesDownButton.attr({ fill: "red"});

var changeTimeColon2 = paper.text(372.5, 112.5, ":");
	changeTimeColon2.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});


var changeTimeSeconds = paper.rect(377.5 ,100,40,25);
	changeTimeSeconds.attr({ fill: "white"});
var changeTimeSecondsText = paper.text(397.5, 112.5, "00");
	changeTimeSecondsText.attr({ "font-size": 12, "font-weight": "bold", "font-family": "Verdana, Helvetica, sans-serif"});


var changeTimeSecondsUpButton = paper.path("M387.5,98,407.5,98,397.5,82z");
	changeTimeSecondsUpButton.attr({ fill: "green"});

var changeTimeSecondsDownButton = paper.path("M387.5,128,407.5,128,397.5,142z");
	changeTimeSecondsDownButton.attr({ fill: "red"});

var changeTimeGroup = paper.set().push(changeTimeStartButton, changeTimeStartButtonText, changeTimePauseButton, changeTimePauseButtonText, changeTimeHour, changeTimeHourText, changeTimeMinutes, changeTimeMinutesText, changeTimeSeconds, changeTimeSecondsText,
	changeTimeColon1,changeTimeColon2, changeTimeHourUpButton, changeTimeHourDownButton, changeTimeMinutesUpButton, changeTimeMinutesDownButton, changeTimeSecondsUpButton, changeTimeSecondsDownButton);



changeTimeStartButton.click(function () {	/*SET*/

if (changeTimeStartButtonText.attr('text') === 'Set') {	//when button is green and STARTing timer
	changeTimeStartButtonText.attr({text: "Off"});			//change button into reset timer
	changeTimeStartButton.attr({ fill: "red"});

	changeTimePauseButton.attr({ fill: "gray"});		//activate pause button

	//deactivate timer buttons
	changeTimeHourUpButton.attr({ fill: "gray"});
	changeTimeHourDownButton.attr({ fill: "gray"});
	changeTimeMinutesUpButton.attr({ fill: "gray"});
	changeTimeMinutesDownButton.attr({ fill: "gray"});
	changeTimeSecondsUpButton.attr({ fill: "gray"});
	changeTimeSecondsDownButton.attr({ fill: "gray"});

	changeTimeOn = true;	
}
		/*OFF*/
else if (changeTimeStartButtonText.attr('text') === 'Off' ) {//when pressing to STOP the timer
	changeTimeOn = false;	

	changeTimeStartButtonText.attr({text: "Set"});				//change button to start timer
	changeTimeStartButton.attr({ fill: "green"});
	
	timePauseButtonText.attr({text: "Reset"});
	timePauseButton.attr({ fill: "yellow"});				//deactiviate the pause button

	changeTimeHourUpButton.attr({ fill: "green"});
	changeTimeHourDownButton.attr({ fill: "red"});

	changeTimeMinutesUpButton.attr({ fill: "green"});
	changeTimeMinutesDownButton.attr({ fill: "red"});

	changeTimeSecondsUpButton.attr({ fill: "green"});
	changeTimeSecondsDownButton.attr({ fill: "red"});

	changeTimePauseButton.attr({ fill: "yellow"});		//activate pause button
};
});

changeTimeStartButtonText.click(function () {	/*SET*/

if (changeTimeStartButtonText.attr('text') === 'Set') {	//when button is green and STARTing timer
	changeTimeStartButtonText.attr({text: "Off"});			//change button into reset timer
	changeTimeStartButton.attr({ fill: "red"});

	changeTimePauseButton.attr({ fill: "gray"});		//activate pause button

	//deactivate timer buttons
	changeTimeHourUpButton.attr({ fill: "gray"});
	changeTimeHourDownButton.attr({ fill: "gray"});
	changeTimeMinutesUpButton.attr({ fill: "gray"});
	changeTimeMinutesDownButton.attr({ fill: "gray"});
	changeTimeSecondsUpButton.attr({ fill: "gray"});
	changeTimeSecondsDownButton.attr({ fill: "gray"});

	changeTimeOn = true;	
}
		/*OFF*/
else if (changeTimeStartButtonText.attr('text') === 'Off' ) {//when pressing to STOP the timer
	changeTimeOn = false;	

	changeTimeStartButtonText.attr({text: "Set"});				//change button to start timer
	changeTimeStartButton.attr({ fill: "green"});
	
	timePauseButtonText.attr({text: "Reset"});
	timePauseButton.attr({ fill: "yellow"});				//deactiviate the pause button

	changeTimeHourUpButton.attr({ fill: "green"});
	changeTimeHourDownButton.attr({ fill: "red"});

	changeTimeMinutesUpButton.attr({ fill: "green"});
	changeTimeMinutesDownButton.attr({ fill: "red"});

	changeTimeSecondsUpButton.attr({ fill: "green"});
	changeTimeSecondsDownButton.attr({ fill: "red"});

	changeTimePauseButton.attr({ fill: "yellow"});		//activate pause button
};
});



changeTimePauseButton.click(function () {	/*RESET*/
if (changeTimeStartButtonText.attr('text') === 'Set') {	//when button is green and STARTing timer
	
	changeTimeHoursVal = 0;
	changeTimeMinutesVal = 0;
	changeTimeSecondsVal = 0;
	changeTimeOn = false;	
}
});

changeTimePauseButtonText.click(function () {	/*RESET*/
if (changeTimeStartButtonText.attr('text') === 'Set') {	//when button is green and STARTing timer
	
	changeTimeHoursVal = 0;
	changeTimeMinutesVal = 0;
	changeTimeSecondsVal = 0;
	changeTimeOn = false;	
}
});

changeTimeHourUpButton.click(function () {
if (changeTimeStartButtonText.attr('text') === 'Set') {
	if (changeTimeHoursVal < 23) {	//add hour if below 99
		changeTimeHoursVal++;
	}
	else if (changeTimeHoursVal == 23) {
		changeTimeHoursVal = 0;
	}
		//changeTimePauseButtonText.attr({"text": changeTimeHoursVal}); 

}
});

changeTimeHourDownButton.click(function () {
if (changeTimeStartButtonText.attr('text') === 'Set') {
	if (changeTimeHoursVal > 0) {	//add hour if below 99
		changeTimeHoursVal--;
	}
	else if (changeTimeHoursVal == 0) {
		changeTimeHoursVal = 23;
	}
		//changeTimePauseButtonText.attr({"text": changeTimeHoursVal}); 

}
});

changeTimeMinutesUpButton.click(function () {
if (changeTimeStartButtonText.attr('text') === 'Set') {
	if (changeTimeMinutesVal < 59) {	//add hour if below 99
		changeTimeMinutesVal++;
	}
	else if (changeTimeMinutesVal == 59) {
		changeTimeMinutesVal = 0;
	}
}
});

changeTimeMinutesDownButton.click(function () {
if (changeTimeStartButtonText.attr('text') === 'Set') {
	if (changeTimeMinutesVal > 0) {	//add hour if below 99
		changeTimeMinutesVal--;
	}
	else if (changeTimeMinutesVal == 0) {
		changeTimeMinutesVal = 59;
	}

}
});

changeTimeSecondsUpButton.click(function () {
if (changeTimeStartButtonText.attr('text') === 'Set') {
	if (changeTimeSecondsVal < 59) {	//add hour if below 99
		changeTimeSecondsVal++;
	}
	else if (changeTimeSecondsVal == 59) {	//add hour if below 99
		changeTimeSecondsVal = 0;
	}
				// changeTimePauseButtonText.attr({"text": changeTimeSecondsVal}); 

}
});

changeTimeSecondsDownButton.click(function () {
if (changeTimeStartButtonText.attr('text') === 'Set') {
	if (changeTimeSecondsVal > 0) {	//add sec if below 59
		changeTimeSecondsVal--;
	}
	else if (changeTimeSecondsVal == 0) {
		changeTimeSecondsVal = 59;
	}
			// changeTimePauseButtonText.attr({"text": changeTimeSecondsVal}); 

}
});

/*THE MAIN FUNCTION*/

function startTime(){
setTimeout(function(){startTime()},10);

	var today = new Date();
	var day = today.getDay();
	var date = today.getDate();
	var month = today.getMonth();
	var year = today.getFullYear();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();


hTZ = parseInt(h)+timeZoneValue;
	secondsTick = 6;
	minutesTick = 6;
	hoursTick = 30;

if (changeTimeOn == true) {
	hTZ = h + changeTimeHoursVal;
	m = m + changeTimeMinutesVal;
	if (m > 60) { 
		m = m -60;
	}
	s = s+ changeTimeSecondsVal;
	if (s > 60) { 
		s = s -60;
	}
}

								//rotate, 		angle,        coords to rotate around
	seconds.animate({transform: [ 'r' , 180 + (secondsTick*s),posX,posY]});
	//secondsTick = secondsTick +6;

	minutes.animate({transform: [ 'r',180 + (minutesTick*m) + (0.1*s),posX,posY]});
	//minutesTick = minutesTick +0.06;

	hours.animate({transform: [ 'r',180 + (hoursTick*hTZ) + (0.5*m),posX,posY]});
	//hoursTick = hoursTick +0.0006;

	updateDigitalTime();	//updates digital time to correct value


if (changeTimeOn == false) {
	var dayText = getDayText(day);			//get Day
	dayDisplay.attr({'text': dayText});
	
	var lastNum1Str = date.toString();				//get last number of date
	var lastNumb = lastNum1Str.slice(-1);	
	var dateSuffix = getDateSuffix(lastNumb);		//get date suffix e.g. 'th' or 'st'
	dateDisplay.attr({'text': date + dateSuffix});	//display date with suffix on clock

	var monthText = getMonthText(month);			//convert from month number to text
	monthDisplay.attr({'text': monthText});
	
	
	if (parseInt(h)+timeZoneValue >= 24) {
		date++;
		var lastNum1Str = date.toString();				//get last number of date
		var lastChar = lastNum1Str.slice(-1);
		var dateSuffix1 = getDateSuffix(lastChar);		//get date suffix e.g. 'th' or 'st'
		dateDisplay.attr({'text': date + dateSuffix1});
		var num33 = date[date.length -1];

		day++;
		if (day == 29) {
			day = 1;
			monthText = getMonthText(month++);
			monthDisplay.attr({'text': monthText});
		}
		var dayText = getDayText(day);			//get Day
		dayDisplay.attr({'text': dayText});
	}
	else if ( parseInt(h)+timeZoneValue < 0) {
		date--;
		var lastNum1Str = date.toString();				//get last number of date
		var lastChar = lastNum1Str.slice(-1);

		var dateSuffix1 = getDateSuffix(lastChar);		//get date suffix e.g. 'th' or 'st'
		dateDisplay.attr({'text': date + dateSuffix1});
		var num33 = date[date.length -1];

		day--;
		if (day == 0) {
			day = 29;
			monthText = getMonthText(month--);
			monthDisplay.attr({'text': monthText});
		}
		var dayText = getDayText(day);			//get Day
		dayDisplay.attr({'text': dayText});
	}

		yearDisplay.attr({'text': year});
}

else {	//display today's date/day
	var dayText = getDayText(day);			//get Day
	dayDisplay.attr({'text': dayText});

	var dateNew = today.getDate();			//get Day
	var lastNum1St = dateNew.toString();				//get last number of date
		var lastCharr = lastNum1St.slice(-1);
		var dateSuffix11 = getDateSuffix(lastCharr);		//get date suffix e.g. 'th' or 'st'
		dateDisplay.attr({'text': date + dateSuffix11});
		//var num33 = date[date.length -1];
}

	if (timerCountOn === true) {	//for STOPWATCH
		setTimeout(function(){
			timerCountValue++;
			timerCountDisplay.attr({'text': convertTimeToFormat(timerCountValue)});
			
			currentLapValue++;
			currentLapDisplay.attr({'text': convertTimeToFormat(currentLapValue)});
			}, 1);
	}

	if (timeOn === true) {	//for TIMER
		setTimeout(function(){
			if (countdownMs > 0) {
			countdownMs--;
			var msHours = getHours(countdownMs);
			var msMinutes = getMinutes(countdownMs, msHours);
			var msSeconds = getSeconds(countdownMs, msHours, msMinutes);


			timerHourText.attr({ "text": checkTime(msHours)});
			timerMinutesText.attr({ "text": checkTime(msMinutes)});
			timerSecondsText.attr({ "text": checkTime(msSeconds)});
		}
		else if (countdownMs <= 1000 && countdownMs >= 0 && timerStartButtonText.attr('text') == "Reset") {
			timeOn = false;
			timePauseButton.attr({ fill: "gray"});	
			var timerAudio = new Audio('timer.mp3');
			timerAudio.play();
			timerHour.attr({ fill: "green"});
			timerMinutes.attr({ fill: "green"});
			timerSeconds.attr({ fill: "green"});
		}

			

			}, 1);
	}
setTimeout(function(){
	if (alarmOn == true) {
		if (hTZ >= 24) {
			hTZ = hTZ - 24; 
		}

		if ((parseInt(hTZ) == alarmSetHour) && (parseInt(m) == alarmSetMinute)) {
			if (alarmSetSecond === parseInt(s)) {
			alarmHour.attr({fill: 'green'});
			alarmMinutes.attr({ fill: "green"});
			alarmSeconds.attr({fill: 'green'});
			var timerAudio = new Audio('timer.mp3');

			timerAudio.play();
			alTriggeredDisplay.attr({text: true});
			alarmOn = false;
			}
		}
	}
		}, 1);

if (timerButtontext.attr('text') === 'Start' ) {
	 	timerCountDisplay.attr({'text': convertTimeToFormat(0)});
	 	currentLapDisplay.attr({'text': convertTimeToFormat(0)});

showChangeTimeHours();
showChangeTimeMinutes();
showChangeTimeSeconds();

}
}

	

function getDateSuffix(lastNum) {
	if (lastNum == 1) {
		return "st";
	}
	else if (lastNum == 2) {
		return "nd";
	}
	else if (lastNum == 3) {
		return "rd";
	}
	else {
		return "th";
	}
}

function hideTimezones() { 	//timerGroup hide

peru.graphic.remove();
bolivia.graphic.remove();
britain.graphic.remove();
france.graphic.remove();
cambodia.graphic.remove();
flagsDisplayed = false;
for (var i = 0; i < timezonesGroup.length; i++) {
	timezonesGroup[i].hide();
	}
}

function hideStopwatch() { 	//stopwatchGroup hide
for (var i = 0; i < stopwatchGroup.length; i++) {
	stopwatchGroup[i].hide();
	}
for (var i = 0; i < stopwatchLaps.length; i++) {
	stopwatchLaps[i].hide();
	lapsCounter[i].hide();
	lapTimeTotal[i].hide();
	}
}

function hideTimer() { 	//timerGroup hide
for (var i = 0; i < timerGroup.length; i++) {
	timerGroup[i].hide();
	}
}

function hideAlarm() { 	//timerGroup hide
for (var i = 0; i < alarmGroup.length; i++) {
	alarmGroup[i].hide();
	}
}

function hideChangeTime() { 	//timerGroup hide
for (var i = 0; i < changeTimeGroup.length; i++) {
	changeTimeGroup[i].hide();
	}
}


function unhideTimezones() { 	//timerGroup hide
if (flagsDisplayed == false) {
peru = {graphic: paper.image("peru.svg", 247.5, 67, 60, 30), name: "Cambodia", timezone: +6 };	
bolivia = {graphic: paper.image("bolivia.svg", 247.5, 107, 60, 30), name: "Cambodia", timezone: +6 };	
britain = {graphic: paper.image("british.svg", 247.5, 147, 60, 30), name: "Britain - London", timezone: 0 };
france = {graphic: paper.image("france.svg", 247.5, 187, 60, 30), name: "France - Paris", timezone: +1 };	
cambodia = {graphic: paper.image("cambodia.svg", 247.5, 227, 60, 30), name: "Cambodia", timezone: +6 };	
}
flagsDisplayed = true;
for (var i = 0; i < timezonesGroup.length; i++) {
	timezonesGroup[i].show();
	}
}

function unhideStopwatch() {
for (var i = 0; i < stopwatchGroup.length; i++) {
	stopwatchGroup[i].show();
	}
for (var i = 0; i < stopwatchLaps.length; i++) {
	stopwatchLaps[i].show();
	lapsCounter[i].show();
	lapTimeTotal[i].show();
	}
}

function unhideTimer() { 	//timerGroup hide
for (var i = 0; i < timerGroup.length; i++) {
	timerGroup[i].show();
	}
}

function unhideAlarm() { 	//timerGroup hide
for (var i = 0; i < alarmGroup.length; i++) {
	alarmGroup[i].show();
	}
}

function unhideChangeTime() { 	//timerGroup hide
for (var i = 0; i < changeTimeGroup.length; i++) {
	changeTimeGroup[i].show();
	}
}

changeTimeGroup

function updateDigitalTime() {
	
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);

if (changeTimeOn == true) {
	h = parseInt(h) /*+ parseInt(timeZoneValue)*/ + parseInt(changeTimeHoursVal);
	m = parseInt(m) + parseInt(changeTimeMinutesVal);
	s = parseInt(s) + parseInt(changeTimeSecondsVal);
}
 	else {
		h = parseInt(h) + parseInt(timeZoneValue);
}

if (h >= 24) {
	h = checkTime(h-24);
}
else if (h < 0) {
	h = h+24;
}

else if (h < 10) {
	h =checkTime(h);
}

if (m >= 60) {
	m = checkTime(m-60);
}
else if (m < 0) {
	m = m+60;
}

else if (m < 10) {
	m =checkTime(m);
}

if (s >= 60) {
	s = checkTime(s-60);
}
else if (s < 0) {
	s = s+60;
}

else if (s < 10) {
	s =checkTime(s);
}

if (m.length == 3) {
	var mStr = m.toString();				//get last number of date
	m = mStr.substring(1);
}
if (s.length == 3) {
	var sStr = s.toString();				//get last number of date
	s = sStr.substring(1);
}


	var newTime = h + ':' + m + ':' + s;
	timeDisplay.attr({'text': newTime});
}

function showChangeTimeHours() {
	
	var today = new Date();
	var h = today.getHours();
	h = checkTime(h);

	h = parseInt(h) /*+ parseInt(timeZoneValue)*/ + changeTimeHoursVal;

	if (h >= 24) {
		h = checkTime(h-24);
	}
	else if (h < 0) {
		h = h+24;
	}

	else if (h < 10) {
		h =checkTime(h);
	}

	changeTimeHourText.attr({'text': h});
}

function showChangeTimeMinutes() {
	
	var today = new Date();
	var m = today.getMinutes();
	m = checkTime(m);

	m =  parseInt(m) + changeTimeMinutesVal;

	if (m >= 60) {
		m = checkTime(m-60);
	}
	else if (m < 0) {
		m= m+60;
	}

	else if (m < 10) {
		m =checkTime(m);
	}

	changeTimeMinutesText.attr({'text': m});
}


function showChangeTimeSeconds() {
	
	var today = new Date();
	var s = today.getSeconds();
	s = checkTime(s);

	s =  parseInt(s) + changeTimeSecondsVal;

	if (s >= 60) {
		s = checkTime(s-60);
	}
	else if (s < 0) {
		s = s + 60;
	}

	else if (s < 10) {
		s = checkTime(s);
	}

	changeTimeSecondsText.attr({'text': s});
}



function setAnalogToRealTime() {
	
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	
	//seconds
	secondsTick = secondsTick + (s*6) + 180;
	minutesTick = minutesTick + (m*6) + 180;
	hoursTick = hoursTick + ((h*6) + (0.1*m)) + 180;
}

function setAnalogToRealTime() {
	
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	
	//seconds
	secondsTick = secondsTick + (s*6) + 180;
	minutesTick = minutesTick + (m*6) + 180;
	hoursTick = hoursTick + ((h*6) + (0.1*m)) + 180;
}

function getDayText(day) {
	if (day == 1) {
		return "Monday";
	}
	else if (day == 2) {
		return "Tuesday";
	}
	else if (day == 3) {
		return "Wednesday";
	}
	else if (day == 4) {
		return "Thursday";
	}
	else if (day == 5) {
		return "Friday";
	}
	else if (day == 6) {
		return "Saturday";
	}
	else if (day == 7) {
		return "Sunday";
	}
}

function getMonthText(month) {
	if (month == 0) {
		return "Jan";
	}
	else if (month == 1) {
		return "Feb";
	}
	else if (month == 2) {
		return "Mar";
	}
	else if (month == 3) {
		return "Apr";
	}
	else if (month == 4) {
		return "May";
	}
	else if (month == 5) {
		return "Jun";
	}
	else if (month == 6) {
		return "Jul";
	}
	else if (month == 7) {
		return "Aug";
	}
	else if (month == 8) {
		return "Sep";
	}
	else if (month == 9) {
		return "Oct";
	}
	else if (month == 10) {
		return "Nov";
	}
	else if (month == 11) {
		return "Dec";
	}
}



//functions called
//setAnalogToRealTime(); //updates rotations to real times
writeHours();
startTime(); //starts clock ticking
hideTimer();
hideStopwatch();
hideTimezones();
hideAlarm();
hideChangeTime();



};