var l = {
  locations: [{x:0,y:0},{x:0,y:0},{x:0,y:0}],
  grow: 0
}

var o = {
  locations: [],
  grow: true
};

var u = {
  size: 1,
  grow: true
}

var letterI = {
  shift: 0,
  speed: .2
}

var s = {
  rotation: 0
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  var link = document.getElementById("link");
  var canvas = document.getElementById("defaultCanvas0");
  console.log(link, canvas);
  link.appendChild(canvas);
  noFill();
}

function draw() {
  background(255);

  drawLouis(width/2, height/2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawLouis(x, y) {
  push()
  translate(x, y);
  drawL(0-565/2, 0-200/2, 20);
  drawO(180-565/2, 100-200/2, 2160, 10, 20);
  drawU(305-565/2, 0-200/2, .1, 3);
  drawI(430-565/2, 0-200/2, 5);
  drawS(515-565/2, 100-200/2);
  pop();
}

function drawL(x, y, speed) {
  push();
  translate(x, y);
  strokeWeight(2);

  var t = [{x:0,y:0},{x:0,y:200},{x:80,y:200}];

  if(l.grow == 0 && l.locations[1].y != t[1].y) {
    l.locations[1].y += speed;
    l.locations[2].y += speed;
  } else if(l.grow == 0 && l.locations[2].x != t[2].x) {
    l.locations[2].x += speed;
    if(l.locations[2].x == t[2].x) l.grow = 1;
  } else if(l.grow == 1 && l.locations[0].y != t[1].y) {
    l.locations[0].y += speed;
  } else if(l.grow == 1 && l.locations[0].x != t[2].x) {
    l.locations[0].x += speed;
    l.locations[1].x += speed;
    if(l.locations[0].x == t[2].x) l.grow = 2;
  } else if(l.grow == 2 && l.locations[0].x != t[1].x) {
    l.locations[0].x -= speed;
    l.locations[1].x -= speed;
  } else if(l.grow == 2 && l.locations[0].y != t[0].y) {
    l.locations[0].y -= speed;
    if(l.locations[0].y == t[0].y) l.grow = 3;
  } else if(l.grow == 3 && l.locations[2].x != t[1].x) {
    l.locations[2].x -= speed;
  } else if(l.grow == 3 && l.locations[2].y != t[0].y) {
    l.locations[1].y -= speed;
    l.locations[2].y -= speed;
    if(l.locations[2].y == t[0].y) l.grow = 0;
  } 

  for(var i = 1; i < l.locations.length; i++)
    line(l.locations[i-1].x, l.locations[i-1].y, l.locations[i].x, l.locations[i].y);

  pop();
}

function drawO(x, y, size, speed, spiral) {
  push();
  translate(x, y);
  strokeWeight(1);

  var len = o.locations.length * speed;
  if(o.grow) {
    var location = {
      x: sin(radians(len))*len/spiral,
      y: cos(radians(len))*len/spiral
    };
    o.locations.push(location);
  } else {
    o.locations.shift();
  }

  for(var i = 1; i < o.locations.length; i++) {
    line(o.locations[i-1].x, o.locations[i-1].y, o.locations[i].x, o.locations[i].y);
  }

  if(len == 0) o.grow = true;
  else if(len >= size) o.grow = false;
  

  pop();
}

function drawU(x, y, speed, max) {
  push();
  translate(x, y);

  if(u.size > max) {
    u.size = max;
    u.grow = false;
  } else if(u.size < 1) {
    u.size = 1;
    u.grow = true;
  }

  strokeWeight(u.size);

  if(u.grow) {
    u.size += speed;
  } else {
    u.size -= speed;
  }

  beginShape();
    vertex(0, 0);
    vertex(0, 150);
    bezierVertex(0, 200, 40, 200, 40, 200);
    bezierVertex(80, 200, 80, 150, 80, 150);
    vertex(80, 150);
    vertex(80, 0);
  endShape();

  pop();
}

function drawI(x, y, max) {
  push();
  translate(x, y);

  var shift = letterI.shift;
  if(abs(letterI.shift) > max) { 
    letterI.speed *= -1; 
    letterI.shift += letterI.speed;
  }
  letterI.shift += letterI.speed;

  strokeWeight(2);
  line(0 + letterI.shift, 0, 0 - letterI.shift, 200);

  pop();
}

function drawS(x, y) {
  push();
  translate(x, y);

  strokeWeight(2);
  arc(0, -50, 100, 100, radians(90), radians(360));
  arc(0, 50, 100, 100, radians(-90), radians(180));  

  strokeWeight(2);
  var dots = 50;
  stroke(255);
  for(var i = 0; i < dots; i++) {
    point(cos(radians(360-s.rotation + i*360/dots)) * 50, sin(radians(360-s.rotation + i*360/dots)) * 50 - 50);
    point(cos(radians(s.rotation + i*360/dots)) * 50, sin(radians(s.rotation + i*360/dots)) * 50 + 50);
  }
  s.rotation = (s.rotation+1)%360;

  stroke(0);
  pop();
}
