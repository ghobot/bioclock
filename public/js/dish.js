//p5.js sketch

var dishSocket = io('http://localhost:4000/dish');
var scalar;
var mutationDose = 20;

//var x;

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(800, 600);
  background(125);
  
} 

function draw() {


}

function drawCell(doses) {

  scalar = 10*doses;
  fill(0,0,255);
  noStroke();
  ellipse(width/2, height/2,scalar,scalar);


  
}

function drawProgess(doses) {

  noStroke();
  
  if (doses > 16) {
     fill(255,50,50);

  } else {
    fill(120,255,120);
  }


    
    var progressLength;

    if (progressLength % mutationDose) {
        progressLength = 0; 

    } else {

       progressLength = width * (doses/(doses % mutationDose) );
    }

    rect(0,height-(width/20), progressLength ,width/20);


  
}

dishSocket.on('toP5', function(data){ 
  var doses = data.totalServings.length; 
  drawCell(doses);
  drawProgess(doses);
  console.log("%s doses" , doses);
});

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

