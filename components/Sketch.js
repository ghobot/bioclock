//p5.js sketch

var x;

function setup() {
		createCanvas(800,600);
}	

function draw() {
  x=mouseX;
  background(0);
  strokeWeight(5);
  stroke(255);
  fill(0,0);
  
  ellipse(width/2, height/2,x,x);
}