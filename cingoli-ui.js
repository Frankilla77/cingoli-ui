var lastMove = 0;
function move(left, right) {
  console.log(left + ' ' +right);
  var now = Date.now();
  if (lastMove + 200 < now) {
     lastMove = now; 
     var request = new XMLHttpRequest();
     var str = '/engines/' + left + "," + right;
     console.log(str);
     request.open('GET', '/engines/' + left + "," + right, true);
     request.send(null);
  }
}
document.onkeydown = function detectKey(event) {
    var e = event.keyCode;
    console.log(e);
    var POW = 1023;// between -1023 and +1023
    if (e==87 || e==38){ move(POW, POW);} // W
    if (e==83 || e==40){ move(-POW, -POW);} // S
    if (e==65 || e==37){ move(POW, -POW);} // A
    if (e==68 || e==39){ move(-POW, POW);} // D

}
if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', deviceMotionHandler, false);
} else {
  document.getElementById("dmEvent").innerHTML = "Accelerometer not supported."
}
function deviceMotionHandler(eventData) {
  acceleration = eventData.accelerationIncludingGravity;
  var left = 0;
  var right = 0;
  if (Math.abs(acceleration.y) > 1) {
    var speed = acceleration.y * 150;
    left = Math.min(1023, speed + acceleration.x * 75);
    right = Math.min(1023, speed - acceleration.x * 75);
  } else if (Math.abs(acceleration.x) > 0.75) {
    var speed = Math.min(1023, Math.abs(acceleration.x) * 150);
    if (acceleration.x > 0) {
      left = speed;
      right = -speed; 
    } else {
      left = -speed;
      right = speed;
    }
  }
  if (Math.abs(left) > 200 || Math.abs(right) > 200) {
    move(left, right);
  } else {
    move(0, 0);
  }
  var direction = "stop";
  direction = "[" + Math.round(acceleration.x) + "," + Math.round(acceleration.y) + "," + Math.round(acceleration.z) + "]<BR/>" + Math.round(left) + ", " + Math.round(right); 
  document.getElementById("vector").innerHTML =direction;
}
