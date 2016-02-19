//p5.js sketch

var socket;

var x;

function setup() {
	//createCanvas(windowWidth, windowHeight);
	createCanvas(800, 600);
	socket = io.connect('http://localhost:4000');

	socket.on('toP5',
    	function(data) {
     	 // Draw a blue circle
      		fill(0,0,255);
      		noStroke();
      		ellipse(width/2, height/2,10*data.totalServings,10*data.totalServings);
		}
	);
}	

function draw() {
 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}