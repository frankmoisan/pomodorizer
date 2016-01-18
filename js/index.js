$(document).ready(function() {
  onSprint = true;        // Currently on Work Sprint or not
  paused = false;         // Currently paused or not
  running = false;        // Is the timer running or not?
  minutes = 25;           // Set number of minutes
  currentMinutes = 25;    // Current minute count on timer
  seconds = 0;            // set number of seconds
  currentSeconds = 0;     // Current second count on timer
  var finalCountdown;     // IT'S THE FINAL COUNTDOWN!

  // Plus and Minus buttons for both minutes and seconds
  $('#btnMinMinus').on('click', function() {
    if (minutes > 0) {
      minutes -= 1;
    }
    $('#settings-min').text(addZeroes(minutes));
  });
  $('#btnMinPlus').on('click', function() {
    if (minutes < 99) {
      minutes += 1;
    }
    $('#settings-min').text(addZeroes(minutes));
  });
  $('#btnSecMinus').on('click', function() {
    if (seconds > 0) {
      seconds -= 1;
    } else {
      seconds = 59;
    }
    $('#settings-sec').text(addZeroes(seconds));
  });
  $('#btnSecPlus').on('click', function() {
    if (seconds < 59) {
      seconds += 1;
    } else {
      seconds = 0;
    }
    $('#settings-sec').text(addZeroes(seconds));
  });

  // Start button
  $('#btnStart').on('click', function() {
    clearInterval(finalCountdown);
    currentMinutes = minutes;
    currentSeconds = seconds;
    $('#timer-min').text(addZeroes(minutes));
    $('#timer-sec').text(addZeroes(seconds));
    $('#msg').text('Go!').css('color', 'red');
    $('#btnPause').text('Pause');
    paused = false;
    running = true;
    finalCountdown = setInterval(countdown, 1000);
  });

  // Pause button
  $('#btnPause').on('click', function() {
    if (running) {  
      clearInterval(finalCountdown);
      if (!paused) {
        paused = true;
        $('#btnPause').text('Continue');
        $('#msg').text('Paused...').css('color', 'gold');
      } else {
        paused = false;
        $('#btnPause').text('Pause');
        if (onSprint) {
          $('#msg').text('Go!').css('color', 'red');
        } else {
          $('#msg').text('You can breathe now!').css('color', 'green');
        }
        finalCountdown = setInterval(countdown, 1000);
      }
    }
  });

  // Reset button
  $('#btnReset').on('click', function() {
    clearInterval(finalCountdown);
    onSprint = true;
    running = false;
    $('#msg').text('Get ready...').css('color', 'red');
    minutes = 25;
    currentMinutes = 25;
    seconds = 0;
    currentSeconds = 0;
    paused = false;
    $('#btnPause').text('Pause');
    $('#timer-min').text(addZeroes(minutes));
    $('#timer-sec').text(addZeroes(seconds));
    $('#settings-min').text(addZeroes(minutes));
    $('#settings-sec').text(addZeroes(seconds));
  });

  // ...and still we stand taaaaaaall
  function countdown() {
    if (currentSeconds > 0) {
      currentSeconds -= 1;
    } else if (currentSeconds == 0 && currentMinutes > 0) {
      currentSeconds = 59;
      currentMinutes -= 1;
    } 
    if (currentMinutes == 0 && currentSeconds == 0) {
      if (onSprint) {
        clearInterval(finalCountdown);
        onSprint = false;
        currentMinutes = 5;
        currentSeconds = 0;
        $('#msg').text('You can breathe now!').css('color', 'green');
        $('#timer-min').css('color', 'cornflowerblue');
        $('#timer-sec').css('color', 'cornflowerblue');
        $('#timer-colon').css('color', 'cornflowerblue');
      } else {
        clearInterval(finalCountdown);
        onSprint = true;
        currentMinutes = minutes;
        currentSeconds = seconds;
        $('#msg').text('Go!').css('color', 'red');
        $('#timer-min').css('color', 'white');
        $('#timer-sec').css('color', 'white');
        $('#timer-colon').css('color', 'white');
      }
      finalCountdown = setInterval(countdown, 1000);
    }
    $('#timer-min').text(addZeroes(currentMinutes));
    $('#timer-sec').text(addZeroes(currentSeconds));
  }

  // Zeroes are purrty
  function addZeroes(numbers) {
    var num = numbers.toString();
    if (num.length < 2) {
      return '0' + num;
    } else {
      return numbers;
    }
  }
});