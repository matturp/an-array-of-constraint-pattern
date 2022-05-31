let paletteA = ["#002626", "#0e4749", "#95c623", "#e55812", "#efe7da", "#93b7be", "#f1fffa", "#785964", "#fcfcfc"];
let paletteB = ["#001219", "#005f73", "#0a9396", "#94d2bd", "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226"];
let paletteC = ["#ffe8d6", "#829e95", "#f1f1f1", "#ff7f11", "#ffffff", "#829e95", "#022b3a", "#ffe8d6", "#fAf5f0", "#1c1c1c"];
let paletteD = ["#ffcdb2", "#ffb4a2", "#e5989b", "#b5838d", "#6d6875"];
let paletteE = ["#fbf8cc", "#fde4cf", "#ffcfd2", "#f1c0e8", "#cfbaf0", "#a3c4f3", "#90dbf4", "#8eecf5", "#98f5e1", "#b9fbc0"];
let paletteF = ["#f8f9fa", "#e9ecef", "#dee2e6", "#ced4da", "#adb5bd", "#6c757d", "#495057", "#343a40", "#212529", "#FEEBF4"];
var paletteColour = paletteC;
var cells;
var complexity = 0;
var steps = 1;
var tileOn = true;
var bColour = 255;

let cellsSlider;
let curveSlider;
let strokeSlider;
let paletteButton;
let clearButton;
let saveButton;
var s;

// HUD

 let font;

// --------------------------------------------------------------------

function preload(){

  font = loadFont('assets/HandjetVF-All.ttf');
}

function setup() {
  createCanvas(windowWidth - 50, windowHeight - 100);
  noStroke();
  imageMode(CENTER);
  ellipseMode(CORNER);
  noLoop();

  cellsSlider = createSlider(2, 20, 2);
  cellsSlider.position(width - 790, 25);
  cellsSlider.style(
    "-webkit-appearance: none;" +
    "width: 10%;" +
    "height: 15px;" +
    "border-radius: 5px;" +
    "background: #d3d3d3;" +
    "outline: none;" +
    "opacity: 0.7;" +
    "-webkit-transition: .2s;" +
    "transition: opacity .2s;"
  );

  curveSlider = createSlider(0, s, 0);
  curveSlider.position(width - 620, 25);
  curveSlider.style(
    "-webkit-appearance: none;" +
    "width: 10%;" +
    "height: 15px;" +
    "border-radius: 5px;" +
    "background: #d3d3d3;" +
    "outline: none;" +
    "opacity: 0.7;" +
    "-webkit-transition: .2s;" +
    "transition: opacity .2s;"
  );

  strokeSlider = createSlider(0, 5, 0);
  strokeSlider.position(width - 450, 25);
  strokeSlider.style(
    "-webkit-appearance: none;" +
    "width: 10%;" +
    "height: 15px;" +
    "border-radius: 5px;" +
    "background: #d3d3d3;" +
    "outline: none;" +
    "opacity: 0.7;" +
    "-webkit-transition: .2s;" +
    "transition: opacity .2s;"
  );

  paletteButton = createButton('Toggle Colour');
  paletteButton.position(width - 265, 15);
  paletteButton.mousePressed(changePalette);
  paletteButton.style(
    "background-color: #4CAF50;" +
    "border: none;" +
    "color: white;" +
    "padding: 10px 15px;" +
    "text-align: center;" +
    "text-decoration: none;" +
    "display: inline-block;" +
    "font-size: 14px;" +
    "font-family: handjet;"
  );

  clearButton = createButton('Toggle Background');
  clearButton.position(width - 160, 15);
  clearButton.mousePressed(changeTiles);
  clearButton.style(
    "background-color: #4CAF50;" +
    "border: none;" +
    "color: white;" +
    "padding: 10px 15px;" +
    "text-align: center;" +
    "text-decoration: none;" +
    "display: inline-block;" +
    "font-size: 14px;" +
    "font-family: handjet;"
  );  

  saveButton = createButton('Save');
  saveButton.position(width - 30, 15);
  saveButton.mousePressed(saveCopy);
  saveButton.style(
    "background-color: #4CAF50;" +
    "border: none;" +
    "color: white;" +
    "padding: 10px 15px;" +
    "text-align: center;" +
    "text-decoration: none;" +
    "display: inline-block;" +
    "font-size: 14px;" +
    "font-family: handjet;"
  );  
}


function changePalette() {
  if (paletteColour == paletteA) {
    paletteColour = paletteB;
  } else if
    (paletteColour == paletteB) {
    paletteColour = paletteC;
  } else if
    (paletteColour == paletteC) {
    paletteColour = paletteD;
  } else if
    (paletteColour == paletteD) {
    paletteColour = paletteE;
  } else if
    (paletteColour == paletteE) {
    paletteColour = paletteF;
  } else if
    (paletteColour == paletteF) {
    paletteColour = paletteA;
  }
  redraw();
}


function draw() {

  background(bColour);

  cells = cellsSlider.value();
   s = width / cells;
  var c = 1;
  structure = curveSlider.value();

  stroke(0);
  let strokeAmt = strokeSlider.value();
  strokeWeight(strokeAmt);

  for (let x = 0; x < width; x += s) {
    for (let y = 0; y < height; y += s * c) {
      if (random() < 0.1) {
        makeTile(x, y, s / 2);
        makeTile(x + s / 2, y, s / 2);
        makeTile(x, y + s / 2, s / 2);
      } else {
          if (tileOn == true){
          makeTile(x, y, s);
          }
      }
    }
  }

  for (var n = 0; n < width; n += s){
    for (var m = 0; m < height; m += s){

      if (structure > 0){
  push();
  ellipseMode(CENTER);
  stroke(paletteColour[1]);
  strokeWeight(3);
  noFill();
  beginShape();
  curveVertex(n, m);
  curveVertex(n, m);
  curveVertex(n + random(structure), m + random(structure));
  curveVertex(n + random(structure), m + random(structure));
  curveVertex(n + s/2, m + s/2);
  curveVertex(n + random(structure), m + random(structure));
  curveVertex(n + random(structure), m + random(structure));
  curveVertex(n + s, m + s);
  curveVertex(n + s, m + s);
  endShape();
  pop();
      }
  }
}
}


function saveCopy() {

  textFont(font);
  textSize(20);
  textAlign(CENTER);
  fill(200);
  noStroke();
  text("Made with An Array of Constraint " + day() + '.' + month() + '.' + year() + '-' + hour()+ '.' + minute(), 180, height - 10);
  save('pattern at ' + day() + '.' + month() + '.' + year() + '-' + hour()+ '.' + minute() + '.jpg');
  }



function changeTiles(){
  if (tileOn == true){
    tileOn = false;
    bColour = paletteColour[0];
  } else
  if (tileOn == false){
    tileOn = true;
  }
  redraw();
}

// --------------------------------------------------------------------

function makeTile(x, y, s) {
  shuffle(paletteColour, true);
  fill(paletteColour[0]);
  square(x, y, s);

  push();
  translate(x + s / 2, y + s / 2);
  rotate(random([0, PI / 2, PI, 3 * PI / 2]));
  fill(paletteColour[1]);
  let r = floor(random(5));
  if (r == 0) {
    arc(-s / 2, 0, s, s, -PI / 2, PI / 2, CHORD);
  } else if (r == 1) {
    rect(-s / 2, -s / 2, s / 2, s);
  } else if (r == 2) {
    triangle(-s / 2, -s / 2, s / 2, -s / 2, -s / 2, s / 2);
  } else if (r == 3) {
    circle(-s / 2, -s / 2, s);
    stroke(paletteColour[3]);
    strokeWeight(3);
    noFill();
    //circle(-s / 2, -s / 2, complexity);
  } else if (r == 4) {
    stroke(paletteColour[2]);
    strokeWeight(3);
    line(-s, -s, s + complexity, s + complexity);
  }
  pop();
}

function mouseDragged(){
  redraw();
}

function windowResized() {
  resizeCanvas(windowWidth - 50, windowHeight - 100);
}