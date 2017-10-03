const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


var timeRunning = false;
var interval;

// Add leading zero to numbers 9 or below (purely for aesthetics):

function leadingZero(time){
  if (time < 10){
    time = "0" + time;
  }
  return time;
}


// Run a standard minute/second/hundredths timer:
var timer = [0,0,0,0];
var timeInterval;

function countTime(){
  timer[3]++;

  timer[0] = Math.floor(timer[3]/100/60);
  timer[1] = Math.floor(timer[3]/100 - timer[0]*60);
  timer[2] = Math.floor(timer[3]/10 - timer[1]*10 - timer[0]*10*60);


  var currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);

  theTimer.innerHTML = currentTime;

}

// Match the text entered with the provided text on the page:

function spellCheck(){
  var textEntered = testArea.value;
  var originTextMatch = originText.substring(0, textEntered.length);

  if (textEntered == originText){
    testWrapper.style.borderColor = "#DE10C6";
    clearInterval(timeInterval);

    document.querySelector(".report").classList.remove("hide");
    showReport();
  }else{
      if (textEntered == originTextMatch){
        testWrapper.style.borderColor = "green";
      }else{
        testWrapper.style.borderColor = "#CD4343";
      }
  }
}

// Show a report to the user's test.
function showReport(){
  var wordCount = originText.split(" ").length;
  var speed = Math.round(6000/timer[3]*wordCount);
  document.querySelector("#letterTested").innerHTML = wordCount;
  document.querySelector("#typingSpeed").innerHTML = speed + " WPM";

  var speedText = "";
  switch(true){
    case speed <= 25 :
      speedText = "Slow";
      break;
    case speed > 25 && speed <= 45:
      speedText = "Average";
      break;
    case speed > 45 && speed <= 60:
      speedText = "Fluent";
      break;
    case speed > 60 && speed <= 80:
      speedText = "Fast";
      break;
    case speed > 80:
      speedText = "Pro";
      break;
  }
  document.querySelector("#level p").innerHTML = speedText;
}




// Start the timer:

function startTimer(){
  var textEnteredLength = testArea.value.length;
  if (textEnteredLength == 0 && !timeRunning){
    timeRunning = true;
    timeInterval = setInterval(countTime, 10);
  }

}



// Reset everything:

function resetAll(){
  timeRunning = false;
  clearInterval(timeInterval);
  interval = null;
  theTimer.innerHTML = "00:00:00";
  timer =[0,0,0,0];
  testArea.value = "";
  testWrapper.style.borderColor = "gray";
  document.querySelector(".report").classList.add("hide");
}



// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", startTimer, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", resetAll, false );
